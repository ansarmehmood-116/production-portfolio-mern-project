import { useState, React } from "react";
import { useTheme } from "../../context/ThemeContext";
import Typewriter from "typewriter-effect"; //see frontend Notes for details
import Resume from "../../assets/docs/Ansar_Resume.pdf";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"; //bs means inside react-icons bs folder
import "./home.css";
import { motion } from "framer-motion";
import profile from "../../assets/images/a1.png";

const Home = () => {
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useTheme(); //now simply use in App.js it will work on all components
  //handle theme
  const handleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };
  return (
    <>
      <div className="container-fluid home-container" id="home">
        <div className="theme-btn" onClick={handleTheme}>
          {theme === "light" ? (
            <BsFillMoonStarsFill size={30} />
          ) : (
            <BsFillSunFill size={30} color="yellow" />
          )}
        </div>
        {/* press "window button + ." so icons will appear we have used hand icon*/}
        <div className="container home-content">
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1>Hi 👋 I'm Ansar</h1>
            <h2>
              <Typewriter
                options={{
                  strings: [
                    "FullStack Developer!",
                    "Mern Stack Developer!",
                    "React JS Developer!",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <p>
              I build scalable modern web applications using React & Node.js!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="home-buttons">
              <a
                className="btn btn-hire"
                href="https://api.whatsapp.com/send?phone=03170683852"
                rel="noreferrer"
                target="_blank"
              >
                Hire Me
              </a>
              <a
                className="btn btn-cv"
                href={Resume}
                download="Ansar_Resume.pdf"
              >
                My Resume
              </a>
            </div>
          </motion.div>

          {/* ___________________________________________________________ */}
          {/* 🔥 Overlay (put here) */}
          {active && (
            <div className="overlay" onClick={() => setActive(false)} />
          )}
          <div className={`dropdown-hover ${active ? "active" : ""}`}>
            <div className="hero-pic" >
              <span className="borderLine"></span>
              {/* <div className="img-container"> */}
                <img
                  src={profile}
                  alt="profile pic"
                  onClick={() => setActive(!active)}
                />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
