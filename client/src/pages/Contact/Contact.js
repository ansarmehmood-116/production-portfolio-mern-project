import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Contact.css";
import { motion } from "framer-motion";
// import LightSpeed from "react-reveal/LightSpeed";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const otpRefs = React.useRef([]);
  const loadingToastId = React.useRef(null);
  // the state names should be exactly same with backend controller variables i.e name,email,msg otherwise it will not work and we have to make alias for that.

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  //handles to press any key input works e.g backspace to remove wrong digit
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("/api/v1/portfolio/resend-otp", { email });
      toast.success("OTP Resent 📩");
      setTimer(30);
      setOtpSubmitted(false);
    } catch (err) {
      toast.error("Try again later");
    }
  };

  //handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 1. Better Frontend Check (Prevents unnecessary API calls) also check
    if (!name || !email || !msg) {
      // if (!name && !email && !msg) {
      return toast.error("Please fill in all fields before sending.");
    }

    try {
      // IF OTP SCREEN NOT SHOWN → SEND OTP
      if (!showOtp) {
        // toast.info("Sending OTP...");
        if (isBlocked) {
          return toast.error(
            "You are blocked for 3 hours due to multiple failed attempts."
          );
        }

        //it still triggers after block state
        // const loadingToast=toast.loading("Verifying email...");

        loadingToastId.current = toast.loading("Verifying email...");
        const res = await axios.post("/api/v1/portfolio/sendEmail", {
          name,
          email,
          msg,
        });

        //it still triggers after block state
        // toast.dismiss(loadingToast);
        toast.dismiss(loadingToastId.current);
        if (res.data.otpSent) {
          setLoading(false);
          toast.success("OTP sent to your email 📩");
          setShowOtp(true);
          setTimer(30);
          setOtpSubmitted(false);
          return;
        }
      }

      // 🛑 STOP empty OTP
      if (showOtp && otp.join("").length !== 6) {
        return toast.error("Please enter valid 6-digit OTP");
      }
      // IF OTP SCREEN SHOWN →  VERIFY OTP ONLY (no resend confusion)
      if (showOtp) {
        const res = await axios.post("/api/v1/portfolio/sendEmail", {
          name,
          email,
          msg,
          otp: otp.join(""),
        });

        // 🔒 STRICT SUCCESS CHECK
        if (res.data.success === true) {
          setLoading(false);
          toast.success("Message Sent Successfully ✅");
          // This is the "Message Sent Successfully" from backend
          setname("");
          setEmail("");
          setMsg("");
          setOtp(["", "", "", "", "", ""]);
          setShowOtp(false);
          setOtpSubmitted(false);
        } else {
          // 🛑 Force error if backend didn't approve
          toast.error(res.data.message || "Invalid OTP");
        }
      }
    } catch (error) {
      // 3. This is where the BACKEND ERROR message lives!

      toast.dismiss(loadingToastId.current);
      setLoading(false);
      
      // We check if the backend sent a specific message (like "Name is required")
      const errorMsg =
        error.response?.data?.message || "Something went wrong. Try again!";

      // 🚫 Detect block
      if (errorMsg.toLowerCase().includes("blocked")) {
        setIsBlocked(true);
      }
      toast.error(errorMsg);
      console.log("Backend Error:", errorMsg);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pasted)) {
      const otpArray = pasted.split("");
      setOtp(otpArray);

      otpRefs.current[5]?.focus();
    }
  };

  React.useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  React.useEffect(() => {
    if (otp.join("").length === 6 && showOtp && !otpSubmitted) {
      setOtpSubmitted(true);
      handleSubmit({ preventDefault: () => {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  React.useEffect(() => {
    if (showOtp) {
      otpRefs.current[0]?.focus();
    }
  }, [showOtp]);

  return (
    <>
      <div className="contact" id="contact">
        <div className="card card0 border-0">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
              <div className="card1">
                <div className="row border-line" style={{ overflow: "hidden" }}>
                  <motion.img
                    initial={{ x: 200, skewX: -30, opacity: 0 }}
                    whileInView={{ x: 0, skewX: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      duration: 0.6,
                    }}
                    src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?w=2000"
                    alt="ocontact"
                    className="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card2 d-flex card border-0 px-4 py-5">
                  <div className="row contact-row">
                    <div className="row">
                      <h6>
                        Contact With
                        <BsLinkedin
                          color="skyblue"
                          size={30}
                          className="ms-2"
                        />
                        <BsGithub
                          color="black"
                          size={30}
                          className="github ms-2"
                        />
                        <BsFacebook
                          color="dodgerblue"
                          size={30}
                          className="ms-2"
                        />
                      </h6>
                    </div>

                    <div className="row px-3 mb-4">
                      <div className="line" />
                      <small className="or text-center">OR</small>
                      <div className="line" />
                    </div>
                    <div className="row px-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        className="mb-3"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="row px-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email Address"
                        className="mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={showOtp}
                        style={{
                          // backgroundColor: showOtp ? "#e9ecef" : "white",
                          cursor: showOtp ? "not-allowed" : "text",
                        }}
                      />
                    </div>
                    <div className="row px-3">
                      <textarea
                        type="text"
                        name="msg"
                        placeholder="Write your message"
                        className="mb-3"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                    </div>
                    {showOtp && (
                      <div className="row px-3 mb-3 text-center">
                        <p>Enter OTP sent to your email</p>

                        <div
                          className="d-flex justify-content-center gap-2 mb-2"
                          onPaste={handlePaste}
                        >
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (otpRefs.current[index] = el)}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(e.target.value, index)
                              }
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              maxLength={1}
                              autoComplete="one-time-code"
                              inputMode="numeric"
                              className="text-center"
                              style={{ width: "40px", fontSize: "20px" }}
                            />
                          ))}
                        </div>

                        <button
                          className="btn btn-link"
                          onClick={handleResendOtp}
                          disabled={timer > 0}
                        >
                          {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                        </button>
                      </div>
                    )}
                    {/* ____________________________________________ */}
                    {isBlocked && (
                      <p
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginBottom: "10px",
                        }}
                      >
                        You are blocked for 3 hours due to multiple failed
                        attempts.
                      </p>
                    )}

                    <div className="row px-3">
                      <button
                        className="button"
                        onClick={handleSubmit}
                        disabled={
                          loading ||
                          isBlocked ||
                          (showOtp && otp.join("").length !== 6)
                        }
                      >
                        {loading
                          ? "Please wait..."
                          : !showOtp
                          ? "SEND MESSAGE"
                          : otp.join("").length === 6
                          ? "SEND MESSAGE"
                          : "VERIFY OTP"}
                        {loading && (
                          <span className="spinner-border spinner-border-sm ms-2"></span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
