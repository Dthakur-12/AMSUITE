import { WS_URL } from "../Config";
import SnackbarHandler from "../utils/SnackbarHandler";
import socketIOClient from "socket.io-client";

let newDataSocket;
export const socketIO = socketIOClient(localStorage.getItem("urlServer"), {
  forceNew: true,
  transports: ["websocket"]
});

export const connectSocket = () => {
  try {
    socketIO.connect();
  } catch (error) {
    console.log(error);
  }
};

export const disconnectSocket = () => {
  try {
    socketIO.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export const subscribeForNewData = (onMessage, userId) => {
  try {
    newDataSocket = new WebSocket(WS_URL + "/wsData");
    newDataSocket.onopen = () => {
      newDataSocket.send(
        JSON.stringify({
          type: "onOpen",
          userId: userId,
          url: window.location.pathname
        })
      );
      SnackbarHandler.showMessage("Correcta sincronización", "info");
    };
    newDataSocket.onerror = data => {
      SnackbarHandler.showMessage("Error en sincronización", "error");
    };
    newDataSocket.onclose = data => {
    };
    newDataSocket.onmessage = data => onMessage(data.data);
  } catch (error) {
    console.log(error);
  }
};

export const unSubscribeForNewData = userId => {
  try {
    newDataSocket.close();
  } catch (error) {
    console.log(error);
  }
};

export const WebSocketConfig = {
  subscribeForNewData,
  unSubscribeForNewData,
  connectSocket,
  disconnectSocket,
  socketIO
};

export default WebSocketConfig;
