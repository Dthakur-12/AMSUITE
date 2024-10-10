import React from "react";
import {  Typography } from "@mui/material";
import { withStyles} from "@mui/styles";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import { debounce } from "throttle-debounce";
import TransferList from "./TransferList";
import { isNullOrUndefined } from "util";
import CustomStyles from "../../../assets/styles/Shared_Styles/TransferList/TransferStyles";
import { withTranslation } from "react-i18next";

class Transfer extends React.Component {
  constructor(props) {
    console.log("props: ", props);
    super(props);
    this.state = {
      allElements: [],
      selectedElementsToAdd: {},
      selectedElementsToRemove: [],
      addedElements: this.props.addedElements ? this.props.addedElements : [],
      allElementOffset: 0,
      allElementLimit: props.limit || 5,
      assignedElementOffset: 0,
      assignedElementLimit: props.limit || 5,
      allElementSearch: "",
      assignedElementSearch: "",
      selectedElementsToAddInfo: this.props.addedElementsDetails
        ? this.props.addedElementsDetails
        : {},
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  getAllElements = () => {
    const {
      allElementOffset,
      allElementLimit,
      allElementSearch,
      addedElements,
    } = this.state;
    const { isServerSide } = this.props;
    this.setState({ isSearching: true });
    if (isServerSide)
      this.props
        .loadData({
          start: allElementOffset,
          length: allElementLimit,
          order: this.props.order,
          search: allElementSearch,
          AuxiliarList: addedElements,
        })
        .then((data) => {
          this.setState({
            allElements: data.data.data,
            allElementsCount: data.data.dataCount,
            isSearching: false,
          });
        })
        .catch((error) => {
          this.setState({ isSearching: false });
        });
    else
      this.props
        .loadData({ WithoutCreatedOnes: true, WithoutThisGuids: addedElements })
        .then((data) => {
          this.setState({
            allElements: data.data,
            allElementsConst: data.data,
            isSearching: false,
          });
        })
        .catch((error) => {
          this.setState({ isSearching: false });
        });
  };

  allElementsPageChange = (allElementOffset, e) => {
    this.setState(
      {
        allElementOffset,
      },
      () => {
        this.getAllElements();
      }
    );
  };

  assignedElementsPageChange = (assignedElementOffset, e) => {
    this.setState({
      assignedElementOffset,
    });
  };

  assignedElementsQueryChange = (query) => {
    const { selectedElementsToAddInfo } = this.state;
    let data = !isNullOrUndefined(this.state.assignedElementsConst)
      ? this.state.assignedElementsConst.slice()
      : [];
    let value = query.currentTarget.value;
    this.setState((state) => ({
      ...state,
      addedElements: data.filter((element) =>
        selectedElementsToAddInfo[element]
          .toLowerCase()
          .includes(value.toLowerCase())
      ),
      offset: 0,
    }));
  };

  allElementsClientSideQueryChange = (query) => {
    const { allElementsConst } = this.state;
    const { attribute } = this.props;
    let data = allElementsConst ? allElementsConst.slice() : [];
    let value = query.currentTarget.value;
    this.setState((state) => ({
      ...state,
      allElements: data.filter((element) =>
        element[attribute].toLowerCase().includes(value.toLowerCase())
      ),
      offset: 0,
    }));
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
      allElementOffset: 0,
    });
    this.getAllElements();
  };

  allElementsQueryChange = (query) => {
    const value = query.currentTarget.value;
    this.setState((prevState) => ({
      ...prevState,
      allElementSearch: value,
    }));
    this.changeSearchDebounce(value);
  };

  handleSelectToAdd = (element) => (e) => {
    console.log("e: ", e);
    console.log("e.shiftKey: ", e.shiftKey);

    const { selectedElementsToAdd, selectedElementsToAddInfo } = this.state;
    const { idAttribute } = this.props;
    const currentIndex = selectedElementsToAdd.indexOf(element[idAttribute]);
    const newSelectedElementsToAdd = [...selectedElementsToAdd];
    const newSelectedElementsToAddInfo = { ...selectedElementsToAddInfo };
    if (currentIndex === -1) {
      newSelectedElementsToAdd.push(element[idAttribute]);
      newSelectedElementsToAddInfo[element[idAttribute]] = `${
        element[this.props.attribute]
      } ${
        !isNullOrUndefined(this.props.secondAttribute)
          ? element[this.props.secondAttribute]
          : ""
      }`;
    } else {
      newSelectedElementsToAdd.splice(currentIndex, 1);
      delete newSelectedElementsToAddInfo[element[idAttribute].toString()];
    }
    this.setState({
      selectedElementsToAdd: newSelectedElementsToAdd,
      selectedElementsToAddInfo: newSelectedElementsToAddInfo,
    });
  };

  handleMultipleSelectToAdd =
    ({ element, index }) =>
    (e) => {
      const shiftKey = e.shiftKey;
      const {
        selectedElementsToAdd,
        selectedElementsToAddInfo,
        allElements,
        lastSelectedIndex,
      } = this.state;
      const { idAttribute, attribute, secondAttribute } = this.props;
      const newSelectedElementsToAddDict = { ...selectedElementsToAdd };
      const newSelectedElementsToAddInfo = { ...selectedElementsToAddInfo };

      let elementId = element[idAttribute];
      let currentElement = element;

      if (shiftKey) {
        const startIndex =
          index > lastSelectedIndex ? lastSelectedIndex : index;
        const endIndex = index > lastSelectedIndex ? index : lastSelectedIndex;
        for (let i = startIndex; i <= endIndex; i++) {
          currentElement = allElements[i];
          let elementId = currentElement[idAttribute];
          if (newSelectedElementsToAddDict[elementId] === undefined) {
            newSelectedElementsToAddDict[elementId] = currentElement;
            newSelectedElementsToAddInfo[elementId] = `${
              currentElement[attribute]
            } ${currentElement[secondAttribute] || ""}`;
          }
        }
      } else {
        if (newSelectedElementsToAddDict[elementId] === undefined) {
          newSelectedElementsToAddDict[elementId] = currentElement;
          newSelectedElementsToAddInfo[elementId] = `${
            currentElement[attribute]
          } ${currentElement[secondAttribute] || ""}`;
        } else {
          delete newSelectedElementsToAddDict[elementId.toString()];
          delete newSelectedElementsToAddInfo[elementId.toString()];
        }
      }
      this.setState({
        selectedElementsToAdd: newSelectedElementsToAddDict,
        selectedElementsToAddInfo: newSelectedElementsToAddInfo,
        lastSelectedIndex: index,
      });
    };

  handleSelectToRemove =
    ({ element, index }) =>
    () => {
      const { selectedElementsToRemove } = this.state;
      const currentIndex = selectedElementsToRemove.indexOf(element);
      const newSelectedElementsToRemove = [...selectedElementsToRemove];

      if (currentIndex === -1) {
        newSelectedElementsToRemove.push(element);
      } else {
        newSelectedElementsToRemove.splice(currentIndex, 1);
      }

      this.setState({
        selectedElementsToRemove: newSelectedElementsToRemove,
      });
    };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    this.getAllElements();
  }

  addElements = () => {
    const { selectedElementsToAdd } = this.state;
    this.setState(
      (prevState) => ({
        addedElements: [
          ...prevState.addedElements,
          ...Object.keys(selectedElementsToAdd),
        ],
        assignedElementsConst: [
          ...prevState.addedElements,
          ...Object.keys(selectedElementsToAdd),
        ],
        selectedElementsToAdd: [],
      }),
      () => {
        this.getAllElements();
        this.props.handleUserConfirm(
          this.state.addedElements,
          this.state.selectedElementsToAddInfo
        );
      }
    );
  };

  removeElements = () => {
    const {
      selectedElementsToRemove,
      addedElements,
      selectedElementsToAddInfo,
    } = this.state;
    let newElementsInfo = { ...selectedElementsToAddInfo };
    let difference = addedElements.filter((x) => {
      if (!selectedElementsToRemove.includes(x)) {
        return true;
      } else delete newElementsInfo[x.toString()];
      return false;
    });
    this.setState(
      {
        addedElements: difference,
        assignedElementsConst: difference,
        selectedElementsToRemove: [],
      },
      () => this.getAllElements()
    );
    this.props.handleUserConfirm(difference, newElementsInfo);
  };

  render() {
    const { classes, attribute, idAttribute, isServerSide, secondAttribute } =
      this.props;
    const {
      allElementOffset,
      assignedElementOffset,
      allElementLimit,
      assignedElementLimit,
      allElementsCount,
      addedElements,
      allElements,
      selectedElementsToAdd,
    } = this.state;
    if (!this.state.isDesktop) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "cemter",
            width: "100%",
          }}
        >
          <Grid
            className={classes.segment}
            style={{ margin: 20, maxWidth: "90%" }}
          >
            <Typography style={{ marginTop: 10 }} variant="h6">
              {this.props.firstTitle}
            </Typography>
            <TransferList
              selectedElements={Object.keys(selectedElementsToAdd)}
              handleToggle={this.handleMultipleSelectToAdd}
              elements={
                isServerSide
                  ? allElements
                  : allElements.slice(
                      allElementOffset,
                      allElementOffset + allElementLimit
                    )
              }
              offset={allElementOffset}
              limit={allElementLimit}
              dataCount={isServerSide ? allElementsCount : allElements.length}
              handlePageChange={this.allElementsPageChange}
              handleQueryChange={
                isServerSide
                  ? this.allElementsQueryChange
                  : this.allElementsClientSideQueryChange
              }
              idAttribute={idAttribute}
              attribute={attribute}
              secondAttribute={secondAttribute}
              {...this.props}
            />
            <Divider
              horizontal
              style={{ width: "100%", height: "fit-content" }}
            >
              <div>
                <Button
                  icon="down arrow"
                  className={classes.customButtonNext}
                  onClick={this.addElements}
                />
                <Button
                  icon="up arrow"
                  className={classes.customButtonNext}
                  onClick={this.removeElements}
                />
              </div>
            </Divider>

            <Typography style={{ marginTop: 10 }} variant="h6">
              {this.props.secondTitle}
            </Typography>
            <TransferList
              selectedElements={this.state.selectedElementsToRemove}
              handleToggle={this.handleSelectToRemove}
              elements={addedElements.slice(
                assignedElementOffset,
                assignedElementOffset + assignedElementLimit
              )}
              offset={assignedElementOffset}
              limit={assignedElementLimit}
              dataCount={addedElements.length}
              handlePageChange={this.assignedElementsPageChange}
              handleQueryChange={this.assignedElementsQueryChange}
              elementsDetails={this.state.selectedElementsToAddInfo}
              isAssignedList
              idAttribute={idAttribute}
              attribute={attribute}
              secondAttribute={secondAttribute}
            />
          </Grid>
        </div>
      );
    }
    return (
      <Segment className={classes.segment}>
        <Grid columns={2} relaxed="very" stackable style={{ minHeight: 250 }}>
          <Grid.Column className={classes.listContainer}>
            <Typography variant="h6">{this.props.firstTitle}</Typography>
            <TransferList
              selectedElements={Object.keys(selectedElementsToAdd)}
              handleToggle={this.handleMultipleSelectToAdd}
              elements={
                isServerSide
                  ? allElements
                  : allElements.slice(
                      allElementOffset,
                      allElementOffset + allElementLimit
                    )
              }
              offset={allElementOffset}
              limit={allElementLimit}
              dataCount={isServerSide ? allElementsCount : allElements.length}
              handlePageChange={this.allElementsPageChange}
              handleQueryChange={
                isServerSide
                  ? this.allElementsQueryChange
                  : this.allElementsClientSideQueryChange
              }
              idAttribute={idAttribute}
              attribute={attribute}
              secondAttribute={secondAttribute}
              isLoading={this.state.isSearching}
            />
          </Grid.Column>
          <Grid.Column>
            <Typography variant="h6">{this.props.secondTitle}</Typography>
            <TransferList
              selectedElements={this.state.selectedElementsToRemove}
              handleToggle={this.handleSelectToRemove}
              elements={addedElements.slice(
                assignedElementOffset,
                assignedElementOffset + assignedElementLimit
              )}
              offset={assignedElementOffset}
              limit={assignedElementLimit}
              dataCount={addedElements.length}
              handlePageChange={this.assignedElementsPageChange}
              handleQueryChange={this.assignedElementsQueryChange}
              elementsDetails={this.state.selectedElementsToAddInfo}
              isAssignedList
              idAttribute={idAttribute}
              attribute={attribute}
              secondAttribute={secondAttribute}
            />
          </Grid.Column>
        </Grid>
        <Divider vertical>
          <div className={classes.inputsContainer}>
            <Button
              icon="right arrow"
              className={classes.customButtonNext}
              style={{ marginBottom: 5 }}
              onClick={this.addElements}
            />
            <Button
              icon="left arrow"
              className={classes.customButtonNext}
              onClick={this.removeElements}
            />
          </div>
        </Divider>
      </Segment>
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(Transfer)
);
