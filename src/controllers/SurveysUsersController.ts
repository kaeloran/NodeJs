import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";
import { AppError } from "../errors/AppError";

class SurveysUsersController {

    async execute(request: Request, response: Response) {
        const { email, surveyId } = request.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const userData = await usersRepository.findOne({
            email
        });

        if (!userData)
            throw new AppError("User does not exists");

        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveyData = await surveysRepository.findOne({ id: surveyId });

        if (!surveyData)
            throw new AppError("Survey does not exists");

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUserDataFind = await surveysUsersRepository.findOne({
            where: { userId: userData.id, value: null },
            relations: ["user", "survey"]
        });

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        const variables = {
            name: userData.name,
            title: surveyData.title,
            description: surveyData.description,
            surveyUserId: "",
            link: process.env.URL_MAIL
        }

        if (surveyUserDataFind) {
            variables.surveyUserId = surveyUserDataFind.id;

            await SendMailService.execute([email], surveyData.title, variables, npsPath);
            return response.status(201).json(surveyUserDataFind);
        }

        const surveyUserData = surveysUsersRepository.create({
            userId: userData.id,
            surveyId
        });

        await surveysUsersRepository.save(surveyUserData);

        variables.surveyUserId = surveyUserData.id;
        await SendMailService.execute([email], surveyData.title, variables, npsPath);

        return response.status(201).json(surveyUserData);
    }

}

export { SurveysUsersController };

