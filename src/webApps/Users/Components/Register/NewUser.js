import {
  AppBar,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Slide,
  Toolbar,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { withStyles } from '@mui/styles';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PlusIcon from '@mui/icons-material/AddRounded'
import ChevronIcon from '@mui/icons-material/ChevronRightRounded'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMore from '@mui/icons-material/ExpandMore'
import PersonIcon from '@mui/icons-material/PersonRounded'
import Visibility from '@mui/icons-material/Visibility'
import Search from '@mui/icons-material/Search'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Divider, Dropdown } from 'semantic-ui-react'
import ApiHandler from '../../../../services/ApiHandler'
import {
  isEmailValid,
  isValueEmptyOrNull,
} from '../../../../utils/HelperFunctions'
import SnackbarHandler from '../../../../utils/SnackbarHandler'
import DataTableDialogAction from '../../../Shared/DataTable/DataTableDialogAction'
import NavBarUsers from '../../utils/NavBarUsers'
import UserPermissions from './UserPermissions'
import { withTranslation } from 'react-i18next'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepButton from '@mui/material/StepButton'
import Switch from '@mui/material/Switch'
import { requestEnterprises } from '../../../../actions/EasyAccess/Enterprise_actions'
import styles from '../../../../assets/styles/User_styles/Register_styles/newUserStyles'
import MUIDataTable from 'mui-datatables'
import moment from "moment";

const CustomToolbarSelect = ({ onChange, t, ...props }) => {
  const handleSearch = () => {
    // Aquí puedes implementar la lógica de búsqueda
  }

  return (
    <div style={{ position: 'absolute', right: '15px', bottom: '8px' }}>
      <TextField label={t('Search')} fullWidth onChange={onChange} />
    </div>
  )
}

function Transition(props) {
  return <Slide direction='up' {...props} />
}

const mapStateToProps = ({ User, Settings, Enterprise }) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings,
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
    isLoadingEnterprises: Enterprise.loading,
  }
}
const mapDispatchToProps = {
  requestEnterprises: requestEnterprises,
}

const formValues = {
  userName: '',
  name: '',
  lastname: '',
  email: '',
  password: '',
  repeatedPassword: '',
  fullEnterpriseVisibility: '1',
  specificEnterprises: [],
  permissions: { 1: [], 2: [], 3: [], 4: [] },
  tikasApp: false,
  musteringApp: false,
  isHost: false,
}

class NewUser extends Component {
  constructor(props) {
    super(props)
    const { userOnEdit, currentUser } = props

    this.state = {
      newUser: userOnEdit ? userOnEdit : formValues,
      // newUser: userOnEdit ? this.setPermissions(userOnEdit) : formValues,
      passwordHidden: true,
      currentUser: currentUser,
      formErrors: {},
      openDialogEnterprises: false,
      showEnterprises: true,
      permissions: {},
      currentStep: 0,
      checkingCredentials: false,
      validCredentials: false,
      invalidCredentials: false,
      tableData: [],
      selectedRows: [],
      dateTime: moment().format("MM/DD/YYYY HH:mm:ss")
    }
  }

  handleStep = (step) => {
    this.setState({
      currentStep: step,
    })
  }

  handleProductLicence = (products) => {
    const { currentUser } = this.props
    return (
      Object.keys(currentUser.products).filter((k) => {
        return products.includes(currentUser.products[k])
      }).length > 0
    )
  }

  componentWillUnmount() {
    console.log('cleaning state')
    this.setState({ tableData: [], selectedRows: [] })
  }

  componentDidMount() {
    NavBarUsers.hideLoader()
    const { userOnEdit } = this.props
    ApiHandler.AMSuite.User.GetRegistersVisualizations().then(({ data }) => {
      this.setState({
        visualizationRegisterOptions: data.map((option) => {
          return { text: option.value, value: option.key }
        }),
        permissions: userOnEdit ? userOnEdit.permissions : {},
      })
    })
    ApiHandler.Mustering.Zones.getZones(this.state.dateTime).then(({ data }) => {
      const d = data.data.map((el) => ({ id: el.id, name: el.name, type: 'Zone' }))
      this.setState((prevState) => ({
        originalTableData: [...prevState.tableData, ...d],
        tableData: [...prevState.tableData, ...d],
      }))
    })
    ApiHandler.Mustering.Area.getArea(0).then(({ data }) => {
      const d = data.map((el) => ({ id: el.id, name: el.name, type: 'Area' }))
      this.setState((prevState) => ({
        originalTableData: [...prevState.tableData, ...d],
        tableData: [...prevState.tableData, ...d],
      }))
    })
    ApiHandler.Mustering.AreaGroup.getAreaGroup(0).then(({ data }) => {
      const d = data.map((el) => ({
        id: el.id,
        name: el.name,
        type: 'Area Group',
      }))
      this.setState((prevState) => ({
        originalTableData: [...prevState.tableData, ...d],
        tableData: [...prevState.tableData, ...d],
      }))
    })
    ApiHandler.AccessControl.Readers.getReaders({
      start: 0,
      length: 99999,
      order: 'name desc',
      search: '',
    }).then(({ data }) => {
      const d = data.data.map((el) => ({
        id: el.id,
        name: el.name,
        type: 'Reader',
      }))
      this.setState((prevState) => ({
        originalTableData: [...prevState.tableData, ...d],
        tableData: [...prevState.tableData, ...d],
      }))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userOnEdit !== this.props.userOnEdit)
      this.setState({ tableData: this.state.originalTableData })
    if (
      prevProps.userOnEdit !== this.props.userOnEdit &&
      this.props.userOnEdit &&
      this.state.tableData
    ) {
      ApiHandler.Mustering.Zones.getMusterinRelation(
        this.props.userOnEdit.id
      ).then(({ data }) => {
        let selectedItems = this.state.tableData.filter((el, idx) => {
          return data.some((ele) => {
            return (
              ele.typeName.toLowerCase() === el.type.toLowerCase() &&
              ele.identifier === el.id
            )
          })
        })
        selectedItems = selectedItems.map((el) =>
          this.state.tableData.indexOf(el)
        )
        this.setState({ selectedRows: selectedItems })
      })
    }
  }

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value
    this.setState(({ newUser }) => ({
      newUser: {
        ...newUser,
        [name]: value,
        specificEnterprises:
          name === 'fullEnterpriseVisibility'
            ? []
            : newUser.specificEnterprises,
      },
    }))
  }

  handlePermissionChange = (e, { value: entityIds, entity: activityId }) => {
    this.setState(({ newUser }) => ({
      newUser: {
        ...newUser,
        permissions: {
          ...newUser.permissions,
          [activityId]: entityIds,
        },
      },
    }))
  }

  updateEntities = (entities) => {
    if (Object.entries(this.state.newUser.permissions).length !== 0) {
      this.setState((prevState) => ({
        newUser: {
          ...prevState.newUser,
          permissions: {
            ...prevState.newUser.permissions,
            [1]: prevState.newUser.permissions[1].filter((ent) =>
              entities.some((e) => e.id === Number(ent))
            ),
            [2]: prevState.newUser.permissions[2].filter((ent) =>
              entities.some((e) => e.id === Number(ent))
            ),
            [3]: prevState.newUser.permissions[3].filter((ent) =>
              entities.some((e) => e.id === Number(ent))
            ),
            [4]: prevState.newUser.permissions[4].filter((ent) =>
              entities.some((e) => e.id === Number(ent) || Number(ent) === 38)
            ),
          },
        },
      }))
    }
  }

  handleChangeBoolean = (name) => (event) => {
    let value = event.currentTarget.checked
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        [name]: value,
      },
    }))
  }

  handleCreate = () => {
    const errors = this.validateCreate()
    const { t } = this.props
    this.setState({
      formErrors: errors,
    })
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      })
      let permissions = {}
      Object.keys(this.state.newUser.permissions).map((key) =>
        this.state.newUser.permissions[key].map((value) => {
          if (permissions[value])
            permissions = {
              ...permissions,
              [value]: [...permissions[value], parseInt(key)],
            }
          else
            permissions = {
              ...permissions,
              [value]: [parseInt(key)],
            }
          return 0
        })
      )
      // permissions[25] = [1, 2, 3, 4, 5, 6];
      const newUser = {
        ...this.state.newUser,
        permissions: permissions,
        linkedEmployeeId:
          this.state.newUser.isHost && this.state.newUser.linkedEmployeeId
            ? this.state.newUser.linkedEmployeeId.id
            : undefined,
      }
      ApiHandler.AMSuite.User.Create({
        ...newUser,
        fullEnterpriseVisibility: Boolean(
          this.state.newUser.fullEnterpriseVisibility
        ),
      })
        .then((rdata) => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          })
          SnackbarHandler.showMessage(t('SuccessfullyCreateUser'))
          if (this.state.newUser.musteringApp) {
            const payload = this.getMusteringZonePayload(rdata)
            ApiHandler.Mustering.Zones.addMusteringRelations(payload)
          }
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newUser: formValues,
              currentStep: 0,
            })
            this.props.handleUserCreated()
          }, 1000)
        })
        .catch(({ error }) => {
          this.setState({
            isSuccess: false,
            isCreating: false,
            newUser: formValues,
            currentStep: 0,
          })
          SnackbarHandler.showMessage(t(error.errorData), 'error')
        })
    } else {
      SnackbarHandler.showMessage(t('inputIncomplete'), 'error')
      this.setState({
        currentStep: 0,
      })
    }
  }

  parseZoneType = (zoneType, mode = 1) => {
    const value = zoneType.toLowerCase()
    if (mode === 1)
      switch (value) {
        case 'zone':
          return 1
        case 'area':
          return 2
        case 'area group':
          return 3
        case 'reader':
          return 4
      }
    else
      switch (zoneType) {
        case 1:
          return 'zone'
        case 2:
          return 'area'
        case 3:
          return 'area group'
        case 4:
          return 'reader'
      }
  }

  getMusteringZonePayload = (idUser) => {
    let array = this.state.tableData.filter(
      (el, idx) => this.state.selectedRows.indexOf(idx) !== -1
    )
    array = array.map((el) => ({
      idUser,
      type: this.parseZoneType(el.type),
      identifier: el.id,
      name: '',
    }))
    return array
  }

  handleEdit = () => {
    const errors = this.validateCreate()
    const { t } = this.props
    this.setState({
      formErrors: errors,
    })
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      })
      let permissions = {}

      Object.keys(this.state.newUser.permissions).map((key) =>
        this.state.newUser.permissions[key].map((value) => {
          if (permissions[value])
            permissions = {
              ...permissions,
              [value]: [...permissions[value], parseInt(key)],
            }
          else
            permissions = {
              ...permissions,
              [value]: [parseInt(key)],
            }
          return 0
        })
      )
      // permissions[25] = [1, 2, 3, 4, 5, 6];
      const newUser = { ...this.state.newUser, permissions: permissions }
      ApiHandler.AMSuite.User.Edit({
        ...newUser,
        fullEnterpriseVisibility: Boolean(
          this.state.newUser.fullEnterpriseVisibility
        ),
      })
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          })
          SnackbarHandler.showMessage(t('SuccessEditUsers') + '!')
          if (this.state.newUser.musteringApp) {
            if (this.state.selectedRows.length > 0) {
              const payload = this.getMusteringZonePayload(newUser.id)
              ApiHandler.Mustering.Zones.updateMusteringRelations(payload)
            } else {
              ApiHandler.Mustering.Zones.deleteMusteringRelations(newUser.id)
            }
          }
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newUser: formValues,
              currentStep: 0,
            })
            this.props.handleUserCreated()
          }, 1000)
        })
        .catch(({ error }) => {
          SnackbarHandler.showMessage(error.message, 'error')
          this.setState({
            isCreating: false,
            isSuccess: false,
          })
        })
    } else {
      SnackbarHandler.showMessage(t('inputIncomplete'), 'error')
      this.setState({
        currentStep: 0,
      })
    }
  }

  validateCreate = () => {
    const { newUser } = this.state
    const { isEdit } = this.props
    return {
      userName: isValueEmptyOrNull(newUser.name),
      name: isValueEmptyOrNull(newUser.name),
      lastname: isValueEmptyOrNull(newUser.lastname),
      repeatedPassword:
        !isEdit &&
        (isValueEmptyOrNull(newUser.repeatedPassword) ||
          newUser.repeatedPassword !== newUser.password),
      password:
        !isEdit &&
        (isValueEmptyOrNull(newUser.password) ||
          newUser.repeatedPassword !== newUser.password),
      email: !isEmailValid(newUser.email),
      // linkedEmployeeId:
      //   newUser.isHost && isNullOrUndefined(newUser.linkedEmployeeId)
    }
  }

  handleEnterprisesSelected = (enterprises) => {
    this.setState((prevState) => ({
      openDialogEnterprises: false,
      newUser: {
        ...prevState.newUser,
        specificEnterprises: enterprises,
      },
    }))
  }
  handleOpenEnterprises = () => {
    this.setState({
      openDialogEnterprises: true,
    })
  }

  handleEmployeeSelected = (employee) => {
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        linkedEmployeeId: employee,
      },
    }))
  }

  renderEnterprises = () => {
    const { classes, isDetails, t } = this.props
    const { newUser } = this.state
    return (
      (<List className={classes.listRoot}>
        <ListItem style={{ padding: 0 }}>
          {!isDetails && (
            <Fab
              size='small'
              color='default'
              onClick={this.handleOpenEnterprises}
              className={classes.customFab}
            >
              <PlusIcon />
            </Fab>
          )}
          <ListItemText
            inset
            primary={
              t('enterprises') +
              (newUser.specificEnterprises.length !== 0
                ? ': ' + newUser.specificEnterprises.length
                : '')
            }
          />
          {
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.showEnterprises,
              })}
              onClick={() =>
                this.setState({ showEnterprises: !this.state.showEnterprises })
              }
              size="large">
              <ExpandMore />
            </IconButton>
          }
        </ListItem>
        <Collapse in={this.state.showEnterprises} timeout='auto' unmountOnExit>
          <List dense component='div' disablePadding>
            {newUser.specificEnterprises.map((enterprise) => (
              <ListItem key={enterprise.id} className={classes.nested}>
                <ListItemIcon>
                  <ChevronIcon />
                </ListItemIcon>
                <ListItemText inset primary={enterprise.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { userOnEdit, isEdit } = nextProps
    const setPermissions = (userOnEdit) => {
      let permissionAux = { 1: [], 2: [], 3: [], 4: [] }
      userOnEdit.permissions[1].map((e) => permissionAux[1].push(Number(e)))
      userOnEdit.permissions[2].map((e) => permissionAux[2].push(Number(e)))
      userOnEdit.permissions[3].map((e) => permissionAux[3].push(Number(e)))
      userOnEdit.permissions[4].map((e) => permissionAux[4].push(Number(e)))

      return { ...userOnEdit, permissions: permissionAux }
    }

    if (isEdit !== prevState.isEdit) {
      return {
        isEdit: isEdit,
        newUser: isEdit ? setPermissions(userOnEdit) : formValues,
      }
    } else return null
  }

  handleClose = () => {
    this.setState({ currentStep: 0 })
    this.props.handleClose()
  }

  columns = [
    {
      name: 'id',
      label: this.props.t('identifier'),
      options: { filter: false },
    },
    { name: 'name', label: this.props.t('name'), options: { filter: false } },
    {
      name: 'type',
      label: this.props.t('mustertype'),
      options: { filter: true },
    },
  ]

  onSearchChange = (event) => {
    let selectedRows = this.state.tableData.filter(
      (el, idx) => this.state.selectedRows.indexOf(idx) !== -1
    )
    let filteredRows = []
    if (event.target.value === '') {
      filteredRows = this.state.originalTableData.filter(
        (el) => selectedRows.indexOf(el) === -1
      )
    } else {
      filteredRows = this.state.tableData.filter(
        (el) =>
          el.name.toLowerCase().includes(event.target.value.toLowerCase()) &&
          selectedRows.indexOf(el) === -1
      )
    }
    const newData = [...selectedRows, ...filteredRows]
    let selectedItems = selectedRows.map((el) => newData.indexOf(el))
    this.setState({ tableData: newData, selectedRows: selectedItems })
  }

  render() {
    const { classes, isEdit, open, t, theme } = this.props
    const handleClose = this.handleClose
    const {
      visualizationRegisterOptions,
      openDialogEnterprises,
      newUser,
      tableData,
    } = this.state

    return (
      (<Dialog
        fullScreen
        onClose={handleClose}
        TransitionComponent={Transition}
        open={open}
        onBackdropClick={handleClose}
        keepMounted={false}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              disabled={this.state.isCreating}
              color='inherit'
              onClick={handleClose}
              className={classes.customButton}
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.flex}>
              {isEdit ? t('UserEdition') : t('NewUser')}
            </Typography>
            <Button
              color='inherit'
              disabled={this.state.isCreating}
              onClick={handleClose}
              className={classes.customButton}
            >
              {t('cancel')}
            </Button>
            <div
              style={{
                position: 'relative',
              }}
            >
              <Button
                color='inherit'
                disabled={this.state.isCreating}
                onClick={
                  this.state.isCreating
                    ? undefined
                    : isEdit
                    ? this.handleEdit
                    : this.handleCreate
                }
                className={classes.customButton}
              >
                {t('confirm')}
              </Button>
              {this.state.isCreating && (
                <CircularProgress
                  size={24}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: -12,
                    marginLeft: -12,
                    color: 'white',
                  }}
                />
              )}
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.layout}>
          <div className={classes.fill}>
            <Grid
              container
              style={{
                width: '100%',
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Stepper
                nonLinear
                activeStep={this.state.currentStep}
                style={{ width: '60%' }}
                alternativeLabel
              >
                <Step key={0}>
                  <StepButton onClick={() => this.handleStep(0)}>
                    {t('NewUser')}
                  </StepButton>
                </Step>
                <Step key={1}>
                  <StepButton onClick={() => this.handleStep(1)}>
                    {t('Permissions')}
                  </StepButton>
                </Step>
                {this.handleProductLicence([3, 4]) && (
                  <Step key={2}>
                    <StepButton onClick={() => this.handleStep(2)}>
                      {t('AppAuthorization')}
                    </StepButton>
                  </Step>
                )}
              </Stepper>
            </Grid>
            <Grid
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {this.state.currentStep === 0 && (
                <Grid item xs={12} md={8}>
                  <Paper elevation={0} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                      {t('NewUser')}
                    </Typography>
                    <div style={{ width: '100%' }}>
                      <Divider className={classes.customDivider} />
                    </div>
                    <Grid container spacing={24}>
                      <Grid item xs={12} md={6} className={classes.grid}>
                        <TextField
                          required
                          label={t('UserName')}
                          value={newUser.userName}
                          fullWidth
                          onChange={this.handleChange('userName')}
                          helperText={t('inputEmpty')}
                          disabled={isEdit}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.userName ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.userName}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.grid}>
                        <TextField
                          required
                          label={t('name')}
                          value={newUser.name}
                          fullWidth
                          onChange={this.handleChange('name')}
                          helperText={t('inputEmpty')}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.name ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.grid}>
                        <TextField
                          required
                          label={t('LastName')}
                          value={newUser.lastname}
                          fullWidth
                          onChange={this.handleChange('lastname')}
                          helperText={t('inputEmpty')}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.lastname ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.lastname}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.grid}>
                        <TextField
                          required
                          label={t('email')}
                          value={newUser.email}
                          fullWidth
                          onChange={this.handleChange('email')}
                          helperText={t('inputEmpty')}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.email ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.email}
                        />
                      </Grid>
                      {!isEdit && (
                        <React.Fragment>
                          <Grid item xs={12} md={6} className={classes.grid}>
                            <FormControl
                              margin='normal'
                              style={{ margin: 0 }}
                              fullWidth
                            >
                              <InputLabel
                                error={this.state.formErrors.password}
                                htmlFor='adornment-password'
                              >
                                {t('password')}
                              </InputLabel>
                              <Input
                                error={this.state.formErrors.password}
                                id='adornment-password'
                                type={
                                  !this.state.passwordHidden
                                    ? 'text'
                                    : 'password'
                                }
                                onChange={this.handleChange('password')}
                                value={newUser.password}
                                autoComplete='current-password'
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='Toggle password visibility'
                                      onClick={() =>
                                        this.setState({
                                          passwordHidden:
                                            !this.state.passwordHidden,
                                        })
                                      }
                                      size="large">
                                      {!this.state.passwordHidden ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText
                                style={{
                                  opacity: this.state.formErrors.password
                                    ? 1
                                    : 0,
                                }}
                                error={this.state.formErrors.password}
                                id='adornment-password'
                              >
                                {newUser.repeatedPassword !== newUser.password
                                  ? t('PasswordNotEquals')
                                  : t('inputEmpty')}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6} className={classes.grid}>
                            <TextField
                              type='password'
                              label={t('ConfirmPassword')}
                              value={newUser.repeatedPassword}
                              onChange={this.handleChange('repeatedPassword')}
                              fullWidth
                              helperText={
                                newUser.repeatedPassword !== newUser.password
                                  ? t('PasswordNotEquals')
                                  : t('inputEmpty')
                              }
                              FormHelperTextProps={{
                                style: {
                                  opacity: this.state.formErrors
                                    .repeatedPassword
                                    ? 1
                                    : 0,
                                },
                              }}
                              error={this.state.formErrors.repeatedPassword}
                            />
                          </Grid>
                        </React.Fragment>
                      )}
                      {this.state.ocultar && (
                        <Grid>
                          <Grid item xs={12} md={12} style={{ marginTop: 50 }}>
                            <Typography
                              component='h1'
                              variant='subtitle1'
                              style={{
                                display: 'Flex',
                                justifyContent: 'center',
                              }}
                            >
                              {t('SelectUserVisibility')}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Dropdown
                              placeholder={t('VisualizeRecords')}
                              fluid
                              selection
                              value={newUser.recordVisibility}
                              onChange={(e, eValue) =>
                                this.handleChange('recordVisibility')(eValue)
                              }
                              options={
                                visualizationRegisterOptions
                                  ? visualizationRegisterOptions
                                  : []
                              }
                              loading={!visualizationRegisterOptions}
                              header={
                                <React.Fragment>
                                  <Dropdown.Header
                                    content={t('VisualizeRecords')}
                                  />
                                  <Dropdown.Divider
                                    className={classes.customDivider}
                                  />
                                </React.Fragment>
                              }
                            />
                          </Grid>
                        </Grid>
                      )}

                      {!isEdit && (
                        <Grid container style={{ paddingTop: '30px' }}>
                          <Grid item xs={12} md={12} style={{ marginTop: 15 }}>
                            <Typography
                              component='h1'
                              variant='subtitle1'
                              style={{
                                display: 'Flex',
                                justifyContent: 'center',
                                width: '100%',
                              }}
                            >
                              {t('SelectIfDoesReceivesVisit')}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={newUser.isHost}
                                  value={newUser.isHost}
                                  color='primary'
                                  name='isHost'
                                  onChange={this.handleChangeBoolean('isHost')}
                                />
                              }
                              label={t('IsHost')}
                            />
                            {/* {newUser.isHost && (
                              <DataTableSelect
                                handleConfirm={this.handleEmployeeSelected}
                                loadDataFunction={
                                  ApiHandler.EasyAccess.Persons.getHostEmployees
                                }
                                element={this.state.newUser.linkedEmployeeId}
                                primaryTitle={t("AssignEmployee")}
                                title={t("Employee")}
                                dataTableSubTitle={t("AssignEmployee")}
                                mdSubtitle={3}
                                DataTableColumns={[
                                  {
                                    name: t("Name"),
                                    field: "name",
                                    options: {
                                      filter: true,
                                      sort: true,
                                      searchable: false
                                      // sortDirection: activeColumnSort === 0 ? order : "none"
                                    }
                                  },
                                  {
                                    name: t("LastName"),
                                    field: "lastname",
                                    options: {
                                      filter: true,
                                      sort: true
                                      // sortDirection: activeColumnSort === 1 ? order : "none"
                                    }
                                  },
                                  {
                                    name: t("Document"),
                                    field: "document",
                                    options: {
                                      filter: true,
                                      sort: true
                                      // sortDirection: activeColumnSort === 1 ? order : "none"
                                    }
                                  },
                                  {
                                    name: t("Email"),
                                    field: "email",
                                    options: {
                                      filter: true,
                                      sort: true
                                      // sortDirection: activeColumnSort === 1 ? order : "none"
                                    }
                                  }
                                ]}
                                multipleSelect={false}
                                attribute={"name"}
                                extraData1={false}
                                hasError={
                                  this.state.formErrors.linkedEmployeeId
                                }
                              />
                            )} */}
                          </Grid>
                        </Grid>
                      )}

                      {this.state.currentStep === 0 && (
                        <Grid container style={{ paddingTop: '30px' }}>
                          <Grid item xs={12} md={12} style={{ marginTop: 15 }}>
                            <Typography
                              component='h1'
                              variant='subtitle1'
                              style={{
                                display: 'Flex',
                                justifyContent: 'center',
                                width: '100%',
                              }}
                            >
                              {t('SelectTheCompaniesToVisualize')}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <RadioGroup
                              aria-label='Gender'
                              name='enterpriseVisualization'
                              value={newUser.fullEnterpriseVisibility}
                              onChange={this.handleChange(
                                'fullEnterpriseVisibility'
                              )}
                            >
                              <FormControlLabel
                                value={'1'}
                                label={t('VisualizeAllCompanies')}
                                control={<Radio color='primary' />}
                              />
                              <FormControlLabel
                                value={'0'}
                                label={t('VisualizeOnlySelectedCompanies')}
                                control={<Radio color='primary' />}
                              />
                            </RadioGroup>
                          </Grid>
                        </Grid>
                      )}

                      {newUser.fullEnterpriseVisibility === '0' && (
                        <Grid item xs={12} md={12}>
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}
                            />
                            <Divider className={classes.customDivider} />
                            {this.renderEnterprises()}
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              )}
              {this.state.currentStep === 1 && (
                <Grid item xs={12} md={8} style={{ paddingLeft: 0 }}>
                  <UserPermissions
                    updateEntities={this.updateEntities}
                    permissionsSelected={
                      this.state.newUser ? this.state.newUser.permissions : {}
                    }
                    productsSelected={
                      this.state.newUser ? this.state.newUser.products : {}
                    }
                    handlePermissionChange={this.handlePermissionChange}
                    {...this.props}
                    classes={{}}
                  />
                </Grid>
              )}

              {this.state.currentStep === 2 && (
                <Grid item xs={12} md={6} style={{ paddingLeft: 0 }}>
                  <div style={{ width: '100%' }}>
                    <Typography variant='h5' style={{ textAlign: 'center' }}>
                      {t('AppUseAutorization')}
                    </Typography>
                    <Divider className={classes.customDivider} />
                    <Typography style={{ textAlign: 'center' }}>
                      {t('AppUseAutorizationDescription')}
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {this.handleProductLicence([3]) && (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.newUser.tikasApp}
                            onChange={this.handleChangeBoolean('tikasApp')}
                            value={this.state.newUser.tikasApp}
                            color='primary'
                          />
                        }
                        labelPlacement='end'
                        label={'Tikas'}
                        style={{
                          cursor: 'default',
                          margin: 0,
                          marginLeft: '-15px',
                        }}
                      />
                    )}
                    {this.handleProductLicence([4]) && (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.newUser.musteringApp}
                            onChange={this.handleChangeBoolean('musteringApp')}
                            value={this.state.newUser.musteringApp}
                            color='primary'
                          />
                        }
                        labelPlacement='end'
                        label={'Mustering'}
                        style={{
                          cursor: 'default',
                          margin: 0,
                          marginLeft: '-15px',
                        }}
                      />
                    )}
                    {this.state.newUser.musteringApp && (
                      <MUIDataTable
                        title={t('MusterRelationships')}
                        data={tableData}
                        columns={this.columns}
                        options={{
                          selectableRows: 'true',
                          responsive: 'scroll',
                          search: true,
                          filter: true,
                          download: false,
                          print: false,
                          filterType: 'checkbox',
                          rowsSelected: this.state.selectedRows,
                          selectableRows: 'multiple',
                          selectableRowsOnClick: true,
                          searchToolbarPlacement: 'non',
                          customToolbarSelect: (props) => (
                            <CustomToolbarSelect
                              {...props}
                              t={this.props.t}
                              onChange={this.onSearchChange}
                            />
                          ),
                          onRowsSelect: (
                            currentRowsSelected,
                            allRowsSelected
                          ) => {
                            const dataToState = allRowsSelected.map(
                              (el) => el.dataIndex
                            )
                            this.setState({
                              selectedRows: dataToState,
                            })
                          },
                        }}
                      />
                    )}
                  </div>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
        <DataTableDialogAction
          open={openDialogEnterprises}
          onConfirm={this.handleEnterprisesSelected}
          onClose={() => this.setState({ openDialogEnterprises: false })}
          title={t('ManageEnterprise')}
          subTitle={t('SelectEnterpriseToAssign')}
          loadDataAction={this.props.requestEnterprises}
          rowsSelected={newUser.specificEnterprises}
          multipleSelect={true}
          loading={this.props.isLoadingEnterprises}
          info={this.props.enterprises}
          success={this.props.successEnterprise}
          columns={[
            {
              name: 'Nombre',
              field: 'name',
              options: {
                filter: true,
                sort: true,
                sortDirection: 'asc',
              },
            },
            {
              name: 'RUT',
              field: 'rut',
              options: {
                filter: true,
                sort: true,
              },
            },
          ]}
        />
      </Dialog>)
    );
  }
}

NewUser.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const NewUserConnected = connect(mapStateToProps, mapDispatchToProps)(NewUser)

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewUserConnected)
)
