import {
  REQUEST_BUS_TICKETS,
  REQUEST_TRIPS,
  REQUEST_DOWNLOAD_TRIP_XLS,
  REQUEST_DOWNLOAD_BUS_TICKETS_XLS,
  REQUEST_ERROR,
  REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS,
  REQUEST_GENERAL_TRIPS_REPORT,
  REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS,
} from "../../actions/AccessControl/trip_action";
import { all, call, put, takeLatest } from "redux-saga/effects";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.AccessControl.Trips[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_TRIPS, genericApiCall, "getTrips");
  yield takeLatest(REQUEST_BUS_TICKETS, genericApiCall, "getBusTickets");
  yield takeLatest(
    REQUEST_DOWNLOAD_TRIP_XLS,
    genericApiCall,
    "downloadTripsXLS"
  );
  yield takeLatest(
    REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS,
    genericApiCall,
    "downloadTripsWithSeatsXLS"
  );
  yield takeLatest(
    REQUEST_DOWNLOAD_BUS_TICKETS_XLS,
    genericApiCall,
    "downloadBusTicketsXLS"
  );

  yield takeLatest(
    REQUEST_GENERAL_TRIPS_REPORT,
    genericApiCall,
    "generalTripsXLSX"
  );
  yield takeLatest(
    REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS,
    genericApiCall,
    "suncorTripsXLSX"
  );
}
