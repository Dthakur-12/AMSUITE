import React, { createRef, Component } from 'react'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import { Icon } from 'semantic-ui-react'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import NavBarAccessControl from '../../utils/NavBarAccessControl'
import TableSkeletonLoader from '../../../Shared/TableSkeletonLoader'
import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles';
import MUIDataTable from 'mui-datatables'
import CircularProgress from '@mui/material/CircularProgress'
import PanelForm from './NewPanel'
import PanelDetails from './PanelDetails'
import PanelGPSHistory from './PanelGPSHistory'
import LinearProgress from '@mui/material/LinearProgress'
import CustomToolBarSelectPanel from '../../../Shared/DataTable/CustomToolBarSelectPanel'
import SnackbarHandler from '../../../../utils/SnackbarHandler'
import { isNullOrUndefined } from 'util'
import Fade from '@mui/material/Fade'
import { debounce } from 'throttle-debounce'
import 'react-chat-widget/lib/styles.css'
import moment from 'moment'
import { socketIO } from '../../../../utils/WebSockets'
import VirtualZoneForm from '../VirtualZone/NewVirtualZone2'
import PointIcon from '@mui/icons-material/FiberManualRecord'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { ListItemIcon } from '@mui/material'
import Typography from '@mui/material/Typography'
import HelperFunctions from '../../../../utils/HelperFunctions'

import {
  Slide,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import { Entities, Activity } from '../../../../utils/Enums'
import MultipePanelForm from './NewMultiplePanel'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import ConfirmationDialogAction from '../../../Shared/ConfirmationDialogAction'
import {
  requestGetPanels,
  requestLogOffPanel,
  requestDeletePanels,
} from '../../../../actions/AccessControl/panel_actions'
import {
  requestMessages,
  requestSendMessage,
  requestMessagesCount,
} from '../../../../actions/AccessControl/messages_actions'
import MobilePanels from './MobilePanels'
import styles from '../../../../assets/styles/AccessControl_styles/Panel_styles/panelsStyles'
import Chat from '../../../Shared/WebChat/Chat'
import OutsideEvent from '../../../Shared/WebChat/OutsideEvent'

const mapStateToProps = ({ User, Panel, Messages }) => {
  return {
    currentUser: User.currentUser,
    messages: Messages.data,
    messagesDataCount: Messages.messagesDataCount,
    messagesCount: Messages.messagesCount,
    info: Panel.info,
    panels: Panel.panels,
    panelsCount: Panel.panelsCount,
    loading: Panel.loading,
    error: Panel.error,
    successGetPanels: Panel.successGetPanels,
    successDeletePanel: Panel.successDeletePanel,
    loadingLogOffPanel: Panel.loadingLogOffPanel,
    successLogOffPanel: Panel.successLogOffPanel,
    successMesages: Messages.successMesages,
    successMesagesCount: Messages.successMesagesCount,
    successMesagesSended: Messages.successMesagesSended,

    gpsContinue: true,
  }
}

const mapDispatchToPrps = {
  requestGetPanels,
  requestDeletePanels,
  requestLogOffPanel,
  requestMessages,
  requestSendMessage,
  requestMessagesCount,
}

function Transition(props) {
  return <Slide direction='down' {...props} />
}

let page = 0
let rowsPerPage = 10
let activeColumnSort = 0
let order = 'asc'
class Panels extends Component {
  constructor(props) {
    super(props)
    const { t } = props
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      panelOnDetails: undefined,
      panelOnEdit: undefined,
      panelsToDelete: [],
      panelToForceLogOut: undefined,
      openDialogConfirmDelete: false,
      columns: this.translateColumns(t, true),
      seeMobilePanels: false,
      chatIsOpen: false,
      lastSuccessDatetime: new Date(),
      messages: [],
      messagesOffset: 0,
    }
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    )
    this.CustomComponentElement = createRef()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenMode)
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 })
  }

  componentDidMount() {
    this.updateScreenMode()
    window.addEventListener('resize', this.updateScreenMode)
    NavBarAccessControl.hideLoader()
    this.loadData(true)
    socketIO.emit('changes')
    socketIO.emit('startMessagesSender', this.props.currentUser.token)
    const loadMessages = this.loadMessages
    socketIO.on('AnyChange', function (data) {
      console.log('data: ', data)
      if (data.message[-2]) {
        loadMessages(true, data.lastSuccessDatetime)
      }
    })
    const updateMessageStatus = this.updateMessageStatus
    socketIO.on('MessageSended', function (data) {
      if (data.message) {
        updateMessageStatus(data.message.fechaHora)
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetPanels !== prevState.successGetPanels ||
      nextProps.successDeletePanel !== prevState.successDeletePanel ||
      nextProps.successLogOffPanel !== prevState.successLogOffPanel ||
      nextProps.info !== prevState.info ||
      nextProps.successMesages !== prevState.successMesages ||
      nextProps.successMesagesSended !== prevState.successMesagesSended ||
      nextProps.successMesagesCount !== prevState.successMesagesCount ||
      nextProps.messagesDataCount !== prevState.messagesDataCount
    ) {
      return {
        info: nextProps.info,
        language: nextProps.i18n.language,
        successGetPanels: nextProps.successGetPanels,
        successDeletePanel: nextProps.successDeletePanel,
        successLogOffPanel: nextProps.successLogOffPanel,
        dataCount: nextProps.panelsCount,
        messagesCount: nextProps.messagesCount,
        successMesages: nextProps.successMesages,
        successMesagesSended: nextProps.successMesagesSended,
        successMesagesCount: nextProps.successMesagesCount,
        messagesDataCount: nextProps.messagesDataCount,
      }
    } else return null
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props
    if (
      this.state.successLogOffPanel &&
      prevState.successLogOffPanel !== this.state.successLogOffPanel
    ) {
      this.loadData(true)
      SnackbarHandler.showMessage(t('SuccessfullyLogOff'))
    }
    if (
      this.state.successDeletePanel &&
      prevState.successDeletePanel !== this.state.successDeletePanel
    ) {
      this.loadData(true)
      SnackbarHandler.showMessage(t('successCreatePanel'))
    }
    if (
      this.state.successGetPanels &&
      prevState.successGetPanels !== this.state.successGetPanels
    ) {
      let infoData = []
      this.state.info.data.map((elem) =>
        infoData.push({
          ...elem,
          lastAccessEvent:
            elem.typeName === 'Virtual Zone'
              ? new Date()
              : elem.lastAccessEvent,
          lastActivity:
            elem.typeName === 'Virtual Zone' ? new Date() : elem.lastActivity,
          loggedIn: elem.logIn,
        })
      )
      this.setState({
        data: infoData,
        dataCount: this.state.info.dataCount,
        isLoadingNewData: false,
        isLoading: false,
        isSearching: this.state.searchText !== prevState.searchText,
        hideSearch: false,
      })
      if (this.state.searchText !== prevState.searchText) this.loadData(false)
    }
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      })
    }
    if (
      this.state.successMesages &&
      prevState.successMesages !== this.state.successMesages
    ) {
      const { messages: newMessages = [] } = this.props
      const { messages: oldMessages = [] } = prevState
      this.setState((prevState) => ({
        messages: this.state.onlyNewMessages
          ? [...newMessages, ...oldMessages]
          : [...oldMessages, ...newMessages],
        isLoadingNewMessages: this.state.onlyNewMessages
          ? false
          : prevState.isLoadingNewMessages,
        isLoadingMoreMessages: this.state.isLoadingMoreMessages
          ? false
          : prevState.isLoadingMoreMessages,
      }))
    }
    if (
      this.state.successMesagesCount &&
      prevState.successMesagesCount !== this.state.successMesagesCount
    ) {
      if (this.state.messagesCount[this.state.currentPanelChat.id] > 0)
        this.loadNewMessages()
    }
  }

  translateColumns = (t, initial) => {
    const isDesktop = window.innerWidth > 900

    const { classes } = this.props

    let colStorage = JSON.parse(localStorage.getItem('panelsColumns'))

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
        label: t('Panel'),
        name: 'name',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : 'none',
          display: isNullOrUndefined(columDisplay.name)
            ? true
            : columDisplay.name,
          customBodyRender: (data, metadata) => {
            const row_lastConnection = metadata.rowData[1],
                  row_typeName = metadata.rowData[3],
                  row_index = metadata.rowIndex,
                  dt = this.state.data,
                  thisRow = dt[row_index];
            
            const COLORS = {
              green: "#437043",
              red: '#743632'
            };

            const dotColor = (thisRow.logIn === 1 && moment().diff(moment(row_lastConnection), "minutes") <= 3) 
                ? COLORS.green 
                : COLORS.red;

            if (row_typeName === 'Device') {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <PointIcon style={{ color: dotColor }} />
                  <Typography>{data}</Typography>
                </div>
              )
              
            } else {
              return data
            }
          },
        },
      },
      {
        label: t('LastConnection'),
        name: 'lastActivity',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : 'none',
          display: isNullOrUndefined(columDisplay.lastActivity)
            ? true
            : columDisplay.lastActivity,
          customBodyRender: (data) => {
            return <Typography>{HelperFunctions.parseDate3(data)}</Typography>
          },
        },
      },
      {
        label: t('LastEvent'),
        name: 'lastAccessEvent',
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : 'none',
          display: isNullOrUndefined(columDisplay.lastAccessEvent)
            ? true
            : columDisplay.lastAccessEvent,
          customBodyRender: (data) => {
            return <Typography>{HelperFunctions.parseDate3(data)}</Typography>
          },
        },
      },
      {
        label: t('Type'),
        name: 'typeName',
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.typeName)
            ? true
            : columDisplay.typeName,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : 'none',
        },
      },
    ]
  }
  handleCloseGPS = () => {
    this.setState({ gpsContinue: false, panelOnGPSHistory: undefined })
  }

  handleOnDeleteWithProtectedData = () => {}

  handleOpenCloseMobilePanels = (aux) => {
    this.setState({ seeMobilePanels: aux })
  }

  handleOnEdit = (index) => {
    let panel = this.state.data[index]

    if (panel.typeName === 'Device') {
      this.setState({
        panelOnEdit: panel,
      })
    }
    if (panel.typeName === 'Virtual Zone') {
      this.setState({
        virtualZoneOnEdit:
          panel.mode === 0
            ? { ...panel, modeName: 'Normal' }
            : { ...panel, modeName: 'Trigger' },
      })
    }
    if (panel.typeName === 'Route Panel') {
      this.setState({
        isEdit: true,
        multiplePanel: panel,
      })
    }
  }

  handleOnDetails = (index) => {
    let panel = this.state.data[index]
    switch (panel.typeName) {
      case 'Device':
        this.setState({
          panelOnDetails: panel,
        })
        break
      case 'Virtual Zone':
        this.setState({
          virtualZoneOnDetails:
            panel.mode === 0
              ? { ...panel, modeName: 'Normal' }
              : { ...panel, modeName: 'Trigger' },
        })
        break
      case 'Route Panel':
        this.setState({
          isDetails: true,
          multiplePanel: panel,
        })
      default:
    }

    // if (panel.typeName === "Device") {
    //   this.setState({
    //     panelOnDetails: panel
    //   });
    // }
    // if (panel.typeName === "Virtual Zone") {
    //   this.setState({
    //     virtualZoneOnDetails:
    //       panel.mode === 0
    //         ? { ...panel, modeName: "Normal" }
    //         : { ...panel, modeName: "Trigger" }
    //   });
    // }
  }

  handleHistoryGPS = (index) => {
    let panel = this.state.data[index]
    this.setState({
      panelOnGPSHistory: panel,
    })
  }

  handleOnDelete = (indexs) => {
    const { data } = this.state
    let panelsToDelete = []
    indexs.map((i) => {
      return panelsToDelete.push(data[i].id)
    })
    this.setState({
      panelsToDelete: panelsToDelete,
      openDialogConfirmDelete: true,
    })
  }

  handleForceLogOut = (index) => {
    let panel = this.state.data[index]
    this.setState({
      panelToForceLogOut: panel,
      openToForceLogOut: true,
    })
  }

  handleConfirmDelete() {
    const { panelsToDelete } = this.state

    this.props.requestDeletePanels(panelsToDelete)
    this.setState({
      panelsToDelete: [],
      openDialogConfirmDelete: false,
    })
  }

  handleConfirmForceLogout = () => {
    const { panelToForceLogOut } = this.state
    this.props.requestLogOffPanel(panelToForceLogOut.id)
    this.setState({
      panelToForceLogOut: null,
      openToForceLogOut: false,
    })
  }

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText = '' } = this.state
    if (contentLoader) this.setState({ isLoadingNewData: true })
    this.props.requestGetPanels({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + ' ' + order,
      search: searchText,
      completeData: true,
      //type: 0
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
    activeColumnSort = activeColumnIndex
    order = newOrder
    this.loadData(true)
  }
  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    })

    this.loadData(false, true)
  }
  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value
    this.setState({
      searchText: value,
    })
    this.changeSearchDebounce(value)
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

    localStorage.setItem('panelsColumns', JSON.stringify(modifiedColumns))
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
        //   this.changeSearch(tableState.searchText);
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

  updateMessageStatus = (fechaHora) => {
    const newMessages = this.state.messages
    const messageIndex = newMessages.findIndex(
      (m) =>
        !isNullOrUndefined(m.fechaHora) &&
        new Date(m.fechaHora).getTime() == new Date(fechaHora).getTime()
    )
    if (messageIndex !== -1) {
      newMessages[messageIndex].status = 'sended'
      this.setState({
        messages: newMessages,
      })
    }
  }

  sendMessage = (message) => {
    const newMessages = this.state.messages
    const dateNow = new Date().toISOString()
    const messageToAdd = {
      sourceId: -2,
      destinationId: this.state.currentPanelChat.id,
      destinationName: this.state.currentPanelChat.name,
      texto: message,
      fechaHora: dateNow,
      status: 'pending',
    }
    newMessages.unshift(messageToAdd)
    this.setState(
      {
        messages: newMessages,
      },
      () => {
        socketIO.emit('messages', {
          sourceId: -2,
          destinationId: this.state.currentPanelChat.id,
          destinationName: this.state.currentPanelChat.name,
          text: message,
          fechaHora: dateNow,
          status: 'pending',
        })
      }
    )

    // if (!isNullOrUndefined(this.state.currentPanelChat)) {
    //   this.props.requestSendMessage({
    //     DestinationId: this.state.currentPanelChat.id,
    //     DestinationName: this.state.currentPanelChat.name,
    //     Text: message
    //   });
    //   const newMessages = this.state.messages;
    //   newMessages.unshift({
    //     sourceId: -2,
    //     destinationId: this.state.currentPanelChat.id,
    //     destinationName: this.state.currentPanelChat.name,
    //     texto: message,
    //     fechaHora: new Date()
    //   });
    //   this.setState(prevState => ({
    //     messages: newMessages
    //   }));
    // }
  }

  getLastDate = () => {
    let date = this.state.lastSuccessDatetime
    if (
      !isNullOrUndefined(this.state.messages) &&
      this.state.messages.length > 0
    ) {
      const lastMessage = this.state.messages.filter(
        (message) => message.sourceId === this.state.currentPanelChat.id
      )[0]
      date = lastMessage ? lastMessage.fechaHora : date
    }
    return new Date(date)
  }

  loadMessages = (onlyNewMessages, date = null, start = null) => {
    if (onlyNewMessages && this.state.chatIsOpen) {
      console.log('this')
      this.setState({ lastSuccessDatetime: date, onlyNewMessages: true })
      this.props.requestMessagesCount(date)
    } else if (!isNullOrUndefined(this.state.currentPanelChat)) {
      console.log('this2')
      this.setState({ onlyNewMessages: false, isLoadingMoreMessages: true })
      this.props.requestMessages({
        start: start ? start : this.state.messagesOffset * 10,
        length: 10,
        order: 'Date desc',
        search: '',
        PanelId1: this.state.currentPanelChat.id,
        panelId2: -2,
        EitherIsTheSender: true,
        SubsequentToDate: date,
      })
    }
  }

  loadNewMessages = () => {
    let date = this.getLastDate()
    if (!isNullOrUndefined(this.state.currentPanelChat)) {
      this.setState({ isLoadingNewMessages: true })
      this.props.requestMessages({
        start: 0,
        length: 300,
        order: 'Date desc',
        search: '',
        PanelId1: this.state.currentPanelChat.id,
        panelId2: -2,
        EitherIsTheSender: false,
        SubsequentToDate: date,
      })
    }
  }

  handleOnViewChat = (index) => {
    let panel = this.state.data[index]
    if (!this.state.chatIsOpen) {
      this.setState(
        { currentPanelChat: { id: panel.id, name: panel.name } },
        () => this.loadMessages(false)
      )
    }
    this.setState((prevState) => ({
      chatIsOpen: !prevState.chatIsOpen,
      messages: prevState.chatIsOpen ? [] : prevState.messages,
    }))
  }
  handleCloseChat = () => {
    this.setState({
      chatIsOpen: false,
      messages: [],
    })
  }
  render() {
    const {
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      panelOnDetails,
      panelOnEdit,
      virtualZoneOnEdit,
      panelOnGPSHistory,
      openDialogConfirmDelete,
      openToForceLogOut,
      panelToForceLogOut,
      virtualZoneOnDetails,
      multiplePanel,
    } = this.state

    console.log("table data", data)

    const { classes, t } = this.props
    const options = {
      selectableRowsOnClick: true,
      selectableRows: 'multiple',
      filter: false,
      viewColumns: this.state.isDesktop,
      print: this.state.isDesktop,
      download: false,
      //filterType: this.state.isDesktop ? "dropdown" : "none",
      responsive: 'scrollFullHeight',
      search: false,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      onRowsSelect: (selectedRows, selected) => {
        if (selected.length === 0) this.setState({ hideSearch: false })
        else {
          this.setState({ hideSearch: true })
        }
      },
      customToolbarSelect: (selectedRows) => (
        <CustomToolBarSelectPanel
          onDelete={
            this.handleLicence([Entities.PANELS.toString()], Activity.DELETE) &&
            this.handleOnDelete
          }
          onEdit={
            this.handleLicence([Entities.PANELS.toString()], Activity.UPDATE) &&
            this.handleOnEdit
          }
          permitsToDelete={this.handleLicence(
            [Entities.PANELS.toString()],
            Activity.DELETE
          )}
          permitsToEdit={this.handleLicence(
            [Entities.PANELS.toString()],
            Activity.UPDATE
          )}
          onForceLogout={this.handleForceLogOut}
          selectedRows={selectedRows}
          onDetails={this.handleOnDetails}
          onHistoryGPS={this.handleHistoryGPS}
          onMessages={this.handleOnViewChat}
          data={this.state.data}
        />
      ),
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
      (<div style={{ marginTop: this.state.isDesktop ? '0%' : '4%' }}>
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
          {/* <IconButton
            style={{ marginTop: "3%", marginRight: "-4vh" }}
            onClick={() => this.handleOpenCloseMobilePanels(true)}
          >
            <Icon name="mobile alternate"></Icon>
          </IconButton> */}
        </Grid>
        <MUIDataTable
          title={t('Panels')}
          data={data}
          columns={columns}
          options={options}
        />
        {this.state.chatIsOpen && (
          <OutsideEvent handleOutsideEvent={this.handleCloseChat}>
            <Chat
              className={classes.chatComponent}
              messages={this.state.messages}
              handleSendMessage={this.sendMessage}
              handleLoadMoreMessages={this.loadMessages}
              messagesDataCount={this.state.messagesDataCount}
              isLoadingNewMessages={this.state.isLoadingNewMessages}
              isLoadingMoreMessages={this.state.isLoadingMoreMessages}
              dateLang={this.state.language}
              lastSuccessDatetime={this.state.lastSuccessDatetime}
              title={this.state.currentPanelChat.name}
            />
          </OutsideEvent>
        )}
        <Fade in={isLoadingNewData} className={classes.contentLoader}>
          <div
            className={classes.contentLoader}
            style={{ display: this.props.loading ? 'inherit' : 'none' }}
          >
            <CircularProgress className={classes.circularProgress} size={50} />
          </div>
        </Fade>
        <Dialog
          open={!isNullOrUndefined(panelOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ panelOnEdit: undefined })}
          maxWidth='md'
          fullWidth
          scroll='paper'
        >
          <PanelForm
            isDialog
            updateParent={() => {
              this.loadData(true)
            }}
            isEdit
            onEdit={() => this.setState({ panelOnEdit: undefined })}
            initValues={panelOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(multiplePanel)}
          TransitionComponent={Transition}
          onClose={() =>
            this.setState({
              multiplePanel: undefined,
              isDetails: false,
              isEdit: false,
            })
          }
          maxWidth='md'
          fullWidth
          scroll='paper'
        >
          <MultipePanelForm
            isDialog
            updateParent={() => {
              this.loadData(true)
            }}
            isEdit={this.state.isEdit}
            isDetails={this.state.isDetails}
            onEdit={() =>
              this.setState({
                multiplePanel: undefined,
                isDetails: false,
                isEdit: false,
              })
            }
            initValues={multiplePanel}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(virtualZoneOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ virtualZoneOnEdit: undefined })}
          maxWidth='md'
          fullWidth
          scroll='paper'
        >
          <VirtualZoneForm
            isDialog
            isEdit={true}
            onClose={() => this.setState({ virtualZoneOnEdit: undefined })}
            updateParent={() => this.loadData(true)}
            onCreate={() => this.setState({ virtualZoneOnEdit: undefined })}
            initValues={virtualZoneOnEdit}
          />
        </Dialog>
        {panelOnDetails && (
          <Dialog
            open={!isNullOrUndefined(panelOnDetails)}
            TransitionComponent={Transition}
            onClose={() => this.setState({ panelOnDetails: undefined })}
            maxWidth='md'
            fullWidth
            scroll='paper'
          >
            <PanelDetails
              isDialog
              // onCreate={() => this.setState({ panelOnDetails: undefined })}
              initValues={panelOnDetails}
              isDetails
            />
          </Dialog>
        )}
        <Dialog
          open={!isNullOrUndefined(virtualZoneOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ virtualZoneOnDetails: undefined })}
          maxWidth='md'
          fullWidth
          scroll='paper'
        >
          <VirtualZoneForm
            isDialog
            onCreate={() => this.setState({ virtualZoneOnDetails: undefined })}
            initValues={virtualZoneOnDetails}
            isDetails={true}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(panelOnGPSHistory)}
          TransitionComponent={Transition}
          onClose={this.handleCloseGPS}
          maxWidth='md'
          fullWidth
          scroll='paper'
        >
          <PanelGPSHistory
            onClose={this.handleCloseGPS}
            isDialog
            gpsContinue={true}
            initValues={panelOnGPSHistory}
            isDetails
          />
        </Dialog>
        <Dialog
          open={openDialogConfirmDelete}
          onClose={() => this.setState({ openDialogProtectedData: false })}
          className={classes.confirmDialog}
        >
          <DialogTitle>{t('DeletePanel')}</DialogTitle>

          <DialogContentText
            className={classes.confirmDialog}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {t('youSureDeletePanels')}
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({
                  openDialogConfirmDelete: false,
                  panelsToDelete: {},
                })
              }>
              {t('cancel')}
            </Button>
            <Button onClick={() => this.handleConfirmDelete()}>
              {t('accept')}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen
          open={this.state.seeMobilePanels}
          onClose={() => this.handleOpenCloseMobilePanels(false)}
        >
          <MobilePanels
            onClose={() => this.handleOpenCloseMobilePanels(false)}
          />
        </Dialog>
        {panelToForceLogOut && (
          <ConfirmationDialogAction
            success={this.props.successLogOff}
            loading={this.props.loadingLogOffPanel}
            error={this.props.error}
            title={t('ConfirmLogOff')}
            body={t('ThePanelWillBeLogOff') + ' ' + t('continue')}
            confirmFunction={this.handleConfirmForceLogout}
            elementId={panelToForceLogOut.id}
            updateParentFunction={() => {
              this.loadData(true)
              this.setState({
                openToForceLogOut: false,
                panelToForceLogOut: undefined,
              })
            }}
            open={openToForceLogOut}
            onClose={() => this.setState({ openToForceLogOut: false })}
          />
        )}
      </div>)
    );
  }
}

Panels.propTypes = {
  classes: PropTypes.object.isRequired,
}

const PanelsConnected = connect(mapStateToProps, mapDispatchToPrps)(Panels)

export default withTranslation()(withStyles(styles)(PanelsConnected))
