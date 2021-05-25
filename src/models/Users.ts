import { Column, Entity } from "typeorm";
import { GenericModel } from "./GenericModel";

@Entity("users")
class Users extends GenericModel {
    @Column()
    name: string;

    @Column()
    email: string;
}

export { Users }