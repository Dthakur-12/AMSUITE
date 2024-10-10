import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isNullOrUndefined } from "util";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";
import ApiHandler from "../../services/ApiHandler";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { isValueEmptyOrNull } from "../../utils/HelperFunctions";

const formValues = {
  name: "",
  online: true,
  intervalSelected: [
    { start: undefined, end: undefined },
    { start: undefined, end: undefined },
    { start: undefined, end: undefined },
    { start: undefined, end: undefined },
  ],
};

const withNewStall = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { initValues, t } = this.props;
      this.state = {
        formErrors: {},
        assignP: false,
        intervalList: { Breakfast: [], Lunch: [], Snack: [], Dinner: [] },
        newStall: initValues ? initValues : formValues,
        timeSuggestion: this.generateLimitSuggestions(),
        timeGroupsNames: ["Breakfast", "Lunch", "Snack", "Dinner"],
      };
    }
    calculateMinuts = (d) => {
      const date = new Date(d);
      const minuts = date.getHours() * 60 + date.getMinutes();
      return minuts;
    };

    calculateIntervals = (valueStart, valueEnd) => {
      let ret = [];
      let iter = valueStart;

      while (iter + 30 < valueEnd) {
        ret.push({ start: iter, end: iter + 30 });
        iter += 30;
      }
      if (valueEnd === 1439) {
        ret.push({ start: iter, end: iter + 29 });
      } else {
        ret.push({ start: iter, end: iter + 30 });
      }
      return ret;
    };

    // componentDidMount() {
    //   ApiHandler.Tikas.Stalls.getStallById(2)
    //     .then(({ data }) => {
    //       let intervalList = {
    //         Breakfast: [],
    //         Lunch: [],
    //         Snack: [],
    //         Dinner: [],
    //       };

    //       const breakfastStart = data.breakfastStart
    //         ? this.calculateMinuts(data.breakfastStart)
    //         : null;
    //       const breakfastEnd = data.breakfastEnd
    //         ? this.calculateMinuts(data.breakfastEnd)
    //         : null;

    //       const lunchStart = data.lunchStart
    //         ? this.calculateMinuts(data.lunchStart)
    //         : null;
    //       const lunchEnd = data.lunchEnd
    //         ? this.calculateMinuts(data.lunchEnd)
    //         : null;
    //       const snackStart = data.snackStart
    //         ? this.calculateMinuts(data.snackStart)
    //         : null;
    //       const snackEnd = data.snackEnd
    //         ? this.calculateMinuts(data.snackEnd)
    //         : null;
    //       const dinnerStart = data.dinnerStart
    //         ? this.calculateMinuts(data.dinnerStart)
    //         : null;
    //       const dinnerEnd = data.dinnerEnd
    //         ? this.calculateMinuts(data.dinnerEnd)
    //         : null;

    //       intervalList.Breakfast = data.breakfastStart
    //         ? this.calculateIntervals(breakfastStart, breakfastEnd)
    //         : [];
    //       intervalList.Lunch = data.lunchStart
    //         ? this.calculateIntervals(lunchStart, lunchEnd)
    //         : [];
    //       intervalList.Snack = data.snackStart
    //         ? this.calculateIntervals(snackStart, snackEnd)
    //         : [];
    //       intervalList.Dinner = data.dinnerStart
    //         ? this.calculateIntervals(dinnerStart, dinnerEnd)
    //         : [];
    //       this.setState({
    //         intervalList: intervalList,
    //         newStall: {
    //           name: data.name,
    //           online: data.online,
    //           intervalSelected: [
    //             { start: breakfastStart, end: breakfastEnd },
    //             { start: lunchStart, end: lunchEnd },
    //             { start: snackStart, end: snackEnd },
    //             { start: dinnerStart, end: dinnerEnd },
    //           ],

    //           stock: data.stock,
    //         },
    //       });
    //     })
    //     .catch(({ error }) => {
    //       console.log(error);
    //     });
    //}

    generateLimitSuggestions = () => {
      const intervals = [];
      const date = moment().startOf("day");
      for (var i = 0; i < 48; i++) {
        var minutes = date.hour() * 60 + date.minute();
        intervals.push({ value: minutes, label: date.format("LT") });
        date.add(30, "minutes");
      }
      date.subtract(1, "minutes");
      minutes = date.hour() * 60 + date.minute();
      intervals.push({ value: minutes, label: date.format("LT") });

      return intervals;
    };

    handleChangeName = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      value.includes("/")
        ? this.setState({ invalidCharacter: true })
        : this.setState({ invalidCharacter: false });
      this.setState((prevState) => ({
        newStall: {
          ...prevState.newStall,
          name: value.includes("/") ? prevState.newStall.name : value,
        },
      }));
    };
    handleChangeBoolean = () => {
      this.setState((prevState) => ({
        newStall: {
          ...prevState.newStall,
          online: !this.state.newStall.online,
        },
      }));
    };

    handleChangeIntervalLimit = (name, index) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      let interval = this.state.newStall.intervalSelected.slice();

      interval[index] = {
        ...this.state.newStall.intervalSelected[index],
        [name]: value,
      };

      if (
        name === "start" &&
        !isNullOrUndefined(this.state.newStall.intervalSelected[index].end)
      ) {
        const valueEnd = this.state.newStall.intervalSelected[index].end;
        const valueStart = value;
        let iter = valueStart;
        let int = [];
        while (iter < valueEnd - 30) {
          int.push({ start: iter, end: iter + 30 });
          iter += 30;
        }
        if (valueEnd === 1439) {
          int.push({ start: iter, end: iter + 29 });
        } else {
          int.push({ start: iter, end: iter + 30 });
        }

        this.setState((prevState) => ({
          ...prevState,
          intervalList: {
            ...prevState.intervalList,
            [this.state.timeGroupsNames[index]]: int,
          },
        }));
      }

      if (
        name === "end" &&
        !isNullOrUndefined(this.state.newStall.intervalSelected[index].start)
      ) {
        const valueStart = this.state.newStall.intervalSelected[index].start;

        const valueEnd = value;
        let iter = valueStart;
        let int = [];
        while (iter + 30 < valueEnd) {
          int.push({ start: iter, end: iter + 30 });
          iter += 30;
        }
        if (valueEnd === 1439) {
          int.push({ start: iter, end: iter + 29 });
        } else {
          int.push({ start: iter, end: iter + 30 });
        }

        this.setState((prevState) => ({
          ...prevState,
          intervalList: {
            ...prevState.intervalList,
            [this.state.timeGroupsNames[index]]: int,
          },
        }));
      }

      this.setState((prevState) => ({
        newStall: {
          ...prevState.newStall,
          intervalSelected: interval,
        },
      }));
    };
    validateGroups = () => {
      const { newStall } = this.state;
      return {
        Breakfast:
          !isNullOrUndefined(newStall.intervalSelected[0]) &&
          (isNullOrUndefined(newStall.intervalSelected[0].start) ||
            isNullOrUndefined(newStall.intervalSelected[0].end)),
        Lunch:
          !isNullOrUndefined(newStall.intervalSelected[1]) &&
          (isNullOrUndefined(newStall.intervalSelected[1].start) ||
            isNullOrUndefined(newStall.intervalSelected[1].end)),
        Snack:
          !isNullOrUndefined(newStall.intervalSelected[2]) &&
          (isNullOrUndefined(newStall.intervalSelected[2].start) ||
            isNullOrUndefined(newStall.intervalSelected[2].end)),
        Dinner:
          !isNullOrUndefined(newStall.intervalSelected[3]) &&
          (isNullOrUndefined(newStall.intervalSelected[3].start) ||
            isNullOrUndefined(newStall.intervalSelected[3].end)),
      };
    };
    intervalOverlap = (error) => {
      //Es para verificar que los intervalos no se superpongan
      const Breakfast = this.state.newStall.intervalSelected[0];
      const Lunch = this.state.newStall.intervalSelected[1];
      const Snack = this.state.newStall.intervalSelected[2];
      const Dinner = this.state.newStall.intervalSelected[3];

      if (!error.Breakfast && !error.Lunch && !error.Snack && !error.Dinner) {
        return (
          Breakfast.end <= Lunch.start &&
          Lunch.end <= Snack.start &&
          Snack.end <= Dinner.start
        );
      } else if (!error.Breakfast && !error.Lunch && !error.Snack) {
        return Breakfast.end <= Lunch.start && Lunch.end <= Snack.start;
      } else if (!error.Lunch && !error.Snack && !error.Dinner) {
        return Lunch.end <= Snack.start && Snack.end <= Dinner.start;
      } else if (!error.Breakfast && !error.Snack && !error.Dinner) {
        return Breakfast.end <= Snack.start && Snack.end <= Dinner.start;
      } else if (!error.Breakfast && !error.Lunch && !error.Dinner) {
        return Breakfast.end <= Lunch.start && Lunch.end <= Dinner.start;
      } else if (!error.Breakfast && !error.Lunch) {
        return Breakfast.end <= Lunch.start;
      } else if (!error.Breakfast && !error.Snack) {
        return Breakfast.end <= Snack.start;
      } else if (!error.Breakfast && !error.Dinner) {
        return Breakfast.end <= Dinner.start;
      } else if (!error.Lunch && !error.Snack) {
        return Lunch.end <= Snack.start;
      } else if (!error.Lunch && !error.Dinner) {
        return Lunch.end <= Dinner.start;
      } else if (!error.Snack && !error.Dinner) {
        return Snack.end <= Dinner.start;
      } else return true;
    };

    handleCreate = (productsStock) => {
      let stock = [];
      const errors = this.validateGroups();
      const { newStall, timeSuggestion } = this.state;
      const errorName = isValueEmptyOrNull(newStall.name);
      let objectToCreate = {};

      objectToCreate.name = newStall.name;
      objectToCreate.online = newStall.online;
      objectToCreate.breakfastStart = !errors.Breakfast
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[0].start
          ).label
        : null;
      objectToCreate.breakfastEnd = !errors.Breakfast
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[0].end
          ).label
        : null;
      objectToCreate.lunchStart = !errors.Lunch
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[1].start
          ).label
        : null;
      objectToCreate.lunchEnd = !errors.Lunch
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[1].end
          ).label
        : null;
      objectToCreate.snackStart = !errors.Snack
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[2].start
          ).label
        : null;
      objectToCreate.snackEnd = !errors.Snack
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[2].end
          ).label
        : null;
      objectToCreate.dinnerStart = !errors.Dinner
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[3].start
          ).label
        : null;
      objectToCreate.dinnerEnd = !errors.Dinner
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[3].end
          ).label
        : null;

      productsStock.Breakfast.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 0,
        })
      );
      productsStock.Lunch.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 1,
        })
      );
      productsStock.Snack.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 2,
        })
      );
      productsStock.Dinner.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 3,
        })
      );
      objectToCreate.stock = stock;
      if (!errorName) {
        ApiHandler.Tikas.Stalls.createOrUpdateStall(objectToCreate)
          .then(({ data }) => {
            this.setState({ isSuccess: true });

            this.props.onCreate();
            this.props.updateParent();
          })
          .catch(({ error }) => {
            console.log(error);
          });
      } else {
        this.setState({ formErrors: { name: errorName } });
      }
    };

    handleEdit = (productsStock) => {
      let stock = [];
      const errors = this.validateGroups();
      const { newStall, timeSuggestion } = this.state;

      const errorName = isValueEmptyOrNull(newStall.name);
      let objectToCreate = {};
      objectToCreate.name = newStall.name;
      objectToCreate.id = newStall.id;
      objectToCreate.online = newStall.online;
      objectToCreate.breakfastStart = !errors.Breakfast
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[0].start
          ).label
        : null;
      objectToCreate.breakfastEnd = !errors.Breakfast
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[0].end
          ).label
        : null;
      objectToCreate.lunchStart = !errors.Lunch
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[1].start
          ).label
        : null;
      objectToCreate.lunchEnd = !errors.Lunch
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[1].end
          ).label
        : null;
      objectToCreate.snackStart = !errors.Snack
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[2].start
          ).label
        : null;
      objectToCreate.snackEnd = !errors.Snack
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[2].end
          ).label
        : null;
      objectToCreate.dinnerStart = !errors.Dinner
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[3].start
          ).label
        : null;
      objectToCreate.dinnerEnd = !errors.Dinner
        ? timeSuggestion.find(
            (elem) => elem.value === newStall.intervalSelected[3].end
          ).label
        : null;

      productsStock.Breakfast.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 0,
        })
      );
      productsStock.Lunch.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 1,
        })
      );
      productsStock.Snack.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 2,
        })
      );
      productsStock.Dinner.map((elem) =>
        stock.push({
          product: elem.id,
          lapseQuantity: elem.stock,
          timeGroup: 3,
        })
      );
      objectToCreate.stock = stock;
      if (!errorName) {
        ApiHandler.Tikas.Stalls.createOrUpdateStall(objectToCreate)
          .then(({ data }) => {
            this.setState({ isSuccess: true });
            this.props.onCreate();
            this.props.updateParent();
          })
          .catch(({ error }) => {
            console.log(error);
          });
      } else {
        this.setState({ formErrors: { name: errorName } });
      }
    };

    handleAssignProductStock = () => {
      //event.preventDefault();
      const errors = this.validateGroups();

      const { newStall } = this.state;
      const notErrorOverlap = this.intervalOverlap(errors);

      errors["Breakfast"] =
        errors.Breakfast &&
        !(
          (isNullOrUndefined(newStall.intervalSelected[0].start) &&
            isNullOrUndefined(newStall.intervalSelected[0].end)) ||
          (!isNullOrUndefined(newStall.intervalSelected[0].start) &&
            !isNullOrUndefined(newStall.intervalSelected[0].end))
        );
      errors["Lunch"] =
        errors.Lunch &&
        !(
          (isNullOrUndefined(newStall.intervalSelected[1].start) &&
            isNullOrUndefined(newStall.intervalSelected[1].end)) ||
          (!isNullOrUndefined(newStall.intervalSelected[1].start) &&
            !isNullOrUndefined(newStall.intervalSelected[1].end))
        );
      errors["Snack"] =
        errors.Snack &&
        !(
          (isNullOrUndefined(newStall.intervalSelected[2].start) &&
            isNullOrUndefined(newStall.intervalSelected[2].end)) ||
          (!isNullOrUndefined(newStall.intervalSelected[2].start) &&
            !isNullOrUndefined(newStall.intervalSelected[2].end))
        );
      errors["Dinner"] =
        errors.Dinner &&
        !(
          (isNullOrUndefined(newStall.intervalSelected[3].start) &&
            isNullOrUndefined(newStall.intervalSelected[3].end)) ||
          (!isNullOrUndefined(newStall.intervalSelected[3].start) &&
            !isNullOrUndefined(newStall.intervalSelected[3].end))
        );

      if (!Object.keys(errors).some((x) => errors[x]) && notErrorOverlap) {
        this.setState({ assignP: true });
      } else {
        SnackbarHandler.showMessage(
          this.props.t("IncompleteFieldsOrOverlap"),
          "error"
        );
      }
    };

    handleCloseAssignProductStock = () => {
      this.setState({ assignP: false });
    };

    render() {
      const {
        newStall,
        intervals,
        timeSuggestion,
        timeGroupsNames,
        intervalList,
        assignP,
        isSuccess,
        formErrors,
      } = this.state;
      return (
        <Component
          isSuccess={isSuccess}
          newStall={newStall}
          assignP={assignP}
          formErrors={formErrors}
          handleEdit={this.handleEdit}
          handleCreate={this.handleCreate}
          handleCloseAssignProductStock={this.handleCloseAssignProductStock}
          handleAssignProductStock={this.handleAssignProductStock}
          handleChangeName={this.handleChangeName}
          handleChangeBoolean={this.handleChangeBoolean}
          handleChangeIntervalLimit={this.handleChangeIntervalLimit}
          timeSuggestion={timeSuggestion}
          timeGroupsNames={timeGroupsNames}
          intervalList={intervalList}
          {...this.props}
        />
      );
    }
  });

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, null),
  withTranslation(),
  withNewStall
);
