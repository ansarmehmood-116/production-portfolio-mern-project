import React from "react";
import "./Services.css";
import { motion } from "framer-motion";
import profile from "../../assets/images/Service1.png";

const Services = () => {
  return (
    <>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
        viewport={{ once: true }}
      >
        <div className="service-container" id="service">
          <h2 className=" text-uppercase">What I Can Do</h2>
          <hr />
          <div className="skillservice">
            <div className="service-content">
              <ul>
                <li>Build full-stack MERN applications</li>
                <li>Create full responsive UI with React</li>
                <li>Create animated UI using react, tailwind, bootsrap</li>
                <li>Develop REST APIs with Node.js</li>
                <li>Fix bugs and optimize performance</li>
              </ul>
            </div>
            <div className="service-image">
              <img src={profile} alt="Software Engineer" className="sr-image"/>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Services;
