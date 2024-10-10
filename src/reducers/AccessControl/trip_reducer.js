import {
  REQUEST_BUS_TICKETS,
  RECEIVE_BUS_TICKETS,
  REQUEST_TRIPS,
  RECEIVE_TRIPS,
  REQUEST_DOWNLOAD_BUS_TICKETS_XLS,
  RECEIVE_DOWNLOAD_BUS_TICKETS_XLS,
  REQUEST_DOWNLOAD_TRIP_XLS,
  RECEIVE_DOWNLOAD_TRIP_XLS,
  REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS,
  RECEIVE_DOWNLOAD_TRIPS_WITH_SEATS_XLS,
  REQUEST_GENERAL_TRIPS_REPORT,
  RECEIVE_GENERAL_TRIPS_REPORT,
  REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS,
  RECEIVE_DOWNLOAD_SUNCOR_TRIP_XLS,
  REQUEST_ERROR,
} from "../../actions/AccessControl/trip_action";

const tripReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_TRIPS:
      return { ...state, successTrips: false, isLoading: true };
    case RECEIVE_TRIPS:
      return {
        ...state,
        successTrips: true,
        trips: action.data.data,
        tripsCount: action.data.dataCount,
        isLoading: false,
      };
    case REQUEST_BUS_TICKETS:
      return { ...state, successBusTickets: false, isLoading: true };
    case RECEIVE_BUS_TICKETS:
      return {
        ...state,
        successBusTickets: true,
        busTickets: action.data.data,
        busTicketsCount: action.data.dataCount,
        isLoading: false,
      };
    case REQUEST_DOWNLOAD_BUS_TICKETS_XLS:
      return { ...state, loading: true, successDownloadXLS: false };
    case RECEIVE_DOWNLOAD_BUS_TICKETS_XLS:
      return {
        ...state,
        report: action.data,
        successDownloadXLS: true,
        loading: false,
      };
    case REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS:
      return { ...state, loading: true, successDownloadXLS: false };
    case RECEIVE_DOWNLOAD_TRIPS_WITH_SEATS_XLS:
      return {
        ...state,
        report: action.data,
        successDownloadXLS: true,
        loading: false,
      };
    case REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS:
    case REQUEST_DOWNLOAD_TRIP_XLS:
      return {
        ...state,
        loading: true,
        successDownloadXLS: false,
        loadingTripsXLSX: true,
      };

    case RECEIVE_DOWNLOAD_SUNCOR_TRIP_XLS:
    case RECEIVE_DOWNLOAD_TRIP_XLS:
      return {
        ...state,
        report: action.data,
        successDownloadXLS: true,
        loadingTripsXLSX: false,
        loading: false,
      };

    case REQUEST_ERROR:
      console.log("errortrip", action);
      return {
        ...state,
        successGetJurneys: false,
        successGetTickets: false,
        error: action.error,
        loadingGeneralXLSX: false,
        loading: false,
        loadingTripsXLSX: false,
      };
    case REQUEST_GENERAL_TRIPS_REPORT:
      return { ...state, loadingGeneralXLSX: true, successGeneralXLSX: false };
    case RECEIVE_GENERAL_TRIPS_REPORT:
      return {
        ...state,
        reportGeneral: action.data,
        successGeneralXLSX: true,
        loadingGeneralXLSX: false,
      };
    default:
      return state;
  }
};

export default tripReducer;
