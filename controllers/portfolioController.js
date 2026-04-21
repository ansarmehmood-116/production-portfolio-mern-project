const nodemailer = require('nodemailer');

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

    // 1. Create the Transporter (Using Gmail as the bridge)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ansarkhanmehmood@gmail.com',
        pass: process.env.EMAIL_PASS, // Use the 16-character App Password here
      },
    });

    // 2. Email to YOU (Notification)
    const mailToAdmin = {
      from: `"${name}" <${email}>`, 
      to: "ansarkhanmehmood@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    };

    // 3. Automatic reply to the Visitor
    const mailToVisitor = {
      from: '"Ansar Mehmood" <ansarkhanmehmood@gmail.com>',
      to: email, 
      subject: "Thank You for Contacting Us!",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
        <p>Here is a copy of your message:</p>
        <blockquote>${msg}</blockquote>
        <p>Best regards,<br>AnsarTech</p>
      `,
    };

    // Execute sending both emails
await Promise.all([
  transporter.sendMail(mailToAdmin),
  transporter.sendMail(mailToVisitor)
]);

    return res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error: error.message,
    });
  }
};

module.exports = { sendEmailController };
// ____________________________________________________________________



// // Import MailerSend from the installed package
// const {MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

// // Create the MailerSend instance
// const mailerSend = new MailerSend({
//   apiKey: process.env.MAILERSEND_API_KEY, // Your MailerSend API key
// });

// const sendEmailController = async (req, res) => {
//   try {
//     const { name, email, msg } = req.body;

//     // Validation
//     if (!name || !email || !msg) {
//       return res.status(400).send({
//         success: false,
//         message: "Please Provide All Fields",
//       });
//     }

//     // Email content
//     const response = await mailerSend.email.send({
//       from: {
//         email: process.env.MAILERSEND_SENDER_EMAIL, // Your MailerSend verified sender email
//         name: name // Sender name (optional)
//       },
//       to: [
//         {
//           email: "ansarkhanmehmood@gmail.com", // Recipient's email as an array item
//         },
//       ],
//       subject: "Regarding Mern Portfolio App",
//       html: `
//         <h5>Detail Information</h5>
//         <ul>
//           <li><p>Name: ${name}</p></li>
//           <li><p>Email: ${email}</p></li>
//           <li><p>Message: ${msg}</p></li>
//         </ul>
//       `,
//     });

//     // ________________________         ________________________
//                  // Automatic reply to the user (Visitor)
//      const autoReply = await mailerSend.email.send({
//       from: {
//         email: process.env.MAILERSEND_SENDER_EMAIL, // Your verified sender email
//         name: "Ansar Mehmood",
//       },
//       to: [
//         {
//           email: email, // Send the email to the user who filled the form
//         },
//       ],
//       subject: "Thank You for Contacting Us!",
//       html: `
//         <p>Dear ${name},</p>
//         <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
//         <p>Here is a copy of your message:</p>
//         <blockquote>${msg}</blockquote>
//         <p>Best regards,<br>AnsarTech</p>
//       `,
//     });

//     return res.status(200).send({
//       success: true,
//       message: "Your Message Sent Successfully",
//       response,
//     });
//   } catch (error) {
//     console.log(error);
//     console.log("API KEY CHECK:", process.env.MAILERSEND_API_KEY ? "Loaded" : "Not Found");
//     return res.status(500).send({
//       success: false,
//       message: "Send Email API Error",
//       error,
//     });
//   }
// };

// module.exports = { sendEmailController };
// _________________________________________________________________________________
// _________________________________________________________________________________



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
// _______________________________________________________________________
// _______________________________________________________________________

// 1. Nodemailer (The "Pure" Backend Way)This is what you just implemented. It is a library, not a service.How it works: It uses your backend server (Node.js) to connect directly to an email provider's SMTP server (like Gmail).Pros: You have total control over the email logic, and it is completely free if you use your own Gmail account.Cons: If you send too many emails, Gmail might flag you as spam. It is best for small personal portfolios or contact forms.Best for: Developers who want to keep all logic in their Express/Node.js backend.

// 2. MailerSend (The Professional API Way)This is a "Transactional Email Service" designed for businesses.How it works: Instead of a direct SMTP connection, you send a JSON request to their professional API.Pros: High "deliverability" (meaning emails rarely go to the spam folder). It provides deep analytics, like tracking if the user opened your email.Cons: It strictly requires a verified custom domain to prevent spam. This is why it failed on your vercel.app site—it doesn't trust "free" subdomains.Best for: Production-level E-commerce platforms  where you need to send thousands of invoices or password resets reliably.

// 3. EmailJS (The "No-Backend" Way)This is a specialized service for frontend-only developers.How it works: It allows you to send emails directly from your React code without having a backend at all.Pros: Very easy to set up for portfolios. You don't need to write any Node.js code, and you don't need a custom domain.Cons: Exposes your service IDs in the frontend code (unless you're careful), and the free tier has lower monthly limits compared to other services.Best for: Quick Portfolio sites  or static landing pages where you don't want to maintain a backend server.