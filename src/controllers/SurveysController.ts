import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {

    async create(request: Request, response: Response) {
        const { title, description } = request.body;
        const surveysRepository = getCustomRepository(SurveysRepository);
        const userAlreadyExists = await surveysRepository.findOne({
            title, description
        });

        if (userAlreadyExists)
            return response.json(userAlreadyExists);

        const surveyData = surveysRepository.create({
            title, description
        });

        await surveysRepository.save(surveyData);
        return response.status(201).json(surveyData);
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find();
        return response.json(all);
    }
}

export { SurveysController };
