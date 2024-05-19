import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import UserInfoRrev from "../components/UserInfoRrev";
import { userState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import BottomNavButton from "../components/BottomNavButton";
import MyInfoButton from "../components/MyInfoButton";

function MainpageLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(userState);
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState({
    numParticipants: 0,
    leftPoint: 0,
    Pickme: 0,
  });

  const handleToggleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://catholic-mibal.site/user/main",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (
          response.data.code === "SEC-001" ||
          response.data.code === "SEC-002"
        ) {
          localStorage.removeItem("token");
          navigate("/");
        } else if (response.data.status === 200) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            major: response.data.major,
            age: response.data.age,
            contact_id: response.data.contact_id,
            gender: response.data.gender,
            contact_frequency: response.data.contact_frequency,
            mbti: response.data.mbti,
            hobby: response.data.hobby,
            song: response.data.song,
            comment: response.data.comment,
          }));
          setUserInfo((prev) => ({
            ...prev,
            numParticipants: response.data.participations,
            leftPoint: response.data.left_point,
            Pickme: response.data.pick_me,
          }));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  });

  const handleVisitGuide = () => {
    navigate("/guide");
  };
  const handleClickmatch = () => {
    navigate("/QRGenerator");
  };
  const handleVisitcheckresult = () => {
    // navigate("/checkresult");
    alert("5월 22일에 열릴예정입니다!");
  };

  return (
    <div className="container">
      <HeaderNav />
      <div className="Mainpage__Login">
        <UserInfoRrev
          user={formData}
          ifMainpage={true}
          numParticipants={userInfo.numParticipants}
        />
        <div>
          <button
            className="matching-button"
            /*onClick={handleClickmatch}*/ onClick={handleVisitGuide}
          >
            AI 매칭하기 ▶
            <TotalUsersCounter font_size="15px" />
          </button>
        </div>
        <div className="button-group">
          <MyInfoButton
            imgSrc={`assets/point.svg`}
            infoText={`${userInfo.leftPoint}P`}
            buttonText="잔여포인트"
          />
          <MyInfoButton
            imgSrc={`assets/heart.svg`}
            infoText={`${userInfo.Pickme}회`}
            buttonText="나를 뽑을 횟수"
          />
        </div>

        {isClicked ? (
          <div className="charge-request-clicked">
            <div className="charge-request-clicked-top">
              💁 부스에 충전 요청하기
              <button
                className="charge-request-clicked-img"
                type="button"
                // onClick={handleToggleClick}
                onClick={handleVisitGuide}
              >
                <img
                  src={process.env.PUBLIC_URL + `assets/arrowup.svg`}
                  alt="충전요청 닫기"
                />
              </button>
            </div>
            <li className="charge-request-clicked-text">
              요청 후에는 입금 화면과 아이디를 보여 주세요.
            </li>
            <li className="charge-request-clicked-text">
              버튼 남용 시 이용이 제한될 수 있으니 유의 바랍니다.
            </li>
            <button className="charge-request-clicked-button">
              충전 요청하기
            </button>
          </div>
        ) : (
          <div className="charge-request-unclicked">
            💁 부스에 충전 요청하기
            <button
              className="charge-request-unclicked-img"
              type="button"
              onClick={handleToggleClick}
            >
              <img
                src={process.env.PUBLIC_URL + `assets/arrowbottom.svg`}
                alt="충전요청 열기"
              />
            </button>
          </div>
        )}

        <div className="button-group">
          <BottomNavButton
            onClick={handleVisitcheckresult}
            imgSrc={`assets/checkresult.svg`}
            imgText="조회버튼"
            buttonText="조회하기"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc={`assets/guidebook.svg`}
            imgText="가이드북"
            buttonText="가이드북"
          />
        </div>
        <div className="button-group">
          <BottomNavButton
            onClick={handleVisitcheckresult}
            imgSrc={`assets/survey.svg`}
            imgText="설문조사"
            buttonText="설문조사"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc={`assets/logout.svg`}
            imgText="로그아웃"
            buttonText="로그아웃"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainpageLogin;
