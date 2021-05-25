import { Router } from "express";
import { UsersController } from "./controllers/UsersController";
import { SurveysController } from "./controllers/SurveysController";
import { SurveysUsersController } from "./controllers/SurveysUsersController";
import { AnswersController } from "./controllers/AnswersController";
import { NpsController } from "./controllers/NpsController";
import { SolveCaptchaController } from "./controllers/SolveCaptchaController";

const router = Router();
const usersController = new UsersController();
const surveysController = new SurveysController();
const surveysUsersController = new SurveysUsersController();
const answersController = new AnswersController();
const npsController = new NpsController();
const solveCaptchaController = new SolveCaptchaController();


router.post("/users", usersController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", surveysUsersController.execute);

router.get("/answers/:value", answersController.execute);

router.get("/nps/:surveyId", npsController.execute);

router.get("/solve", solveCaptchaController.execute);

export { router };