import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../../services/ApiHandler";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { FormHelperText, LinearProgress } from "@mui/material";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import LocationIcon from "@mui/icons-material/AddLocationRounded";
import GateCard from "./NewGateCard";
import renderDefineZone from "./NewVirtualZoneMap";
import ViewGateCard from "./ViewGateCard";
import { useTranslation } from "react-i18next";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {
  createVirtualZone,
  editVirtualZone,
} from "../../../../actions/AccessControl/virtualZone_actions";
import { useNavigate } from "react-router-dom";
import styles from "../../../../assets/styles/AccessControl_styles/VirtualZone_Styles/newVirtualZoneStyles";

const formValues = {
  name: "",
  mode: undefined,
  gates: [],
  zoneSelected: undefined,
  lastGateNumber: -1,
};

const useStyles = makeStyles(styles);

const NewVirtualZone = ({ isEdit, isDetails, initValues }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoadingEntranceReaders, setIsLoadingEntranceReaders] =
    useState(true);
  const [isLoadingExitReaders, setIsLoadingExitReaders] = useState(true);
  const [newVirtualZone, setNewVirtualZone] = useState(
    initValues ? initValues : formValues
  );
  const [openDialogMap, setOpenDialogMap] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [positionArea, setPositionArea] = useState([]);
  const [polygon, setPolygon] = useState(
    initValues && initValues.gatesNumber > 0 ? false : true
  );
  const [rectangle, setRectangle] = useState(
    initValues && initValues.gatesNumber > 0 ? false : true
  );
  const [activeStep, setActiveStep] = useState(0);
  const [editGate, setEditGate] = useState(undefined);
  const [defaultGate, setDefaultGate] = useState(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [positionCenter, setPositionCenter] = useState([
    -34.917961, -56.163585,
  ]);
  const [modesSuggestions, setModesSuggestions] = useState([]);

  const successCreate = useSelector((state) => state.VirtualZone.createSuccess);
  const error = useSelector((state) => state.VirtualZone.error);
  const editSuccess = useSelector((state) => state.VirtualZone.editSuccess);
  const messaggeError = useSelector((state) => state.VirtualZone.messagge);

  const steps = [
    { name: "NewVirtualZone", step: 0 },
    { name: "AssignReader", step: 1 },
  ];

  useEffect(() => {
    if (successCreate || error || editSuccess) {
      setIsCreating(false);
      if (successCreate) {
        SnackbarHandler.showMessage(t("successCreateVirtualZone"));
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setNewVirtualZone(formValues);
          navigate.push("/virtualzone");
        }, 1000);
      } else if (error) {
        SnackbarHandler.showMessage(messaggeError, "error");
      }
    }
  }, [successCreate, error, editSuccess, t, history, messaggeError]);

  useEffect(() => {
    NavBarAccessControl.hideLoader();

    if (isEdit || isDetails) {
      ApiHandler.AccessControl.VirtualZones.getVirtualZoneById(
        newVirtualZone.id
      )
        .then(({ data }) => {
          let gatesToAdd = [];
          let i = -1;
          data.gates.forEach((gate) => {
            i += 1;
            let entrance = {
              value: gate.entranceReader,
              label: gate.entranceReaderName,
            };
            let exit = {
              value: gate.exitReader,
              label: gate.exitReaderName,
            };
            let gateToAdd = {
              gateNumber: i,
              entranceReader: entrance,
              exitReader: exit,
              coord1: gate.coord1,
              coord2: gate.coord2,
            };
            gatesToAdd.push(gateToAdd);
            setPositionArea((prevState) => [
              ...prevState,
              [gate.coord1.lat, gate.coord1.lng],
            ]);
          });

          setNewVirtualZone((prevState) => ({
            ...prevState,
            gates: gatesToAdd,
            zoneSelected: data.zoneSelected,
            lastGateNumber: i,
            mode: data.mode,
          }));
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setModesSuggestions([
      { value: 0, label: "Normal" },
      { value: 1, label: "Trigger" },
    ]);
  }, [isEdit, isDetails, newVirtualZone.id]);

  const handleDeleteGateCard = useCallback(
    (gate) => {
      let newVirtualZoneGates = newVirtualZone.gates.slice();
      const gates = newVirtualZoneGates.filter(
        (g) => g.gateNumber !== gate.gateNumber
      );
      if (gates.length === 0) {
        setPolygon(true);
        setRectangle(true);
      }
      setNewVirtualZone((prevState) => ({
        ...prevState,
        gates: gates,
        zoneSelected: undefined,
      }));
    },
    [newVirtualZone]
  );

  const handleEditDoor = useCallback(
    (id) => {
      setEditGate(newVirtualZone.gates[id]);
      setPosition([
        [
          newVirtualZone.gates[id].coord1.lat,
          newVirtualZone.gates[id].coord1.lng,
        ],
        [
          newVirtualZone.gates[id].coord2.lat,
          newVirtualZone.gates[id].coord2.lng,
        ],
      ]);
    },
    [newVirtualZone]
  );

  const renderGatesCards = useCallback(() => {
    let gatesCards;
    if (newVirtualZone.gates) {
      gatesCards = newVirtualZone.gates.map((gate, index) => (
        <Grid key={index} item xs={6} md={4} style={{ marginBottom: 5 }}>
          <ViewGateCard
            handleEdit={() => handleEditDoor(index)}
            isDetails={isDetails}
            isEdit={isEdit}
            gate={gate}
            gateNumber={gate.gateNumber}
            onDelete={handleDeleteGateCard}
          />
        </Grid>
      ));
    } else {
      gatesCards = [];
    }
    if (editGate && !isDetails) {
      gatesCards.unshift(
        <Grid key="gate" item xs={12} md={12} style={{ marginBottom: 5 }}>
          <GateCard
            onConfirm={handleEditGate}
            defaultValues={defaultGate}
            gate={editGate}
            virtualZone={newVirtualZone}
          />
        </Grid>
      );
    }
    gatesCards.unshift(
      <Grid key="map" item xs={12} md={12} style={{ marginBottom: 5 }}>
        {renderDefineZone({
          ...newVirtualZone,
          ...positionArea,
          heightValue: 0.35,
          onDeleted: _onDeleted,
          onCreate: _onCreate,
          onDeleteStart: _onDeleteStart,
        })}
      </Grid>
    );
    return gatesCards;
  }, [
    newVirtualZone,
    isDetails,
    isEdit,
    handleEditDoor,
    handleDeleteGateCard,
    editGate,
    defaultGate,
    positionArea,
  ]);

  const handleAddGate = (gate) => {
    let gates = newVirtualZone.gates.slice();
    let gateNumber = newVirtualZone.lastGateNumber + 1;
    let gateToAdd = {
      entranceReader: gate.entranceReader,
      exitReader: gate.exitReader,
      gateNumber: gateNumber,
      coord1: {
        lat: gate.coord1.lat,
        lng: gate.coord1.lng,
      },
      coord2: {
        lat: gate.coord2.lat,
        lng: gate.coord2.lng,
      },
    };
    gates.push(gateToAdd);
    setNewVirtualZone((prevState) => ({
      ...prevState,
      gates: gates,
      lastGateNumber: gateNumber,
      zoneSelected: undefined,
    }));
  };

  const handleEditGate = (gate) => {
    let gates = newVirtualZone.gates.slice();
    let editedGate = {
      entranceReader: gate.entranceReader,
      exitReader: gate.exitReader,
      gateNumber: gate.gateNumber,
      coord1: {
        lat: gate.coord1.lat,
        lng: gate.coord1.lng,
      },
      coord2: {
        lat: gate.coord2.lat,
        lng: gate.coord2.lng,
      },
    };
    gates[gate.gateNumber] = editedGate;
    setNewVirtualZone((prevState) => ({
      ...prevState,
      gates: gates,
      zoneSelected: undefined,
    }));
  };

  const _onCreate = (position) => {
    let positions = [];
    position.forEach((coord) => {
      positions.push([coord.lat, coord.lng]);
    });
    setPositionArea(positions);
    setPolygon(false);
    setRectangle(false);
  };

  const _onDeleteStart = () => {
    setPolygon(true);
    setRectangle(true);
  };

  const _onDeleted = () => {
    setPolygon(true);
    setRectangle(true);
    setPositionArea([]);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSave = () => {
    const error = validateForm();
    if (!isValueEmptyOrNull(error)) {
      setFormErrors(error);
      return;
    }

    let virtualZoneData = {
      ...newVirtualZone,
      positionCenter: positionCenter,
      polygon: polygon,
      rectangle: rectangle,
    };

    setIsCreating(true);
    if (isEdit) {
      dispatch(editVirtualZone(virtualZoneData));
    } else {
      dispatch(createVirtualZone(virtualZoneData));
    }
  };

  const validateForm = () => {
    let error = {};
    if (isValueEmptyOrNull(newVirtualZone.name)) {
      error.name = "Name cannot be empty";
    }
    if (newVirtualZone.gates.length === 0) {
      error.gates = "You must add at least one gate";
    }
    return error;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h6" color="textPrimary">
            {isDetails ? t("Details") : isEdit ? t("Edit") : t("Create")}{" "}
            {t("VirtualZone")}
          </Typography>
          <Divider />
          <form autoComplete="off" noValidate>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  name="name"
                  label={t("Name")}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  value={newVirtualZone.name}
                  onChange={(e) =>
                    setNewVirtualZone({
                      ...newVirtualZone,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  id="mode"
                  name="mode"
                  label={t("Mode")}
                  options={modesSuggestions}
                  value={newVirtualZone.mode}
                  components={components}
                  onChange={(value) =>
                    setNewVirtualZone({ ...newVirtualZone, mode: value })
                  }
                />
              </Grid>
            </Grid>
            <Stepper
              nonLinear
              activeStep={activeStep}
              style={{ marginTop: 40 }}
            >
              {steps.map((label) => (
                <Step key={label.name}>
                  <StepButton onClick={() => setActiveStep(label.step)}>
                    {t(label.name)}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              {renderGatesCards()}
            </Grid>
            {isCreating ? (
              <LinearProgress className={classes.progress} />
            ) : (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleSave}
                disabled={isSuccess}
                style={{ marginTop: 20 }}
              >
                {isEdit ? t("Update") : t("Save")}
              </Button>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

NewVirtualZone.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  isDetails: PropTypes.bool.isRequired,
  initValues: PropTypes.object,
};

export default NewVirtualZone;
