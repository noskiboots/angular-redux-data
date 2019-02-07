import {Component, OnInit} from '@angular/core';
import {Post} from '../../shared/post';
import {Client} from '../../shared/client';
import {AngularReduxDataService} from '../../projects/angular-redux-data/src/lib/redux-data-services/angular-redux-data.service';
import {take} from 'rxjs/operators';
import {ArdTransaction} from '../../projects/angular-redux-data/src/lib/redux-data-transactions/ard-transaction';
import {Breed} from '../../shared/breed';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    post: Post;
    clients: Client[] = [];
    user: any;
    newlyCreatedPost;
    postList = [];
    breeds: Breed[] = [];
    events: Event[] = [];

    constructor(private _ard: AngularReduxDataService) {
    }

    ngOnInit() {
        this._ard.findRecord('posts', 1).subscribe(post$ => {
            this.post = post$;
            if (this.post) {
                this._ard.queryAll('comments', {postId: this.post.id}).subscribe(comments$ => {
                    this.post['comments'] = comments$;
                });
            }
        }, (ardTransaction: ArdTransaction) => {
        });
        this._ard.findRecord('profile', 1).subscribe(user$ => {
            this.user = user$;
        });
        this._ard.peekAll('posts').subscribe(posts$ => this.postList = posts$);
    }

    findAllCatBreeds() {
        this._ard.findAll('breeds').subscribe(breeds$ => this.breeds = breeds$);
    }

    findAllEvents() {
        this._ard.findAll('events').subscribe(events$ => {
            this.events = events$;
        }, (err) => {
            console.log(JSON.stringify(err));
        });
    }

    findAll() {
        this._ard.findAll('posts').pipe(take(1)).subscribe();
    }

    update1() {
        this._ard.update('posts', this.newlyCreatedPost.id, {meow: 'mix'})
            .subscribe(updated$ => {
            });
    }

    create() {
        this._ard.create('posts', {
            'title': 'testing post',
            'author': 'meow'
        }).subscribe((post$) => {
            this.newlyCreatedPost = post$;
        });
    }

    create2() {
        this._ard.create('posts', {
            'title': 'testing post',
            'author': 'meow'
        }).subscribe((post$) => {
        });
    }

    delete() {
        if (this.newlyCreatedPost && this.newlyCreatedPost.id) {
            this._ard.delete('posts', this.newlyCreatedPost.id)
                .subscribe(stuff => {
                    console.log(`delete ${stuff}`);
                    this.newlyCreatedPost = undefined;
                }, (error: ArdTransaction) => {
                    console.log(error.error.toString());
                });
        }
    }
}
