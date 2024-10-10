import tripReducer from "../../../reducers/AccessControl/trip_reducer";;
import { REQUEST_BUS_TICKETS,
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
    REQUEST_ERROR} from "../../../actions/AccessControl/trip_action";


describe('tripReducer', () => {
    it('REQUEST_TRIPS', () => {
        const initialState = {}
        const expectedState = {successTrips: false, isLoading: true }
        const payload = {}
        const action = {
          type: REQUEST_TRIPS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_TRIPS', () => {
        const initialState = {}
        const expectedState = { successTrips: true,
           trips: undefined,
            tripsCount: 0,
            isLoading: false, }
        const payload = {
          data:undefined,
        dataCount:0
      }
        const action = {
          type: RECEIVE_TRIPS, 
          data:payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_BUS_TICKETS', () => {
        const initialState = {}
        const expectedState = { successBusTickets: false, isLoading: true}
        const payload = {}
        const action = {
          type: REQUEST_BUS_TICKETS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_BUS_TICKETS', () => {
        const initialState = {}
        const expectedState = {successBusTickets: true,
           busTickets: undefined,
           busTicketsCount: 0,
            isLoading: false,}
        const payload = {
          data:undefined,
        dataCount:0
      }
        const action = {
          type: RECEIVE_BUS_TICKETS, 
          data:payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DOWNLOAD_BUS_TICKETS_XLS', () => {
        const initialState = {}
        const expectedState = {loading: true, successDownloadXLS: false }
        const payload = {}
        const action = {
          type: REQUEST_DOWNLOAD_BUS_TICKETS_XLS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DOWNLOAD_BUS_TICKETS_XLS', () => {
        const initialState = {}
        const expectedState = {successDownloadXLS: true,
            loading: false,}
        const payload = {}
        const action = {
          type: RECEIVE_DOWNLOAD_BUS_TICKETS_XLS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS', () => {
        const initialState = {}
        const expectedState = {loading: true, successDownloadXLS: false}
        const payload = {}
        const action = {
          type: REQUEST_DOWNLOAD_TRIPS_WITH_SEATS_XLS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DOWNLOAD_TRIPS_WITH_SEATS_XLS', () => {
        const initialState = {}
        const expectedState = {successDownloadXLS: true,
            loading: false,}
        const payload = {}
        const action = {
          type: RECEIVE_DOWNLOAD_TRIPS_WITH_SEATS_XLS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DOWNLOAD_TRIP_XLS', () => {
        const initialState = {}
        const expectedState = {      loading: true,
            successDownloadXLS: false,
            loadingTripsXLSX: true}
        const payload = {}
        const action = {
          type: REQUEST_DOWNLOAD_TRIP_XLS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DOWNLOAD_TRIP_XLS', () => {
        const initialState = {}
        const expectedState = {  successDownloadXLS: true,
            loadingTripsXLSX: false,
            loading: false,}
        const payload = {}
        const action = {
          type: RECEIVE_DOWNLOAD_TRIP_XLS, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR', () => {
        const initialState = {}
        const expectedState = { successGetJurneys: false,
            successGetTickets: false,
            //error: action.error,
            loadingGeneralXLSX: false,
            loading: false,
            loadingTripsXLSX: false,}
        const payload = {}
        const action = {
          type: REQUEST_ERROR, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GENERAL_TRIPS_REPORT', () => {
        const initialState = {}
        const expectedState = { loadingGeneralXLSX: true, successGeneralXLSX: false }
        const payload = {}
        const action = {
          type: REQUEST_GENERAL_TRIPS_REPORT, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GENERAL_TRIPS_REPORT', () => {
        const initialState = {}
        const expectedState = { successGeneralXLSX: true,
            loadingGeneralXLSX: false,}
        const payload = {}
        const action = {
          type: RECEIVE_GENERAL_TRIPS_REPORT, 
          payload
        }
        expect(tripReducer(initialState, action)).toEqual(expectedState)
      })
})