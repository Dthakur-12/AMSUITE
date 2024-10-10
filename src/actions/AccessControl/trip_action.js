export const REQUEST_BUS_TICKETS = "REQUEST_BUS_TICKETS";
export const RECEIVE_BUS_TICKETS = "RECEIVE_BUS_TICKETS";
export const REQUEST_TRIPS = "REQUEST_JURNEYS";
export const RECEIVE_TRIPS = "RECEIVE_JURNEYS";
export const REQUEST_GENERAL_TRIPS_REPORT = "REQUEST_GENERAL_TRIPS_REPORT";
export const RECEIVE_GENERAL_TRIPS_REPORT = "RECEIVE_GENERAL_TRIPS_REPORT";
export const REQUEST_DOWNLOAD_BUS_TICKETS_XLS =
  "REQUEST_DOWNLOAD_BUS_TICKETS_XLS";
export const RECEIVE_DOWNLOAD_BUS_TICKETS_XLS =
  "RECEIVE_DOWNLOAD_BUS_TICKETS_XLS";
export const REQUEST_DOWNLOAD_TRIP_XLS = "REQUEST_DOWNLOAD_TRIP_XLS";
export const RECEIVE_DOWNLOAD_TRIP_XLS = "RECEIVE_DOWNLOAD_TRIP_XLS";

export const REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS =
  "REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS";
export const RECEIVE_DOWNLOAD_TRIPS_WITH_SEATS_XLS =
  "RECEIVE_DOWNLOAD_TRIPS_WITH_SEATS_XLS";
export const REQUEST_SUNCOR_TRIPS_REPORT = "REQUEST_SUNCOR_TRIPS_REPORT";
export const RECEIVE_SUNCOR_TRIPS_REPORT = "RECEIVE_SUNCOR_TRIPS_REPORT";
export const REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS =
  "REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS";
export const RECEIVE_DOWNLOAD_SUNCOR_TRIP_XLS =
  "RECEIVE_DOWNLOAD_SUNCOR_TRIP_XLS";

export const REQUEST_ERROR = "REQUEST_ERROR";

export const requestBusTickets = (datatable) => {
  return { type: REQUEST_BUS_TICKETS, datatable };
};

export const requestTrips = (datatable) => {
  return { type: REQUEST_TRIPS, datatable };
};

export const requestDownloadTripXLS = (datatable) => {
  return { type: REQUEST_DOWNLOAD_TRIP_XLS, datatable };
};

export const requestDownloadTripsWithSeatsXLS = (datatable) => {
  return { type: REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS, datatable };
};

export const requestDownloadBusTicketsXLS = (datatable) => {
  return { type: REQUEST_DOWNLOAD_BUS_TICKETS_XLS, datatable };
};

export const requestGeneralTripsReportXLSX = (data) => {
  return {
    type: REQUEST_GENERAL_TRIPS_REPORT,
    data,
  };
};

export const requestSuncorTripsReportXLSX = (data) => {
  return {
    type: REQUEST_SUNCOR_TRIPS_REPORT,
    data,
  };
};

export const requestDownloadSunctorTripsXLSX = (data) => {
  return {
    type: REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS,
    data,
  };
};
