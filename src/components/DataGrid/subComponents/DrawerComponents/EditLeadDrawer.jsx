import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { DrawerContext } from "../../../Drawer/context/DrawerProvider";
import "./style/editLeadDrawer.css";
import MultiSelectDropDown from "./EditSubComponent/MultiSelectDropDown";
import Tooltip from "../../../ToolTip/Tooltip";
import LeadCommentHistory from "./EditSubComponent/LeadCommentHistory";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import useLocalEditData from "../../hooks/useLocalEditData";
import { updateLead } from "../../../../redux/features/lead/leadSlice";
const EditLeadDrawer = () => {
  const { setWidth: setDrawerWidth, extraData } = useContext(DrawerContext);
  const { myData, lead, events } = useSelector((state) => state);
  const [leadInfo, setLeadInfo] = useLocalEditData();
  const [callStatusFields] = useState([
    "done",
    "busy",
    "no answer",
    "blacklist",
  ]);
  // Followup Date
  const [userProfileOption] = useState([
    "Computer",
    "Beganer",
    "Student",
    "CSC",
    "Diploma",
    "Job Holder",
    "Unemployed",
    "Forain",
  ]);

  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    setDrawerWidth("60%");
  }, [setDrawerWidth]);
  // All Handler Goes here
  let savedLead = { ...lead.filter((item) => item.id === extraData)[0] };
  let dirftLead = { ...leadInfo };
  // Call Status Handler
  const handleCallStatus = (event) => {
    const leadCopy = { ...savedLead };
    let history = [...leadCopy.history];
    history.push({
      id: "",
      agent: {
        id: myData.id,
        name: `${myData.firstName !== undefined ? myData.firstName : ""} ${
          myData.lastName !== undefined ? myData.lastName : ""
        }`,
      },
      callTime: Date.now(),
      callStatus: event.target.value,
    });
    leadCopy.history = history;
    setLeadInfo(leadCopy);
  };
  // Comment Handler
  const handleComment = (event) => {
    if (savedLead.history.length < dirftLead.history.length) {
      let differedLeadCopy = { ...dirftLead };
      let history = [...dirftLead.history];
      history[history.length - 1] = {
        ...history[history.length - 1],
        comments: event.target.value,
      };
      differedLeadCopy.history = history;
      setLeadInfo(differedLeadCopy);
    } else {
      toast.error("Please give call status first");
      event.target.value = "";
    }
  };
  /**
   * This function for handle User profile Daata
   * @param {*} params
   */
  const handleAccesories = (params) => {
    const leadCopy = { ...leadInfo };
    leadCopy.accesories = params;
    setLeadInfo(leadCopy);
  };

  // Interest Handler
  const handleInterest = (params) => {
    const leadCopy = { ...leadInfo };
    leadCopy.interest = params;
    setLeadInfo(leadCopy);
  };
  // Lead Skill Handler
  const handleLeadSkill = (params) => {
    const leadCopy = { ...leadInfo };
    leadCopy.skillStatus = params;
    setLeadInfo(leadCopy);
  };

  const handleFollowUp = (event) => {
    const leadCopy = { ...leadInfo };
    leadCopy.followUpStatus = {
      callTime: new Date(event).getTime(),
      agent: {
        name: `${myData?.firstName} ${myData?.lastName}`,
        id: myData.id,
      },
      isCalled: false,
    };
    setLeadInfo(leadCopy);
  };

  // Handle Data Save
  const handleUpdate = () => {
    dispatch(updateLead({ id: leadInfo.id, data: leadInfo }));
  };

  return (
    <div style={{ padding: "10px" }}>
      <div className="row">
        <div className="col-12">
          <h5>{`${leadInfo.name} | ${leadInfo.phone.join(" , ")} | ${new Date(
            leadInfo.leadStatus[leadInfo.leadStatus.length - 1].leadAt
          ).toLocaleString("en", {
            dateStyle: "medium",
            timeStyle: "medium",
          })} | ${leadInfo.leadStatus
            .map((item) => item.leadFrom)
            .join(" , ")}`}</h5>
        </div>
      </div>
      <hr />
      <div className="row mb-5">
        <div className="col-7">
          <div className="row">
            <div className="col-3">
              <b>Call Status</b>
            </div>
            <div className="col-9">
              <select
                onChange={(event) => handleCallStatus(event)}
                className="form-control form-control-sm"
              >
                <option disabled value="default">
                  Select One
                </option>
                {callStatusFields.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>User Profile</b>
            </div>
            <div className="col-9">
              <MultiSelectDropDown
                handleValue={handleAccesories}
                menual={false}
                disabled={true}
                limit={7}
                lead={leadInfo}
                isArray={true}
                options={[...userProfileOption]}
                defaultValue={leadInfo.accesories}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>Interest</b>
            </div>
            <div className="col-9">
              <MultiSelectDropDown
                handleValue={handleInterest}
                menual={false}
                disabled={true}
                limit={3}
                lead={leadInfo}
                options={false}
                defaultValue={leadInfo.interest}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>Lead Skill</b>
            </div>
            <div className="col-9">
              <MultiSelectDropDown
                handleValue={handleLeadSkill}
                menual={true}
                disabled={true}
                limit={8}
                lead={leadInfo}
                options={false}
                defaultValue={leadInfo.skillStatus}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <b>Follow Up </b>
              <Tooltip message="Select Date for specific Date Or Select form event for specific event!">
                ?
              </Tooltip>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col">
                  <DatePicker
                    className="form-control form-control-sm"
                    selected={
                      leadInfo?.followUpStatus?.callTime
                        ? leadInfo?.followUpStatus?.callTime
                        : Date.now()
                    }
                    onChange={(date) => handleFollowUp(date)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Input FollowUp Date Time"
                    timeInputLabel="Time"
                    showTimeInput
                  />
                </div>
                <div className="col">
                  <select
                    defaultValue={"default"}
                    className="form-control form-control-sm"
                  >
                    <option disabled value="default">
                      Select Event
                    </option>
                    {events.map((item, index) => (
                      <option
                        key={"eventOptions" + index}
                        value={item.startDate}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
            className="comment_control_wrapper"
          >
            <textarea
              onChange={(event) => handleComment(event)}
              style={{ flexGrow: "1" }}
              className="form-control form-control-sm"
              placeholder="Your Openion !"
              value={
                savedLead?.history?.length === dirftLead?.history?.length
                  ? ""
                  : dirftLead?.history[dirftLead?.history?.length - 1]?.comments
              }
            ></textarea>
            <button
              onClick={handleUpdate}
              className="btn btn-success mt-2 w-100"
            >
              Update Data
            </button>
          </div>
        </div>
      </div>
      {/* Previous History */}
      <LeadCommentHistory history={leadInfo.history} />
    </div>
  );
};

export default EditLeadDrawer;
