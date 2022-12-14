import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/events/eventsSlice";
import leadReducer from "../features/lead/leadSlice";
import subjectReducer from "../features/subjects/subjectSlice";
import myDataReducer from "../features/user/meSlice";
import mailTempReducer from "../features/Email/templateSlice";

export const store = configureStore({
  reducer: {
    myData: myDataReducer,
    lead: leadReducer,
    subjects: subjectReducer,
    events: eventReducer,
    mailTemp: mailTempReducer,
  },
});
