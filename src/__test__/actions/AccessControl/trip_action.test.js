import {requestBusTickets,requestTrips,requestDownloadTripXLS,requestDownloadTripsWithSeatsXLS,requestDownloadBusTicketsXLS,requestGeneralTripsReportXLSX,
    requestSuncorTripsReportXLSX,requestDownloadSunctorTripsXLSX} from "../../../actions/AccessControl/trip_action"

describe('Actions', () => {
    test('requestBusTickets Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_BUS_TICKETS",
          datatable:{},
        };    
        expect(requestBusTickets(payload)).toEqual(expected);
      });
      test('requestTrips Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_JURNEYS",
          datatable:{},
        };    
        expect(requestTrips(payload)).toEqual(expected);
      });
      test('requestDownloadTripXLS Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DOWNLOAD_TRIP_XLS",
          datatable:{},
        };    
        expect(requestDownloadTripXLS(payload)).toEqual(expected);
      });
      test('requestDownloadTripsWithSeatsXLS Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS",
          datatable:{},
        };    
        expect(requestDownloadTripsWithSeatsXLS(payload)).toEqual(expected);
      });
      test('requestDownloadBusTicketsXLS Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DOWNLOAD_BUS_TICKETS_XLS",
          datatable:{},
        };    
        expect(requestDownloadBusTicketsXLS(payload)).toEqual(expected);
      });
      test('requestGeneralTripsReportXLSX Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GENERAL_TRIPS_REPORT",
          data:{},
        };    
        expect(requestGeneralTripsReportXLSX(payload)).toEqual(expected);
      });
      test('requestSuncorTripsReportXLSX Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_SUNCOR_TRIPS_REPORT",
          data:{},
        };    
        expect(requestSuncorTripsReportXLSX(payload)).toEqual(expected);
      });
      test('requestDownloadSunctorTripsXLSX Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DOWNLOAD_SUNCOR_TRIP_XLS",
          data:{},
        };    
        expect(requestDownloadSunctorTripsXLSX(payload)).toEqual(expected);
      });
})