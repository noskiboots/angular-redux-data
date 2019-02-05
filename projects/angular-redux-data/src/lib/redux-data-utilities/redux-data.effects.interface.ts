import { EffectMetadata } from '@ngrx/effects/src/effects_metadata';

export interface RxDataEffectI {
    findAll$: EffectMetadata<any>;
    findRecord$: EffectMetadata<any>;
    queryAll$: EffectMetadata<any>;
    create$: EffectMetadata<any>;
    delete$: EffectMetadata<any>;
    update$: EffectMetadata<any>;
    entityNamespace: string;
}
