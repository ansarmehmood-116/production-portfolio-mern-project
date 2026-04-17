import React from "react";
import "./About.css";
import { motion } from "framer-motion";
import profile from "../../assets/images/AnsarPro.png";

const About = () => {
  return (
    <>
      <motion.div
        //very nice jump animation 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
        viewport={{ once: true }}
      >
        <div className="about" id="about">
          <div className="about-container">
            <div className="about-text">
              <h2 className>About Me</h2>
              <ul>
                <li>
                  Graduated Software Engineer and aspiring Full Stack Developer
                </li>
                <li>
                  1.5+ years hands-on experience with MERN stack (React,
                  Node.js, Express, MongoDB)
                </li>
                <li>
                  Skilled in building responsive and scalable web applications
                </li>
                <li>Experienced in both front-end and back-end development</li>
                <li>
                  Currently developing real-world projects including e-commerce
                  platforms
                </li>
                <li>
                  Passionate about problem-solving and continuous learning
                </li>
                <li>
                  Actively improving skills and staying updated with modern web
                  technologies
                </li>
                <li>
                  Focused on building impactful applications that solve
                  real-world problems
                </li>
              </ul>
            </div>
            <div className="about-image">
              <img src={profile} alt="Ansar" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default About;
