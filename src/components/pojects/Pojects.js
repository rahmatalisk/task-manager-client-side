import React from "react";
import { useGetProjectsQuery } from "../../features/pojects/PojectsApi";
import ProjectItem from "./ProjectItem";

const Projects = ({ setSelectedItem }) => {
  const { data, isError, isLoading } = useGetProjectsQuery();

  // Decide what i do
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div style={{ color: "red" }}>There was an error...</div>;
  }
  if (!isLoading && !isError && data?.length === 0) {
    content = <div>No Projects found...</div>;
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((p) => (
      <ProjectItem setSelectedItem={setSelectedItem} item={p} key={p.id} />
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default Projects;
