import React, { Component } from 'react'
import NavBarMustering from '../../utils/NavBarMustering'
import TableSkeletonLoader from '../../../Shared/TableSkeletonLoader'
import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles';
import MUIDataTable from 'mui-datatables'
import CircularProgress from '@mui/material/CircularProgress'
import moment from 'moment'
import IconButton from '@mui/material/IconButton'
import { Icon } from 'semantic-ui-react'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import ApiHandler from '../../../../services/ApiHandler'
import LinearProgress from '@mui/material/LinearProgress'
import { Slide, Dialog } from '@mui/material'
import { isNullOrUndefined } from 'util'
import ZoneForm from './NewZone'
import Grid from '@mui/material/Grid'
import ZoneDetails from './DetailsZone'
import CustomToolbarSelect from '../../../Shared/DataTable/CustomToolBarSelect'
import SnackbarHandler from '../../../../utils/SnackbarHandler'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Entities, Activity } from '../../../../utils/Enums'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { socketIO } from '../../../../utils/WebSockets'

import styles from '../../../../assets/styles/Mustering_styles/Zone_styles/zonezStyles'

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  }
}

function Transition(props) {
  return <Slide direction='down' {...props} />
}
let page = 0
let rowsPerPage = 10
let activeColumnSort = 0
let order = 'asc'

class Zones extends Component {
  constructor(props) {
    super(props)
    const { t } = props
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      openDialogDeleteConfirm: false,
      indexsToDelete: undefined,
      isSearching: false,
      dateTime: moment().format('MM/DD/YYYY HH:mm:ss'),
      columns: this.translateColumns(t, true),
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language,
      }
    } else return null
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchText } = this.state
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      })
    }
    if (prevState.data !== this.state.data) {
      searchText ? this.customSearch(searchText) : this.customSearch('')
    }
  }
  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem('zonesColumns'))

    let columDisplay = {}
    if (initial && !isNullOrUndefined(colStorage)) {
      colStorage &&
        colStorage.map(
          (elem) =>
            (columDisplay[elem.name] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        )
    } else {
      this.state &&
        this.state.columns &&
        this.state.columns.map(
          (elem) =>
            (columDisplay[elem.name] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        )
    }
    return [
      {
        label: t('name'),
        name: 'name',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : 'none',
          display: isNullOrUndefined(columDisplay.name)
            ? true
            : columDisplay.name,
        },
      },
      {
        label: t('ReadersCount'),
        name: 'readersCount',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : 'none',
          display: isNullOrUndefined(columDisplay.readersCount)
            ? true
            : columDisplay.readersCount,
        },
      },
    ]
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 })
  }

  componentDidMount() {
    NavBarMustering.hideLoader()
    this.updateScreenMode()
    socketIO.emit('changes')
    const loadData = this.loadData
    socketIO.on('AnyChange', function (data) {
      if (data.message[20]) {
        loadData(true)
      }
    })
    ApiHandler.Mustering.Zones.getZones(this.state.dateTime)
      .then((response) => {
        this.setState({
          data: response.data.data,
          dataCount: response.data.dataCount,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentWillUnmount = () => {
    socketIO.emit('unsubscribeChanges')
    window.removeEventListener('resize', this.updateScreenMode)
  }

  loadData = (contentLoader) => {
    const { searchText } = this.state
    if (contentLoader) this.setState({ isLoadingNewData: true })
    ApiHandler.Mustering.Zones.getZones(
      this.state.dateTime
      // page * rowsPerPage,
      // rowsPerPage,
      // columns[activeColumnSort].field + " " + order,
      // searchText
    )
      .then((response) => {
        const lastSearchText = this.state.searchText
        this.setState({
          data: response.data.data,
          isLoading: false,
          zoneOnEdit: undefined,
          isLoadingNewData: false,
          isSearching: lastSearchText !== searchText,
        })
        NavBarMustering.hideLoader()
        if (lastSearchText !== searchText) this.loadData(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  changePage = (newPage) => {
    page = newPage
    this.loadData(true)
  }

  changeRowsPerPage = (newRowsPerPage) => {
    rowsPerPage = newRowsPerPage
    this.loadData(true)
  }

  changeSort = (activeColumnIndex, newOrder) => {
    const { columns } = this.state
    let columnsSorted = columns.slice()
    columnsSorted.map((column) => (column.options.sortDirection = undefined))
    columnsSorted[activeColumnIndex].options.sortDirection = newOrder
    this.setState({
      columns: columnsSorted,
    })
    //activeColumnSort = activeColumnIndex
    // order = newOrder
    this.loadData(true)
  }

  // changeSearch = searchText => {
  //   const { isSearching } = this.state;
  //   this.setState({
  //     searchText,
  //     isSearching: true
  //   });
  //   if (!isSearching) {
  //     this.loadData(false);
  //   }
  // };
  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value
    this.setState({ isSearching: true, init: true })
    this.customSearch(value)
  }
  // changeSearch = value => {
  //   this.setState({
  //     isSearching: true
  //   });
  //   this.loadData(false);
  // };
  customSearch = (searchqQery) => {
    const filtered = this.state.data.filter((elem) =>
      elem.name.toUpperCase().includes(searchqQery.toUpperCase())
    )
    this.setState({
      dataShowed: filtered,
      searchText: searchqQery,
      isSearching: false,
    })
  }

  handleOnEdit = (index) => {
    let zone
    this.state.init
      ? (zone = this.state.dataShowed[index])
      : (zone = this.state.data[index])

    ApiHandler.Mustering.Zones.getReadersForZone(zone.id)
      .then(({ data }) => {
        this.setState((prevState) => ({
          zoneOnEdit: {
            ...prevState.zoneOnEdit,
            readers: data.data,
            name: zone.name,
            zonetype: zone.zoneType,
            id: zone.id,
          },
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleOnDelete = () => {
    const { data, indexsToDelete, dataShowed } = this.state
    console.log(
      '🚀 ~ file: Zones.js:272 ~ Zones ~ handleOnDelete ~ indexsToDelete:',
      indexsToDelete
    )
    const { t } = this.props
    // let len = 0;
    console.log('deleting')
    indexsToDelete.map((ind) => {
      this.state.init
        ? ApiHandler.Mustering.Zones.deleteMusterZone(dataShowed[ind].id)
            .then(() => {
              if (indexsToDelete.length === 1)
                SnackbarHandler.showMessage(t('SuccessDeleteZone'))
              else SnackbarHandler.showMessage(t('SuccessDeleteZones'))
              this.setState({
                openDialogDeleteConfirm: false,
                indexsToDelete: undefined,
                hideSearch: false,
              })
              this.loadData(true)
            })
            .catch((error) => {
              console.log(
                '🚀 ~ file: Zones.js:293 ~ Zones ~ .then ~ error:',
                error
              )
              SnackbarHandler.showMessage(t('UnableDeleteZones'), 'error')
            })
        : ApiHandler.Mustering.Zones.deleteMusterZone(data[ind].id)
            .then(() => {
              if (indexsToDelete.length === 1)
                SnackbarHandler.showMessage(t('SuccessDeleteZone'))
              else SnackbarHandler.showMessage(t('SuccessDeleteZones'))
              this.setState({
                openDialogDeleteConfirm: false,
                indexsToDelete: undefined,
                hideSearch: false,
              })
              this.loadData(true)
            })
            .catch((error) => {
              console.log(
                '🚀 ~ file: Zones.js:317 ~ Zones ~ .then ~ error:',
                error
              )
              SnackbarHandler.showMessage(t('UnableDeleteZones'), 'error')
            })
      return 0
    })
  }

  handleOnDetails = (index) => {
    let zone
    this.state.init
      ? (zone = this.state.dataShowed[index])
      : (zone = this.state.data[index])
    ApiHandler.Mustering.Zones.getReadersForZone(zone.id)
      .then(({ data }) => {
        this.setState((prevState) => ({
          zoneDetails: {
            ...prevState.zoneDetails,
            readers: data.data,
            name: zone.name,
            zonetype: zone.zoneType,
            id: zone.id,
          },
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleOpenDeleteConfirm = (indexs) => {
    this.setState({
      openDialogDeleteConfirm: true,
      indexsToDelete: indexs,
    })
  }

  handleCloseDeleteConfirm = () => {
    this.setState({
      openDialogDeleteConfirm: false,
    })
  }

  filterChange = (filterList) => {}

  columnViewChange = (newColumns) => {
    const { columns } = this.state
    let modifiedColumns = columns.slice()
    modifiedColumns.map(
      (column) =>
        (column.options.display = newColumns.some(
          (newColumn) =>
            newColumn.name === column.name && newColumn.display === 'true'
        ))
    )
    this.setState({
      columns: modifiedColumns,
    })
    localStorage.setItem('zonesColumns', JSON.stringify(modifiedColumns))
  }

  onTableChange = (action, tableState) => {
    switch (action) {
      case 'changePage':
        this.changePage(tableState.page)
        break
      case 'changeRowsPerPage':
        this.changeRowsPerPage(tableState.rowsPerPage)
        break
      case 'sort':
        this.changeSort(
          tableState.activeColumn,
          tableState.announceText.includes('ascending') ? 'asc' : 'desc'
        )
        break
      case 'search':
        //this.changeSearch(tableState.searchText);
        break
      case 'filterChange':
        this.filterChange(tableState.filterList)
        break
      case 'columnViewChange':
        this.columnViewChange(tableState.columns)
        break
      default:
    }
  }

  handleLicence = (entities, activity) => {
    const { currentUser } = this.props
    return (
      Object.keys(currentUser.permits).filter((v) => {
        return (
          entities.includes(v.toString()) &&
          currentUser.permits[v].includes(parseInt(activity))
        )
      }).length > 0
    )
  }

  render() {
    const {
      dataShowed,
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      zoneOnEdit,
      zoneDetails,
      indexsToDelete,
      isDesktop,
    } = this.state
    const { classes, t } = this.props
    const options = {
      filter: false,
      download: false,
      filterType: 'dropdown',
      search: false,
      responsive: 'scroll',
      serverSide: false,
      rowsPerPage: rowsPerPage,
      selectableRowsOnClick: true,
      count: dataCount,
      page: page,
      viewColumns: isDesktop,
      print: isDesktop,
      customToolbarSelect: (selectedRows) => {
          return (
            <CustomToolbarSelect
              isMustering
              onEdit={
                this.handleLicence(
                  [Entities.MUSTER_ZONES.toString()],
                  Activity.UPDATE
                ) && this.handleOnEdit
              }
              onDelete={
                this.handleLicence(
                  [Entities.MUSTER_ZONES.toString()],
                  Activity.DELETE
                ) && this.handleOpenDeleteConfirm
              }
              permitsToDelete={this.handleLicence(
                [Entities.MUSTER_ZONES.toString()],
                Activity.DELETE
              )}
              permitsToEdit={this.handleLicence(
                [Entities.MUSTER_ZONES.toString()],
                Activity.UPDATE
              )}
              selectedRows={selectedRows}
              onDetails={this.handleOnDetails}
            />
          )
      },
      customToolbar: () => {
        return (
          <LinearProgress
            style={{
              opacity: this.state.isSearching ? '1' : '0',
              width: '90%',
              background: 'none',
              marginLeft: '-50%',
              padding: 0,
              position: 'absolute',
              zIndex: 1,
            }}
            variant='query'
          />
        )
      },
      onRowsSelect: (selectedRows, selected) => {
        if (selected.length === 0) this.setState({ hideSearch: false })
        else {
          this.setState({ hideSearch: true })
        }
      },
      onTableChange: this.onTableChange,
      textLabels: {
        body: {
          noMatch: t('dontSearchRegister'),
          toolTip: t('order'),
        },
        pagination: {
          next: t('nextPage'),
          previous: t('beforePage'),
          rowsPerPage: `${t('show')} : `,
          displayRows: t('of'),
        },
        toolbar: {
          search: t('search'),
          downloadCsv: t('downloadCSV'),
          print: t('print'),
          viewColumns: t('seeColumn'),
          filterTable: t('filter'),
        },
        filter: {
          all: t('all'),
          title: t('filter'),
          reset: t('cleanFilter'),
        },
        viewColumns: {
          title: t('showColumns'),
          titleAria: t('showHideColumns'),
        },
        selectedRows: {
          text: t('rowsSelected'),
        },
      },
    }
    if (isLoading)
      return (
        <div className={classes.skeletonLoader}>
          <TableSkeletonLoader />
        </div>
      )
    return (
      (<div style={{ marginTop: this.state.isDesktop ? 0 : '8%' }}>
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
                  right: '10em',
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
            title={t('Zones')}
            data={dataShowed}
            columns={columns}
            options={options}
          />
        ) : (
          <MUIDataTable
            title={t('Zones')}
            data={data}
            columns={columns}
            options={options}
          />
        )}
        <div
          className={classes.contentLoader}
          style={{ display: isLoadingNewData ? 'inherit' : 'none' }}
        >
          <CircularProgress className={classes.circularProgress} size={50} />
        </div>
        <Dialog
          open={!isNullOrUndefined(zoneOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ zoneOnEdit: undefined })}
          maxWidth='md'
          fullWidth
          scroll='paper'
        >
          <ZoneForm
            isDialog
            isEdit
            updateParent={() => this.loadData(true)}
            onCreate={() => this.setState({ zoneOnEdit: undefined })}
            initValues={zoneOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(zoneDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ zoneDetails: undefined })}
          maxWidth='md'
          fullWidth
          scroll='paper'
        >
          <ZoneDetails
            isDialog
            isEdit
            onCreate={() => this.setState({ zoneDetails: undefined })}
            initValues={zoneDetails}
          />
        </Dialog>
        <Dialog
          open={this.state.openDialogDeleteConfirm}
          onClose={this.handleCloseDeleteConfirm}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title' style={{ fontWeight: 'bold' }}>
            {t('DeleteZone')}
          </DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length === 1 && (
                <DialogContentText id='alert-dialog-description'>
                  {t('youSureDeleteZone')}
                </DialogContentText>
              )}
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length > 1 && (
                <DialogContentText id='alert-dialog-description'>
                  {t('youSureDeleteZones')}
                </DialogContentText>
              )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseDeleteConfirm}
              style={{ fontWeight: 'bold' }}
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={this.handleOnDelete}
              style={{ fontWeight: 'bold' }}
              autoFocus
            >
              {t('accept')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
    );
  }
}

Zones.propTypes = {
  classes: PropTypes.object.isRequired,
}

const ZonesConnected = connect(mapStateToProps, null)(Zones)

export default withTranslation()(withStyles(styles)(ZonesConnected))
