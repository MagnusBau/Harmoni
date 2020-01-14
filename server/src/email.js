
const nodemailer = require("nodemailer");

const fromMail = 'harmoni.team3@gmail.com';

let transporter = nodemailer.createTransport( {

    service: 'gmail',
    auth: {
        user: fromMail,
        pass: 'Team3.harmoni'
    }

});

export class Email {

    cancelledNotification(mailList, eventId, title, name, location, startTime) {

        let toMail = mailList.join(', ');

        let mailOption = {
            from: 'Harmoni <' + fromMail + '>',
            bcc: toMail,
            subject: "Arrangementet " + title + " er avlyst",
            text: 'Dette er en test',
            html: '<h3 style="font-size: 21px">Hei, ' + name + '</h3>' +
                '  <div style="font-size: 17px">' +
                '   <br>Dette er et varsel om at følgende arrangement har blitt avlyst: <a href="http://localhost:4000/#/event/' + eventId + '">Link til ditt arrangement</a>' +
                '   <div><b><br>Tittel: ' + title + '<br>Sted: ' + location + '<br>Tid: ' + startTime + '</b></div>' +
                '   <br><p style="text-align: center">&copy; 2020 Team 3</div>' +
                '  </div>'


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

