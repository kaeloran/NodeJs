import { Column, Entity } from "typeorm";
import { GenericModel } from "./GenericModel";

@Entity("surveys")
class Surveys extends GenericModel {
    @Column()
    title: string;

    @Column()
    description: string;
}

export { Surveys }