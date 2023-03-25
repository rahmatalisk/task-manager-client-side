import React from "react";

const TeamItem = ({ member }) => {
  const { name, avatar } = member;
  return (
    <div className="checkbox-container">
      <img src={avatar} className="team-avater" alt={name} />
      <p className="label">{name}</p>
    </div>
  );
};

export default TeamItem;
