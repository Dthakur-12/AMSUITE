import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { create } from "apisauce";
import axios from 'axios';
import i18n from 'i18next'
import { isValueEmptyOrNull } from '../../utils/HelperFunctions'
import AmSuiteNavBar from '../../utils/AmSuiteNavBar'
import StartAmSuiteNavBar from '../../utils/StartAmSuiteNavBar'
import { connectSocket, socketIO } from '../../utils/WebSockets'
import {
  login,
  loginActiveDirectory,
  clearLoginStore,
} from '../../actions/Users/user_actions'
import { requestLoginSAML } from '../../actions/Settings/saml_actions'
import { withTranslation } from 'react-i18next'
import {
  cleanVisitRequest,
  receiveVisitRequest,
} from '../../actions/Notifications/systemNotifications_actions'
import ApiHandler from '../../services/ApiHandler'
import { setUrlApi } from '../../Config'
import { disconnectSocket } from '../../utils/WebSockets'
import { clearStorage } from '../../utils/Utils'

// const axios = require("axios");
const apiInstance = axios.create();

const withLogin = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props)
      const { t } = this.props
      this.state = {
        passwordHidden: true,
        isLogin: false,
        isSuccess: false,
        isADLogin: false,
        errorMessage: '',
        anchorElLanguage: null,
        newLogin: {
          email: '',
          password: '',
        },
        formErrors: {},
        language:
          t('spanish') === 'Spanish'
            ? 'English'
            : t('spanish') === 'Espagnol'
            ? 'Français'
            : t('spanish') === 'Espanhol'
            ? 'Português'
            : 'Español',
      }
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateScreenMode)
      
      apiInstance.interceptors.response.eject(this.axiosInterceptor);
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 })
    }

    componentDidMount() {
      this.updateScreenMode()
      connectSocket()
      this.props.clearStore()
      this.setupAxiosInterceptor();
    }
    setupAxiosInterceptor = () => {
      this.axiosInterceptor = apiInstance.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response.status === 401 && !error.response.config.url.includes('CurrentSession')) {
            this.handleAutoLogout();
          }
          return Promise.reject(error);
        }
      );
    };

    handleAutoLogout = () => {
      ApiHandler.AMSuite.Session.logout()
      clearStorage()
      setUrlApi()
      disconnectSocket()
    };
    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.currentUser !== prevState.currentUser ||
        nextProps.error !== prevState.error ||
        nextProps.isLoading !== prevState.isLoading ||
        nextProps.isLoginButtonActiveDirectory !==
          prevState.isLoginButtonActiveDirectory ||
        nextProps.isLoginButton !== prevState.isLoginButton
      ) {
        return {
          currentUser: nextProps.currentUser,
          errorMessage: nextProps.error,
          isLoginButtonActiveDirectory: nextProps.isLoginButtonActiveDirectory,
          isLoginButton: nextProps.isLoginButton,
        }
      } else return null
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.currentUser !== this.state.currentUser) {
        this.correctLogin()
      }
      if (prevState.errorMessage !== this.state.errorMessage) {
        this.setState({
          isLoginButton: false,
          isLogin: false,
          isSuccess: false,
        })
      }
    }

    correctLogin = () => {
      const { currentUser, settings, cleanVisitRequest, receiveVisitRequest } =
        this.props
      //let loginValid;
      socketIO.emit('logIn', currentUser.id, currentUser.token)
      const handleNavigation = this.handleNavigation
      const cleanVisit = cleanVisitRequest
      const receiveVisit = receiveVisitRequest
      socketIO.on('logInValid', function (data) {
        //loginValid = data.message;
        if (!data.message) {
          handleNavigation()
        } else {
          socketIO.emit('subscriptionNotifications', currentUser)
        }
      })
      socketIO.on('AnyVisitsToApprove', function (data) {
        if (!data.message) {
          cleanVisit()
        } else {
          receiveVisit()
        }
        // if (!data.message) handleNavigation();
      })
      if (settings) {
        localStorage.setItem('userToken', currentUser.token)
        localStorage.setItem('user', JSON.stringify(currentUser))
        if (settings.systemSettings.requireLogin) {
          setTimeout(function () {
            ApiHandler.AMSuite.Session.logout()
            clearStorage()
            // localStorage.clear()
            setUrlApi()
            disconnectSocket()
            // this.props.onNavigation(-1);
            console.log('witlogin1',this.props)
            this.props.history.push('/login')
          }, 1000 * 60 * 60)
        }
      }
      // this.props.onLogin(data);
      this.setState({
        isLoginButton: false,
        isSuccess: true,
        isLoginButtonActiveDirectory: false,
        isSuccessActiveDirectory: true,
        errorMessage: '',
      })
      setTimeout(() => {
        this.props.clearStore()
        if (AmSuiteNavBar.appNavigation) {
          console.log('witlogin2',AmSuiteNavBar.appNavigation)
          AmSuiteNavBar.appNavigation.history.push('/home')
          AmSuiteNavBar.update()
        } else {
          console.log('witlogin3',StartAmSuiteNavBar.appNavigation)
          StartAmSuiteNavBar.appNavigation.history.push('/home')
        }
      }, 1000)
    }

    Login = () => {
      const errors = this.validateLogin()
      if (!Object.keys(errors).some((x) => errors[x])) {
        this.setState({
          isLoginButton: true,
          formErrors: errors,
          errorMessage: '',
        })
        const { newLogin } = this.state
        this.props.login(newLogin)
      } else {
        this.setState({
          formErrors: errors,
        })
      }
    }

    LoginSAML = () => {
      const { settings } = this.props
      // this.props.requestLoginSAML();
      window.location.replace(settings.systemSettings.loginURL)
    }

    redirect = () => {
      console.log('witlogin4',this.props)
      this.props.history.push('/autoregister')
    }

    handleNavigation = () => {
      this.props.clearStore()
      this.setState({
        isLoginButton: false,
        isLoginButtonActiveDirectory: false,
      })
      console.log('witlogin5',this.props)
      this.props.history.push('/noPermission')
    }

    handleMenuLanguage = (event) => {
      const { currentTarget } = event
      const openLanguage = Boolean(this.state.anchorElLanguage)
      openLanguage
        ? this.setState({ anchorElLanguage: null })
        : this.setState({ anchorElLanguage: currentTarget })
    }

    handleCloseLanguage = () => {
      this.setState({ anchorElLanguage: null })
    }

    changeLanguage = (language) => {
      const { t } = this.props
      if (language === 'es') {
        i18n.changeLanguage('es')
        localStorage.setItem('language', 'es')
        this.setState((prevState) => ({
          ...prevState,
          language: t('spanish'),
          anchorElLanguage: null,
        }))
      }
      if (language === 'en') {
        i18n.changeLanguage('en')
        localStorage.setItem('language', 'en')
        this.setState((prevState) => ({
          ...prevState,
          language: t('english'),
          anchorElLanguage: null,
        }))
      }
      if (language === 'fr') {
        i18n.changeLanguage('fr')
        localStorage.setItem('language', 'fr')
        this.setState((prevState) => ({
          ...prevState,
          language: t('french'),
          anchorElLanguage: null,
        }))
      }
      if (language === 'pr') {
        i18n.changeLanguage('pr')
        localStorage.setItem('language', 'pr')
        this.setState((prevState) => ({
          ...prevState,
          language: t('portugues'),
          anchorElLanguage: null,
        }))
      }
    }

    LoginActiveDirectory = () => {
      const { loginActiveDirectory } = this.props
      const errors = this.validateLogin()
      if (!Object.keys(errors).some((x) => errors[x])) {
        this.setState({
          formErrors: errors,
          errorMessage: '',
          isADLogin: true,
        })
        const { newLogin } = this.state
        loginActiveDirectory({
          User: newLogin.email,
          Password: newLogin.password,
        })
      } else {
        this.setState({
          formErrors: errors,
        })
      }
    }

    handleChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value
      this.setState((prevState) => ({
        newLogin: {
          ...prevState.newLogin,
          [name]: value,
        },
      }))
    }

    validateLogin = () => {
      const { newLogin } = this.state
      return {
        email: isValueEmptyOrNull(newLogin.email),
        password: isValueEmptyOrNull(newLogin.password),
      }
    }

    keyPress = (e) => {
      const { settings } = this.props
      if (
        settings &&
        !(
          settings.systemSettings.enable_AD &&
          settings.systemSettings.enable_AMSuiteLogin
        )
      )
        if (e.keyCode === 13)
          if (settings && settings.systemSettings.enable_AMSuiteLogin)
            this.Login()
          else this.LoginActiveDirectory()
    }

    render() {
      const {
        newLogin,
        isLogin,
        passwordHidden,
        formErrors,
        loginAttempt,
        errorMessage,
        isLoginButton,
        isLoginButtonActiveDirectory,
        isSuccess,
        isDesktop,
        anchorElLanguage,
        language,
      } = this.state
      return (
        <Component
          LoginSAML={this.LoginSAML}
          isSuccess={isSuccess}
          anchorElLanguage={anchorElLanguage}
          isLoginButton={isLoginButton}
          isLoginButtonActiveDirectory={isLoginButtonActiveDirectory}
          errorMessage={errorMessage}
          newLogin={newLogin}
          Login={this.Login}
          redirect={this.redirect}
          isLogin={isLogin}
          LoginActiveDirectory={this.LoginActiveDirectory}
          handleChange={this.handleChange}
          keyPress={this.keyPress}
          handleMenuLanguage={this.handleMenuLanguage}
          handleCloseLanguage={this.handleCloseLanguage}
          changeLanguage={this.changeLanguage}
          formErrors={formErrors}
          loginAttempt={loginAttempt}
          passwordHidden={passwordHidden}
          isDesktop={isDesktop}
          language={language}
          handlePasswordHidden={() =>
            this.setState((state) => ({
              passwordHidden: !state.passwordHidden,
            }))
          }
          isADLogin={this.state.isADLogin}
          {...this.props}
        />
      )
    }
  })

const mapDispatchToProps = {
  login: login,
  loginActiveDirectory: loginActiveDirectory,
  clearStore: clearLoginStore,
  receiveVisitRequest: receiveVisitRequest,
  cleanVisitRequest: cleanVisitRequest,
  requestLoginSAML,
}
const mapStateToProps = ({ Settings, User }) => {
  return {
    currentUser: User.currentUser,
    error: User.error,
    isLoginButtonActiveDirectory: User.isLoginButtonActiveDirectory,
    isLoginButton: User.isLoginButton,
    isLoading: User.isLoading,
    settings: Settings.settings,
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withLogin
)
