import { Request, Response } from "express";

class SolveCaptchaController {

    async execute(request: Request, response: Response) {

        const CaptchaSolver = require('captcha-solver')

        const solver = new CaptchaSolver('https://www.dogefaucet.com/en', {
            type: "recaptcha",
            websiteKey: "6Lc6Le0SAAAAAK4DguGowsYEWSECqeT2ZUbvhDur",

        })
        return response.json("");
    }
}

export { SolveCaptchaController };

