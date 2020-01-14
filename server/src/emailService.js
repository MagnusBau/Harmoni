
const nodemailer = require("nodemailer");

const fromMail = 'harmoni.team3@gmail.com';

let transporter = nodemailer.createTransport( {

    service: 'gmail',
    auth: {
        user: fromMail,
        pass: 'Team3.harmoni'
    }
});

export class EmailService {

    cancelledNotification(mailList) {

        let toMail = mailList.join(', ');

        let mailOption = {
            from: fromMail,
            bcc: toMail,
            subject: "temp",
            text: 'Dette er en test',
            html: '<b> Dette er en test </b>'
        };

        transporter.sendMail(mailOption, function(err, res) {
            if(err) {
                console.log(err);
            } else {
                console.log("Epost sendt: " + res.response);
            }
        });
    }

}

