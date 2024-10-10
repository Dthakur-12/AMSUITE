import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button
} from '@mui/material'
import { withStyles } from '@mui/styles';
import DataTableSelectAction from '../../../Shared/DataTable/DataTableSelectAction'

import { DateRange } from 'react-date-range'
import { requestGetPanels } from '../../../../actions/AccessControl/panel_actions'
import {
  requestGetBusReport,
  clearBusError,
  clearBusReport
} from '../../../../actions/Reports/busValidation_actions'
import { format } from 'date-fns'
import SnackbarHandler from '../../../../utils/SnackbarHandler'

const dateNow = new Date()

class BusValidationReport extends Component {
  constructor(props) {
    super(props)
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
          key: 'selection'
        }
      ],
      selectedPanels: [],
      selectedPanelsObject: []
    }
  }

  handleRangeChange = (range) => {
    this.setState({ dateRangePicker: [range.selection] })
  }

  componentDidUpdate() {
    const { t } = this.props
    if (this.props.error) {
      if (this.props.error.toLowerCase() === 'error')
        SnackbarHandler.showMessage(t('BusValidationError'), 'error')
      if (this.props.error.toLowerCase() === 'too_much_data')
        SnackbarHandler.showMessage(t('BusValidationLong'), 'error')
      this.props.clearBusError()
    }
    if (this.props.report) {
      if (Object.keys(this.props.report).length === 0) {
        SnackbarHandler.showMessage(t('BusValidationEmptyReport'), 'success')
      } else {
        let report =
          'data:application/vnd.ms-excel' + ';base64,' + this.props.report.data
        require('downloadjs')(
          report,
          `${this.props.t('BusScanXLSX')}.xls`,
          'application/vnd.ms-excel'
        )
        SnackbarHandler.showMessage(t('BusValidationReportSuccess'), 'success')
      }
      this.props.clearBusReport()
    }
    console.log(this.props)
  }

  generateReport = () => {
    let data = this.props.requestGetBusReport({
      fromDate: format(this.state.dateRangePicker[0].startDate, 'dd/MM/yy'),
      toDate: format(this.state.dateRangePicker[0].endDate, 'dd/MM/yy'),
      panels: this.state.selectedPanels.join(',')
    })
    console.log(data)
  }

  handleLoadData = () => {
    this.props.requestGetPanels({
      start: 0,
      length: -1,
      order: 'name asc',
      search: '',
      completeData: true
    })
  }

  handlePanelTableSelect = (selectedPanels) => {
    console.log("🚀 ~ file: BusValidationReport.js ~ line 102 ~ BusValidationReport ~ selectedPanels", selectedPanels)
    let selectedPanelsIds = []
    selectedPanels.map((panel) => {
      return selectedPanelsIds.push(panel.id)
    })
    this.setState((prevState) => ({
      selectedPanels: selectedPanelsIds,
      selectedPanelsObject: selectedPanels
    }))
  }

  render() {
    const { classes, t, busReport } = this.props

    return (
      <Paper className={classes.paper}>
        <Grid xs={12} item></Grid>
        <Grid container spacing={24}>
          <Grid xs={12} md={5} lg={4} item>
            <DateRange
              onChange={this.handleRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={this.state.dateRangePicker}
              className={classes.rangePicker}
              months={1}
              dragSelectionEnabled={false}
              maxDate={new Date()}
            />
          </Grid>
          <Grid xs={12} md lg item style={{ padding: 10 }}>
            <DataTableSelectAction
              handleConfirm={this.handlePanelTableSelect}
              loadDataAction={this.handleLoadData}
              elements={this.state.selectedPanelsObject}
              primaryTitle={t('Panels')}
              title={t('Panels')}
              DataTableColumns={[
                {
                  name: t('name'),
                  field: 'name',
                  options: {
                    sort: true,
                    filter: true,
                    sortDirection: 'asc',
                    customBodyRender: (data) => {
                      if (data.name) return <Typography>{data.name}</Typography>
                    }
                  }
                }
              ]}
              multipleSelect={true}
              attribute={'name'}
              info={{
                data: this.props.panels,
                dataCount: this.props.panelsCount
              }}
            />
          </Grid>

          <Button
            disabled={this.props.loading}
            onClick={this.generateReport}
            color="primary"
            variant="contained"
            fullWidth>
            {this.props.loading ? (
              <CircularProgress color="inherit" size={14} />
            ) : (
              'Download'
            )}
          </Button>
        </Grid>
      </Paper>
    )
  }
}

const styles = (theme) => ({
  paper: {
    padding: '2rem'
  },
  customCircularProgress: {
    position: 'inherit',
    //bottom: "5%",
    rigth: 0,
    //left: "50%",
    //marginTop: -12,
    marginLeft: 4,
    color: theme.palette.text.main + ' !important'
  },
  rangePicker: {
    color: theme.palette.text.main + ' !important',
    '& .rdrDayDisabled': {
      backgroundColor: theme.palette.backgroundSecondary.main
    },
    '& .rdrDayPassive .rdrDayNumber span': {
      color: '#6e6e6e !important'
    },
    '& .rdrDay .rdrDayPassive .rdrDayToday': { color: 'red !important' }
  },
  customButton: {
    color: theme.palette.text.main + ' !important'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  confirmDialog: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
})

const mapStateToProps = (state) => ({
  panels: state.Panel.panels,
  panelsCount: state.Panel.panelsCount,
  loading: state.BusValidation.loading,
  error: state.BusValidation.error,
  report: state.BusValidation.report
})

const mapDispatchToProps = {
  requestGetPanels,
  requestGetBusReport,
  clearBusError,
  clearBusReport
}

BusValidationReport.propType = {
  classes: PropTypes.object.isRequired
}

const busValidationReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BusValidationReport)

export default withTranslation()(
  withStyles(styles, {})(busValidationReportConnected)
)
