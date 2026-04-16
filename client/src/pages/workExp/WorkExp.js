import React from "react";
import { SiReact } from "react-icons/si";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./WorkExp.css";
import { useTheme } from "../../context/ThemeContext";
const WorkExp = () => {
  const [theme] = useTheme();
  return (
    <>
      <div className="work" id="work">
        <div className="container work-exp">
          <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
            {/* Work Experience */}
            Development experience
          </h2>
          <hr />

          {/* copied this API from npm js */}
          <VerticalTimeline lineColor="#1e1e2c">
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: theme === "dark" ? "#F8FAFC" : "white",
                color: "#1e1e2c",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  white",
              }}
              date="2025 - present"
              dateClassName="timeline-date"
              iconStyle={{ background: "#1e1e2c", color: "#fff" }}
              icon={<SiReact />}
            >
              <h3
                className="vertical-timeline-element-title project-level"
                style={{ color: theme === "dark" ? "#38BDF8" : "#138781" }}
              >
                Mern Stack Developer (Project-Based)
              </h3>
              {/* <h4 className="vertical-timeline-element-subtitle">
                xyz, pvt ltd
              </h4> */}
              <p>
                Built multiple MERN stack applications including e-commerce and
                real-time chat apps.Focused on API development, authentication,
                and responsive UI.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: theme === "dark" ? "#F8FAFC" : "white",
                color: "#1e1e2c",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  white",
              }}
              date="2023 - 2025"
              dateClassName="timeline-date"
              iconStyle={{ background: "#1e1e2c", color: "#fff" }}
              icon={<SiReact />}
            >
              <h3
                className="vertical-timeline-element-title project-level"
                style={{ color: theme === "dark" ? "#38BDF8" : "#138781" }}
              >
                Full Stack Developer (Project-Based)
              </h3>
              {/* <h4 className="vertical-timeline-element-subtitle">
                xyz, pvt ltd
              </h4> */}
              <p>
                Creative Direction, User Experience, Visual Design
                {/* , ProjectManagement, Team Leading */}
              </p>
            </VerticalTimelineElement>
            {/* <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "white", color: "#1e1e2c" }}
              contentArrowStyle={{
                borderRight: "7px solid  white",
              }}
              date="2018 - 2020"
              dateClassName="timeline-date" 
              iconStyle={{ background: "#1e1e2c", color: "#fff" }}
              icon={<SiReact />}
            >
              <h3 className="vertical-timeline-element-title">
                Full Stack Developer
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                xyz, pvt ltd
              </h4>
              <p>
                Creative Direction, User Experience, Visual Design, Project
                Management, Team Leading
              </p>
            </VerticalTimelineElement> */}
          </VerticalTimeline>
        </div>
      </div>
    </>
  );
};

export default WorkExp;
