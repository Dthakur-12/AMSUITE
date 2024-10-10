import React from 'react'
import TableSkeletonLoader from '../TableSkeletonLoader'
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MoreVerIcon from '@mui/icons-material/MoreVertRounded'
import Slide from '@mui/material/Slide'
import CheckedIcon from '@mui/icons-material/CheckRounded'
import Chip from '@mui/material/Chip'
import MUIDataTable from 'mui-datatables'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import Fade from '@mui/material/Fade'
import Avatar from '@mui/material/Avatar'
import { withTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Icon } from 'semantic-ui-react'
import { debounce } from 'throttle-debounce'
import CustomStyles from '../../../assets/styles/Shared_Styles/DataTable/DataTableDialogStyles'

function Transition(props) {
  return <Slide direction='up' {...props} />
}

let page = 0
let rowsPerPage = 10
let activeColumnSort = 0
let order = 'asc'

class DataTableDialogCS extends React.Component {
  constructor(props) {
    super(props)
    const {
      open,
      title,
      subTitle,
      columns,
      multipleSelect,
      rowsSelected,
      enableCreate,
      createData,
      extraData,
      extraData1,
      extraData2,
    } = props
    this.state = {
      title,
      subTitle,
      searchText: '',
      open: open,
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      columns,
      extraData,
      extraData1,
      extraData2,
      multipleSelect: multipleSelect,
      rowsSelected,
      enableCreate,
      createData,
      data: extraData2 ? extraData2 : [],
    }
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    )
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateScreenMode)
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 })
  }

  componentDidMount() {
    const { columns, extraData, extraData1, extraData2 } = this.state
    const { isMustering, id } = this.props
    
    this.updateScreenMode()
    this.props
      .loadDataFunction({
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].field + ' ' + order,
        search: '',
        extraData,
        extraData1,
        extraData2,
      })
      .then((response) => {
        let response_data = response.data.data
          ? response.data.data
          : response.data
        if (isMustering)
          response_data = response_data.filter((el) => +el[id] !== +extraData)
        // let new_data = this.state.data.concat(response_data);
        this.setState((prevState) => ({
          data: [...this.state.data, ...response_data],
          dataCount: response_data.length,
          isLoading: false,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.extraData !== prevState.extraData ||
      nextProps.open !== prevState.open
    ) {
      return {
        extraData: nextProps.extraData,
        open: nextProps.open,
      }
    } else return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      this.renderSelectedColumns(this.props.rowsSelected)
    }
    if (prevState.extraData !== this.state.extraData) {
      this.loadData(false)
    }
  }

  handleUnselect = (id) => {
    const { rowsSelected } = this.state
    let newRowsSelected = rowsSelected.slice()
    newRowsSelected.splice(
      newRowsSelected.findIndex((e) => e.id === id),
      1
    )
    this.renderSelectedColumns(newRowsSelected)
  }

  renderSelectedColumns = (rowsSelected = []) => {
    const { classes, columns, t } = this.props
    let newColumns = columns.slice()
    newColumns.unshift({
      name: '',
      field: '',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          if (rowsSelected.some((item) => item.id === data.id))
            return (
              <Chip
                label={t('Selected')}
                className={classes.chip}
                color='primary'
                onDelete={() => this.handleUnselect(data.id)}
                avatar={
                  <Avatar>
                    <CheckedIcon />
                  </Avatar>
                }
              />
            )
          else return <div />
        },
        width: 1,
      },
    })
    this.setState({
      rowsSelected,
      columns: newColumns,
    })
  }

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText, extraData, extraData1, extraData2 } =
      this.state
    if (contentLoader) this.setState({ isLoadingNewData: true })
    let orderByColumn =
      columns[activeColumnSort].field !== ''
        ? columns[activeColumnSort].field
        : columns[activeColumnSort + 1].field
    this.props
      .loadDataFunction({
        start: isSearch ? 0 : page * rowsPerPage,
        length: rowsPerPage,
        order: orderByColumn + ' ' + order,
        search: searchText ? searchText.toString() : '',
        extraData,
        extraData1,
        extraData2,
      })
      .then((response) => {
        //DELETE
        console.log("DataTableDialogCS/loadDataFunciton/Response",{response})
        const lastSearchText = this.state.searchText
        this.setState({
          data: response.data.data,
          dataCount: response.data.dataCount,
          isLoadingNewData: false,
          isSearching: lastSearchText !== searchText,
        })
        if (lastSearchText !== searchText) this.loadData(false)
      })
  }

  handleConfirm = () => {
    this.props.onConfirm(this.state.rowsSelected)
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

  handleRowClicked = (rowData, rowMeta) => {
    const { multipleSelect, rowsSelected } = this.state

    let data = this.table.props.data[rowMeta.rowIndex]
    if (rowsSelected.findIndex((e) => e.id === data.id) !== -1) return

    let newDataSelected = rowsSelected.slice()
    newDataSelected.push(data)
    if (!multipleSelect) {
      this.setState({
        rowsSelected: [],
      })
      this.props.onConfirm(newDataSelected[newDataSelected.length - 1])
    } else {
      this.renderSelectedColumns(newDataSelected)
    }
  }

  onTableChange = (action, tableState) => {
    //DELETE
    console.log("DataTableDialogCS/ontableChange/action",action)
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
        //optionalFunctionSearch && optionalFunctionSearch(tableState.searchText);
        break
      default:
    }
  }

  renderDataTable = () => {
    const { data, columns, isLoading, isLoadingNewData, dataCount, isDesktop } =
      this.state
    const { classes, t, noMatch, mdSearch, subTitle } = this.props
    const options = {
      search: true,
      download: false,
      filter: false,
      filterType: 'dropdown',
      //responsive: "scroll",
      serverSide: false,
      rowsPerPage: rowsPerPage,
      rowsPerPageOptions: [10, 20, 50],
      count: dataCount,
      page: page,
      rowHover: true,
      print: isDesktop,
      viewColumns: isDesktop,
      selectableRows: false,
      onRowClick: (rowData, rowMeta) => {
        this.handleRowClicked(rowData, rowMeta)
      },
      customToolbar: () => (
        <LinearProgress
          style={{
            opacity: this.state.isSearching ? '1' : '0',
          }}
          className={classes.customLinearProgress}
          variant='query'
        />
      ),
      // onTableChange: this.onTableChange,
      textLabels: {
        body: {
          noMatch: noMatch ? noMatch : t('dontSearchRegister'),
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
      <div>
        {/* <Grid
          item
          xs={isDesktop ? 6 : 12}
          md={mdSearch ? mdSearch : 4}
          style={
            isDesktop
              ? {
                  display: this.state.hideSearch ? "none" : "flex",
                }
              : {
                  display: this.state.hideSearch ? "none" : "flex",
                  margin: "0 20px 20px 20px",
                  justifyContent: "center",
                  alignContent: "center",
                  maxWidth: "100% !important",
                }
          }
          className={isDesktop ? classes.searchGrid : {}}
        >
          <FormControl xs={12} md={12} className={classes.textField}>
            <InputLabel htmlFor="adornment-password">
              {t("search") + "..."}
            </InputLabel>
            <Input
              id="adornment-password"
              type={"text"}
              value={this.state.searchText ? this.state.searchText : ""}
              onChange={this.onChangeSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    //style={{ padding: 0 }}
                    onClick={() =>
                      this.setState({ registerOnDetails: undefined })
                    }
                  >
                    <Icon
                      name="search"
                      //inverted
                      //circular
                      link
                      className={classes.customSearch}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid> */}
        {/* </Grid> */}
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <MUIDataTable
            ref={(e) => (this.table = e)}
            title={subTitle}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
        <Fade in={isLoadingNewData} className={classes.contentLoader}>
          <div style={{ pointerEvents: isLoadingNewData ? 'inherit' : 'none' }}>
            <CircularProgress className={classes.circularProgress} size={50} />
          </div>
        </Fade>
      </div>
    )
  }

  render() {
    const { open, multipleSelect, enableCreate, createData } = this.state
    const { classes, t, title } = this.props
    return (
      (<Dialog
        fullScreen
        onClose={this.props.onClose}
        TransitionComponent={Transition}
        open={open ? open : false}
        onBackdropClick={this.props.onClose}
        style={{ paddingRight: 0 }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              onClick={this.props.onClose}
              aria-label='Close'
              className={classes.customButton}
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.flex}>
              {title}
            </Typography>
            {enableCreate && (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <Button color='inherit' onClick={createData.onCreate}>
                  {createData.title ? createData.title : t('Unspecified')}
                </Button>
                <MoreVerIcon />
              </span>
            )}
            <Button
              color='inherit'
              onClick={this.props.onClose}
              className={classes.customButton}
            >
              {t('cancel')}
            </Button>
            <Button
              style={{ display: multipleSelect ? 'inherit' : 'none' }}
              color='inherit'
              onClick={this.handleConfirm}
              className={classes.customButton}
            >
              {t('confirm')}
            </Button>
          </Toolbar>
        </AppBar>
        {this.renderDataTable()}
      </Dialog>)
    );
  }
}

export default withTranslation()(withStyles(CustomStyles)(DataTableDialogCS))
