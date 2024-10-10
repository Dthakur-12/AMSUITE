export const CREATE_REQUEST_VIRTUAL_ZONE = "CREATE_REQUEST_VIRTUAL_ZONE";
export const CREATE_RECEIVE_VIRTUAL_ZONE = "CREATE_RECEIVE_VIRTUAL_ZONE";

export const EDIT_REQUEST_VIRTUAL_ZONE = "EDIT_REQUEST_VIRTUAL_ZONE";
export const EDIT_RECEIVE_VIRTUAL_ZONE = "EDIT_RECEIVE_VIRTUAL_ZONE";

export const DELETE_REQUEST_VIRTUAL_ZONE = "DELETE_REQUEST_VIRTUAL_ZONE";
export const DELETE_RECEIVE_VIRTUAL_ZONE = "DELETE_RECEIVE_VIRTUAL_ZONE";

export const REQUEST_VIRTUAL_ZONE = "REQUEST_VIRTUAL_ZONE";
export const RECEIVE_VIRTUAL_ZONE = "RECEIVE_VIRTUAL_ZONE";

export const REQUEST_VIRTUAL_ZONE_ERROR = "REQUEST_VIRTUAL_ZONE_ERROR";

export const createVirtualZone = virtualZone => ({
  type: CREATE_REQUEST_VIRTUAL_ZONE,
  virtualZone
});

export const deleteVirtualZone = virtualZone => ({
  type: DELETE_REQUEST_VIRTUAL_ZONE,
  virtualZone
});

export const editVirtualZone = virtualZone => ({
  type: EDIT_REQUEST_VIRTUAL_ZONE,
  virtualZone
});

export const requestVirtualZone = dataTable => ({
  type: REQUEST_VIRTUAL_ZONE,
  dataTable
});
