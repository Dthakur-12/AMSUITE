import React, {useState, useEffect} from "react";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import LinearProgress from "@mui/material/LinearProgress";
import MUIDataTable from "mui-datatables";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
// import styles from "../../../../assets/styles/Mustering_styles/Activity_styles/activityStyles";
import withActivity from "../../../../core/Mustering/withActivity";
import { compose } from "redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import { emphasize } from "@mui/system";

//Icomponents
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Icon } from "semantic-ui-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const Activity = (props) => {
  const {
    classes,
    t,
    data,
    columns,
    isLoading,
    isLoadingNewData,
    dataCount,
    isDesktop,
    isSearching,
    cleanFilter,
    onTableChange,
    treemapChart,
    pieChart,
    page,
    rowsPerPage,
    theme,
    activeEventsData,
    handleSelectEventChange,
    musterEventID,
    filters,
    searchText,
    onChangeSearchInput
  } = props;
  const [tableKey, setTableKey] = useState();
  useEffect(()=>{
    console.log("activity.js/useEffect",{data})
    setTableKey(Math.random())

  },[data])
  //DATA
  const selectStyles = {
    input: (base) => ({
      ...base,
      color: theme.palette.text.primary,
      cursor: "pointer",
      "& input": {
        cursor: "pointer",
        font: "inherit",
        fontSize:"12px!important"
      },
      width: "100%",
      menuList: {
        maxHeight: 100,
      },
    }),
  };
  const options = {
    search: false,
    filter: false,
    download: false,
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    serverSide: true,
    rowsPerPage: rowsPerPage,
    count: dataCount,
    print: isDesktop,
    page: page,
    selectableRows: false,
    customToolbar: () => {
      return (
        <LinearProgress
          style={{
            opacity: isSearching ? "1" : "0",
            width: "90%",
            background: "none",
            marginLeft: "-50%",
            padding: 0,
            position: "absolute",
            zIndex: 1,
          }}
          variant="query"
        />
      );
    },
    onTableChange: onTableChange,
    textLabels: {
      body: {
        noMatch: t("dontSearchRegister"),
        toolTip: t("order"),
      },
      pagination: {
        next: t("nextPage"),
        previous: t("beforePage"),
        rowsPerPage: `${t("show")} : `,
        displayRows: t("of"),
      },
      toolbar: {
        search: t("search"),
        downloadCsv: t("downloadCSV"),
        print: t("print"),
        viewColumns: t("seeColumn"),
        filterTable: t("filter"),
      },
      filter: {
        all: t("all"),
        title: t("filter"),
        reset: t("cleanFilter"),
      },
      viewColumns: {
        title: t("showColumns"),
        titleAria: t("showHideColumns"),
      },
      selectedRows: {
        text: t("rowsSelected"),
      },
    },
  };
  if (isLoading)
    return (
      <div className={classes.skeletonLoader}>
        <TableSkeletonLoader />
      </div>
    );
  return (
    <div style={{paddingLeft: 24, paddingRight: 24}}>
      {/* {isLoadingNewData ? (
        <div className={classes.skeletonLoader}>
          <TableSkeletonLoader />
        </div>
      ) : ( */}
        <div style={{margin:10, maxWidth: '100%', overflowX: 'auto'}}>
          <div 
            style={{
            display: "flex",
            gap: 16,
            alignItems: "end",
            justifyContent: "start",
            width: "100%",
            marginBottom: 16}}
            >
            <Grid item xs={12} 
              style={
                {display: "flex", 
                gap: 8, 
                width: isDesktop ? 300 : "100%",
                flexBasis: "auto"}}>
            <div className={classes.formControl}>
              <label className={classes.formControlLabel} style={{marginBottom: 8}}>
                {t("ActiveMusteringEvents")}
              </label>
              <div style={{cursor:"pointer"}}>
                <Select
                  classes={classes}
                  className={classes.select}
                  components={components}
                  styles={selectStyles}
                  onChange={handleSelectEventChange}
                  options={Object.values(activeEventsData)}
                  placeholder={t("Events")}
                  maxMenuHeight={200}
                  isLoading={false}
                  value={activeEventsData.filter(({value}) => value === musterEventID)}
                />
              </div>
            </div>
          </Grid>
          {
            isLoadingNewData &&
            <Typography
            style={{
              fontSize: isDesktop ? 14 : 14,
              display: "flex",
              gap: "5px",
              alignItems: "center"
            }}
            >
              <span class="loader"></span>
              {t("Updating")}
            </Typography>
          }
          <div style={{display: "flex", justifyContent:"flex-end", flexGrow: 1}}>
          <FormControl xs={12} md={12} className={classes.textField}>
            <InputLabel htmlFor="activity-search">
              {t("search") + "..."}
            </InputLabel>
            <Input
              id="activity-search"
              type={"text"}
              value={searchText}
              onChange={(e)=>onChangeSearchInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Icon name="search" link className={classes.searchIcon} />
                </InputAdornment>
              }
            />
          </FormControl>
          </div>

          </div>

{/* MUIDataTable is not re rendering in some cases. i.e. when one search "missing" keyword */}
          <MUIDataTable
            key={tableKey} 
            title={t("Activity")}
            data={data}
            columns={columns}
            options={options}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            {/* Filter tags */}
            <div style={{display: "flex", gap: 8, alignItems: "center"}}>
              {
                filters.length > 0 && <p style={{color: "white", marginBottom: 0}}>{t("filteredBy")}</p>
              }
              {
               filters.map((item,index)=>(
                 <p 
                  key={index} 
                  style={{padding: 8, borderRadius: 5, color: "white", background: "#242424", fontSize: 11 }}>
                    {item}
                  </p>
                ) 
               )
              }
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => cleanFilter()}
            >
              {t("cleanFilter")}
            </Button>
          </div>
        </div>
      {isDesktop ? (
        <div
          style={{
            display: "flex",
            //alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{}}>
            <Typography
              style={{
                fontSize: isDesktop ? 24 : 15,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: 8,
              }}
            >
              {t("DistributionOfPeople")}
            </Typography>
            {treemapChart()}
          </div>
          <div style={{}}>
            <Typography
              style={{
                fontSize: isDesktop ? 24 : 15,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: 5,
              }}
            >
              {t("safeUnsafePeople")}
            </Typography>
            {pieChart()}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            //alignItems: "center",
            maxWidth: "90vw",
            paddingLeft: "5vw",
            justifyContent: "space-between",
          }}
        >
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography
                style={{
                  fontSize: isDesktop ? 24 : 15,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  marginBottom: 8,
                }}
              >
                {t("DistributionOfPeople")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {treemapChart()}
            </Grid>
            <Grid item xs={12} style={{}}>
              <Typography
                style={{
                  fontSize: isDesktop ? 24 : 15,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  marginBottom: 5,
                }}
              >
                {t("safeUnsafePeople")}
              </Typography>
              {pieChart()}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};



const styles = (theme) => ({
  container: {
    flexDirection: "column",
  },
  //Select css
  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 14,
    width: "100%",
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 10,
  },

  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },

  formControlLabel: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "white",
    padding: 0,
    fontSize: "1rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1,
  },
  formControl: {
    // margin: 20,
    border: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top",
    width: "100%",
    [theme.breakpoints.down('lg')]: {
      marginTop: 40,
    },
  },
  select: {
    paddingTop: 20,
    width: "100%",
    maxWidth: "350px",
    cursor: "pointer"
  },
  input: {
    display: "flex",
    padding: 0,
  },
  //fin select css

  filterContainer: {
    padding: 20,
    paddingLeft: 100,
  },
});

Activity.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);

export default withActivity(enhance(Activity));

