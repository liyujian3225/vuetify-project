import request from "@/utils/https";

export const login_ = (params) =>
  request({
    method: "get",
    url: "/api/studio/works",
    params,
  });

export const login = (data) =>
  request({
    method: "post",
    url: "/api/business/web/member/signIn",
    data,
  });
