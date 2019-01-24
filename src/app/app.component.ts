import {Component, OnInit} from '@angular/core';
import {ApplicationState} from './rx-data.config';
import {RxDataSelectorsService} from '../../projects/angular-redux-data/src/lib/rx-data-services/rx-data.selectors.service';
import {RxDataActionsService} from '../../projects/angular-redux-data/src/lib/rx-data-services/rx-data.actions.service';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {Post} from '../../shared/post';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ngx-angular-redux-data';
    posts: Post[] = [];

    constructor(private _actionsService: RxDataActionsService,
                private _entitySelectorsService: RxDataSelectorsService,
                private _store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this._store.dispatch(new this._actionsService.actions['comment'].FindAll('comments'));
        this._store.pipe(
            select(this._entitySelectorsService.getSelector('comment').selectAll()),
            filter(comments => !!comments))
            .subscribe(comments$ => {
                if (comments$.length > 0) {
                    const postRequests = comments$.map(comment$ => {
                        this._store.dispatch(new this._actionsService.actions['post'].FindRecord('posts', comment$.postId));
                        return this._store.pipe(
                            select(this._entitySelectorsService.getSelector('post').selectById(comment$.postId))
                        );

                    });
                    Observable.from(postRequests).combineAll()
                        .pipe(filter(posts => !!posts))
                        .subscribe((posts$) => {
                            posts$.forEach(post$ => {
                                post$['comments'] = comments$.filter(comment$ => comment$.postId === post$['id']);
                            });
                            this.posts = posts$ as Post[];
                        });
                }
            });
    }
}
