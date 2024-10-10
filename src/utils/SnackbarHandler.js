const types = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
};

export default class SnackbarHandler {
  static toggleFunction;
  static positionFunction;
  static types = types;

  static setSnackbar(toggleFunction, positionFunction) {
    this.toggleFunction = toggleFunction;
    this.positionFunction = positionFunction;
  }

  static showMessage(message, type, postion, noTimeOut, download, onDownload) {
    message = message
      ? message
      : "No se pudo completar la transaccion, intentelo  nuevamente o comuniquese con el administrador";
    type = type ? type : types.success;
    postion = postion ? postion : { vertical: "bottom", horizontal: "left" };

    this.toggleFunction(
      true,
      message,
      type,
      postion,
      noTimeOut,
      download,
      onDownload
    );
  }
}
