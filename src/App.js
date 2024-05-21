import React from "react";
import { RecoilRoot } from "recoil";
import Fix from "./pages/Fix";
import Mainpage from "./pages/Mainpage";
import Form from "./pages/Form";
import Hobbyform from "./pages/Hobbyform";
import Match from "./pages/Match";
import Matchresult from "./pages/Matchresult";
import Checkresult from "./pages/Checkresult";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Loading from "./pages/Loading";
import Guide from "./pages/Guide";
import CodeReader from "./pages/CodeReader";
import ProfileBuilder from "./pages/ProfileBuilder";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import QRGenerator from "./pages/QRGenerator";
import Redirection from "./pages/RedirectionPage";
import OpenExternalBrowser from "./OpenExternalBrowser";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Fix />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Hobby" element={<Hobbyform />} />
            <Route path="/Guide" element={<Guide />} />
            <Route path="/Matchresult" element={<Matchresult />} />
            <Route path="/Match" element={<Match />} />
            <Route path="/Checkresult" element={<Checkresult />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/Loading" element={<Loading />} />
            <Route path="/CodeReader" element={<CodeReader />} />
            <Route path="/QRGenerator" element={<QRGenerator />} />
            <Route path="/ProfileBuilder" element={<ProfileBuilder />} />
            <Route path="/redirection" element={<Redirection />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
