// Import MailerSend from the installed package
const {MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

// Create the MailerSend instance
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY, // Your MailerSend API key
});

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Email content
    const response = await mailerSend.email.send({
      from: {
        email: process.env.MAILERSEND_SENDER_EMAIL, // Your MailerSend verified sender email
        name: "AnsarTech", // Sender name (optional)
      },
      to: [
        {
          email: "ansarkhanmehmood@gmail.com", // Recipient's email as an array item
        },
      ],
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    });

    // ________________________         ________________________
                 // Automatic reply to the user (Visitor)
     const autoReply = await mailerSend.email.send({
      from: {
        email: process.env.MAILERSEND_SENDER_EMAIL, // Your verified sender email
        name: "Ansar Mehmood",
      },
      to: [
        {
          email: email, // Send the email to the user who filled the form
        },
      ],
      subject: "Thank You for Contacting Us!",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
        <p>Here is a copy of your message:</p>
        <blockquote>${msg}</blockquote>
        <p>Best regards,<br>AnsarTech</p>
      `,
    });
    // _________________________________________________________________________

    return res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };




// ___________________________SendGrid_____________________________

// const nodemailer = require("nodemailer");
// const sendGridTransport = require("nodemailer-sendgrid-transport");

// transport
// const transporter = nodemailer.createTransport(
//   sendGridTransport({
//     auth: {
//       api_key: process.env.API_SENDGRID,
//     },
//   })
// );

// const sendEmailController = (req, res) => {
//   try {
//     const { name, email, msg } = req.body;

//     //validation
//     if (!name || !email || !msg) {
//       return res.status(500).send({
//         success: false,
//         message: "Please Provide All Fields",
//       });
//     }
//     // email matter
//     transporter.sendMail({
//       to: "typeyouremailadresshere@gmail.com",
//       from: "typeyouremailadresshere@gmail.com",
//       subject: "Regarding Mern Portfolio App",
//       html: `
//         <h5>Detail Information</h5>
//         <ul>
//           <li><p>Name : ${name}</p></li>
//           <li><p>Email : ${email}</p></li>
//           <li><p>Message : ${msg}</p></li>
//         </ul>
//       `,
//     });

//     return res.status(200).send({
//       success: true,
//       message: "Your Message Send Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Send Email API Error",
//       error,
//     });
//   }
// };

// module.exports = { sendEmailController };