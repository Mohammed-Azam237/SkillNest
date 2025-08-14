const nodemailer = require('nodemailer');

const mailSender = async(email,title,body)=>{
    try{
        //create a transporter first
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 465, // SSL port for Gmail
            secure: true, // use SSL
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = transporter.sendMail({
            from:`SkillNest || Zam`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;