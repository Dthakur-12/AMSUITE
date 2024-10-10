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
import { withTranslation } from "react-i18next";

import CustomStyles, {
  StyledPagination,
} from "../../../assets/styles/Shared_Styles/TransferList/TransferListStyles";
import { isNullOrUndefined } from "util";
import CircularProgress from "@mui/material/CircularProgress";
const TransferList = (props) => {
  const {
    classes,
    elements,
    attribute,
    isAssignedList,
    elementsDetails,
    idAttribute,
    secondAttribute,
    t,
  } = props;
  console.log("secondAttribute: ", secondAttribute);
  console.log("elementsDetails: ", elementsDetails);
  console.log("selectedElements", props.selectedElements);

  return (
    <div className={classes.listContainer}>
      <List>
        <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Input
            icon="users"
            className={classes.searchInput}
            iconPosition="left"
            placeholder={t("search") + "..."}
            onChange={props.handleQueryChange}
          />
        </ListItem>
        {props.isLoading && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
        {elements.map((element, index) => {
          return (
            <ListItem
              key={isAssignedList ? element : element[idAttribute]}
              role={undefined}
              dense
              button
              onClick={props.handleToggle({ element, index })}
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
                        : `${element[attribute]} ${
                            element[secondAttribute] || ""
                          }`
                    }
                    className={classes.itemText}
                  />
                }
                content={`${element[attribute]} ${
                  element[secondAttribute] || ""
                }`}
                inverted
              />

              <Checkbox
                checked={
                  isAssignedList
                    ? props.selectedElements.indexOf(element) !== -1
                    : props.selectedElements.indexOf(
                        element[idAttribute].toString()
                      ) !== -1
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
      <div className={classes.paginationContainer}>
        <StyledPagination
          limit={props.limit}
          offset={props.offset}
          total={props.dataCount}
          innerButtonCount={1}
          outerButtonCount={1}
          onClick={(e, offset) => props.handlePageChange(offset, e)}
          currentPageColor="inherit"
          otherPageColor="inherit"
          previousPageLabel={<ArrowLeft />}
          nextPageLabel={<ArrowRight />}
        />
      </div>
    </div>
  );
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(TransferList)
);
