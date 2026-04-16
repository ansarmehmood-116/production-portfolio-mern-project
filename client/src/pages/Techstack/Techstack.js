import React from "react";
import "./Techstack.css";
import RubberBand from "react-reveal/RubberBand";
import Fade from "react-reveal/Fade";
import { TechstackList } from "../../utils/TechstackList";
const Techstack = () => {
  return (
    <>
      <div className="container techstack" id="techstack">
        <RubberBand>
          <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
            Technologies Stack
          </h2>
          <hr />
          <p className="pb-3 text-center techparagraph">
            👉 including programming Languages, frameworks, databses, front-end
            and back-end tools, and APIs
          {/* press "window button + ." so icons will appear we have used hand icon*/}
          </p>
        </RubberBand>
        <div className="row">
          {TechstackList.map((tech) => (
            <Fade left>
              <div key={tech._id} className="col-md-3">
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
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </>
  );
};

export default Techstack;