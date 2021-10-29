require('dotenv/config')
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer"
import { SES } from 'aws-sdk'
import handlebars from "handlebars";
import fs from "fs"


@injectable()
class SESMailProvider implements IMailProvider {

    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
            })
        })

    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

        const templateFileCount = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileCount);

        const templateHTML = templateParse(variables)

        await this.client.sendMail({
            to,
            from: "Rentex <sandeson@sandeson.online>",
            subject,
            html: templateHTML,
        });
    }

}

export { SESMailProvider }