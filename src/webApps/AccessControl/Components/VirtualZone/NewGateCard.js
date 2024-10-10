import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import {
  CardHeader,
  CardActions,
  Button,
  CardContent,
  Grid,
  ListItemText,
  ListItemIcon
} from "@mui/material";
//import ExpandMore from "@mui/icons-material/ExpandMore";

import ApiHandler from "../../../../services/ApiHandler";

import Select from "react-select";
import DoorIcon from "@mui/icons-material/MeetingRoomRounded";
import components from "../../../Shared/ReactSelect";

import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/VirtualZone_Styles/newGateCardStyles";

const initData = {
  entranceReader: undefined,
  exitReader: undefined
};

class NewGateCard extends Component {
  constructor(props) {
    super(props);
    const { defaultValues, gate } = props;
    this.state = {
      showInfo: true,
      errorMessage: "",
      newGate: gate ? gate : initData,
      localChange: true,
      isLoadingEntranceReaders: true,
      isLoadingExitReaders: true,
      formErrors: {},
      isEdition: defaultValues !== undefined
    };
  }

  componentDidMount() {
    this.loadReaders();
    // this.loadExitReaders();
  }

  handleChange = name => event => {
    this.setState(prevState => ({
      newGate: {
        ...prevState.newGate,
        [name]: event
      }
    }));
  };

  handleCreate = () => {
    const { newGate } = this.state;
    this.props.onConfirm(newGate);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { gate } = nextProps;
    if (gate !== prevState.newGate) {
      return { gate, localChange: false };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.localChange && this.state.gate !== prevState.gate) {
      this.setState(prevState => ({
        newGate: prevState.gate,
        localChange: true
      }));
    }
  }

  loadReaders = () => {
    const { virtualZone } = this.props;
    ApiHandler.AccessControl.Readers.GetVirtualReadersByPanel(virtualZone.id)
      .then(({ data }) => {
        let exitReadersSuggestions = [];
        let entranceReadersSuggestions = [];
        data.map(reader => {
          if (reader.type === "Exit") {
            exitReadersSuggestions.push({
              value: reader.id,
              label: reader.name
            });
          }
          if (reader.type === "Entrance") {
            entranceReadersSuggestions.push({
              value: reader.id,
              label: reader.name
            });
          }
          return 0;
        });
        this.setState({
          exitReadersSuggestions,
          entranceReadersSuggestions,
          isLoadingExitReaders: false,
          isLoadingEntranceReaders: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      newGate,
      entranceReadersSuggestions,
      exitReadersSuggestions,
      isLoadingEntranceReaders,
      isLoadingExitReaders
    } = this.state;
    const { classes, theme, t } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        },
        width: "100%",
        menuList: {
          maxHeight: 100
        }
      })
    };

    return (
      (<div>
        {/* <Card className={classes.badge} elevation={24}> */}
        <CardHeader
          // avatar={
          //     newPerson.photo ?
          //         <Avatar onClick={this.handleOpenFilesDialog} style={{ cursor: 'pointer' }} className={classes.bigAvatar} src={URL.createObjectURL(newPerson.photo)} />
          //         :
          //         <Fab size='large' color="default" onClick={this.handleOpenFilesDialog} >
          //             <PhotoIcon />
          //         </Fab>
          // }
          // action={
          //   <IconButton
          //     onClick={() => this.setState({ showInfo: !showInfo })}
          //     className={classnames(classes.expand, {
          //       [classes.expandOpen]: this.state.showInfo
          //     })}
          //   >
          //     <ExpandMore />
          //   </IconButton>
          // }
          title={
            <Grid
              item
              xs={12}
              md={12}
              style={{ flexDirection: "row", display: "flex" }}
            >
              <ListItemIcon>
                <DoorIcon className={classes.iconDoor} />
              </ListItemIcon>
              <ListItemText
                primary={newGate && `${t("Door")} ${newGate.gateNumber}`}
              />
            </Grid>
          }
        />
        {/* <Collapse in={this.state.showInfo} timeout="auto" unmountOnExit> */}
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <Select
                classes={classes}
                styles={selectStyles}
                options={entranceReadersSuggestions}
                components={components}
                onChange={this.handleChange("entranceReader")}
                placeholder={t("entranceReaders")}
                maxMenuHeight={200}
                isLoading={isLoadingEntranceReaders}
                value={
                  newGate.entranceReader && newGate.entranceReader.value !== 0
                    ? newGate.entranceReader
                    : []
                }
                isDisabled={isLoadingEntranceReaders}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                classes={classes}
                styles={selectStyles}
                options={exitReadersSuggestions}
                components={components}
                onChange={this.handleChange("exitReader")}
                placeholder={t("exitReaders")}
                maxMenuHeight={200}
                isLoading={isLoadingExitReaders}
                value={
                  newGate.exitReader && newGate.exitReader.value !== 0
                    ? newGate.exitReader
                    : []
                }
                // defaultValue={
                //   gate.exitReader.label != "" ? gate.exitReader : undefined
                // }
                isDisabled={isLoadingExitReaders}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button size="small" onClick={this.handleCreate}>
            {t("confirm")}
          </Button>
        </CardActions>
        {/* </Collapse> */}
        {/* </Card> */}
      </div>)
    );
  }
}

NewGateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewGateCard)
);
