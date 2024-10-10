import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import ApiHandler from "../../../../services/ApiHandler";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import { Popup } from "semantic-ui-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { isNullOrUndefined } from "util";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Icon } from "semantic-ui-react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { requestCheckExistReaderName } from "../../../../actions/AccessControl/reader_actions";
import styles from "../../../../assets/styles/AccessControl_styles/Reader_Styles/assignReadersDoorsStyles";

const AssignReadersDoors = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [state, setState] = useState({
    allGates: props.virtualZone ? props.virtualZone.gates.slice() : [],
    allGatesNumber: props.virtualZone
      ? props.virtualZone.gates.slice().map((g) => g.gateNumber)
      : [],
    checkedLeftItems: [],
    checkedRightItems: [],
    rightGates: [],
    leftGates: [],
    open: false,
    numEntranceReader: 2,
    numExitReader: 2,
  });

  useEffect(() => {
    // Load readers and gates on component mount
    loadReaders();
  }, []);

  useEffect(() => {
    if (props.virtualZone !== state.virtualZone) {
      // Update state when virtualZone prop changes
      setState((prevState) => ({
        ...prevState,
        allGates: props.virtualZone.gates.slice(),
        entranceReaderText:
          props.virtualZone && prevState.entranceReaders.length === 0
            ? `${props.virtualZone.name}${t("EntranceReaderNameEnd")}`
            : `${props.virtualZone.name}${t("EntranceReaderNameEnd")} ${
                prevState.numEntranceReader
              }`,
        exitReaderText:
          props.virtualZone && prevState.exitReaders.length === 0
            ? `${props.virtualZone.name}${t("ExitReaderNameEnd")}`
            : `${props.virtualZone.name}${t("ExitReaderNameEnd")} ${
                prevState.numExitReader
              }`,
        allGatesNumber: props.virtualZone.gates
          .slice()
          .map((g) => g.gateNumber),
      }));
    }
  }, [props.virtualZone]);

  useEffect(() => {
    if (state.successExistReaderName) {
      if (state.existName) {
        setState((prevState) => ({ ...prevState, open: true }));
      } else {
        if (state.entrance) {
          handleAddEntranceReader();
        } else {
          handleAddExitReader();
        }
      }
    }
  }, [state.successExistReaderName]);

  const loadReaders = () => {
    const { virtualZone } = props;
    if (virtualZone) {
      ApiHandler.AccessControl.Readers.GetVirtualReadersByPanel(virtualZone.id)
        .then(({ data }) => {
          let exitReaders = [];
          let entranceReaders = [];
          data.map((reader) => {
            if (reader.type === "Exit") {
              exitReaders.push({
                id: reader.id,
                name: reader.name,
                gates: [],
              });
            }
            if (reader.type === "Entrance") {
              entranceReaders.push({
                id: reader.id,
                name: reader.name,
                gates: [],
              });
            }
            return 0;
          });
          setState(
            (prevState) => ({
              ...prevState,
              exitReaders,
              entranceReaders,
              isLoadingExitReaders: false,
              isLoadingEntranceReaders: false,
            }),
            () => {
              loadGates();
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setState({ exitReaders: [], entranceReaders: [] });
    }
  };
};

const mapDispatchToProps = {
  requestCheckExistReaderName: requestCheckExistReaderName,
};

const mapStateToProps = ({ Reader }) => {
  return {
    existName: Reader.existName,
    loadingExistReaderName: Reader.loadingExistReaderName,
    successExistReaderName: Reader.successExistReaderName,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignReadersDoors);
