import React, { Component } from "react";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import ApiHandler from "../../../../services/ApiHandler";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import {
  subscribeForNewData,
  unSubscribeForNewData
} from "../../../../utils/WebSockets";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Paper, Dialog, Slide } from "@mui/material";

import NewAgendaEventForm from "./NewAgendaEvent";
import DetailsAgendaEvent from "./DetailsAgendaEvent";
import FullScreenLoader from "../../../Shared/FullScreenLoader";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import styles from "../../../assets/styles/EasyAccess_styles/Agenda_styles/calendarStyles.js";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

let startDate = new Date().setDate(1);
let endDate = new Date().setDate(31);

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      openNewEventDialog: false
    };
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
    subscribeForNewData(this.socketMessage.bind(this), 1);
    ApiHandler.EasyAccess.Calendar.getEvents(startDate, endDate, "")
      .then(response => {
        let events = [];
        response.data.map(e => {
          return events.push({
            id: e.id,
            title: e.title,
            allDay: e.allDay,
            start: e.startDate,
            end: e.endDate,
            description: e.description,
            place: e.place,
            persons: [],
            vehicles: [],
            drivers: []
          });
        });

        this.setState({
          events,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  socketMessage = data => {
  };

  componentWillUnmount() {
    unSubscribeForNewData(1);
  }

  loadData = contentLoader => {
    const { searchText } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    ApiHandler.EasyAccess.Calendar.getEvents(
      startDate,
      endDate,
      searchText
    ).then(response => {
      const lastSearchText = this.state.searchText;
      let events = [];
      response.data.map(e => {
        return events.push({
          id: e.id,
          title: e.title,
          allDay: e.allDay,
          start: e.startDate,
          end: e.endDate,
          description: e.description,
          place: e.place,
          persons: [],
          vehicles: [],
          drivers: []
        });
      });

      this.setState({
        events,
        isLoadingNewData: false,
        isSearching: lastSearchText !== searchText
      });
      if (lastSearchText !== searchText) this.loadData(false);
    });
  };

  handleOnDetails = event => {
    event.startDate = event.start;
    event.endDate = event.end;
    this.setState({
      eventOnDetails: event
    });
  };

  changePage = newDate => {
    let month = moment(newDate).get("month");
    startDate = new Date(startDate).setMonth(month, 1);
    endDate = new Date(endDate).setMonth(month, 31);
    this.loadData(true);
  };

  changeSearch = searchText => {
    const { isSearching } = this.state;
    this.setState({
      searchText,
      isSearching: true
    });
    if (!isSearching) {
      this.loadData(false);
    }
  };

  handleSelect = ({ start, end }) => {
    this.setState({
      openNewEventDialog: true,
      newAgendaEventDates: {
        start,
        end
      }
    });
  };

  handleClose = () => {
    this.setState({
      openNewEventDialog: false
    });
  };

  render() {
    const {
      isLoading,
      isLoadingNewData,
      openNewEventDialog,
      eventOnDetails
    } = this.state;
    const { classes, isDialog, t } = this.props;
    if (isLoading)
      return (
        <div className={classes.skeletonLoader}>
          <TableSkeletonLoader />
        </div>
      );
    return (
      <div>
        <div className={!isDialog ? classes.layout : undefined}>
          <div className={!isDialog ? classes.fill : undefined}>
            <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
              <BigCalendar
                selectable
                localizer={localizer}
                events={this.state.events}
                defaultView={BigCalendar.Views.MONTH}
                views={[BigCalendar.Views.MONTH, BigCalendar.Views.AGENDA]}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={this.handleOnDetails}
                onSelectSlot={this.handleSelect}
                className={classes.calendar}
                onNavigate={this.changePage}
                messages={{
                  today: t("Today"),
                  next: t("Next"),
                  previous: t("Back"),
                  month: t("Month"),
                  week: t("Week"),
                  day: t("Day"),
                  date: t("Date"),
                  time: t("horary"),
                  event: t("Event"),
                  allDay: t("AllDay"),
                  tomorrow: t("Tomorrow")
                }}
              />
            </Paper>
            <Dialog
              fullScreen
              onClose={this.handleClose}
              TransitionComponent={Transition}
              open={openNewEventDialog}
              onBackdropClick={this.handleClose}
            >
              <NewAgendaEventForm
                onConfirm={this.handleClose}
                onClose={this.handleClose}
                dates={this.state.newAgendaEventDates}
                updateParent={() => this.loadData(true)}
                open={openNewEventDialog}
              />
            </Dialog>
            <Dialog
              maxWidth="sm"
              fullWidth
              TransitionComponent={Transition}
              open={!isNullOrUndefined(eventOnDetails)}
              onClose={() => this.setState({ eventOnDetails: undefined })}
            >
              <DetailsAgendaEvent
                onClose={() => this.setState({ eventOnDetails: undefined })}
                initValues={eventOnDetails}
                updateParent={() => this.loadData(true)}
              />
            </Dialog>
          </div>
        </div>
        <FullScreenLoader isLoading={isLoadingNewData} />
      </div>
    );
  }
}

// const InitalConnected = connect(null, mapDispatchToProps)(Init)

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTranslation()(withStyles(styles)(Calendar));
