import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
// import { useStyles } from "./styles";
import ApiHandler from "../../../../services/ApiHandler";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import {
  requestCreateReader,
  requestEditReader,
} from "../../../../actions/AccessControl/reader_actions";
import { requestVirtualZone } from "../../../../actions/AccessControl/virtualZone_actions";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormHelperText,
  CircularProgress,
  LinearProgress,
  Fab,
} from "@mui/material";
import PlusIcon from "@mui/icons-material/AddRounded";
import { green } from "@mui/material/colors";

const GateAccessType = {
  Entrance: 1,
  Exit: 2,
};

const NewReader = ({ t, isDialog, isDetails, isEdit }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [newReader, setNewReader] = useState({
    readerID: "",
    name: "",
    panel: undefined,
    type: 1,
  });
  const [openDialogPanels, setOpenDialogPanels] = useState(false);
  const [typesSuggestions, setTypesSuggestions] = useState([]);
  const [selectedType, setSelectedType] = useState({
    value: 1,
    label: t("Entrance"),
  });
  const [formErrors, setFormErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { successCreate, successEdit, data, dataCount, loadingEmp, isLoading } =
    useSelector((state) => ({
      successCreate: state.Reader.successCreate,
      successEdit: state.Reader.successEdit,
      data: state.VirtualZone.virtualZones,
      dataCount: state.VirtualZone.virtualZoneCount,
      loadingEmp: state.VirtualZone.loading,
      isLoading: state.VirtualZone.loading,
    }));

  useEffect(() => {
    const loadTypes = () => {
      const typesSuggestions = [
        { value: 1, label: t("Entrance") },
        { value: 2, label: t("Exit") },
      ];
      setTypesSuggestions(typesSuggestions);
    };

    loadTypes();

    if (location.state && location.state.initValues) {
      const initValues = location.state.initValues;
      setSelectedType({
        value: GateAccessType[initValues.type],
        label: t(GateAccessType[initValues.type] === 1 ? "Entrance" : "Exit"),
      });
      setNewReader((prev) => ({
        ...prev,
        panel: { id: initValues.panelID, name: initValues.panel },
        type: GateAccessType[initValues.type],
      }));
    }
  }, [t, location.state]);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setNewReader((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedType(typesSuggestions.find((option) => option.value === value));
    setNewReader((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleOpenPanels = () => {
    setOpenDialogPanels(true);
  };

  const validateCreate = () => {
    return {
      name: !newReader.name,
      type: !newReader.type,
      panel: !newReader.panel,
    };
  };

  const handleCreate = () => {
    const errors = validateCreate();
    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      setIsCreating(true);
      const readerData = {
        ...newReader,
        panel: newReader.panel ? newReader.panel.id : 0,
        type: newReader.type || 0,
      };

      ApiHandler.AccessControl.Readers.createReader(readerData)
        .then(() => {
          SnackbarHandler.showMessage(t("successCreateReader"));
          setIsCreating(false);
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/readers");
          }, 1000);
        })
        .catch((error) => {
          setIsCreating(false);
          SnackbarHandler.showMessage(error.error, "error");
        });
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  const handleEdit = () => {
    const errors = validateCreate();
    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      setIsCreating(true);
      const readerData = {
        ...newReader,
        panel: newReader.panel ? newReader.panel.id : 0,
        type: newReader.type || 0,
      };

      ApiHandler.AccessControl.Readers.editReader(readerData)
        .then(() => {
          setIsCreating(false);
          setIsSuccess(true);
          navigate("/readers");
          SnackbarHandler.showMessage(t("successEditReader"), "success");
        })
        .catch(({ error }) => {
          SnackbarHandler.showMessage(error.message, "error");
          setIsCreating(false);
        });
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  const handleVirtualZoneSelected = (virtualZone) => {
    setNewReader((prev) => ({
      ...prev,
      panel: virtualZone,
    }));
    setOpenDialogPanels(false);
  };

  return (
    (<main className={!isDialog ? classes.layout : undefined}>
      <div className={!isDialog ? classes.fill : undefined}>
        <LinearProgress
          style={{
            opacity: isCreating ? "1" : "0",
            width: "100%",
            background: "none",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
          variant="query"
        />
        <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
          <Avatar className={classes.customFab}>
            <PlusIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isDetails ? t("ReaderDetails") : t("NewVirtualReader")}
          </Typography>
          <Grid
            container
            item
            xs={12}
            md={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={24}
          >
            <Grid
              container
              item
              xs={12}
              md={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={24}
              style={{ paddingTop: "10%" }}
            >
              <Grid item xs={12} md={12} className={classes.grid}>
                <TextField
                  label={t("name")}
                  onChange={handleChange("name")}
                  required
                  fullWidth
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: formErrors.name ? 1 : 0 },
                  }}
                  className={classes.customTextField}
                  error={formErrors.name}
                  disabled={isDetails}
                  value={newReader.name}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                style={{ paddingTop: 0, marginTop: 12 }}
              >
                <Select
                  classes={classes}
                  styles={selectStyles}
                  components={components}
                  options={typesSuggestions}
                  onChange={handleSelectChange}
                  placeholder={t("Type")}
                  maxMenuHeight={200}
                  isLoading={isLoading}
                  value={selectedType}
                  isDisabled={isDetails}
                />
                <FormHelperText
                  style={{ opacity: formErrors.type ? 1 : 0 }}
                  error={formErrors.type}
                >
                  {t("inputEmpty")}
                </FormHelperText>
              </Grid>
              <Grid container item xs={12} md={12}>
                <Grid item xs={12} md={12}>
                  <Typography component="h1" variant="subtitle1">
                    {t("AssociateVirtualZone")}
                  </Typography>
                  <Divider className={classes.customDivider} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      {!isDetails && (
                        <Fab
                          size="small"
                          color="default"
                          onClick={handleOpenPanels}
                          className={classes.customFab}
                          style={{
                            backgroundColor: formErrors.panel
                              ? "#d32f2f"
                              : undefined,
                          }}
                        >
                          <PlusIcon className={classes.fabIcon} />
                        </Fab>
                      )}
                      <ListItemText
                        primary={
                          newReader.panel
                            ? newReader.panel.name
                            : t("Unspecified")
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {!isDetails && (
            <div
              className={classes.submit}
              style={{ position: "relative", width: "100%" }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isCreating}
                onClick={isEdit ? handleEdit : handleCreate}
                style={{
                  background: isSuccess ? green[500] : undefined,
                  color: theme.palette.text.main,
                }}
              >
                {isSuccess
                  ? isEdit
                    ? t("successEdit")
                    : t("successCreate")
                  : isCreating
                  ? ""
                  : isEdit
                  ? t("EditReader")
                  : t("CreateReader")}
              </Button>
              {isCreating && (
                <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12,
                    marginLeft: -12,
                    color: "white",
                  }}
                />
              )}
            </div>
          )}
          {/* DataTableDialogAction component here */}
        </Paper>
      </div>
    </main>)
  );
};

NewReader.propTypes = {
  t: PropTypes.func.isRequired,
  isDialog: PropTypes.bool,
  isDetails: PropTypes.bool,
  isEdit: PropTypes.bool,
};

export default withTranslation()(NewReader);
