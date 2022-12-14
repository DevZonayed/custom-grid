import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTransition } from "react";
import { fakeData } from "../../redux/features/lead/fakeData/fakeData";
import { v4 as uuidv4 } from "uuid";

const DataOrg = () => {
  const [isPending, startTransition] = useTransition();
  const [orgData, setOrgData] = useState();
  useEffect(() => {
    startTransition(() => {
      const data = [...fakeData];
      const orgData = data.map((item) => {
        return {
          id: uuidv4(),
          name: item.name,
          phone: [item.phone],
          email: [item.email],
          leadStatus: [
            {
              leadFrom: item.leadType,
              leadAt: item.regDate,
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
                assignDate: Date.now(),
                dateLine: Date.now(),
              },
            ],
            assignBy: [{ name: "Ridam Paul", id: "" }],
          },
          intarest: [
            {
              subject: "Html",
              progress: item.interest, // It will be percentance
            },
          ],
          skillStatus: [
            {
              subject: "Html",
              progress: item.progress,
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
              callTime: Date.now(),
              callStatus: [{ type: "busy", callCount: 2 }],
              comments: item.comment,
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
        };
      });
      setOrgData(orgData);
    });
  }, []);

  console.log(orgData);
  return <div>{isPending && "Loading"}</div>;
};

export default DataOrg;
