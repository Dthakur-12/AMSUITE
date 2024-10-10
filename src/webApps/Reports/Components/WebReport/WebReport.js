import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material'
import { withStyles } from '@mui/styles';

import DownloadOutlinedIcon from '@mui/icons-material/ArrowDownwardSharp'
import IconButton from '@mui/material/IconButton'
import { Icon } from 'semantic-ui-react'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import DataTableSelectAction from '../../../Shared/DataTable/DataTableSelectAction'
import { isNullOrUndefined } from 'util'
import MUIDataTable from 'mui-datatables'
import { DateRange } from 'react-date-range'
import * as rdrLocales from 'react-date-range/dist/locale'
import {
  requestGetWebReportReport,
  requestDownloadWebReportReport,
  clearWebReportError,
  clearWebReportReport,
} from '../../../../actions/Reports/webReport_actions'
import { format } from 'date-fns'
import SnackbarHandler from '../../../../utils/SnackbarHandler'
import moment from 'moment'

const dateNow = new Date()
let activeColumnSort = 0
let order = 'asc'
//MUSTERING REPORTS
class WebReport extends Component {
  constructor(props) {
    super(props)
    const { t } = props
    
    this.state = {
      isDesktop: true,
      dateRangePicker: [
        {
          startDate: new Date(
            dateNow.getFullYear(),
            dateNow.getMonth() - 1,
            dateNow.getDay(),
            0,
            0,
            0
          ),
          endDate: new Date(dateNow.setHours(23, 59, 0)),
          key: 'selection',
        },
      ],
      columns: this.translateColumns(t, true),
      data: [],
    }
  }
  
  handleRangeChange = (range) => {
    this.setState({ dateRangePicker: [range.selection] }, () =>
      this.setPayloadData()
    )
  }

  setPayloadData() {
    this.props.requestGetWebReportReport({
      dateMin: moment(this.state.dateRangePicker[0].startDate).format(
        'MM/DD/YYYY'
      ),
      dateMax: moment(this.state.dateRangePicker[0].endDate).format(
        'MM/DD/YYYY'
      ),
    })
  }

  downloadWebReport(data) {
    const { t } = this.props

    const payload = {
      MusterEventId: data,
    }

    this.props.requestDownloadWebReportReport(payload)
    // console.log(data)
  }

  translateColumns = (t, initial) => {
    let columDisplay = {}
    this.state &&
      this.state.columns &&
      this.state.columns.map(
        (elem) =>
          (columDisplay[elem.name] = !isNullOrUndefined(elem.options.display)
            ? elem.options.display
            : true)
      )
    return [
      {
        label: '',
        name: '',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: t('initialDate'),
        name: 'start',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : 'none',
          display: isNullOrUndefined(columDisplay.name)
            ? true
            : columDisplay.name,
            customBodyRender: (value) => {
              return (moment(value).format('YYYY-MM-DD HH:mm:ss'))
            },
        },
      },
      {
        label: t('endDate'),
        name: 'end',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : 'none',
          display: isNullOrUndefined(columDisplay.end)
            ? true
            : columDisplay.end,
            customBodyRender: (value) => {
              return (moment(value).format('YYYY-MM-DD HH:mm:ss'))
            },
        },
      },
      {
        label: t('peopleSafe'),
        name: 'endSafe',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : 'none',
          display: isNullOrUndefined(columDisplay.endSafe)
            ? true
            : columDisplay.endSafe,
        },
      },
      {
        label: t('peopleUnSafe'),
        name: 'endMissing',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : 'none',
          display: isNullOrUndefined(columDisplay.endMissing)
            ? true
            : columDisplay.endMissing,
        },
      },
      {
        label: t('Download'),
        name: 'id',
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log("tttttttt----",value.rowData, tableMeta, updateValue)
            let row_id = this.state.data[tableMeta.rowIndex].id
            return (
              <span onClick={() => this.downloadWebReport(row_id)}>
                <DownloadOutlinedIcon></DownloadOutlinedIcon>
              </span>
            )
          },
        },
      },
    ]
  }

  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value
    this.setState({ isSearching: true, init: true })
    this.customSearch(value)
  }

  customSearch = (searchqQery) => {
    const filtered = this.state.data.filter(
      (elem) =>
        elem.start.toUpperCase().includes(searchqQery.toUpperCase()) ||
        elem.end.toUpperCase().includes(searchqQery.toUpperCase())
    )
    this.setState({
      dataShowed: filtered,
      searchText: searchqQery,
      isSearching: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.lang = localStorage.getItem('language') === 'es' ? rdrLocales.es : rdrLocales.enUS

    if (this.state.data !== this.props.report.report) {
      this.setState({
        ...prevState,
        data: this.props.report.report,
      })
    }

   
    // this.setState({
    //   data: this.props.report.report
    // })
    //const { searchText } = this.state;
    // if (prevState.language !== this.state.language) {
    //   this.setState({
    //     ...prevState,
    //     columns: this.translateColumns(this.props.t, false),
    //   });
    // }
    // if (prevState.data !== this.state.data) {
    //  // searchText ? this.customSearch(searchText) : this.customSearch("");
    // }

    const { t } = this.props
    // if (this.props.error) {
    //   if (this.props.error.toLowerCase() === 'error')
    //     SnackbarHandler.showMessage(t('BusValidationError'), 'error')
    //   if (this.props.error.toLowerCase() === 'too_much_data')
    //     SnackbarHandler.showMessage(t('BusValidationLong'), 'error')
    //   this.props.clearWebReportError()
    // }
    if (prevProps.report.download != this.props.report.download) {
      if (Object.keys(this.props.report).length === 0) {
        SnackbarHandler.showMessage(t('BusValidationEmptyReport'), 'success')
      } else {
        let report =
          'data:application/vnd.ms-excel' +
          ';base64,' +
          this.props.report.download.data
        require('downloadjs')(
          report,
          `${this.props.t('MusterReportXLSX')}.xls`,
          'application/vnd.ms-excel'
        )
        SnackbarHandler.showMessage(t('BusValidationReportSuccess'), 'success')
        //this.props.clearWebReportReport();
      }
    }
    // console.log(this.state,"data-------rrr",this.props)
  }

  // generateReport = () => {
  //   let data = this.props.requestGetWebReportReport({
  //     fromDate: format(this.state.dateRangePicker[0].startDate, 'dd/MM/yy'),
  //     toDate: format(this.state.dateRangePicker[0].endDate, 'dd/MM/yy')
  //   })
  //   console.log(data)
  // }

  // handleLoadData = () => {
  //   this.props.requestGetPanels({
  //     start: 0,
  //     length: -1,
  //     order: 'name asc',
  //     search: '',
  //     completeData: true
  //   })
  // }

  render() {
    const { dataShowed, columns, data } = this.state
    const { classes, t } = this.props

    //const columns = ["Name", "Company", "City", "State"];

    const options = {
      filter: false,
      download: false,
      filterType: 'dropdown',
      search: false,
      responsive: 'scroll',
      serverSide: true,
      selectableRows: false,
      selectableRowsOnClick: false,
    }
    return (
      (<Paper className={classes.paper}>
        <Grid xs={12} item></Grid>
        <Grid container spacing={24}>
          <Grid xs={12} md={5} lg={4} item>
            <DateRange
              locale={this.props.i18n.language === 'es' ? rdrLocales.es : rdrLocales.enUS}
              onChange={this.handleRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={this.state.dateRangePicker}
              className={classes.rangePicker}
              months={1}
              dragSelectionEnabled={false}
              maxDate={new Date()}
            />
          </Grid>
          <Grid xs={12} md={5} lg={8} item>
            <Grid
              item
              // direction="column"
              // justify="flex-start"
              // alignItems="flex-start"
              style={
                this.state.isDesktop
                  ? {
                      zIndex: 1,
                      display: this.state.hideSearch ? 'none' : 'flex',
                      position: 'absolute',
                      right: '15em',
                    }
                  : {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 20px 20px 20px',
                    }
              }
            >
              <FormControl xs={12} md={12} className={classes.textField}>
                <InputLabel htmlFor='adornment-password'>
                  {t('search') + '...'}
                </InputLabel>
                <Input
                  id='adornment-password'
                  type={'text'}
                  value={this.state.searchText ? this.state.searchText : ''}
                  onChange={this.onChangeSearch}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        //style={{ padding: 0 }}
                        onClick={() =>
                          this.setState({ registerOnDetails: undefined })
                        }
                        size="large">
                        <Icon
                          name='search'
                          //inverted
                          //circular
                          link
                          className={classes.searchIcon}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <div style={{ paddingLeft: 20, paddingRight: 20 }} />
            {this.state.init ? (
              <MUIDataTable
                title={t('endedEvents')}
                data={dataShowed}
                columns={columns}
                options={options}
              />
            ) : (
              <MUIDataTable
                title={t('endedEvents')}
                data={data}
                columns={columns}
                options={options}
              />
            )}
          </Grid>
        </Grid>
      </Paper>)
    );
  }
}

const styles = (theme) => ({
  paper: {
    padding: '2rem',
  },
  customCircularProgress: {
    position: 'inherit',
    //bottom: "5%",
    rigth: 0,
    //left: "50%",
    //marginTop: -12,
    marginLeft: 4,
    color: theme.palette.text.main + ' !important',
  },
  rangePicker: {
    color: theme.palette.text.main + ' !important',
    '& .rdrDayDisabled': {
      backgroundColor: theme.palette.backgroundSecondary.main,
    },
    '& .rdrDayPassive .rdrDayNumber span': {
      color: '#6e6e6e !important',
    },
    '& .rdrDay .rdrDayPassive .rdrDayToday': { color: 'red !important' },
  },
  customButton: {
    color: theme.palette.text.main + ' !important',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  confirmDialog: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
})

const mapStateToProps = (state) => ({
  report: state.webReportValidation,
})

const mapDispatchToProps = {
  requestGetWebReportReport,
  requestDownloadWebReportReport,
  clearWebReportError,
  clearWebReportReport,
}

WebReport.propType = {
  classes: PropTypes.object.isRequired,
}

const WebReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WebReport)

export default withTranslation()(withStyles(styles, {})(WebReportConnected))
