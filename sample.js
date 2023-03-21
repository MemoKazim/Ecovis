members.forEach((member) => {
  if (current.responsibleMembers.includes(member._id)) {
    console.log("Member triggered! " + member._id);
  }
  console.log("Member is not valid for this service " + member._id);
});
