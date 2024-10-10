import React from "react";
import { withStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
// import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
// import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import { Input, Popup } from "semantic-ui-react";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CustomStyles, {
  StyledPagination,
} from "../../../assets/styles/Shared_Styles/TransferList/TransferListStyles";

const ADTransferList = (props) => {
  const {
    classes,
    elements,
    attribute,
    isAssignedList,
    elementsDetails,
    idAttribute,
    searchValue = "",
    isLoading,
  } = props;
  return (
    <div className={classes.listContainer}>
      <List className={classes.listContainer}>
        <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Input
            icon="users"
            action={{
              icon: "search",
              onClick: props.handleSearch,
              loading: isLoading,
              disabled: isLoading,
            }}
            iconPosition="left"
            className={classes.searchInput}
            placeholder="Search active directory group..."
            onChange={props.handleQueryChange}
            onKeyPress={props.handleKeyPress}
            value={searchValue}
            loading={isLoading}
            disabled={isLoading}
          />
        </ListItem>

        {elements.map((element) => {
          return (
            <ListItem
              key={isAssignedList ? element : element[idAttribute]}
              role={undefined}
              dense
              button
              onClick={props.handleToggle(element)}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Popup
                trigger={
                  <ListItemText
                    primary={
                      isAssignedList
                        ? `${elementsDetails[element]}`
                        : `${element[attribute]}`
                    }
                    className={classes.itemText}
                  />
                }
                content={
                  isAssignedList
                    ? `${elementsDetails[element]}`
                    : `${element[attribute]}`
                }
                inverted
              />

              <Checkbox
                checked={
                  isAssignedList
                    ? props.selectedElements.indexOf(element) !== -1
                    : props.selectedElements.indexOf(element[idAttribute]) !==
                      -1
                }
                tabIndex={-1}
                disableRipple
                color="primary"
                edge="end"

                // classes={{
                //   root: classes.root,
                //   checked: classes.checked,
                // }}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default withStyles(CustomStyles, { withTheme: true })(ADTransferList);
