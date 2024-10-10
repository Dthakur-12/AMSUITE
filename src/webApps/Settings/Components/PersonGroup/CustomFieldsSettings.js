import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import CustomStyles from "../../../../assets/styles/Settings_styles/AdministrationFieldsStyles";
import AppBar from "@mui/material/AppBar";
import { withTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ConfirmationDialogAction from "../../../Shared/ConfirmationDialogAction";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/AddRounded";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import NewCustomAttribute from "../NewCustomAttribute";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { debounce } from "throttle-debounce";
import { isNullOrUndefined } from "util";
import TablePagination from "@mui/material/TablePagination";
import {
  requestCustomFields,
  requestDeleteField,
  requestCustomFieldsIntegrator,
  requestEditCustomFieldVisibility,
} from "../../../../actions/Settings/settings_actions";
import CustomFieldDetails from "../CustomFieldDetails";
import { socketIO } from "../../../../utils/WebSockets";

import FieldList from "../FieldList";
import {
  Button,
  CircularProgress,
  Collapse,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  Slide,
} from "@mui/material";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import AMStuiteEnums from "../../../../utils/Enums";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const mapDispatchToProps = {
  requestCustomFields,
  requestDeleteField,
  requestCustomFieldsIntegrator,
  requestEditCustomFieldVisibility,
};

const mapStateToProps = ({ Settings, User }) => {
  return {
    customFields: Settings.customFields,
    selectedPersonGroup: Settings.selectedPersonGroup,
    loadingCustomFields: Settings.loadingCustomFields,
    loadingDeleteCustomFields: Settings.loadingDeleteCustomFields,
    successDeleteCustomFields: Settings.successDeleteCustomFields,
    successVisibilityUpdated: Settings.successVisibilityUpdated,
    currentUser: User.currentUser,
  };
};

class AdministrationFields extends Component {
  constructor(props) {
    super(props);
    const { t, entity = "", location } = this.props;
    this.state = {
      attributeToDelete: {},
      page: 0,
      rowsPerPage: 10,
      dataAttribute: [],
      entity: entity,
      selectedField: undefined,
      openDeleteDialog: false,
      openFormDialog: false,
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  componentDidMount() {
    this.loadAttributes();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.customFields !== prevState.customFields ||
      nextProps.loadingCustomFields !== prevState.loadingCustomFields
    ) {
      return {
        customFields: nextProps.customFields,
        loadingCustomFields: nextProps.loadingCustomFields,
      };
    } else return null;
  }

  handleCloseDetails = () => {
    this.setState({
      field: undefined,
    });
  };

  handleOnDetails = (field) => {
    this.setState({
      field,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.loadingCustomFields === false &&
      prevState.loadingCustomFields != this.state.loadingCustomFields
    ) {
      if (this.state.entity === "BADGE") {
        this.setState((prevState) => ({
          dataAttribute: this.state.customFields
            ? this.state.customFields.badges
            : [],
          attributesCount: this.state.customFields
            ? this.state.customFields.badges.length
            : 0,
        }));
      } else {
        this.setState((prevState) => ({
          dataAttribute: this.state.customFields
            ? this.state.customFields.cardholders
            : [],
          attributesCount: this.state.customFields
            ? this.state.customFields.cardholders.length
            : 0,
        }));
      }
    }
    if (
      (this.state.successDeleteCustomFields &&
        this.state.successDeleteCustomFields !==
          prevState.successDeleteCustomFields) ||
      (this.props.successVisibilityUpdated &&
        prevProps.successVisibilityUpdated !==
          this.props.successVisibilityUpdated)
    ) {
      this.loadAttributes();
      this.handleCloseDetails();
    }
  }

  loadAttributes = () => {
    console.log("////////////////CustomFieldsChanged////////////////////////");
    this.props.requestCustomFields();
  };

  handleQueryChange = (query) => {
    let value = query.currentTarget.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    //this.loadAttributes();
  };

  handleFieldSelected = (index) => {
    const { optionSelected } = this.state;
    this.setState({
      optionSelected: optionSelected === index ? undefined : index,
    });
  };
  handleVisibilityChange = (visibility, id) => {
    this.props.requestEditCustomFieldVisibility({ id, visibility });
  };

  handleAdd = () => {
    this.setState({
      openFormDialog: true,
    });
  };

  handleOnDelete = (item) => {
    this.setState({
      openDeleteDialog: true,
      attributeToDelete: item,
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (e) => {
    const value = Number(e.currentTarget.dataset.value);
    this.setState({ rowsPerPage: value });
  };

  handleCloseFormDialog = () => {
    this.loadAttributes();
    this.setState({
      openFormDialog: false,
    });
  };

  handleAttributeCreated = () => {
    console.log("Entra Create");
    this.handleCloseFormDialog();
    //NavBarAttributes.showLoader();
    this.loadAttributes();
  };

  render() {
    const { classes, theme, t, selectedPersonGroup } = this.props;
    const { attributesCount, rowsPerPage, page, customFields, entity } =
      this.state;
    console.log("customFields: ", customFields);
    const type = entity === "BADGE" ? "badges" : "cardholders";
    const filteredCustomFields = customFields[type]
      ? customFields[type].filter(
          (field) => field.visibility[AMStuiteEnums.TypeEnum[entity]] !== undefined
        )
      : [];
    console.log("filteredCustomFields: ", filteredCustomFields);

    return (
      (<main className={classes.layout}>
        <div className={classes.fill}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Paper elevation={2} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ArtTrackIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("Attributes")}
            </Typography>
            <Divider className={classes.customDivider} />
            <List style={{ width: "100%", paddingTop: 2 }}>
              <div>
                <ListItem button onClick={this.handleAdd}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarCreate}>
                      <AddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={t("AddAttribute")} />
                </ListItem>

                <Divider className={classes.customDivider} />
              </div>
              {/* <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon dataAttribute={this.state.dataAttribute} />
                  </div>
                  <InputBase
                    placeholder={t("search") + "..."}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={this.handleQueryChange}
                  />
                </div>
              </ListItem> */}
              <FieldList
                entity={
                  this.state.entity === "BADGE" ? "badges" : "cardholders"
                }
                subEntity={selectedPersonGroup ? selectedPersonGroup.id : 1}
                handleFieldSelected={this.handleFieldSelected}
                handleOnDetails={this.handleOnDetails}
                fieldSelected={this.state.optionSelected}
                field={this.state.field}
                handleOnDelete={this.handleOnDelete}
                handleVisibilityChange={this.handleVisibilityChange}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </List>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={customFields ? customFields[type].length : 0}
              labelRowsPerPage={`${t("show")} : `}
              labelDisplayedRows={() =>
                `${page * rowsPerPage + 1} - ${(page + 1) * rowsPerPage} ${t(
                  "of"
                )} ${customFields ? customFields[type].length : 0}`
              }
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
                // value: "previous",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
                // value: "next",
              }}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
              className={classes.customPagination}
            />
          </Paper>
          <ConfirmationDialogAction
            title={t("DeleteAttribute")}
            body={t("TheAttributteWillBeDeleted")}
            deleteFunction={this.props.requestDeleteField}
            elementId={this.state.attributeToDelete.id}
            loading={this.props.loadingDeleteCustomFields}
            success={this.props.successDeleteCustomFields}
            updateParentFunction={() => {
              this.loadAttributes();
              this.setState({
                openDeleteDialog: false,
                optionSelected: undefined,
              });
            }}
            open={this.state.openDeleteDialog}
            onClose={() => this.setState({ openDeleteDialog: false })}
          />
          <Dialog
            open={this.state.openFormDialog}
            TransitionComponent={Transition}
            onClose={this.handleCloseFormDialog}
            maxWidth="md"
            fullWidth
            scroll="paper"
          >
            <NewCustomAttribute
              handleClose={this.handleCloseFormDialog}
              handleAttributeCreated={this.handleAttributeCreated}
              isEdit={!isNullOrUndefined(this.state.attributeOnEdit)}
              entity={this.state.entity === "BADGE" ? 0 : 1}
              subEntity={selectedPersonGroup ? selectedPersonGroup.id : 0}
              attributteOnEdit={
                this.state.attributeOnEdit
                  ? this.state.attributeOnEdit
                  : undefined
              }
            />
          </Dialog>

          {!isNullOrUndefined(this.state.field) && (
            <Dialog
              open={!isNullOrUndefined(this.state.field)}
              TransitionComponent={Transition}
              onClose={this.handleCloseDetails}
              maxWidth="md"
              fullWidth
              scroll="paper"
            >
              <CustomFieldDetails
                updateParent={this.loadCustomFields}
                isEdit
                onCreate={this.handleCloseDetails}
                field={this.state.field}
                entity={this.props.entity}
                subEntity={selectedPersonGroup ? selectedPersonGroup.id : 0}
              />
            </Dialog>
          )}
        </div>
      </main>)
    );
  }
}

AdministrationFields.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  //entity: PropTypes.number.isRequired,
};

const AdministrationFieldsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministrationFields);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(AdministrationFieldsConnected)
);
