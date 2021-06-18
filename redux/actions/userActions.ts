import { Dispatch } from "react";

export interface UserModel { }


export interface LoginAction {

    readonly type: 'STORE_allData';
    payload: UserModel;

}

export interface ErrorAction {

    readonly type: 'STORE_programData';
    payload: UserModel;

}

export type UserAction = LoginAction | ErrorAction;


export const storeAllData = (theData : Object) => {

    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: 'STORE_allData',
            payload: theData
        });
    }

}

export const storeProgramData = (theData : Object) => {

    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: 'STORE_programData',
            payload: theData
        });
    }

}


