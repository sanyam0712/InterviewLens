import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutUs from "./pages/AboutUs/AboutUs";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import InterviewPage from "./pages/InterviewPage/InterviewPage";
import Result from "./pages/Result/Result.jsx";
import Login from "./pages/Login/Login.jsx";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    < >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/interview" element={isLoggedIn?<InterviewPage />:<Login/>} />
          <Route path="/result" element={isLoggedIn?<Result />:<Login/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  );
}

export default App;
