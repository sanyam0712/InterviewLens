import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutUs from "./pages/AboutUs/AboutUs";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import InterviewPage from "./pages/InterviewPage/InterviewPage";
import NavBar2 from "./components/NavBar2/NavBar2";
import Navbar from "./components/Navbar/Navbar";
import Result from "./pages/Result/Result.jsx";
import Login from "./pages/Login/Login.jsx";
// import InterviewPage2 from "./pages/InterviewPage/InteviewPage2";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/interview" element={<InterviewPage profileId={1} numQuestions={3} />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  );
}

export default App;
