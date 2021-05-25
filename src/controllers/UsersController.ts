import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UsersController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const schemaUser = yup.object().shape({
            name: yup.string().required("O nome é obrigatório!"),
            email: yup.string().email("O email é inválido").required("O email é obrigatório")
        });

        try {
            await schemaUser.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err.errors);
        }
        // if (! await schemaUser.isValid(request.body))
        //     return response.status(400).json({
        //         error: "Validation failed"
        //     })

        const usersRepository = getCustomRepository(UsersRepository);
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists)
            throw new AppError("User already exists");

        const userData = usersRepository.create({
            name, email
        });

        await usersRepository.save(userData);
        return response.status(201).json(userData);
    }
}

export { UsersController };
