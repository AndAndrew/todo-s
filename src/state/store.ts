import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TaskActionsType, tasksReducer} from "../reducers/tasksReducer";
import {TodoListActionsType, todoListsReducer} from "../reducers/todoListReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionsType, appReducer} from "../app/appReducer";
import {AuthActionsType, authReducer} from "../features/Login/authReducer";

const rootReducer = combineReducers({
    app: appReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodoListActionsType | TaskActionsType | AuthActionsType | ActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>