import React from "react";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
;
import NavBarAccessControl from "../utils/NavBarAccessControl";
import IconButton from "@mui/material/IconButton";
import { Icon, Table, Divider, Input, Button } from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { isNullOrUndefined } from "util";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { debounce } from "throttle-debounce";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { isValueEmptyOrNull } from "../../../utils/HelperFunctions";
import SnackbarHandler from "../../../utils/SnackbarHandler";
import ConfirmationDialogAction from "../../Shared/ConfirmationDialogAction";
import ImeiListIcon from "@mui/icons-material/Storage";
import {
  requestGetImei,
  requestCreateImei,
  requestEditImei,
  requestDeleteImei,
  receiveGetImei,
} from "../../../actions/AccessControl/imei_actions";
import { connect } from "react-redux";
import styles, {
  StyledPagination,
} from "../../../assets/styles/AccessControl_styles/imeiStyles";

class Imei extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imeis: [],
      newImei: { id: "", value: "" },
      offset: 0,
      limit: 5,
      searchText: "",
      editImei: undefined,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }
  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    NavBarAccessControl.hideLoader();
    this.getImeis();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successEditImei !== prevState.successEditImei ||
      nextProps.successGetImei !== prevState.successGetImei ||
      nextProps.successDeleteImei !== prevState.successDeleteImei ||
      nextProps.successCreateImei !== prevState.successCreateImei
    ) {
      return {
        language: nextProps.i18n.language,
        successEditImei: nextProps.successEditImei,
        successGetImei: nextProps.successGetImei,
        successDeleteImei: nextProps.successDeleteImei,
        successCreateImei: nextProps.successCreateImei,
        imeis: nextProps.imeis ? nextProps.imeis.data : [],
        dataCount: nextProps.imeis ? nextProps.imeis.dataCount : 0,
        createResponse: nextProps.createResponse,
        editResponse: nextProps.editResponse,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (
      this.state.successCreateImei &&
      prevState.successCreateImei !== this.state.successCreateImei
    ) {
      if (isNullOrUndefined(this.state.createResponse)) {
        SnackbarHandler.showMessage(t("SuccessCreateImei"));
        this.getImeis();
      } else {
        SnackbarHandler.showMessage(t("ImeiNameAlreadyExist"), "error");
      }
    }
    if (prevState.successCreateImei !== this.state.successCreateImei) {
    }
    if (
      this.state.successEditImei &&
      prevState.successEditImei !== this.state.successEditImei
    ) {
      if (isNullOrUndefined(this.state.editResponse)) {
        SnackbarHandler.showMessage(t("SuccessEditImei"));
        this.setState({ editImei: undefined });
        this.getImeis();
      } else {
        SnackbarHandler.showMessage(t("ImeiNameAlreadyExist"), "error");
      }
    }
    if (
      this.state.successDeleteImei &&
      prevState.successDeleteImei !== this.state.successDeleteImei
    ) {
      this.getImeis();
      this.setState({
        openDeleteDialog: false,
        optionSelected: undefined,
      });
      SnackbarHandler.showMessage(t("SuccessDeleteImei"));
    }
    if(this.props.error && this.props.error !== prevProps.error){
      SnackbarHandler.showMessage(t(this.props.error), "error");
    }
  }

  getImeis = () => {
    const { offset, limit, searchText } = this.state;
    this.props.requestGetImei({
      start: offset,
      length: limit,
      order: "",
      search: searchText,
    });
  };

  addImei = () => {
    const { newImei } = this.state;
    if (!isValueEmptyOrNull(newImei.value)) {
      this.props.requestCreateImei(newImei.value);
    } else
      this.setState({
        hasError: true,
      });
  };

  handleEditImei = (index) => {
    let imei = this.state.imeis[index];
    this.setState({
      editImei: {
        id: imei,
        value: imei,
      },
    });
  };

  handleConfirmEdit = () => {
    const { editImei } = this.state;

    if (!isValueEmptyOrNull(editImei.value)) {
      this.props.requestEditImei(editImei);
    } else
      this.setState({
        editHasError: true,
      });
  };

  handleOnDelete = (index) => {
    let imei = this.state.imeis[index];
    this.setState({
      openDeleteDialog: true,
      imeiToDelete: imei,
    });
  };

  imeiPageChange = (offset, e) => {
    this.setState(
      {
        offset,
      },
      () => this.getImeis()
    );
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.getImeis(false);
  };

  handleEditChange = (e) => {
    const value = e.currentTarget.value;
    this.setState((prevState) => ({
      editImei: { ...prevState.editImei, value },
    }));
  };

  handleImeiQueryChange = (query) => {
    const value = query.currentTarget.value;
    this.setState((prevState) => ({
      newImei: { ...prevState, value },
      searchText: value,
    }));
    this.changeSearchDebounce(value);
  };

  confirmDelete = () => {
    this.props.requestDeleteImei(this.state.imeiToDelete);
  };

  render() {
    const { classes, t, theme } = this.props;
    const { imeis, offset, limit, imeiToDelete, openDeleteDialog } = this.state;
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <Paper elevation={2} className={classes.paper}>
            <Avatar className={classes.customFab}>
              <ImeiListIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("IMEIs")}
            </Typography>
            <Divider className={classes.customDivider} />
            <Input
              action
              className={classes.imeiInput}
              style={{ width: "100%" }}
              onChange={this.handleImeiQueryChange}
            >
              <input />
              <Button className={classes.inputButton} onClick={this.addImei}>
                <Icon name="mail" className={classes.leftIcon} />
                {t("Add")}
              </Button>
            </Input>
            <Table
              celled
              style={{ marginTop: 15 }}
              className={classes.elementTable}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className={classes.tableHead}>
                    {t("ImeiList")}
                  </Table.HeaderCell>
                  <Table.HeaderCell className={classes.tableHead} />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {!this.state.isDesktop &&
                  imeis.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography>{item}</Typography>
                          <IconButton
                            className={classes.button}
                            aria-label="Delete"
                            size="small"
                            onClick={() => this.handleOnDelete(index)}
                          >
                            <DeleteRoundedIcon
                              className={classes.deleteIcon}
                              fontSize="inherit"
                            />
                          </IconButton>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                {this.state.isDesktop &&
                  imeis.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item}</Table.Cell>
                      <Table.Cell
                        style={{
                          width: "120px",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                        }}
                      >
                        <IconButton
                          className={classes.button}
                          aria-label="Delete"
                          size="small"
                          onClick={() => this.handleOnDelete(index)}
                        >
                          <DeleteRoundedIcon
                            className={classes.deleteIcon}
                            fontSize="inherit"
                          />
                        </IconButton>
                        {/* <IconButton
                        className={classes.button}
                        aria-label="Delete"
                        size="small"
                        onClick={() => this.handleEditImei(index)}
                      >
                        <EditRoundedIcon
                          className={classes.editIcon}
                          fontSize="inherit"
                        />
                      </IconButton> */}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
            <div style={{ marginTop: 15 }}>
              {imeis.length > 0 && (
                <StyledPagination
                  limit={limit}
                  offset={offset}
                  total={this.state.dataCount}
                  innerButtonCount={1}
                  outerButtonCount={1}
                  onClick={(e, offset) => this.imeiPageChange(offset, e)}
                  currentPageColor="inherit"
                  otherPageColor="inherit"
                  previousPageLabel={
                    <ArrowLeft style={styles.iconRotateStyle} />
                  }
                  nextPageLabel={<ArrowRight />}
                  //className={classes.customPagination}
                />
              )}
            </div>
          </Paper>
        </div>

        <Dialog
          onClose={() => this.setState({ editImei: undefined })}
          aria-labelledby="simple-dialog-title"
          open={!isNullOrUndefined(this.state.editImei)}
        >
          <DialogTitle id="simple-dialog-title">{t("EditImei")}</DialogTitle>
          <DialogContent>
            <Input
              action
              className={classes.imeiInput}
              style={{ width: "100%" }}
              onChange={this.handleEditChange}
              value={
                !isNullOrUndefined(this.state.editImei)
                  ? this.state.editImei.value
                  : ""
              }
            >
              <input />
              <Button
                className={classes.inputButton}
                onClick={this.handleConfirmEdit}
              >
                <Icon name="mail" className={classes.leftIcon} />
                {t("Edit")}
              </Button>
            </Input>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ editImei: undefined })}
              autoFocus
              size="small"
              style={{ color: theme.palette.text.main }}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </Dialog>

        <ConfirmationDialogAction
          title={t("DeleteImei")}
          body={
            t("TheImeiWillBeDeleted") +
            " " +
            imeiToDelete +
            ", " +
            t("continue")
          }
          success={this.props.successDeleteImei}
          loading={this.props.loadingDeleteImei}
          error={this.props.error}
          deleteFunction={this.props.requestDeleteImei}
          elementId={[imeiToDelete]}
          updateParentFunction={() => {
            this.getImeis();
            this.setState({
              openDeleteDialog: false,
              optionSelected: undefined,
            });
          }}
          open={openDeleteDialog}
          onClose={() => this.setState({ openDeleteDialog: false })}
        />
      </main>
    );
  }
}

const mapDispatchToProps = {
  requestGetImei,
  requestCreateImei,
  requestEditImei,
  requestDeleteImei,
  receiveGetImei,
};

function mapStateToProps({ Imei }) {
  return {
    imeis: Imei.imeis,
    error: Imei.error,
    successGetImei: Imei.successGetImei,
    successCreateImei: Imei.successCreateImei,
    successEditImei: Imei.successEditImei,
    successDeleteImei: Imei.successDeleteImei,
    createResponse: Imei.createResponse,
    editResponse: Imei.editResponse,
    loadingDeleteImei: Imei.loadingDeleteImei,
  };
}

const ImeiConnected = connect(mapStateToProps, mapDispatchToProps)(Imei);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(ImeiConnected)
);
