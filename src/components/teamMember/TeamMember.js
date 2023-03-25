import React from "react";
import { useGetTeamQuery } from "../../features/team/TeamApi";
import TeamItem from "./TeamItem";

const TeamMember = () => {
  const { data, isError, isLoading } = useGetTeamQuery();
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div style={{ color: "red" }}>There was an error...</div>;
  }
  if (!isLoading && !isError && data?.length === 0) {
    content = <div>No team found...</div>;
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((t) => <TeamItem member={t} key={t.id} />);
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMember;
