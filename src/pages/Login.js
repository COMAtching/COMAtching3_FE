import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import axios from "axios";
import MyInput from "../components/MyInput";
import ComatHeader from "../components/ComatHeader";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(userState);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    console.log(formData);
  });
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postdata = {
        userEmail: formData.userEmail,
        userPw: formData.userPw,
      };
      const response = await axios.post("https://onesons.site/login", postdata);

      const { isSuccess, message } = response.data;
      // const { token, isSuccess, message } = response.data;

      if (isSuccess === true) {
        // localStorage.setItem("jwtToken", token);
        // document.cookie = `jwtToken=${token}; path=/;`;
        // -----------------------------------------------------------------
        // // 서버 응답에서 쿠키 추출
        // const cookies = response.headers["set-cookie"];

        // // 쿠키 저장
        // cookies.forEach((cookie) => {
        //   document.cookie = cookie;
        // });
        setFormData((prevFormData) => ({
          ...prevFormData,
          gender: response.gender,
          phone: response.phone,
          depart: response.depart,
          song: response.song,
          mbti: response.mbti,
          userEmail: response.userEmail,
          userPw: response.userPw,
          year: response.year,
          isLoggedIn: true,
        }));
        navigate("/");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <ComatHeader destination="/" buttonText="처음으로" />
        <div className="content">
          <div className="inner-content">
            <div className="title">
              <div className="title-text">Login</div>
              <div className="title-inst-txt">
                가입하신 이메일과 비밀번호를
                <br />
                입력해 주세요.
              </div>
            </div>
            <div className="user-email">
              <label>
                이메일
                <div className="email-input">
                  <MyInput
                    name="user-email"
                    value={formData.email}
                    placeholder="example@gmail.com"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </label>
            </div>
            <div className="user-passwd">
              <label>
                비밀번호e
                <div className="password-input">
                  <MyInput
                    name="user-passwd"
                    value={formData.passwd}
                    placeholder="비밀번호를 입력해주세요"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) =>
                      setFormData({ ...formData, passwd: e.target.value })
                    }
                  />
                  <div
                    className="password-toggle"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
              </label>
            </div>
            <button class="login-button">
              <span>로그인</span>
            </button>
            <div class="line-identifier"></div>
            <div className="register">
              <div className="reg-recommend">
                <div className="rec-text-title">아직 회원이 아니신가요?</div>
                <p className="rec-text-inst">
                  가입하시고 코매칭의 모든 서비스를 경험하세요!
                </p>
              </div>
              <div
                className="register-button"
                onClick={() => navigate("/Register")}
              >
                <span>회원가입</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
