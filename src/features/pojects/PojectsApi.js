import { apiSlice } from "../api/ApiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Projects endpoints
    getProjects: builder.query({
      query: () => "/projects",
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
