import React from "react";
import "./style/leadHistory.css";

const LeadCommentHistory = ({ history }) => {
  return (
    <div>
      <h6 style={{ cursor: "pointer", userSelect: "none" }} className="mt-4">
        Call History
      </h6>

      <div className={"history_wrapper open"}>
        <div className="card">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Agent</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Comment</th>
                </tr>
              </thead>
              <tbody>
                {history.map((history, index) => {
                  return (
                    <tr key={"history Key" + index}>
                      <th scope="row">{index + 1}</th>
                      <td>{history.agent.name}</td>
                      <td>
                        {new Date(history.callTime).toLocaleString("en", {
                          timeStyle: "medium",
                          dateStyle: "medium",
                        })}
                      </td>
                      <td>{history.callStatus}</td>
                      <td width={"50%"}>{history.comments}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCommentHistory;
