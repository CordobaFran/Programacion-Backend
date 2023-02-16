const { createTransport } = require("nodemailer")

const DEST_MAIL = 'francocordobafs@gmail.com'

const TEST_MAIL = 'francocordobaservidor@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'jswyydpfejxrmypc'
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function nodeMailer(NewuserData) {

const {username, email, name, age, phoneNumber, address} = NewuserData

    const mailOptions = {
        from: 'Servidor',
        to: DEST_MAIL,
        subject: 'Nuevo registro',
        html:  `    <h1 style="color: blue;"> Nuevo registro realizado </h1>
                    <p>Username: ${username}</p>
                    <p>email: ${email}</p>
                    <p>name: ${name}</p>
                    <p>age: ${age}</p>
                    <p>phoneNumber: ${phoneNumber}</p>
                    <p>address: ${address}</p>
        `
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

module.exports = nodeMailer
