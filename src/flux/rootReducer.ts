import userReducer from "./modules/user/reducers";

const rootReducer = () => ({
  user: userReducer,
});

export default rootReducer;
