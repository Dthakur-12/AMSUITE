import React from "react";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import { debounce } from "throttle-debounce";
import TransferList from "./TransferList";
import ADTransferList from "./ADTransferList";
import { isNullOrUndefined } from "util";
import CustomStyles from "../../../assets/styles/Shared_Styles/TransferList/TransferStyles";
import { withTranslation } from "react-i18next";
import SnackbarHandler from "../../../utils/SnackbarHandler";

class ADTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allElements: [],
      selectedElementsToAdd: [],
      selectedElementsToRemove: [],
      addedElements: this.props.addedElements ? this.props.addedElements : [],
      assignedElementOffset: 0,
      assignedElementLimit: 5,
      allElementSearch: "",
      assignedElementSearch: "",
      selectedElementsToAddInfo: this.props.addedElementsDetails
        ? this.props.addedElementsDetails
        : {},
    };
  }
  handeSearch = (event, data) => {
    this.getElement(this.state.allElementSearch);
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.getElement(this.state.allElementSearch);
    }
  };

  serverSideQueryChange = (e, { value }) => {
    this.setState({
      allElementSearch: value,
    });
  };

  getElement = (search) => {
    this.setState({ isSearching: true });
    this.props
      .loadData({
        name: search,
      })
      .then((data) => {
        this.setState({
          allElements: data.data,
          isSearching: false,
        });
      })
      .catch(({ error = {} }) => {
        SnackbarHandler.showMessage(this.props.t(error.errorData), "error");
        this.setState({ isSearching: false });
      });
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

  handleSelectToAdd = (element) => () => {
    const { selectedElementsToAdd, selectedElementsToAddInfo } = this.state;
    const { idAttribute } = this.props;
    const currentIndex = selectedElementsToAdd.indexOf(element[idAttribute]);
    const newSelectedElementsToAdd = [...selectedElementsToAdd];
    const newSelectedElementsToAddInfo = { ...selectedElementsToAddInfo };
    if (currentIndex === -1) {
      newSelectedElementsToAdd.push(element[idAttribute]);
      newSelectedElementsToAddInfo[element[idAttribute]] =
        element[this.props.attribute];
    } else {
      newSelectedElementsToAdd.splice(currentIndex, 1);
      delete newSelectedElementsToAddInfo[element[idAttribute].toString()];
    }
    this.setState({
      selectedElementsToAdd: newSelectedElementsToAdd,
      selectedElementsToAddInfo: newSelectedElementsToAddInfo,
    });
  };

  handleSelectToRemove = (value) => () => {
    const { selectedElementsToRemove } = this.state;
    const currentIndex = selectedElementsToRemove.indexOf(value);
    const newSelectedElementsToRemove = [...selectedElementsToRemove];

    if (currentIndex === -1) {
      newSelectedElementsToRemove.push(value);
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
  }

  addElements = () => {
    const { addedElements } = this.state;
    const selectedElementsToAdd = this.state.selectedElementsToAdd.slice();
    const elementsToAdd = selectedElementsToAdd.filter(
      (e) => addedElements.indexOf(e) === -1
    );
    this.setState(
      (prevState) => ({
        addedElements: [...prevState.addedElements, ...elementsToAdd],
        assignedElementsConst: [...prevState.addedElements, ...elementsToAdd],
        selectedElementsToAdd: [],
        allElements: [],
      }),
      () => {
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
    this.setState({
      addedElements: difference,
      assignedElementsConst: difference,
      selectedElementsToRemove: [],
    });
    this.props.handleUserConfirm(difference, newElementsInfo);
  };

  render() {
    const { classes, attribute, idAttribute } = this.props;
    const {
      assignedElementOffset,
      assignedElementLimit,
      addedElements,
      allElements,
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
            <ADTransferList
              selectedElements={this.state.selectedElementsToAdd}
              handleToggle={this.handleSelectToAdd}
              elements={allElements}
              idAttribute={idAttribute}
              attribute={attribute}
              handleQueryChange={this.serverSideQueryChange}
              handleSearch={this.handeSearch}
              handleKeyPress={this.handleKeyPress}
              searchValue={this.state.allElementSearch}
              isLoading={this.state.isSearching}
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
            <ADTransferList
              selectedElements={this.state.selectedElementsToAdd}
              handleToggle={this.handleSelectToAdd}
              elements={allElements}
              idAttribute={idAttribute}
              attribute={attribute}
              handleQueryChange={this.serverSideQueryChange}
              handleSearch={this.handeSearch}
              handleKeyPress={this.handleKeyPress}
              searchValue={this.state.allElementSearch}
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
  withStyles(CustomStyles, { withTheme: true })(ADTransfer)
);
