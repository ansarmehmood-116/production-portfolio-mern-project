// See Platforms and Email validation theory below at the end

const nodemailer = require("nodemailer");
const validator = require("email-validator"); // Import the validator

// ===== Optimized Transporter =====
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true, // Use pooling for faster multiple sends
  maxConnections: 3,
  auth: {
    user: "ansarkhanmehmood@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

// ===== OTP STORE (In-Memory) =====
const otpStore = new Map(); // { email: { otp, expiresAt } }

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Save OTP with expiry (5 minutes)
const saveOTP = (email, otp) => {
  const existing = otpStore.get(email);

  // 🚫 If blocked (3 attempts exceeded)
  if (existing?.blockedUntil && Date.now() < existing.blockedUntil) {
    return { blocked: true };
  }

  // Prevent spam (30 sec cooldown)
  if (existing && Date.now() < existing.cooldown) {
    return { cooldown: true };
  }

  const expiresAt = Date.now() + 5 * 60 * 1000;
  const cooldown = Date.now() + 30 * 1000;

  otpStore.set(email, {
    otp,
    expiresAt,
    cooldown,
    attempts: 0, // ✅ NEW
    blockedUntil: null, // ✅ NEW
  });

  return { success: true };
};
//_______________________________________________________________________

// Verify OTP
const verifyOTP = (email, otp) => {
  const record = otpStore.get(email);
  if (!record) return { valid: false, reason: "no_record" };

  // 🚫 Block check
  if (record.blockedUntil && Date.now() < record.blockedUntil) {
    return { valid: false, reason: "blocked" };
  }

  // ⏳ Expired
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return { valid: false, reason: "expired" };
  }

  // ❌ Wrong OTP
  if (record.otp !== Number(otp)) {
    record.attempts += 1;

    // 🚫 Lock after 3 attempts
    if (record.attempts >= 3) {
      record.blockedUntil = Date.now() + 3 * 60 * 60 * 1000; // 3 hours

      return { valid: false, reason: "max_attempts" };
    }

    return {
      valid: false,
      reason: "wrong",
      attemptsLeft: 3 - record.attempts,
    };
  }

  // ✅ Correct OTP
  otpStore.delete(email); // one-time use
  return { valid: true };
};
//____________________________________________________________________

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;
    //__1 All Empty Fields Validation in fronend validation is used at once lile(!name || !email || !msg) but here specific as well as all fileds
    if (!name && !email && !msg) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide all fields" });
    }
    //__ Specific Empty Field Validation Logic
    if (!name)
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });

    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });

    if (!msg)
      return res
        .status(400)
        .send({ success: false, message: "Message cannot be empty" });

    //__________________ 2. The "4 layers-Lock" Email Format Validation____________
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    // --- Regex Added Here ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isRegexValid = emailRegex.test(email);

    // Check 1: RFC Syntax (email-validator)
    // Check 2: Top-Level Domain existence (contains a dot and valid extension)
    const hasRealTLD =
      email.includes(".") && email.split(".").pop().length >= 2;

    // Check 3: Domain Whitelist
    const isAllowed = allowedDomains.includes(domain);

    if (
      !validator.validate(email) ||
      !hasRealTLD ||
      !isAllowed ||
      !isRegexValid
    ) {
      return res.status(400).send({
        success: false,
        message:
          "Please use a valid personal email (Gmail, Yahoo, Outlook, or iCloud)",
      });
    }
    // Check 4:__OTP__
    const { otp } = req.body;
    // If OTP not provided → send OTP first
    if (!otp) {
      const generatedOTP = generateOTP();
      const saved = saveOTP(email, generatedOTP);
      if (saved.blocked) {
        return res.status(403).send({
          success: false,
          message:
            "You are blocked for 3 hours due to multiple failed attempts.",
        });
      }

      if (saved.cooldown) {
        return res.status(429).send({
          success: false,
          message: "Please wait before requesting another OTP",
        });
      }
      await transporter.sendMail({
        from: '"Ansar Mehmood" <ansarkhanmehmood@gmail.com>',
        to: email,
        subject: "Your OTP Code",
        html: `<h3>Your OTP is: ${generatedOTP}</h3><p>Valid for 5 minutes</p>
        <p style="color:gray;font-size:12px;">
          If you didn’t request this, ignore this email.
        </p>`,
      });
      return res.status(200).send({
        success: true,
        otpSent: true,
        message: "OTP sent to your email. Please verify.",
      });
    }
    //____________Verify OTP______________
    const result = verifyOTP(email, otp);
    if (!result.valid) {
      if (result.reason === "blocked") {
        return res.status(403).send({
          success: false,
          message: "Too many attempts. Try again after 3 hours.",
        });
      }
      if (result.reason === "max_attempts") {
        return res.status(403).send({
          success: false,
          message: "Too many failed attempts. You are blocked for 3 hours.",
        });
      }
      if (result.reason === "wrong") {
        return res.status(400).send({
          success: false,
          message: `Invalid OTP. ${result.attemptsLeft} attempts left.`,
        });
      }
      if (result.reason === "expired") {
        return res.status(400).send({
          success: false,
          message: "OTP expired. Please request a new one.",
        });
      }
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }
    // ______________________________________________________________

    const mailToAdmin = {
      from: `"${name}" <ansarkhanmehmood@gmail.com>`, // Use your own email as 'from' for better deliverability
      replyTo: email, // This lets you reply directly to the visitor
      to: "ansarkhanmehmood@gmail.com",
      subject: `Portfolio: Message from ${name}`,
      html: `<h3>Detail Information</h3><ul><li>Name: ${name}</li><li>Email: ${email}</li><li>Message: ${msg}</li></ul>`,
    };

    const mailToVisitor = {
      from: '"Ansar Mehmood" <ansarkhanmehmood@gmail.com>',
      to: email,
      subject: "Thank You for Contacting Me!",
      html: `<p>Dear ${name},</p>
      <p>I've received your message and will get back to you soon.</p>
      <p>Here is a copy of your message:</p>
      <blockquote>${msg}</blockquote>
      <p>Best regards,<br>AnsarTech</p>`,
    };

    // 4. Fire-and-Forget (The Speed Fix)
    // Don't make the user wait for the visitor's auto-reply to finish!
    transporter
      .sendMail(mailToAdmin)
      .then(() => transporter.sendMail(mailToVisitor))
      .catch((err) => console.log("Background email error:", err));

    // Return success immediately after admin mail is queued
    return res.status(200).send({
      success: true,
      message:
        "Your Message Sent Successfully! Check Your Inbox For Confirmation Email.",
    });
  } catch (error) {
    // console.log(error);
    console.log("Email Error:", error.message);
    return res.status(500).send({
      success: false,
      message: "Server busy, please try again in a moment.",
    });
  }
};
//_____________________________________________________________

const resendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    const generatedOTP = generateOTP();
    const saved = saveOTP(email, generatedOTP);

    if (saved.blocked) {
      return res.status(403).send({
        success: false,
        message: "You are blocked for 3 hours due to multiple failed attempts.",
      });
    }

    if (saved.cooldown) {
      return res.status(429).send({
        success: false,
        message: "Please wait before requesting another OTP",
      });
    }

    await transporter.sendMail({
      from: '"Ansar Mehmood" <ansarkhanmehmood@gmail.com>',
      to: email,
      subject: "Resent OTP Code",
      html: `<h3>Your new OTP is: ${generatedOTP}</h3>`,
    });

    return res.send({ success: true, message: "OTP resent" });
  } catch (err) {
    return res.status(500).send({ success: false });
  }
};
module.exports = { sendEmailController, resendOtpController };
// __________________________________________________________________

// 1. Nodemailer (The "Pure" Backend Way)This is what you just implemented. It is a library, not a service.How it works: It uses your backend server (Node.js) to connect directly to an email provider's SMTP server (like Gmail).Pros: You have total control over the email logic, and it is completely free if you use your own Gmail account.Cons: If you send too many emails, Gmail might flag you as spam. It is best for small personal portfolios or contact forms.Best for: Developers who want to keep all logic in their Express/Node.js backend.

// 2. MailerSend (The Professional API Way)This is a "Transactional Email Service" designed for businesses.How it works: Instead of a direct SMTP connection, you send a JSON request to their professional API.Pros: High "deliverability" (meaning emails rarely go to the spam folder). It provides deep analytics, like tracking if the user opened your email.Cons: It strictly requires a verified custom domain to prevent spam. This is why it failed on your vercel.app site—it doesn't trust "free" subdomains.Best for: Production-level E-commerce platforms  where you need to send thousands of invoices or password resets reliably.

// 3. EmailJS (The "No-Backend" Way)This is a specialized service for frontend-only developers.How it works: It allows you to send emails directly from your React code without having a backend at all.Pros: Very easy to set up for portfolios. You don't need to write any Node.js code, and you don't need a custom domain.Cons: Exposes your service IDs in the frontend code (unless you're careful), and the free tier has lower monthly limits compared to other services.Best for: Quick Portfolio sites  or static landing pages where you don't want to maintain a backend server.

// __________________Email Tripple Lock Validation___________________
// Is it a Good and Standard Check?
// What we have built for our portfolio is Extremely High Standard. In fact, it is stricter than what many professional websites use.
//Here is why our "Triple-Lock" system is professional:

// Bulletproof Backend Controller.
// I have combined the RFC validation, the Top-Level Domain (TLD) check, and your specific allowed domains list into one solid "Security Wall."

// The RFC Check (email-validator): This is the worldwide technical standard. It ensures the email follows the official rules of the internet.

// The Regex Check: This acts as a visual format guard. It ensures the email looks like a real address (something@something.something).

// The TLD Check: This is your Spam Filter. It blocks "local" fake addresses like ansar@123 which have no global routing.

// The Whitelist (allowedDomains): This is the Ultimate Guard. It ensures you only deal with reputable, high-trust providers.
