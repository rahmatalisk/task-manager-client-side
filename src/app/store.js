import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../features/tasks/TasksSlice";
import teamSlice from "../features/team/TeamSlice";
import projectsSlice from "../features/pojects/PojectsSlice";
import { apiSlice } from "../features/api/ApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    task: tasksSlice,
    team: teamSlice,
    projects: projectsSlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
