const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationEmail(email, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Активация аккаунта" + process.env.API_URL,
      text: "",
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">Перейти</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
