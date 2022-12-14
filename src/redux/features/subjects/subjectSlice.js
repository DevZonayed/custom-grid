import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Wordpress",
    id: "jhsgcjweiafuyhwjhk",
    students: [], // Id Array
    sessions: [], // SessionsArray
    isActive: true,
  },
  {
    name: "Mern",
    id: "sdfhcuyweslkasc",
    students: [], // Id Array
    sessions: [], // SessionsArray
    isActive: true,
  },
  {
    name: "Laravel",
    id: "GHsdchuwifcuyjsdb",
    students: [], // Id Array
    sessions: [], // SessionsArray
    isActive: true,
  },
  {
    name: "English",
    id: "ajyfgcerjhv",
    students: [], // Id Array
    sessions: [], // SessionsArray
    isActive: true,
  },
];

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
});

export default subjectSlice.reducer;
