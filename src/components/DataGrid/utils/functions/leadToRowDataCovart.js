function leadToRowData(data) {
  console.log(data);
  return data.map((item) => {
    return {
      id: item.id,
      email: [...item.email],
      phone: [...item.phone],
      followUpDate:
        item.followUpStatus.callTime !== ""
          ? new Date(item.followUpStatus.callTime).toLocaleString("en", {
              dateStyle: "medium",
              timeStyle: "medium",
            })
          : "Follow Up not found!",
      folloUpAgent: item.followUpStatus.agent.name,
      userProfile: item.accesories,
      name: item.name,
      callStatus:
        item.history[item.history.length - 1] !== undefined
          ? item.history[item.history.length - 1].callStatus
          : "Not Found",
      agents:
        item.assignStatus.agents !== undefined
          ? [...item.assignStatus.agents.map((agent) => agent.name)]
          : "Fresh Lead",
      assignDate:
        item.assignStatus.agents !== undefined
          ? new Date(
              item.assignStatus.agents[
                item.assignStatus.agents.length - 1
              ].assignDate
            ).toLocaleString("en", { dateStyle: "medium", timeStyle: "medium" })
          : "Fresh Lead",
      dateLine:
        item.assignStatus.agents !== undefined
          ? new Date(
              item.assignStatus.agents[
                item.assignStatus.agents.length - 1
              ].dateLine
            ).toLocaleString("en", { dateStyle: "medium", timeStyle: "medium" })
          : "Fresh Lead",
      bulkIds: item.entryType.id,
      tags: item.tags,
      regDate: new Date(
        item.leadStatus[item.leadStatus.length - 1].leadAt
      ).toLocaleString("en", { dateStyle: "medium", timeStyle: "medium" }),
      leadFrom: item.leadStatus.map((item) => item.leadFrom),
      interest: item.interest.map(
        (item) => `${item.subject}(${(item.progress * 100).toFixed(0)}%)`
      ),
      skillStatus: item.skillStatus.map(
        (item) => `${item.subject}(${(item.progress * 100).toFixed(0)}%)`
      ),
      comments: [
        ...new Set(item.history.map((history) => history.agent.name)),
      ].map((agent) => {
        const commentCount = item.history.filter(
          (item) => item.agent.name === agent
        ).length;
        return `${agent}(${commentCount})`;
      }),
      isAdmitted: item.admitionStatus.isAdmitted,
    };
  });
}

export default leadToRowData;
