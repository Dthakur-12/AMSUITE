import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles';
import NavBarSettings from '../../utils/NavBarSettings'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import ApiHandler from '../../../../services/ApiHandler'
import PersonIcon from '@mui/icons-material/PersonRounded'
import AccountCircle from '@mui/icons-material/PortraitRounded'
import Avatar from '@mui/material/Avatar'
import green from '@mui/material/colors/green'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import { isValueEmptyOrNull } from '../../../../utils/HelperFunctions'
import SnackbarHandler from '../../../../utils/SnackbarHandler'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { withTranslation } from 'react-i18next'
import { isEmailValid } from '../../../../utils/HelperFunctions'

import {
  requestTestConnection,
  addSettings,
  getAppLogo,
  addAppLogo,
  clearAppLogo,
  requestVersion,
  sendTestEmail,
} from '../../../../actions/Settings/system_actions'
import AppBar from '@mui/material/AppBar'
import General from './General'
import Authentication from './Authentication'
import Personalization from './Personalization'
import LogSettings from './LogSettings'
import { isNullOrUndefined } from 'util'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import CustomStyles from '../../../../assets/styles/Settings_styles/System/SystemSettingsStyles'
import {
  forceFullSync,
  forceManualSync,
} from '../../../../services/Setting/Setting'
import ConfirmationDialog from '../../../Shared/ConfirmationDialog'

const mapStateToProps = ({ Settings, SystemSettings }) => {
  return {
    settings: Settings.settings,
    errorTest: SystemSettings.error,
    loadingTest: SystemSettings.loading,
    successTest: SystemSettings.success,
    appLogo: SystemSettings.appLogo,
    successLogoUpdated: SystemSettings.successLogoUpdated,
    appLogoUpdate: SystemSettings.appLogoUpdate,
    successGetVersion: SystemSettings.successGetVersion,
    version: SystemSettings.version,
  }
}

const mapDispatchToProps = {
  AddSettings: addSettings,
  testConnection: requestTestConnection,
  getAppLogo: getAppLogo,
  addAppLogo: addAppLogo,
  clearAppLogo: clearAppLogo,
  requestVersion,
  sendTestEmail,
}

const timeZones = [
  { value: '-12:00', label: '(GMT-12:00) International Date Line West' },
  { value: '-11:00', label: '(GMT-11:00) Midway Island, Samoa' },
  { value: '-10:00', label: '(GMT-10:00) Hawaii' },
  { value: '-09:00', label: '(GMT-09:00) Alaska' },
  {
    value: '-08:00',
    label: '(GMT-08:00) Pacific Time (US & Canada), Tijuana, Baja California',
  },
  { value: '-08:00', label: '(GMT-08:00) Tijuana, Baja California' },
  { value: '-07:00', label: '(GMT-07:00) Arizona' },
  { value: '-07:00', label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan' },
  { value: '-07:00', label: '(GMT-07:00) Mountain Time (US & Canada)' },
  { value: '-06:00', label: '(GMT-06:00) Central America' },
  { value: '-06:00', label: '(GMT-06:00) Central Time (US & Canada)' },
  {
    value: '-06:00',
    label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey',
  },
  { value: '-06:00', label: '(GMT-06:00) Saskatchewan' },
  {
    value: '-05:00',
    label: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco',
  },
  { value: '-05:00', label: '(GMT-05:00) Eastern Time (US & Canada)' },
  { value: '-05:00', label: '(GMT-05:00) Indiana (East)' },
  { value: '-04:00', label: '(GMT-04:00) Atlantic Time (Canada)' },
  { value: '-04:00', label: '(GMT-04:00) Caracas, La Paz' },
  { value: '-04:00', label: '(GMT-04:00) Manaus' },
  { value: '-04:00', label: '(GMT-04:00) Santiago' },
  { value: '-03:30', label: '(GMT-03:30) Newfoundland' },
  { value: '-03:00', label: '(GMT-03:00) Brasilia' },
  { value: '-03:00', label: '(GMT-03:00) Buenos Aires, Georgetown' },
  { value: '-03:00', label: '(GMT-03:00) Greenland' },
  { value: '-03:00', label: '(GMT-03:00) Montevideo' },
  { value: '-02:00', label: '(GMT-02:00) Mid-Atlantic' },
  { value: '-01:00', label: '(GMT-01:00) Cape Verde Is.' },
  { value: '-01:00', label: '(GMT-01:00) Azores' },
  {
    value: '+00:00',
    label: '(GMT+00:00) Casablanca, Monrovia, Reykjavik',
  },
  {
    value: '+00:00',
    label:
      '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
  },
  {
    value: '+01:00',
    label: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  },
  {
    value: '+01:00',
    label: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  },
  {
    value: '+01:00',
    label: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris',
  },
  {
    value: '+01:00',
    label: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
  },
  { value: '+01:00', label: '(GMT+01:00) West Central Africa' },
  { value: '+02:00', label: '(GMT+02:00) Amman' },
  { value: '+02:00', label: '(GMT+02:00) Athens, Bucharest, Istanbul' },
  { value: '+02:00', label: '(GMT+02:00) Beirut' },
  { value: '+02:00', label: '(GMT+02:00) Cairo' },
  { value: '+02:00', label: '(GMT+02:00) Harare, Pretoria' },
  {
    value: '+02:00',
    label: '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
  },
  { value: '+02:00', label: '(GMT+02:00) Jerusalem' },
  { value: '+02:00', label: '(GMT+02:00) Minsk' },
  { value: '+02:00', label: '(GMT+02:00) Windhoek' },
  { value: '+03:00', label: '(GMT+03:00) Kuwait, Riyadh, Baghdad' },
  {
    value: '+03:00',
    label: '(GMT+03:00) Moscow, St. Petersburg, Volgograd',
  },
  { value: '+03:00', label: '(GMT+03:00) Nairobi' },
  { value: '+03:00', label: '(GMT+03:00) Tbilisi' },
  { value: '+03:30', label: '(GMT+03:30) Tehran' },
  { value: '+04:00', label: '(GMT+04:00) Abu Dhabi, Muscat' },
  { value: '+04:00', label: '(GMT+04:00) Baku' },
  { value: '+04:00', label: '(GMT+04:00) Yerevan' },
  { value: '+04:00', label: '(GMT+04:30) Kabul' },
  { value: '+05:00', label: '(GMT+05:00) Yekaterinburg' },
  { value: '+05:00', label: '(GMT+05:00) Islamabad, Karachi, Tashkent' },
  { value: '+05:30', label: '(GMT+05:30) Sri Jayawardenapura' },
  {
    value: '+05:30',
    label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
  },
  { value: '+05:45', label: '(GMT+05:45) Kathmandu' },
  { value: '+06:00', label: '(GMT+06:00) Almaty, Novosibirsk' },
  { value: '+06:00', label: '(GMT+06:00) Astana, Dhaka' },
  { value: '+06:30', label: '(GMT+06:30) Yangon (Rangoon)' },
  { value: '+07:00', label: '(GMT+07:00) Bangkok, Hanoi, Jakarta' },
  { value: '+07:00', label: '(GMT+07:00) Krasnoyarsk' },
  {
    value: '+08:00',
    label: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
  },
  { value: '+08:00', label: '(GMT+08:00) Kuala Lumpur, Singapore' },
  { value: '+08:00', label: '(GMT+08:00) Irkutsk, Ulaan Bataar' },
  { value: '+08:00', label: '(GMT+08:00) Perth' },
  { value: '+08:00', label: '(GMT+08:00) Taipei' },
  { value: '+09:00', label: '(GMT+09:00) Osaka, Sapporo, Tokyo' },
  { value: '+09:00', label: '(GMT+09:00) Seoul' },
  { value: '+09:00', label: '(GMT+09:00) Yakutsk' },
  { value: '+09:30', label: '(GMT+09:30) Adelaide' },
  { value: '+09:30', label: '(GMT+09:30) Darwin' },
  { value: '+10:00', label: '(GMT+10:00) Brisbane' },
  { value: '+10:00', label: '(GMT+10:00) Canberra, Melbourne, Sydney' },
  { value: '+10:00', label: '(GMT+10:00) Hobart' },
  { value: '+10:00', label: '(GMT+10:00) Guam, Port Moresby' },
  { value: '+10:00', label: '(GMT+10:00) Vladivostok' },
  {
    value: '+11:00',
    label: '(GMT+11:00) Magadan, Solomon Is., New Caledonia',
  },
  { value: '+12:00', label: '(GMT+12:00) Auckland, Wellington' },
  { value: '+12:00', label: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.' },
  { value: '+13:00', label: "(GMT+13:00) Nuku'alofa" },
]

const generateTimeZone = (timeZones) => {
  return timeZones.map((timeZone) => {
    timeZone = { ...timeZone, value: timeZone.value + '|' + timeZone.label }
    return timeZone
  })
}

//const cropper = React.createRef(null);

class SystemSettings extends Component {
  constructor(props) {
    super(props)
    const { t, settings } = props
    this.state = {
      src: '',
      cropedImageUrl: '',
      valueTab: 0,
      errorMessage: '',
      openRecipentSender: false,
      recipent: '',
      emailBody: '',
      zonaHoraria: generateTimeZone(timeZones),
      optionLogin: [
        { value: true, label: 'Login' },
        { value: false, label: t('ActiveDirectory') },
        { value: null, label: t('BothOfThem') },
      ],
      optionLogLevel: [
        { value: 2, label: t('Production') },
        { value: 6, label: t('Verbose') },
      ],
      systemDTO: settings
        ? settings.systemSettings
          ? settings.systemSettings
          : {
              ID: -1,
              emailFrom: 'AM Suite',
              hideExpiredBadges: false,
              hideExpiredEntities: false,
              enable_AD: false,
              lDAP_Domain: '',
              emailServer: '',
              email: '',
              showVisitorSelfRegistration: false,
            }
        : {
            ID: -1,
            emailFrom: 'AM Suite',
            hideExpiredBadges: false,
            hideExpiredEntities: false,
            enable_AD: false,
            lDAP_Domain: '',
            emailServer: '',
            email: '',
            preferredLanguage: 0,
            showVisitorSelfRegistration: false,
          },
      formErrors: {},
      isCreating: false,
      logIn: '',
      timezone: '',
      activeCards: -1,
      isLoadingImg: true,
      isLoadingLogo: false,
      LogoBanner: undefined,
      AppLogo: {
        img: undefined,
        crop: { unit: '%', width: 30, aspect: 4 / 4 },
        // croppedAreaPixels: {}
      },
      protocol: 'http',
      baseUrlRaw: '',
      openCropper: false,
      openConfirmation: false,
      syncType: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.errorTest !== prevState.errorTest ||
      nextProps.successTest !== prevState.successTest ||
      nextProps.loadingTest !== prevState.loadingTest ||
      nextProps.successLogoUpdated !== prevState.successLogoUpdated ||
      nextProps.successGetVersion !== prevState.successGetVersion
    ) {
      return {
        errorTest: nextProps.errorTest,
        successTest: nextProps.successTest,
        loadingTest: nextProps.loadingTest,
        successLogoUpdated: nextProps.successLogoUpdated,
        successGetVersion: nextProps.successGetVersion,
        version: nextProps.version,
      }
    } else return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.successTest &&
      prevState.successTest !== this.state.successTest
    ) {
      this.setState({ domainChange: false })
      SnackbarHandler.showMessage('Dominio correcto')
    }
    if (this.state.errorTest && prevState.errorTest !== this.state.errorTest) {
      SnackbarHandler.showMessage(this.props.t('IncorrectDomain'), 'error')
    }
    if (
      this.state.successLogoUpdated &&
      this.state.successLogoUpdated !== prevState.successLogoUpdated
    ) {
      this.props.getAppLogo()
    }
    if (
      isNullOrUndefined(this.state.AppLogo.img) &&
      !isNullOrUndefined(this.props.appLogo)
    ) {
      this.setState((prevState) => ({
        AppLogo: {
          ...prevState.AppLogo,
          img: {
            preview: 'data:image/png;base64,' + this.props.appLogo,
          },
        },
      }))
    }
  }

  componentDidMount() {
    this.loadSystem()
    this.props.requestVersion()
  }
  handleChangeTab = (event, value) => {
    this.setState({ valueTab: value })
  }

  justNumbers = (e) => {
    let keynum = window.event ? window.event.keyCode : e.which
    if (keynum === 8 || keynum === 46) return true
    return /\d/.test(String.fromCharCode(keynum));
  }

  loadSystem = () => {
    ApiHandler.Setting.Setting.getSystemSetting()
      .then(({ data }) => {
        this.setState({
          systemDTO: {
            ID: data.data.id,
            logIn: data.data.logIn,
            timeZone: data.data.timeZone,
            activeCards: data.data.activeCards,
            hideExpiredBadges: data.data.hideExpiredBadges,
            hideExpiredEntities: data.data.hideExpiredEntities,
            emailFrom: data.data.emailFrom,
            emailServer: data.data.emailServer,
            email: data.data.email,
            smtpPort: data.data.smtpPort,
            password: data.data.password,
            lDAP_Domain: data.data.ldaP_Domain,
            enable_AD: data.data.enable_AD,
            enable_AMSuiteLogin: data.data.enable_AMSuiteLogin,
            requireLogin: data.data.requireLogin,
            useSSL: data.data.useSSL,
            addLinksToEmails: data.data.addLinksToEmails,
            baseUrl: data.data.addLinksToEmails ? data.data.baseUrl : '',
            preferredLanguage: data.data.preferredLanguage,
            showVisitorSelfRegistration: data.data.showVisitorSelfRegistration,
            colorPrimary: data.data.colorPrimary,
            colorBackground: data.data.colorBackground,
            colorBackgroundSecondary: data.data.colorBackgroundSecondary,
            colorText: data.data.colorText,
            colorTextSecondary: data.data.colorTextSecondary,
            logFolderPath: data.data.logFolderPath,
            logLevel: data.data.logLevel ? data.data.logLevel : 2,
            maxLogSizeInMB: data.data.maxLogSizeInMB,
            maxNumberOfLogFiles: data.data.maxNumberOfLogFiles,
            enable_SAML: data.data.enable_SAML,
            loginURL: data.data.loginURL,
          },
          logLevel: this.GetOptionLogLevel(data.data.logLevel),
          logIn: this.GetOptionLogIn(data.data.logIn),
          timeZone: this.GetOptionTimeZone(data.data.timeZone),
          activeCards: data.data.activeCards,
          hideExpiredBadges: data.data.hideExpiredBadges,
          hideExpiredEntities: data.data.hideExpiredEntities,
          protocol: data.data.baseUrl.includes('https') ? 'https' : 'http',
          baseUrlRaw: data.data.addLinksToEmails
            ? data.data.baseUrl.replace('https://', '').replace('http://', '')
            : '',
        })
        NavBarSettings.hideLoader()
      })
      .catch((error) => {
        console.log(error)
      })

    ApiHandler.Setting.Setting.getLogoBannerSetting()
      .then(({ data }) => {
        this.setState({
          logoUpdate: false,
          LogoBanner:
            data === null ? null : { preview: 'data:image/png;base64,' + data },
          isLoadingImg: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })

    this.props.getAppLogo()
  }

  GetOptionTimeZone = (value) => {
    for (let i = 0; i < this.state.zonaHoraria.length; i++) {
      if (this.state.zonaHoraria[i].value === value) {
        return this.state.zonaHoraria[i]
      }
    }
    return
  }
  GetOptionLogIn = (value) => {
    for (let i = 0; i < this.state.optionLogin.length; i++) {
      if (this.state.optionLogin[i].value === value)
        return this.state.optionLogin[i]
    }
    return
  }

  GetOptionLogLevel = (value) => {
    for (let i = 0; i < this.state.optionLogLevel.length; i++) {
      if (this.state.optionLogLevel[i].value === value)
        return this.state.optionLogLevel[i]
    }
    return
  }

  testAuthentication = () => {
    const domain = this.state.systemDTO.lDAP_Domain
    this.props.testConnection(domain)
  }

  handleChangeBoolean = (e, data) => {
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        [name]: value,
      },
    }))
    const name = data.name
    const value = data.checked
    if (name === 'enable_AD' && !value) {
      this.setState({ domainChange: false })
    }
    if (name === 'enable_AD' && value) {
      this.setState({ domainChange: true })
    }
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        [name]: value,
      },
    }))
  }

  handleChange = (name) => (event) => {
    let value = event.target ? event.target.value : event.value

    if (name === 'lDAP_Domain') {
      this.setState({
        domainChange: true,
      })
    }
    if (name === 'timeZone') {
      this.setState({
        timeZone: this.GetOptionTimeZone(value),
      })
    }
    if (name === 'logIn') {
      this.setState({
        logIn: this.GetOptionLogIn(value),
      })
    }
    if (name === 'logLevel') {
      this.setState({
        logLevel: this.GetOptionLogLevel(value),
      })
    }
    if (name === 'activeCards') {
      this.setState({
        activeCards: value,
      })
    }
    if (name === 'recipent') {
      this.setState({
        recipent: value,
      })
    }
    if (name === 'emailBody') {
      this.setState({
        emailBody: value,
      })
    }
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        [name]: value,
      },
    }))
  }

  handleChangeColor = (name, value) => {
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        [name]: value,
      },
    }))
  }

  restoreColor = (colors) => {
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        ...colors,
      },
    }))
  }

  handleChangeUrl = (e) => {
    const aux = e.target.value.trim()
    this.setState((prevState) => {
      return {
        systemDTO: {
          ...prevState.systemDTO,
          baseUrl: prevState.systemDTO.baseUrl.split('://')[0] + '://' + aux,
        },
        baseUrlRaw: aux,
      }
    })
  }

  handleChangeProtocol = (e) => {
    const aux = e.target.value
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        baseUrl: aux + '://' + prevState.baseUrlRaw,
      },
      protocol: aux,
    }))
  }

  handleEneableDisable = () => {
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        addLinksToEmails: !prevState.systemDTO.addLinksToEmails,
        baseUrl: !prevState.systemDTO.addLinksToEmails
          ? prevState.systemDTO.baseUrl
          : '',
      },
      protocol: !prevState.systemDTO.addLinksToEmails
        ? prevState.protocol
        : 'http',
      baseUrlRaw: !prevState.systemDTO.addLinksToEmails
        ? prevState.baseUrlRaw
        : '',
    }))
  }
  handleEneableDisableUseSSL = () => {
    this.setState((prevState) => ({
      systemDTO: {
        ...prevState.systemDTO,
        useSSL: !prevState.systemDTO.useSSL,
      },
    }))
  }
  handleCreate = () => {
    const { systemDTO, logoUpdate } = this.state
    const newSystemDTO = {
      ...systemDTO,
      baseUrl: this.removeExcessBars(
        systemDTO.baseUrl,
        systemDTO.addLinksToEmails
      ),
    }
    const errors = this.validateCreate(newSystemDTO)
    const { t } = this.props
    this.setState({
      formErrors: errors,
    })
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      })
      ApiHandler.Setting.Setting.editSystemSetting(newSystemDTO)
        .then((response) => {
          const settings = this.props.settings

          this.props.AddSettings({
            ...settings,
            systemSettings: newSystemDTO,
          })
          SnackbarHandler.showMessage(t('SuccessfullySavedChanges'))
          this.setState({
            isCreating: false,
            isSuccess: true,
          })
          setTimeout(() => {
            this.setState({
              isSuccess: false,
            })
          }, 1000)
        })
        .catch((error) => {
          this.setState({
            isCreating: false,
          })
          SnackbarHandler.showMessage('Problemas con el servidor', 'error')
        })
      setTimeout(() => {
        this.setState({
          isSuccess: false,
        })
      }, 1000)
      if (this.state.LogoBanner) {
        if (logoUpdate) {
          ApiHandler.Setting.Setting.SaveLogo(
            this.state.LogoBanner,
            newSystemDTO.ID
          )
            .then(() => {
              SnackbarHandler.showMessage(t('SuccessfullyPersonCreated'))
              this.setState({
                isCreating: false,
                isSuccess: true,
              })
              setTimeout(() => {
                this.setState({
                  isSuccess: false,
                })
              }, 1000)
            })
            .catch((error) => {
              this.setState({
                isCreating: false,
              })
              SnackbarHandler.showMessage(error.error, 'error')
            })
        }
      }
      if (this.state.appLogoUpdate)
        if (this.state.AppLogo.img) {
          this.props.addAppLogo(this.state.AppLogo.img, newSystemDTO.ID)
        }
      setTimeout(() => {
        this.setState({
          isSuccess: false,
        })
      }, 1000)
    } else {
      if (errors.unselectedLoginMethod) this.setState({ valueTab: 1 })
      SnackbarHandler.showMessage(t('invalidOrIncompleteInput'), 'error')
    }
  }

  removeExcessBars = (domain, check) => {
    if (check) {
      let aux = domain.split('://')
      if (aux.length > 1) {
        let i
        for (i = aux[1].length - 1; i > 0; i--) {
          if (aux[1][i] === '/') {
            aux[1] = aux[1].substring(0, aux[1].length - 1)
          }
        }
        this.setState({ baseUrlRaw: aux[1] })
        //return aux.join("://");
        return this.state.protocol + '://' + aux[1]
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  validateCreate = (systemDTO) => {
    const {
      baseUrlRaw,
      protocol,
      logLevel,
      maxLogSizeInMB,
      maxNumberOfLogFiles,
      logFolderPath,
    } = this.state

    return {
      // ID: isValueEmptyOrNull(systemDTO.ID),
      timezone: isValueEmptyOrNull(systemDTO.timeZone),
      // protocol: isValueEmptyOrNull(protocol) && systemDTO.addLinksToEmails,
      // baseUrlRaw: isValueEmptyOrNull(baseUrlRaw) && systemDTO.addLinksToEmails,
      logLevel: isNullOrUndefined(this.state.systemDTO.logLevel),
      maxLogSizeInMB: isValueEmptyOrNull(this.state.systemDTO.maxLogSizeInMB),
      maxNumberOfLogFiles: isValueEmptyOrNull(
        this.state.systemDTO.maxNumberOfLogFiles
      ),
      logFolderPath: isValueEmptyOrNull(this.state.systemDTO.logFolderPath),
      // email:
      //   systemDTO.EmailOfTheSystem ||
      //   systemDTO.emailServer ||
      //   systemDTO.emailFrom ||
      //   systemDTO.EneableLinksViaEmail ||
      //   systemDTO.addLinksToEmails ||
      //   systemDTO.password
      //     ? !isEmailValid(this.state.systemDTO.email)
      //     : false,
      unselectedLoginMethod:
        !systemDTO.enable_AMSuiteLogin && !systemDTO.enable_AD,
      //baseUrlRaw: aux.length < 2 && !aux2
      // activeCards: isValueEmptyOrNull(systemDTO.activeCards)
    }
  }

  setImageDefault = () => {
    if (this.state.isLoadingImg) {
      return (
        <CircularProgress
          size={50}
          style={{
            top: '50%',
            left: '50%',
            color: 'white',
          }}
        />
      )
    } else if (!this.state.LogoBanner) {
      return (
        <AccountCircle
          style={{
            fontSize: 150,
            color: 'white',
          }}
        />
      )
    } else {
      this.setFile()
    }
  }

  setDefaultLogo = () => {
    if (this.state.isLoadingLogo) {
      return (
        <CircularProgress
          size={50}
          style={{
            top: '50%',
            left: '50%',
            color: 'white',
          }}
        />
      )
    } else if (!this.state.AppLogo.img) {
      return (
        <AccountCircle
          style={{
            fontSize: 150,
            color: 'white',
          }}
        />
      )
    } else {
      this.setLogo()
    }
  }

  setFile = () => {
    if (isValueEmptyOrNull(this.state.LogoBanner)) {
      return undefined
    } else {
      return [{ preview: this.state.LogoBanner.preview }]
    }
  }

  setLogo = () => {
    if (isValueEmptyOrNull(this.state.AppLogo.img)) {
      return undefined
    } else {
      return [{ preview: this.state.AppLogo.img.preview }]
    }
  }

  handleOnFiles = (files) => {
    this.setState({
      LogoBanner: files[0],
      logoUpdate: true,
    })
  }

  handleOnLogoFiles = (files) => {
    this.setState((prevState) => ({
      AppLogo: { ...prevState.AppLogo, imgToCropped: files[0] },
      openCropper: true,
      appLogoUpdate: true,
    }))
  }

  handleSendEmail = () => {
    const {
      emailFrom,
      emailServer,
      smtpPort,
      password,
      email,
      addLinksToEmails,
      useSSL,
      baseUrl,
      preferredLanguage,
    } = this.state.systemDTO
    const systemDTO = {
      emailFrom,
      emailServer,
      email,
      smtpPort,
      password,
      useSSL,
      addLinksToEmails,
      baseUrl,
      preferredLanguage,
    }
    this.setState({
      recipent: '',
      emailBody: '',
      openRecipentSender: false,
    })
    this.props.sendTestEmail({
      systemDTO,
      recipent: this.state.recipent,
      body: this.state.emailBody,
    })
  }

  handleRecipentSender = (value) => () => {
    this.setState({
      openRecipentSender: value,
    })
  }

  handleManualSync = async () => {
    const { t } = this.props
    const { syncType } = this.state
    try {
      let response
      if (syncType === 'partial') response = await forceManualSync()
      if (syncType === 'full') response = await forceFullSync()
      if (response.status === 200)
        SnackbarHandler.showMessage(
          syncType === 'full'
            ? t('successManualSyncFull')
            : t('successManualSync')
        )
      else {
        SnackbarHandler.showMessage(
          syncType === 'full' ? t('errorManualSyncFull') : t('errorManualSync'),
          'error'
        )
      }
    } catch (err) {
      SnackbarHandler.showMessage(
        syncType === 'full' ? t('errorManualSyncFull') : t('errorManualSync'),
        'error'
      )
    }
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    this.cropper.getCroppedCanvas().toBlob((blob) => {
      let url = URL.createObjectURL(blob)
      blob.preview = url
      blob.name = 'AppLogo.png'
      this.setState((prevState) => ({
        AppLogo: { img: blob },
        openCropper: false,
      }))
    })
  }

  render() {
    const { classes, theme, t } = this.props
    const {
      timeZone,
      formErrors,
      systemDTO,
      zonaHoraria,
      isLoadingImg,
      isCreating,
      domainChange,
      loadingTest,
      optionLogLevel,
      logLevel,
    } = this.state
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? '1' : '0',
            }}
            className={classes.customLinearProgress}
            variant='query'
          />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {t('System')}
            </Typography>
            {!isNullOrUndefined(this.state.version) &&
              this.state.version !== '' && (
                <Typography>{`v ${this.state.version}`}</Typography>
              )}
            <AppBar
              style={{ marginTop: '5%', zIndex: 1 }}
              position='static'
              color='inherit'
            >
              <Tabs
                value={this.state.valueTab}
                onChange={this.handleChangeTab}
                indicatorColor='primary'
                textColor='inherit'
                variant='fullWidth'
                centered
              >
                <Tab className={classes.textTab} label={t('General')} />
                <Tab
                  className={classes.textTab}
                  label={t('Authentication')}
                  style={{ paddingRight: '8px' }}
                />
                <Tab className={classes.textTab} label={t('Look&Feel')} />
                <Tab className={classes.textTab} label={t('SystemLog')} />
              </Tabs>
            </AppBar>
            {this.state.valueTab === 0 && (
              <General
                timezone={timeZone}
                formErrors={formErrors}
                systemDTO={systemDTO}
                zonaHoraria={zonaHoraria}
                isCreating={isCreating}
                protocol={this.state.protocol}
                baseUrl={this.state.baseUrlRaw}
                key={this.state.valueTab === 0}
                files={[this.state.LogoBanner]}
                openRecipentSender={this.state.openRecipentSender}
                handleChange={this.handleChange}
                handleEneableDisableUseSSL={this.handleEneableDisableUseSSL}
                handleChangeBoolean={this.handleChangeBoolean}
                handleEneableDisable={this.handleEneableDisable}
                handleChangeProtocol={this.handleChangeProtocol}
                handleChangeUrl={this.handleChangeUrl}
                handleSendEmail={this.handleSendEmail}
                handleRecipentSender={this.handleRecipentSender}
                handleManualSync={(type) => {
                  this.setState({ openConfirmation: true, syncType: type })
                }}
                recipent={this.state.recipent}
                emailBody={this.state.emailBody}
              />
            )}

            {this.state.valueTab === 1 && (
              <Authentication
                systemDTO={systemDTO}
                handleChange={this.handleChange}
                handleChangeBoolean={this.handleChangeBoolean}
                domainChange={domainChange}
                loadingTest={loadingTest}
                testAuthentication={this.testAuthentication}
                isCreating={isCreating}
                formErrors={formErrors}
              />
            )}
            {this.state.valueTab === 2 && (
              <Personalization
                update={
                  (this.state.LogoBanner
                    ? this.state.LogoBanner.preview
                    : this.state.AppLogo.img) +
                  (this.state.AppLogo.img
                    ? this.state.AppLogo.img.preview
                    : this.state.AppLogo.img)
                }
                systemDTO={systemDTO}
                handleChangeColor={this.handleChangeColor}
                restoreColor={this.restoreColor}
                handleChangeBoolean={this.handleChangeBoolean}
                domainChange={domainChange}
                loadingTest={loadingTest}
                testAuthentication={this.testAuthentication}
                isCreating={isCreating}
                formErrors={formErrors}
                setImageDefault={this.setImageDefault}
                setFile={this.setFile}
                handleOnFiles={this.handleOnFiles}
                isLoadingImg={isLoadingImg}
                setLogo={this.setLogo}
                setDefaultLogo={this.setDefaultLogo}
                handleOnLogoFiles={this.handleOnLogoFiles}
              />
            )}

            {this.state.valueTab === 3 && (
              <LogSettings
                handleChange={this.handleChange}
                formErrors={formErrors}
                systemDTO={systemDTO}
                isCreating={isCreating}
                justNumbers={this.justNumbers}
                optionLogLevel={optionLogLevel}
                logLevel={logLevel}
              />
            )}

            <div
              className={classes.submit}
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
              <Button
                fullWidth
                variant='contained'
                color='primary'
                disabled={this.state.isCreating || this.state.domainChange}
                onClick={this.state.isCreating ? undefined : this.handleCreate}
                style={{
                  background: this.state.isSuccess ? green[500] : undefined,
                  color: theme.palette.text.main,
                }}
              >
                {this.state.isSuccess
                  ? t('SuccessfullySaved')
                  : this.state.isCreating
                  ? ''
                  : t('Save')}
              </Button>
              {this.state.isCreating && (
                <CircularProgress
                  size={24}
                  className={classes.customCircularProgress}
                />
              )}
            </div>
          </Paper>
        </div>
        <ConfirmationDialog
          open={this.state.openConfirmation}
          confirmFunction={this.handleManualSync}
          onClose={() => {
            this.setState({ openConfirmation: false })
          }}
          title={t('confirmRequired')}
          body={t('startManualSync')}
        />
        <Dialog
          // fullScreen={fullScreen}
          open={this.state.openCropper}
          onClose={this.handleCloseCroper}
          aria-labelledby='responsive-dialog-title'
          maxWidth='lg'
          fullWidth={true}
        >
          <DialogContent style={{ height: 600 }}>
            <div className={classes.cropContainer}>
              <Cropper
                src={
                  this.state.AppLogo.imgToCropped
                    ? this.state.AppLogo.imgToCropped.preview
                    : ''
                }
                className={classes.cropper}
                // Cropper.js options
                aspectRatio={4 / 4}
                guides={false}
                ref={(cropper) => {
                  this.cropper = cropper
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Typography variant='h6' style={{ position: 'absolute', left: 15 }}>
              {t('SelectAspectRatio')}
            </Typography>
            <Button
              onClick={this.cropImage}
              variant='contained'
              color='primary'
            >
              {t('Confirm')}
            </Button>
            <Button
              onClick={() => this.setState({ openCropper: false })}
              color='primary'
              variant='contained'
              autoFocus
            >
              {t('Close')}
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    )
  }
}

SystemSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const SystemSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemSettings)

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(SystemSettingsConnected)
)
