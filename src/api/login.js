import request from "@/utils/https";

export const getHistoryImage = (params) =>
  request({
    method: "get",
    url: "/api/studio/works",
    params,
  });

export const getStudioProjectID = (data) =>
  request({
    method: "post",
    url: "/api/studio/works",
    data,
  });
