import { PrUrl, PrUrlMap } from "../../util/types";
import { ActionWithPayloadFromCreator } from "../type";

export const GET_PR_URL_LIST = "PR_URL_LIST/GET";
export const GET_PR_URL_LIST_SUCCESS = "PR_URL_LIST/GET_SUCCESS";

export const actionGetUrlList = (uid: string) => {
  return {
    type: GET_PR_URL_LIST,
    payload: {
      uid,
    },
  };
};

export const actionGetUrlListSuccess = (prUrlMap: PrUrlMap) => {
  return {
    type: GET_PR_URL_LIST_SUCCESS,
    payload: { prUrlMap },
  };
};

type GetPrUrlListAction =
  | ActionWithPayloadFromCreator<
      typeof GET_PR_URL_LIST,
      typeof actionGetUrlList
    >
  | ActionWithPayloadFromCreator<
      typeof GET_PR_URL_LIST_SUCCESS,
      typeof actionGetUrlListSuccess
    >;

export const ADD_PR_URL = "PR_URL_LIST/ADD_URL";
export const ADD_PR_URL_SUCCESS = "PR_URL_LIST/ADD_URL";

export const actionAddPrUrl = (uid: string, newPrUrl: PrUrl) => {
  return {
    type: ADD_PR_URL,
    payload: {
      uid,
      newPrUrl,
    },
  };
};

export const actionAddPrUrlSuccess = (newPrUrl: PrUrl) => {
  return {
    type: GET_PR_URL_LIST_SUCCESS,
    payload: { newPrUrl },
  };
};

type AddPrUrlAction =
  | ActionWithPayloadFromCreator<typeof ADD_PR_URL, typeof actionAddPrUrl>
  | ActionWithPayloadFromCreator<
      typeof ADD_PR_URL_SUCCESS,
      typeof actionAddPrUrlSuccess
    >;

export type PrUrlListAction = GetPrUrlListAction | AddPrUrlAction;
