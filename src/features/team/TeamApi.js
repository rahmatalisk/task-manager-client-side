import { apiSlice } from "../api/ApiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // team endpoints
    getTeam: builder.query({
      query: () => "/team",
    }),
  }),
});



 export const {useGetTeamQuery}= teamApi