import { apiSlice } from "../api/ApiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Tasks endpoints
    getTasks: builder.query({
      query: () => "/tasks",
    }),
    getTask: builder.query({
      query: (taskId) => `/tasks/${taskId}`,
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const taskData = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.push(taskData.data);
          })
        );
      },
    }),

    editTask: builder.mutation({
      query: ({ id, editData }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: editData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;

        if (response.data) {
          dispatch(
            tasksApi.util.updateQueryData("getTasks", undefined, (data) => {
              const index = data.findIndex((task) => task.id === arg.id);
              if (index !== -1) {
                data[index] = { ...data[index], ...arg.editData };
              }
              return data;
            })
          );
        }
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        const deletedTaskId = arg;
        const previousData = getState().getTasks;
        dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (data) => {
            return data.filter((task) => task.id !== deletedTaskId);
          })
        );

        const response = await queryFulfilled;

        if (response.error) {
          dispatch(
            tasksApi.util.updateQueryData("getTasks", undefined, (data) => {
              return [
                ...data,
                previousData.find((task) => task.id === deletedTaskId),
              ];
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useEditTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
} = tasksApi;

// import { apiSlice } from "../api/ApiSlice";

// export const tasksApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Tasks endpoints
//     getTasks: builder.query({
//       query: () => "/tasks",
//     }),
//     getTask: builder.query({
//       query: (taskId) => `/tasks/${taskId}`,
//     }),
//     addTask: builder.mutation({
//       query: (data) => ({
//         url: "/tasks",
//         method: "POST",
//         body: data,
//       }),

//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const { data: updatedPost } = await queryFulfilled
//           dispatch(
//             apiSlice.util.updateQueryData('getTasks', arg.taskName, (draft) => {
//               Object.assign(draft, updatedPost)
//             })
//           )
//         } catch {}
//       },
//     }),
//     editTask: builder.mutation({
//       query: ({ id, editData }) => ({
//         url: `/tasks/${id}`,
//         method: "PATCH",
//         body: editData,
//       }),
//     }),
//     deleteTask: builder.mutation({
//       query: (id) => ({
//         url: `/tasks/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetTasksQuery,
//   useEditTaskMutation,
//   useAddTaskMutation,
//   useDeleteTaskMutation,
//   useGetTaskQuery,
// } = tasksApi;
