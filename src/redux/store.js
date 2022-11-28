import { configureStore } from "@reduxjs/toolkit";
import UtilReducer from "./utilSlice";
// import dokterReducer from "./dokterSlice";
import UserReducer from "./userSlice";
import DokterReducer from "./dokterSlice";
import JenisTindakanReducer from "./jenisTindakanSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    utils: UtilReducer,
    dokter: DokterReducer,
    jenisTindakan: JenisTindakanReducer,
  },
});

export default store;
