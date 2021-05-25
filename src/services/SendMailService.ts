import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import handlebars from "handlebars";
import fs from "fs";

class SendMailService {
    private mailerTransporter: Mail;

    constructor() {
        nodemailer.createTestAccount()
            .then(account => {
                this.mailerTransporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: account.user, // generated ethereal user
                        pass: account.pass, // generated ethereal password
                    }
                })
            });

    }

    async execute(to: string[], subject:string, variables: object, npsPath: string) {
        let templateFileContent = fs.readFileSync(npsPath).toString("utf8");
        let mailTemplateParse = handlebars.compile(templateFileContent);
        let html = mailTemplateParse(variables)

        let info = await this.mailerTransporter.sendMail({
            from: '"NPS" <noreplay@nps.com.br>', // sender address
            to: to.join(", "), // list of receivers
            subject: subject, // Subject line
            html // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }
}

export default new SendMailService();