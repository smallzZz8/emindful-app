
import { UserAction, UserModel } from '../actions/userActions'

type UserState = {
    allData: UserModel
    programData: UserModel[]
}

const initialState = {
    allData: {} as UserModel,
    programData: [] as UserModel[],
}

const UserReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case 'STORE_allData':
            return {
                ...state,
                allData: action.payload
            }

        case 'STORE_programData':
            return {...state, programData: [...state.programData, action.payload]}

        default:
            return state;
    }
}

export { UserReducer }
