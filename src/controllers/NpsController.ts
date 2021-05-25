import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {

    async execute(request: Request, response: Response) {
        const { surveyId } = request.params;
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUsers = await surveysUsersRepository.find({
            surveyId
        })

        const detractor = surveyUsers
            .filter(survey => survey.value >= 0 && survey.value <= 6)
            .length

        const promoters = surveyUsers
            .filter(survey => survey.value >= 9)
            .length

        const passives = surveyUsers
            .filter(survey => survey.value >= 7 && survey.value <= 8)
            .length


        const totalAnswers = surveyUsers.length;
        const calculate = ((promoters - detractor) / totalAnswers) * 100;

        return response.status(200).json({
            detractor,
            promoters,
            passives,
            totalAnswers,
            nps: Number(calculate.toFixed(2))
        })

    }
}

export { NpsController };

