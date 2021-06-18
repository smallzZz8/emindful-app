import { combineReducers } from "redux";
import { UserReducer } from "./userReducer";

const rootReducer = combineReducers({
    UserReducer: UserReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>


export { rootReducer };