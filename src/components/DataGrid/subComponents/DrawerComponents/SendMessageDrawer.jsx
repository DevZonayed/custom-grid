import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MultiSelectDropDown from "./EditSubComponent/MultiSelectDropDown";
import { toast } from "react-toastify";

const SendMessageDrawer = ({ data }) => {
  const { lead } = useSelector((state) => state);
  const numbers = useMemo(() => {
    let contactList = [];
    data.map((item) => contactList.push(...item.phone));
    return contactList;
  }, [data]);
  const options = useMemo(() => {
    let optionList = [];
    lead.map((item) => optionList.push(...item.phone));
    return optionList;
  }, [lead]);
  // States
  // States
  const [leadContact, setLeadContacts] = useState([...numbers]);
  const [message, setMessage] = useState("");
  const handleContactNumber = (params) => {
    setLeadContacts(params);
  };

  const handleMessageSend = () => {
    let text = message;
    let contacts = [...leadContact];

    if (text.length <= 15) {
      if (
        window.confirm(
          "Message is too small, Are you sure admin to send this!🥱"
        )
      ) {
        throwMessageToAll(contacts, text);
        return;
      } else {
        return false;
      }
    }

    throwMessageToAll(contacts, text);
  };

  /**
   *  This handler will help to send lead message
   * @param {*} numbers // All Selected Number fot Sending Message
   * @param {*} message // Message Text
   */
  function throwMessageToAll(numbers, message) {
    // Message Request Goes Here

    toast.success(`Send Successfull To ${numbers.length} people 😍`);
    setMessage("");
  }

  return (
    <div style={{ padding: "10px" }}>
      <div className="card">
        <div className="card-body">
          <h5>All Contact Number Goes Here!</h5>
          <MultiSelectDropDown
            handleValue={handleContactNumber}
            menual={true}
            disabled={true}
            limit={10000}
            isArray={true}
            options={options}
            defaultValue={numbers}
          />
          <hr />
          <h5>Message Body</h5>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control form-control-sm"
            cols="30"
            rows="10"
            placeholder="Type The Message..."
          ></textarea>
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

export default SendMessageDrawer;
