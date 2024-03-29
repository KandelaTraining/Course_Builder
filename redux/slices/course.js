import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const url = "http://localhost:3000/api/admin";
// const prodUrl = "https://lms.maukaeducation.com/api/admin";
const url=process.env.NODE_ENV==="development" ? "http://localhost:3000/api/admin" : "https://lms.maukaeducation.com/api/admin"

export const courseApi = createApi({
  reducerPath: "course",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "Authorization",
        `Bearer ${getState().util.user.token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/courses",
      }),
    }),
    getCourseById: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/addcourse",
        method: "POST",
        body: data,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ data, id }) => ({
        url: `/addcourse/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getLesson: builder.mutation({
      query: (id) => ({
        url: `/lesson/${id}`,
        method: "GET",
      }),
    }),
    addLesson: builder.mutation({
      query: ({ data, id }) => ({
        url: `/addlesson/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ data, id }) => ({
        url: `/updatelesson/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/deletelesson/${id}`,
        method: "DELETE",
      }),
    }),
    getAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignment/${id}`,
        method: "GET",
      }),
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/addassignment`,
        method: "POST",
        body: data,
      }),
    }),
    updateAssignment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/updateassignment/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/deleteassignment/${id}`,
        method: "DELETE",
      }),
    }),
    getTest: builder.mutation({
      query: (id) => ({
        url: `/test/${id}`,
        method: "GET",
      }),
    }),
    addTest: builder.mutation({
      query: (data) => ({
        url: "/addtest",
        method: "POST",
        body: data,
      }),
    }),
    updateTest: builder.mutation({
      query: ({ data, id }) => ({
        url: `/updatetest/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTest: builder.mutation({
      query: (id) => ({
        url: `/deletetest/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUpdateAssignmentMutation,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useAddLessonMutation,
  useGetCourseByIdMutation,
  useAddAssignmentMutation,
  useGetCoursesQuery,
  useUpdateLessonMutation,
  useGetAssignmentMutation,
  useDeleteLessonMutation,
  useGetLessonMutation,
  useDeleteAssignmentMutation,
  useAddTestMutation,
  useGetTestMutation,
  useDeleteTestMutation,
  useUpdateTestMutation,
} = courseApi;
