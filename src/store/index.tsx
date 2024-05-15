import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import MembershipReducer from "./reducers/MembershipReducer";
import ShopReducer from "./reducers/ShopReducer";
import HolidayReducer from "./reducers/HolidayReducer";
import CategoryReducer from "./reducers/CategoryReducer";

const logger = createLogger({
  duration: false, // print the duration of each action?
  timestamp: false, // print the timestamp with each action?,
});

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Users: UserReducer,
    membership: MembershipReducer,
    Shops: ShopReducer,
    holiday: HolidayReducer,
    Category: CategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
