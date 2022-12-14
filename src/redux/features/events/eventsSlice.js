import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "gyjasucjkweisuoiwjhduib",
    title: "Mern Campain",
    startDate: Date.now() + 40561004,
  },
  {
    id: "gyjasucjkweisuoiwjhduib",
    title: "Wordpress Campain",
    startDate: Date.now() + 6465131,
  },
];

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

export default eventSlice.reducer;
