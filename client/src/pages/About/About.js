import React from "react";
import "./About.css";
import Jump from "react-reveal/Jump";
import profile from "../../assets/images/AnsarPro.png";

const About = () => {
  return (
    <>
      <Jump>
        {/* very nice jump animation */}
        <div className="about" id="about">
          {/* <div className="row">
            <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-content">
            <h1>About me</h1>
              <p>
                Hi, I'm Ansar, a passionate beginner developer with a growing
                interest in web development. I'm skilled in working with modern
                technologies like React, Node.js, Express, and MongoDB. I enjoy
                learning about both front-end and back-end development, allowing
                me to build full-stack applications from scratch. Currently, I'm
                focused on enhancing my skills by working on exciting projects
                like e-commerce platforms and other Web applications. <br /><br />
                My journey as a developer is just beginning, but I'm constantly
                pushing myself to learn more and stay updated with the latest
                trends in the tech industry. I love problem-solving, and the
                challenge of coding motivates me to keep improving. I'm excited
                to continue this journey and contribute to impactful projects
                that solve real-world problems.
              </p>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-img">
              <img
                src={profile}
              //  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
                alt="profile_pic"
              />
            </div>
          </div> */}
          <div className="about-container">
            <div className="about-text">
              <h2 className>About Me</h2>
              <ul>
                <li>
                  Graduated Software Engineer and aspiring Full
                  Stack Developer
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
      </Jump>
    </>
  );
};

export default About;
