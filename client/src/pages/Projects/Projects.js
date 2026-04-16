import React from "react";
import "./Projects.css";
import Rotate from "react-reveal/Rotate";
import Spin from "react-reveal/Spin";
const Projects = () => {
  return (
    <>
      <div className="continer project" id="projects">
        <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
          TOP RECENT PROJECTS
        </h2>
        <hr />
        <p className="pb-3 text-center">
          As a passionate developer, I am continually honing my skills
          in full-stack development, working with technologies such as React,
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
          <Rotate right duration={800}>
            <div className="col-md-4">
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
                    Full-stack MERN app with authentication, admin dashboard, and order management system.
                    </p>
                  </div>
                  <a className="ad-btn" href="">
                    {/* View */}
                    Live Demo
                  </a>
                  <a className="ad-btn" href="">
                    Github
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded">
                <div className="card-image">
                  <span className="card-notify-badge">Mern Stack</span>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR356D-1YtSagN4-_ZdjZ5H9o6PKUO4h12dvw&usqp=CAU"
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
                    Full-stack MERN app with authentication, admin dashboard, and order management system.
                    </p>
                  </div>
                  <a className="ad-btn" href="">
                    {/* View */}
                    Live Demo
                  </a>
                  <a className="ad-btn" href="">
                    Github
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded">
                <div className="card-image">
                  <span className="card-notify-badge">Mern Stack</span>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR356D-1YtSagN4-_ZdjZ5H9o6PKUO4h12dvw&usqp=CAU"
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
                    Full-stack MERN app with authentication, admin dashboard, and order management system.
                    </p>
                  </div>
                  <a className="ad-btn" href="">
                    {/* View */}
                    Live Demo
                  </a>
                  <a className="ad-btn" href="">
                    Github
                  </a>
                </div>
              </div>
            </div>
          {/* </Spin> */}
          </Rotate>
        </div>
      </div>
    </>
  );
};

export default Projects;
