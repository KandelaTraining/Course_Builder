import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const url = "http://localhost:3000/api/admin";
// const prodUrl = "https://lms.maukaeducation.com/api/admin";

const url=process.env.NODE_ENV==="development" ? "http://localhost:3000/api/admin" : "https://lms.maukaeducation.com/api/admin"

export const slideApi = createApi({
  reducerPath: "slide",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers,{getState}) => {
      headers.set(
        "Authorization",
        `Bearer ${getState().util.user.token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adminUpload:builder.mutation({
      query:(file)=>({
        url:`/upload`,
        method:"POST",
        body:file,
        
      })
    }),
    getSlide: builder.mutation({
      query: (id) => ({
        url: `/getslide/${id}`,
        method: "GET",
      }),
    }),
    getSlideById: builder.mutation({
      query: (id) => ({
        url: `/getslidebyid/${id}`,
        method: "GET",
      }),
    }),
    getSlideByArr: builder.mutation({
      query: (arr) => ({
        url: `/getslidesbyarr`,
        method: "POST",
        body:{arr}
      }),
    }),
    getLogicJumpSlide: builder.mutation({
      query: (id) => ({
        url: `/getlogicjumpslide/${id}`,
        method: "GET",
      }),
    }),
    getTestSlide: builder.mutation({
      query: (id) => ({
        url: `/testslide/${id}`,
        method: "GET",
      }),
    }),
    createSlide: builder.mutation({
      query: ({ id, data }) => ({
        url: `/addslide/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    createTestSlide: builder.mutation({
      query: ({ id, data }) => ({
        url: `/testslide/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateSlide: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateslide/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateMediaSlide: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updatemediaslide/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateTestSlide: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updatetestslide/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateMediaTestSlide: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updatemediatestslide/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    changeSlideOrder: builder.mutation({
      query: ({ id1,id2,order }) => ({
        url: `/changeslideorder/${id1}/${id2}?order=${order}`,
        method: "PATCH"
      }),
    }),
    changeSlideOrderInLogicJump: builder.mutation({
      query: ({ id,from,to,logic_jump_id }) => ({
        url: `/changeslideorderinlogicjump/${id}?logic_jump_id=${logic_jump_id}&from=${from}&to=${to}`,
        method: "GET"
      }),
    }),
    changeTestSlideOrder: builder.mutation({
      query: ({ id1,id2,order }) => ({
        url: `/changetestslideorder/${id1}/${id2}?order=${order}`,
        method: "PATCH"
      }),
    }),
    deleteSlide: builder.mutation({
      query: (id) => ({
        url: `/deleteslide/${id}`,
        method: "DELETE",
      }),
    }),
    deleteTestSlide: builder.mutation({
      query: (id) => ({
        url: `/testslide/${id}`,
        method: "DELETE",
      }),
    }),
    addSlideInLogic:builder.mutation({
      query:({id,logicId,data,level={is:false,lesson:null}})=>({
        url:`/addslideinlogic/${id}?level=${level.is}&lesson=${level.lesson}`,
        body:{data,logic_id:logicId},
        method:"POST"
      })
    }),
    updateSlideInLogic: builder.mutation({
      query:({id,logic_jump_id,arrno,data})=>({
        url:`/updatelogicjumpslide/${id}?logic_jump_id=${logic_jump_id}&arrno=${arrno}`,
        method:"PATCH",
        body:data
      })
    }),
    deleteSlideInLogic: builder.mutation({
      query:({id,logic_jump_id,arrno,logic_jump})=>({
        url:`/deletelogicjumpslide/${id}?logic_jump_id=${logic_jump_id}&arrno=${arrno}&islogicjump=${logic_jump}`,
        method:"DELETE",
      })
    })
  }),
});

export const {
  useCreateSlideMutation,
  useCreateTestSlideMutation,
  useDeleteSlideMutation,
  useGetLogicJumpSlideMutation,
  useGetSlideMutation,
  useDeleteTestSlideMutation,
  useGetTestSlideMutation,
  useUpdateSlideMutation,
  useChangeSlideOrderMutation,
  useChangeTestSlideOrderMutation,
  useUpdateMediaSlideMutation,
  useUpdateTestSlideMutation,
  useUpdateMediaTestSlideMutation,
  useAddSlideInLogicMutation,
  useAdminUploadMutation,
  useUpdateSlideInLogicMutation,
  useDeleteSlideInLogicMutation,
  useGetSlideByIdMutation,
  useGetSlideByArrMutation,
  useChangeSlideOrderInLogicJumpMutation
} = slideApi;
