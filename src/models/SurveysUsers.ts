import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { GenericModel } from "./GenericModel";
import { Surveys } from "./Surveys";
import { Users } from "./Users";

@Entity("surveys_users")
class SurveysUsers extends GenericModel {

    @Column()
    userId: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: "userId" })
    user: Users

    @Column()
    surveyId: string;

    @ManyToOne(() => Surveys)
    @JoinColumn({ name: "surveyId" })
    survey: Surveys

    @Column()
    value: number;
}

export { SurveysUsers }