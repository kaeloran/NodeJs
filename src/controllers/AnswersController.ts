import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswersController {

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUserDataFind = await surveysUsersRepository.findOne({
            id: u?.toString(),
            value: Not(IsNull())
        });

        if (!surveyUserDataFind)
            throw new AppError("Survey user does not exists");

        surveyUserDataFind.value = Number(value);

        await surveysUsersRepository.save(surveyUserDataFind);

        return response.status(200).json(surveyUserDataFind);
    }
}

export { AnswersController };

