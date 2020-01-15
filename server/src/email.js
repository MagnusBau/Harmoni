
// @flow
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport( {

    service: 'gmail',
    auth: {
        user: 'harmoni.team3@gmail.com',
        pass: 'Team3.harmoni'
    }

});

export class Email {

    cancelledNotification(mailList: string, eventId: number, title: string, name: string, location: string, startTime: string) {

        let toMail = mailList.join(', ');

        let mailOption = {
            from: 'Harmoni <harmoni.team3@gmail.com>',
            bcc: toMail,
            subject: "Arrangementet " + title + " er avlyst",
            text: 'Dette er en test',
            html: '<h3 style="font-size: 21px">Hei, ' + name + '</h3>' +
                '  <div style="font-size: 17px">' +
                '   <br>Dette er et varsel om at følgende arrangement har blitt avlyst: <a href="http://localhost:4000/#/event/' + eventId + '">Link til ditt arrangement</a>' +
                '   <div><b><br>Tittel: ' + title + '<br>Sted: ' + location + '<br>Tid: ' + startTime + '</b></div>' +
                '   <div><br>Med vennlig hilsen,' +
                '   <br>Harmoni Team 3</div>' +
                '   <br><p style="text-align: center">&copy; 2020 Team 3</div>' +
                '  </div>'


        };

        transporter.sendMail(mailOption, (err, res) => {
            if(err) {
                console.log("Error occured: " + err);
            } else {
                console.log("Email sent: " + res.response);
            }
        });

    }

}

