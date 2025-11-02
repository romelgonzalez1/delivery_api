import { Store } from "../model/store";
import { StoreEntity } from "../model/entity/store.entity";
import { IMapper } from "src/core/mapper/mapper.interface";

export class StoreMapper implements IMapper<Store, StoreEntity> {
    async fromDomainToPersistence(domain: Store): Promise<StoreEntity> {

        const storeORM = new StoreEntity();

        storeORM.id = domain.Id;
        storeORM.name = domain.Name;
        storeORM.description = domain.Description;
        storeORM.image = domain.Image;

        return storeORM;
    }

    async fromPersistenceToDomain(persistence: StoreEntity): Promise<Store> {

        const store = new Store(
            persistence.id,
            persistence.name,
            persistence.description,
            persistence.image,
        );

        return store;
    }
}
