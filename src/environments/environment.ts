import {CommentEffects} from '../app/redux/effects/comment.effects';
import {PostEffects} from '../app/redux/effects/post.effects';
import {ClientEffects} from '../app/redux/effects/client.effects';
import {CruxAdapter} from '../app/adapters/crux.adapter';
import {uiState} from '../app/redux/features/uiState/uiStateReducer';
import {ProfileEffects} from '../app/redux/effects/profile.effects';
import {AuthenticationEffects} from '../app/redux/effects/uiStateEffects';

export const environment = {
    production: false,
    reduxDataServiceConfig: {
        effects: [
            AuthenticationEffects,
            CommentEffects,
            PostEffects,
            ClientEffects,
            ProfileEffects
        ],
        entityNameSpaces: [
            'posts',
            'comments',
            'clients',
            'profile',
            'clients',
        ],
        // defaultHost: 'https://jsonplaceholder.typicode.com',
        defaultHost: 'http://localhost:3000',
        defaultPath: '',
        entityAdapterMappings: {
            'clients': {
                adapter: CruxAdapter,
                host: 'https://development.appointment-plus.com/',
                path: 'api/v2.0.18.1/Rest/',
                config: {
                    applicationInterface: 'e0c035f16c4b0cfdbc63972cd7e6edfd',
                }
            }
        },
        customReducers: {
            'uiState': uiState
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
