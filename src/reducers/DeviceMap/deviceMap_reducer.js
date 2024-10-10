import {
  REQUEST_PANELS_POSITIONS,
  RECEIVE_PANELS_POSITIONS,
  REQUEST_ERROR
} from "../../actions/DeviceMap/deviceMap_actions.js";

const deviceMapReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_PANELS_POSITIONS:
      return {
        ...state,
        successGetZones: false,
      };
    case RECEIVE_PANELS_POSITIONS:
      return {
        ...state,
        mapData: action.data,
        successGetZones: true,
      };
    case REQUEST_ERROR:
      return { ...state, error: true, loading: false, success: false };
    default:
      return state;
  }
};

export default deviceMapReducer;
