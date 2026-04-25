import React from "react";
import "./Projects.css";
import { motion } from "framer-motion";
import profile from "../../assets/images/portfolioo.jpeg";
import chatProfile from "../../assets/images/chat.avif";
// import Spin from "react-reveal/Spin";
const Projects = () => {
  return (
    <>
      <div className="continer project" id="projects">
        <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
          TOP RECENT PROJECTS
        </h2>
        <hr />
        <p className="pb-3 text-center">
          As a passionate developer, I am continually honing my skills in
          full-stack development, working with technologies such as React,
          Node.js, Express, and MongoDB. These projects demonstrate my growing
          expertise in building web and mobile applications, with a focus on
          creating responsive, user-friendly designs. Each project showcases my
          ability to work with both front-end and back-end technologies, apply
          modern development practices, and collaborate effectively. While I am
          still learning, I am committed to advancing my knowledge and bringing
          new ideas to life through coding.
        </p>
        {/* card design */}
        <div className="row" id="ads">
          {/* <Spin> */}
          <motion.div
            className="col-12 col-sm-6 col-md-4 mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="card rounded">
              <div className="card-image">
                <span className="card-notify-badge">Mern stack</span>
                <img
                  src="https://unctad.org/sites/default/files/2021-03/2021-03-15_eCommerceCOVID19report-1-1220x675px.jpg"
                  alt="project1"
                />
              </div>
              <div className="card-image-overly m-auto mt-3">
                <span className="card-detail-badge">Node</span>
                <span className="card-detail-badge">Express</span>
                <span className="card-detail-badge">react</span>
                <span className="card-detail-badge">Mongodb</span>
              </div>
              <div className="card-body text-center">
                <div className="ad-title m-auto">
                  <h5 className="text-uppercase">E-commerce Website</h5>
                  <p>
                    Full-stack MERN app with secure JWT authentication, admin dashboard, order management with real-time status updates. Enhanced user experience with dynamic category-based and price-range searching/filtering.
                  </p>
                </div>
                <a className="ad-btn" href="#contact">
                  {/* View */}
                  Live Demo
                </a>
                <a className="ad-btn" href="#contact">
                  Github
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="col-12 col-sm-6 col-md-4 mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="card rounded">
              <div className="card-image porfolio-img">
                <span className="card-notify-badge">Mern Stack</span>
                <img
                  src={profile}
                  alt="project2"
                />
              </div>
              <div className="card-image-overly m-auto mt-3">
                <span className="card-detail-badge">React</span>
                <span className="card-detail-badge">Node</span>
                <span className="card-detail-badge">Express</span>
                <span className="card-detail-badge">API's</span>
              </div>
              <div className="card-body text-center">
                <div className="ad-title m-auto">
                  <h5 className="text-uppercase">PERSONAL PORTFOLIO</h5>
                  <p>
                  Full-stack MERN portfolio featuring a Serverless Node.js backend for real-time contact and email via NodeMailer notifications, engineered with a pixel-perfect, fully responsive design for seamless display on all devices.
                  </p>
                </div>
                <a className="ad-btn" href="https://ansar-mern-portfolio.vercel.app/">
                  {/* View */}
                  Live Demo
                </a>
                <a className="ad-btn" href="https://github.com/ansarmehmood-116/production-portfolio-mern-project.git">
                  Github
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="col-12 col-sm-6 col-md-4 mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="card rounded">
              <div className="card-image">
                <span className="card-notify-badge">Mern Stack</span>
                <img
                  src={chatProfile}
                  alt="project1"
                />
              </div>
              <div className="card-image-overly m-auto mt-3">
                <span className="card-detail-badge">react</span>
                <span className="card-detail-badge">Node</span>
                <span className="card-detail-badge">Express</span>

                <span className="card-detail-badge">Mongodb</span>
              </div>
              <div className="card-body text-center">
                <div className="ad-title m-auto">
                  <h5 className="text-uppercase">Chatting-Application</h5>
                  <p>
                  Real-time MERN chatting app featuring secure user authentication and instant messaging powered by Socket.io.Dynamic user interface with real-time active status and message history management using MongoDB.
                  </p>
                </div>
                <a className="ad-btn" href="#contact">
                  {/* View */}
                  Live Demo
                </a>
                <a className="ad-btn" href="#contact">
                  Github
                </a>
              </div>
            </div>
          </motion.div>
          {/* </Spin> */}
        </div>
      </div>
    </>
  );
};

export default Projects;
