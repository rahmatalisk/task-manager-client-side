import React, { useEffect, useMemo, useState } from "react";
import { useGetTasksQuery } from "../../features/tasks/TasksApi";
import TaskItem from "./TaskItem";

const Tasks = ({ selectedItem, searchText }) => {
  const { data, isError, isLoading } = useGetTasksQuery();
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    setAllData(data);
  }, [data]);

  const finalTask = useMemo(() => {
    if (allData?.length > 0) {
      return allData.map((dt) => ({
        taskName: dt?.taskName,
        teamMember: dt?.teamMember,
        project: dt?.project,
        deadline: dt?.deadline,
        id: dt?.id,
        status: dt?.status,
        isFilter: true,
      }));
    }
    return [];
  }, [allData]);

  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    setFilterData(finalTask);
  }, [selectedItem, finalTask]);

  const filteredTasks = useMemo(() => {
    if (selectedItem) {
      filterData?.map((dt) => {
        if (dt?.project.projectName === selectedItem?.taskName) {
          dt.isFilter = selectedItem?.isSelect;
        }
        return dt;
      });
      return filterData;
    }

    return filterData;
  }, [selectedItem, filterData]);
  useEffect(() => {
    setFilterData(filteredTasks);
  }, [filteredTasks]);

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div style={{ color: "red" }}>There was an error...</div>;
  } else if (
    filteredTasks
      .filter((dt) => dt.isFilter === true)
      .filter((dt) => dt.taskName.toLowerCase().includes(searchText)).length ===
    0
  ) {
    content = <div>No tasks found...</div>;
  } else {
    content = filteredTasks
      ?.filter((dt) => dt?.isFilter === true)
      .filter((dt) => dt.taskName.toLowerCase().includes(searchText))
      .map((task) => <TaskItem key={task.id} task={task} />);
  }

  return <div className="lws-task-list">{content}</div>;
};

export default Tasks;
