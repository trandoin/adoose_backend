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

exports.report = async(req,res) => {
    console.log(req.body)
    const LoggedInUser = req.body.LoggedInUser;
    const OtherUser = req.body.OtherUser;
    let mailOptions = {
        from : process.env.MAIL_ID,
        to: 'ds941877@student.nitw.ac.in',
        subject : "Account Report",
        html : `"The following event occured"
        <br/><br/>
            User ${LoggedInUser} reported account of ${OtherUser}
        `
    }

    await transporter.sendMail(mailOptions,function(error,info){
        if(error)       console.log("Error occured : ", error);
        else            console.log("Mail sent to : ",email);
    });
}

