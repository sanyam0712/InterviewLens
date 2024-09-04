import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutUs from "./pages/AboutUs/AboutUs";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import InterviewPage from "./pages/InterviewPage/InterviewPage";

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  );
}

export default App;
