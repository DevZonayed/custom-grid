import React, { useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MultiSelectDropDown from "./EditSubComponent/MultiSelectDropDown";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { DrawerContext } from "../../../Drawer/context/DrawerProvider";

const SendMailDrawer = ({ data }) => {
  const { lead, mailTemp } = useSelector((state) => state);

  const { setWidth } = useContext(DrawerContext);
  const mails = useMemo(() => {
    let mailList = [];
    data.map((item) => mailList.push(...item.email));
    return mailList;
  }, [data]);
  const options = useMemo(() => {
    let optionList = [];
    lead.map((item) => optionList.push(...item.email));
    return optionList;
  }, [lead]);
  // States
  const [leadMails, setLeadMails] = useState([...mails]);
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("");
  const [msgType, setMsgType] = useState("text");
  const [mailSub, setMailSub] = useState("");
  useEffect(() => {
    setWidth("50%");
    return () => {
      setWidth("40%");
    };
  }, [setWidth]);

  const handleLeadMails = (params) => {
    setLeadMails(params);
  };

  const handleMessageSend = () => {
    let text = message;
    let mails = [...leadMails];
    let html = `${template}`;

    // Subject validation
    if (mailSub === "") {
      toast.error("Please input a mail subject");
      return;
    }

    if (msgType === " text") {
      if (text.length <= 15) {
        if (
          window.confirm(
            "Message is too small, Are you sure admin to send this!🥱"
          )
        ) {
          throwMailToAll(mails, text, "text");
          return;
        } else {
          return false;
        }
      }
    } else {
      if (html === "") {
        toast.error("Please Select a Template!");
        return;
      }
      throwMailToAll(mails, html, "html");
      return;
    }
  };

  /**
   *  This handler will help to send lead Mails
   * @param {*} mails // All Selected mails fot Sending Message
   * @param {*} message // Message Text of html
   * @param {html / text} type // Message Text of html
   */
  function throwMailToAll(mails, message, type) {
    // Message Request Goes Here

    toast.success(`Mail Send Successfull To ${mails.length} people 😍`);
    setMessage("");
    setTemplate("");
  }

  return (
    <div style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-body">
          <h5>All Mail Address Goes Here!</h5>
          <MultiSelectDropDown
            handleValue={handleLeadMails}
            menual={true}
            disabled={true}
            limit={10000}
            isArray={true}
            options={options}
            defaultValue={mails}
          />
          <hr />

          <div
            style={{ justifyContent: "center" }}
            className="toggleWrapper d-flex"
          >
            <button
              onClick={() => setMsgType("text")}
              className={`btn btn-success btn-sm mx-1 ${
                msgType === "text" && "active"
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setMsgType("template")}
              className={`btn btn-primary btn-sm mx-1 ${
                msgType === "template" && "active"
              }`}
            >
              Template
            </button>
          </div>

          {/* Text Message Wrapper */}
          {msgType === "text" && (
            <>
              <h5>Mail subject</h5>
              <input
                value={mailSub}
                onChange={(e) => setMailSub(e.target.value)}
                className="form-control form-control-sm"
                placeholder="Enter your Mail Subject"
                type="text"
              />
              <h5>Message Body</h5>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control form-control-sm"
                cols="30"
                rows="10"
                placeholder="Type The Message..."
              ></textarea>
            </>
          )}

          {/* Template Message Type */}
          {msgType === "template" && (
            <>
              <h5>Mail Subject</h5>
              <input
                value={mailSub}
                onChange={(e) => setMailSub(e.target.value)}
                className="form-control form-control-sm"
                placeholder="Enter your Mail Subject"
                type="text"
              />
              <h5>Select a mail template!</h5>
              <select
                onChange={(e) => setTemplate(e.target.value)}
                defaultValue={"default"}
                className="form-control"
              >
                <option disabled value="default">
                  Select A Template
                </option>
                {mailTemp.map((item, index) => (
                  <option key={"mailOption" + index} value={`${item.html}`}>
                    {item.title}
                  </option>
                ))}
              </select>

              <div className="card mt-2">
                <div className="card-body">
                  <h5>Email Preview</h5>
                  <iframe
                    title="Lead mail template preview"
                    style={{ width: "100%", minHeight: "40vh" }}
                    srcDoc={template}
                  ></iframe>
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleMessageSend}
            className="btn btn-success mt-3 w-100"
          >
            Send to all
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMailDrawer;
