import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "gyjasucjkweisuoiwjhduib",
  firstName: "Zonayed",
  lastName: "Ahamad",
  title: "Developer of SoroBindu",
  email: "zonayed320@gmail.com",
  phone: "01774255512",
  role: "admin",
  avater:
    "https://scontent.fdac22-1.fna.fbcdn.net/v/t39.30808-6/294854306_831973678212271_2825409562765040222_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG-y67sTPrSGQWl3VrDH_0f2VKB23bBLUDZUoHbdsEtQFPXFddQIp90T_3CUcuR22hhh0FxR0Fa82HTAxpTSS7J&_nc_ohc=XK2Nu0r7Nn8AX_FKtIB&_nc_ht=scontent.fdac22-1.fna&oh=00_AfB_ea4ixOb4KsuQPvDwK5p3g8Ta5eyvbh4HOTmanPQ7IQ&oe=6390735D",
  assignCall: [],
};

export const meSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default meSlice.reducer;
