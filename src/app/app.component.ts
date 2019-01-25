import {Component, OnInit} from '@angular/core';
import {ApplicationState} from './rx-data.config';
import {ReduxDataSelectorsService} from '../../projects/angular-redux-data/src/lib/redux-data-services/redux-data.selectors.service';
import {ReduxDataActionsService} from '../../projects/angular-redux-data/src/lib/redux-data-services/redux-data.actions.service';
import {select, Store} from '@ngrx/store';
import {Post} from '../../shared/post';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angular-redux-data';
    post: Post;

    constructor(private _actionsService: ReduxDataActionsService,
                private _entitySelectorsService: ReduxDataSelectorsService,
                private _store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this._store.dispatch(new this._actionsService.actions['post'].FindRecord('posts', 1));
        this._store.pipe(
            select(this._entitySelectorsService.getSelector('post').selectById(1)),
            filter(item => !!item))
            .subscribe(post$ => {
                this._store.dispatch(new this._actionsService.actions['comment'].QueryAll('comments', {'postId': post$.id}));
                this._store.pipe(
                    select(this._entitySelectorsService.getSelector('comment').selectAll()),
                    filter(items => !!items && items.length > 0))
                    .subscribe((comments$) => {
                        post$['comments'] = comments$;
                        this.post = post$ as Post;
                    });
            });
    }
}
