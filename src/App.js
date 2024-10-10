import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
// import { MuiPickersUtilsProvider } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/es";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import ApiHandler from "./services/ApiHandler";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Index from "./components/Index";
import español from "./assets/language/AMSuite.es-US";
import english from "./assets/language/AMSuite.en-US";
import french from "./assets/language/AMSuite.fr-FR.json";
import portugues from "./assets/language/AMSuite.pr-PR.json";
import rootSaga from "../src/sagas/saga";
import createSagaMiddleware from "redux-saga";
import reducer from "../src/reducers/Root_reducer";
import { setUrlApi } from "./Config";
import "react-datepicker/dist/react-datepicker.css";
import CacheBuster from "./CacheBuster";
console.log("navigator.language: ", navigator.language);
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      es: {
        translation: español,
      },
      en: {
        translation: english,
      },
      fr: {
        translation: french,
      },
      pr: {
        translation: portugues,
      },
    },
    lng:
      localStorage.getItem("language") != null
        ? localStorage.getItem("language")
        : navigator.language.includes("es")
        ? "es"
        : navigator.language.includes("en")
        ? "en"
        : navigator.language.includes("fr")
        ? "fr"
        : navigator.language.includes("pt")
        ? "pr"
        : "en",
    fallbackLng:
      localStorage.getItem("language") != null
        ? localStorage.getItem("language")
        : navigator.language.includes("es")
        ? "es"
        : navigator.language.includes("en")
        ? "en"
        : navigator.language.includes("fr")
        ? "fr"
        : navigator.language.includes("pt")
        ? "pr"
        : "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      omitBoundRerender: false,
    },
  });

const sagaMiddleware = createSagaMiddleware();
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);
const store = createStore(
  reducer,
  // composeWithDevTools(applyMiddleware(sagaMiddleware))
      applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

class App extends Component {
  constructor(props) {
    super(props);
    moment.locale("es");
    this.state = {
      LogoBanner: undefined,
      isLogin: true,
      isReady: false,
      isReadXml: false,
    };
  }

  componentWillMount() {
    setUrlApi(() =>
      this.setState((prevState) => ({ ...prevState, isReadXml: true }))
    );
  }

  componentDidMount() {}

  componentWillUpdate(nextProps, nextState) {
    const { isLogin } = this.state;
    if (nextState.isReadXml === true && this.state.isReadXml === false) {
      this.loadLogo();
      this.loadSettings();
    }
  }

  componentDidUpdate(nextProps, nextState) {}

  loadSettings = () => {
    ApiHandler.Setting.Setting.getSettings()
      .then(({ data }) => {
        const { systemSettings } = data;
        this.setState({
          background: systemSettings
            ? systemSettings.colorBackground
            : "#303030",
        });
      })
      .catch(() => {
        console.log("Error settings");
        // localStorage.clear();
        // setUrlApi();
        // AmSuiteNavBar.appNavigation.history.push("/serverError");
      });
  };

  loadLogo = () => {
    ApiHandler.Setting.Setting.getLogoBannerSetting()
      .then(({ data }) => {
        this.setState((prevState) => ({
          ...prevState,
          LogoBanner: "data:image/png;base64," + data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  isLogin = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLogin: false,
    }));
  };

  isLogout = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLogin: true,
    }));
  };

  render() {
    const { isLogin, isReadXml, background } = this.state;
    return (
      <CacheBuster>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          if (loading) return null;
          if (!loading && !isLatestVersion) {
            // You can decide how and when you want to force reload
            refreshCacheAndReload();
          }

          return (
            <Provider store={store}>
              <div
                className="App"
                style={{
                  position: "inherit",
                  overflow: "hidden",
                  backgroundColor: background,
                  height: "100vh !important",
                }}
              >
                <header
                  className="App-header"
                  style={{
                    backgroundImage: isLogin
                      ? `url(${this.state.LogoBanner})`
                      : "",
                    backgroundSize: "cover",
                    paddingRight: "0px !important",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}
                    utils={MomentUtils}
                    locale="es"
                    moment={moment}
                  >
                    <React.Fragment>
                      <CssBaseline />
                      {isReadXml && (
                        <Index
                          isLoginFunction={this.isLogin}
                          isLogoutFunction={this.isLogout}
                          isLogin={this.state.isLogin}
                        />
                      )}
                    </React.Fragment>
                  </LocalizationProvider>
                </header>
              </div>
            </Provider>
          );
        }}
      </CacheBuster>
    );
  }
}

export default App;
