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
  // the state names should be exactly same with backend controller variables i.e name,email,msg otherwise it will not work and we have to make alias for that.

  //handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !msg) {
        toast.error("PLease Provide all fields");
      }
      const res = await axios.post("/api/v1/portfolio/sendEmail", {
        name,
        email,
        msg,
      });
      //validation success
      if (res.data.success) {
        toast.success(res.data.message);
        setname("");
        setEmail("");
        setMsg("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    <div className="row px-3">
                      <button className="button" onClick={handleSubmit}>
                        SEND MESSAGE
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
