import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    major: "",
    contact: "phone",
    contact_id: "",
    gender: "Male",
    age: "",
    mbti: "",
    hobby: [],
    contact_frequency: "",
    song: "",
    comment: "",
    isLoggedIn: true,
  },
});

export const selectedMBTIState = atom({
  key: "selectedMBTIState",
  default: {
    EI: "",
    SN: "",
    TF: "",
    PJ: "",
  },
});

export const MatchPickState = atom({
  key: "MatchPickState",
  default: {
    selectedMBTI: ["X", "X", "X", "X"],
    selectedCategory: [],
    point: 500,
    formData: {
      contactRate: "",
      age: "",
      mbti: "",
      samemajor: false,
      hobby: [],
    },
  },
});

export const MatchResultState = atom({
  key: "MatchResultState",
  default: {
    generatedMajor: null,
    generatedAge: null,
    generatedHobby: [],
    generatedMbti: null,
    generatedSong: null,
    generatedContact_Frequency: null,
    generatedContact: null,
    generatedContact_Id: null,
  },
});

export const generatedDataState = atom({
  key: "generatedDataState",
  default: [],
});
