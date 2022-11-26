const nodemailer = require('nodemailer');
const nconf = require('nconf');

nconf.argv().env();

nconf.file({ file: './config.json' });
const emailConfig = nconf.get('emailConfig');

const emailService = {
    sendEmail: async ({email, subject, content}) => {
        const transporter = createTransport();
        const mailOptions = {
            from: emailConfig.auth.user,            
            to: email,
            subject: subject,
            html: content,
            
        };
        transporter.sendMail(mailOptions, (error, info) =>{
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

const createTransport = () => {

    return nodemailer.createTransport({
        service : emailConfig.service,
        auth: {
            user: emailConfig.auth.user,
            pass: emailConfig.auth.pass
        } 
    });
}

module.exports = emailService;