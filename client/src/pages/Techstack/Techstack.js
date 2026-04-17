import React from "react";
import "./Techstack.css";
import { motion } from "framer-motion";
import { TechstackList } from "../../utils/TechstackList";
const Techstack = () => {
  return (
    <>
      <div className="container techstack" id="techstack">
        <motion.div
        // alternate of RubberBand in react-reveal
        initial={{ scale: 0.8 }}
        whileInView={{ scale: [1, 1.2, 0.9, 1.05, 1] }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        >
          <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
            Technologies Stack
          </h2>
          <hr />
          <p className="pb-3 text-center techparagraph">
            👉 including programming Languages, frameworks, databses, front-end
            and back-end tools, and APIs
            {/* press "window button + ." so icons will appear we have used hand icon*/}
          </p>
        </motion.div>
        <div className="row">
          {TechstackList.map((tech) => (

            //alternate of <Fade left> in react-reveal
            <motion.div
              key={tech._id}
              className="col-md-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card m-2">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex justify-content-center">
                      <div className="alig-self-center">
                        <tech.icon className="tech-icon" />
                        {/* these are the icons that we have used in TechstackList in utils
                          folder we have called through loop dynamically if we want to set
                          image instead of icons then we will use image tag instead of tech.icons */}
                      </div>
                      <div className="media-body">
                        <h5>{tech.name}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Techstack;
