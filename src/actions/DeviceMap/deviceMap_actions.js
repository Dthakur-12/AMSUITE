export const REQUEST_PANELS_POSITIONS = "REQUEST_PANELS_POSITIONS";
export const RECEIVE_PANELS_POSITIONS = "RECEIVE_PANELS_POSITIONS";
export const REQUEST_ERROR = "REQUEST_ERROR";

export const requestPanelsPositions = (filters) => {
  return { type: REQUEST_PANELS_POSITIONS, info: filters };
};
