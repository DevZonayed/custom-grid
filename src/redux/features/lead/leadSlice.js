import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLead } from "./action/leadActions";
import axios from "axios";
const initialState = [
  {
    id: "",
    name: "",
    email: [""],
    phone: [""],
    leadStatus: [
      {
        leadFrom: "menual", // It can be facebook page , phone call  , etc
        leadAt: "Fri | Jul 01, 22 | 04:11 AM", // Lead Create Date Time
        leadBy: "Jillur Rahman",
        session: {
          sessionNo: 1,
          sessionId: "",
        },
      },
    ],
    assignStatus: {
      agents: [
        {
          name: "Rasel Sarkar",
          id: "",
          assignDate: "Fri | Jul 01, 22 | 04:11 AM",
          dateLine: "Fri | Jul 10, 22 | 04:11 AM",
        },
      ],
      assignBy: [{ name: "Ridam Paul", id: "" }],
    },
    intarest: [
      {
        subject: "Html",
        progress: 0.59, // It will be percentance
      },
    ],
    skillStatus: [
      {
        subject: "Html",
        progress: 0.3,
      },
    ],
    followUpStatus: {
      callTime: "", // Next Call Date Time
      agent: {
        name: "",
        id: "",
      },
      isCalled: false,
    },
    history: [
      {
        // If session and agent and callTime are same then it will edited otherways add a new history
        id: "",
        agent: {
          name: "Rasel Sarkar",
          id: "",
        },
        callTime: "Fri | Jul 01, 22 | 04:11 AM",
        callStatus: [{ type: "busy", callCount: 2 }],
        comments: "",
      },
    ],
    admitionStatus: {
      isAdmitted: false,
      admittedAt: null,
    },
    entryType: {
      type: "bulk",
      name: "Data From sheet 2022",
      id: "", // Bulk Entry Collection id
    },
  },
];

// Actions
export const updateLead = createAsyncThunk(
  ("lead/updateLead",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  })
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    fatchLead: getLead,
  },
  extraReducers: (builder) => {
    // Update Builders
    builder.addCase(updateLead.pending, (state, payload) => {
      console.log("Pending", payload);
    });
    builder.addCase(updateLead.fulfilled, (state, payload) => {
      console.log("Fulfield", payload);
    });
    builder.addCase(updateLead.rejected, (state, payload) => {
      console.log("Rejected", payload);
    });
  },
});

export const { fatchLead } = leadSlice.actions;
export default leadSlice.reducer;

//===================== All Reducer Logic ==================//

/**
 * This Handler will help to update State
 * @param {State Data} state
 * @param { {payload} } param1
 */
const leadUpdateFulfilled = (state, { payload }) => {
  console.log(payload);
  const index = state.findIndex((item) => item.id === payload.id);
  const stateCopy = [...state];
  stateCopy[index] = payload.data;
  state = stateCopy;
};
