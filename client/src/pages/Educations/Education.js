import React from "react";
import { MdSchool } from "react-icons/md"; //get from react icons
import {
  VerticalTimeline, //got npm js and install this packg for educational details see
  //frontend-Notes.jsx for details
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Education.css";
import { useTheme } from "../../context/ThemeContext";
const Education = () => {
  const [theme] = useTheme();
  return (
    <>
      <div className=" education" id="education">
        <h2 className="col-12 mb-1 text-center text-uppercase">
          Education Details
        </h2>
        <hr />
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background:theme === "dark" ? "#F8FAFC" : "white", color: "black" }}
            contentArrowStyle={{ borderRight: "7px solid  white" }}
            date="2026 - intake"
            dateClassName="timeline-date"
            iconStyle={{
              background: theme === "dark" ? "#38BDF8" : "#138781",
              color: "#fff"
            }}
            icon={<MdSchool />}
          >
            <h3 className="vertical-timeline-element-title"
            style={{ color: theme === "dark" ? "#38BDF8" : "#138781" }}>MSc Cyber Security</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Frankport University of Science and Technology, Germany
            </h4>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background:theme === "dark" ? "#F8FAFC" : "white", color: "black" }}
            contentArrowStyle={{ borderRight: "7px solid  white" }}
            date="2022 - 2026"
            dateClassName="timeline-date"
            iconStyle={{
              background: theme === "dark" ? "#38BDF8" : "#138781",
              color: "#fff",
            }}
            icon={<MdSchool />}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ color: theme === "dark" ? "#38BDF8" : "#138781" }}
            >
              BSE
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Comsat University Islamabad, Pakistan (CIIT)
            </h4>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

export default Education;
