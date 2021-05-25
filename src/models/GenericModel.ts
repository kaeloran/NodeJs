import { CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

class GenericModel {
    @PrimaryColumn()
    readonly id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id)
            this.id = uuid();
    }
}

export { GenericModel }