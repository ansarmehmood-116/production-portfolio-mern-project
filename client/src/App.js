import Layout from "./components/Layout/Layout";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Educations/Education";
import Services from "./pages/Services/Services";
import Projects from "./pages/Projects/Projects";
import Techstack from "./pages/Techstack/Techstack";
import WorkExp from "./pages/workExp/WorkExp";
import ScrollToTop from "react-scroll-to-top"; //from npm js see frontend_Notes.jsx for details
import { useTheme } from "./context/ThemeContext"; //import context
import MobileNav from "./components/MobileNav/MobileNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [theme] = useTheme();
  return (
    <>
      {/* <h1 className="text-success">Welcome to Ansar Portfolio!</h1> */}
      <div id={theme} className="app">
        {/* we have used dynamically theme here in id now set the values in index.css */}
        <ToastContainer />
        <MobileNav />
        <Layout />
        <div className="container">
          <About />
          <Education />
          <Services />
          <Techstack />
          <Projects />
          <WorkExp />
          <Contact />
        </div>
        {/* <div className="footer pb-3 ms-10">
          <h4 className="text-center">Made With 😍 AnsarTec &copy; 2024</h4>
        </div> */}
          <footer className="footer-container">
            <div className="footer-content">
              <p>
                Designed & Built with <span className="heart-beat">❤️</span> by
                <strong> Ansar Mehmood</strong>
              </p>
              <small>&copy; 2026 AnsarTec. All rights reserved.</small>
            </div>
          </footer>
        </div>
      <ScrollToTop
        smooth
        // color="#138781"
        color={theme === "dark" ? "#38BDF8" : "#138781"}
        style={{
          backgroundColor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: "80px",
          zIndex: 1000, // Add this line
        }}
      />
    </>
  );
}

export default App;
