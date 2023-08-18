import request from "@/utils/request";
import type { HosResponseData } from "./type";

enum API {
  GET_HOSPITAL_LIST = "/hosp/hospital/",
}

export const getHospitalList = ({ page, limit }) =>
  request.get<any, HosResponseData>(API.GET_HOSPITAL_LIST + page + "/" + limit);
