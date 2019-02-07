import {CommentEffects} from '../app/redux/effects/comment.effects';
import {PostEffects} from '../app/redux/effects/post.effects';
import {CatsAdapter} from '../app/adapters/cats.adapter';
import {uiState} from '../app/redux/features/uiState/uiStateReducer';
import {ProfileEffects} from '../app/redux/effects/profile.effects';
import {TicketMasterAdapter} from '../app/adapters/ticket-master.adapter';
import {BreedEffects} from '../app/redux/effects/breed.effects';
import {EventEffects} from '../app/redux/effects/event.effects';

export const environment = {
    production: false,
    reduxDataServiceConfig: {
        effects: [
            CommentEffects,
            PostEffects,
            ProfileEffects,
            BreedEffects,
            EventEffects
        ],
        entityNameSpaces: [
            'posts',
            'comments',
            'clients',
            'profile',
            'breeds',
            'events'
        ],
        defaultHost: 'https://jsonplaceholder.typicode.com',
        defaultPath: '',
        entityAdapterMappings: {
            'breeds': {
                adapter: CatsAdapter,
                host: 'https://api.thecatapi.com',
                path: 'v1'
            },
            'events': {
                adapter: TicketMasterAdapter,
                host: 'https://app.ticketmaster.com',
                path: 'discovery/v1'
            }
        },
        customReducers: {
            'uiState': uiState
        }
    }
};
