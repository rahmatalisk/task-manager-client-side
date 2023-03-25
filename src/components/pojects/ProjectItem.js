import React, { useEffect, useState } from "react";

const ProjectItem = ({ item, setSelectedItem }) => {
  const { colorClass, projectName } = item;
  const [select, setIsSelect] = useState(true);

  useEffect(() => {
    setSelectedItem({
      isSelect: select,
      taskName: projectName,
    });
  }, [setSelectedItem, projectName, select]);
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        onChange={() => setIsSelect(!select)}
        checked={select}
      />
      <p className="label">{projectName}</p>
    </div>
  );
};

export default ProjectItem;
