// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/pages/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="content">
        <div className="AdminLogin" onClick={() => navigate("/Admin")}>
          관리자 페이지
        </div>
        <div className="AdminLogin" onClick={() => navigate("/CodeReader")}>
          뽑기페이지
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
