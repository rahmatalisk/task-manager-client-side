import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../features/pojects/PojectsApi";
import {
  useEditTaskMutation,
  useGetTaskQuery,
} from "../features/tasks/TasksApi";

import { useGetTeamQuery } from "../features/team/TeamApi";

const EditTask = () => {
  const { data: projects } = useGetProjectsQuery();
  const { data: team } = useGetTeamQuery();

  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [name, setName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [date, setDeadline] = useState("");
  const { taskId } = useParams();

  const { data, isLoading } = useGetTaskQuery(taskId);
  const [editTask, {}] = useEditTaskMutation();

  useEffect(() => {
    if (data?.taskName) {
      setTaskName(data.taskName);
      setProjectName(data?.project.projectName);
      setName(data?.teamMember.name);
      setDeadline(data?.deadline);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const handleEditTask = (e) => {
    e.preventDefault();

    const addProjectInfo = projects.find((p) => p.projectName === projectName);
    const assignToInfo = team.find((t) => t.name === name);

    const finalDate = new Date(date);

    editTask({
      id: data.id,
      editData: {
        taskName,
        teamMember: assignToInfo,
        project: addProjectInfo,
        deadline: finalDate.toISOString(),
        status: data?.status,
      },
    });

    navigate("/");
  };

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handleEditTask}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                name="teamMember"
                id="lws-teamMember"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value="" hidden selected>
                  Select Job
                </option>
                {team?.map((dt) => (
                  <option key={dt.id}>{dt.name}</option>
                ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              >
                <option value="" hidden selected>
                  Select Project
                </option>
                {projects?.map((dt) => (
                  <option key={dt.id}>{dt.projectName}</option>
                ))}
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                required
                value={date ? date.substring(0, 10) : ""}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditTask;
