const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure:true,
    port:465,
    auth:{
        user : process.env.MAIL_ID,
        pass : process.env.MAIL_PASS
    }
});

const resendPassword = async(email,link)=>{
    let mailOptions = {
        from : process.env.MAIL_ID,
        to:email,
        subject:"Reset your password here",
        html : `"Click on the following link to reset your password : "
        <br/><br/>
            ${link}
            <br /><br/>
            This link will <b>expire</b> after 10 minutes.
        `
    }

    await transporter.sendMail(mailOptions,function(error,info){
        if(error)       console.log("Error occured : ", error);
        else            console.log("Mail sent to : ",email);
    });
}

const RegisterEmail = async(email,link)=>{
    let mailOptions = {
        from : process.env.MAIL_ID,
        to:email,
        subject : "Verify your Adoose Account",
        html : `"Click on the following link to verify your Account : "
        <br/><br/>
            ${link}
            <br /><br/>
            This link will <b>expire</b> after 10 minutes.
        `
    }

    await transporter.sendMail(mailOptions,function(error,info){
        if(error)       console.log("Error occured : ", error);
        else            console.log("Mail sent to : ",email);
    });
}

module.exports = {RegisterEmail,resendPassword};