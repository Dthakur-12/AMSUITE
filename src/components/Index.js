// import React, { Component,useState } from "react";
// import { connect } from "react-redux";
// import { TextField, Button, Box, Typography, Container } from "@mui/material";

// import StartNavigation from "./StartNavigation";
// import ApiHandler from "../services/ApiHandler";
// import { setUrlApi } from "../Config";
// import { addSettings } from "../actions/Settings/system_actions";
// import { createMuiTheme, MuiThemeProvider, StyledEngineProvider, adaptV4Theme,ThemeProvider } from "@mui/material/styles";
// import { clearStorage } from "../utils/Utils";


// class Index extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     this.loadSettings();
//   }

//   loadSettings = () => {
//     ApiHandler.Setting.Setting.getSettings()
//       .then(({ data }) => {
//         //this.tryLogin();
//         this.props.onSettings(data);
//       })
//       .catch(() => {
//         console.log("Error settings");
//         clearStorage()
//         // localStorage.clear();
//         setUrlApi();
//         // AmSuiteNavBar.appNavigation.history.push("/serverError");
//       });
//   };

//   render() {
//     const { settings } = this.props;
//     let primary = "#296084";
//     let background = "#303030";
//     let backgroundSecondary = "#424242";
//     let text = "#ffffff";
//     let textSecondary = "#c6c6c6";
//     if (settings) {
//       const { systemSettings } = settings;
//       const {
//         colorPrimary,
//         colorBackground,
//         colorBackgroundSecondary,
//         colorText,
//         colorTextSecondary,
//       } = systemSettings;
//       primary = colorPrimary;
//       background = colorBackground;
//       backgroundSecondary = colorBackgroundSecondary;
//       text = colorText;
//       textSecondary = colorTextSecondary;
//     }

//     const systemColors = {
//       primary: { main: primary },
//       background: { main: background },
//       backgroundSecondary: { main: backgroundSecondary },
//       text: { main: text },
//       textSecondary: { main: textSecondary },
//       type: "dark",
//     };

//     const theme = createMuiTheme(adaptV4Theme({
//       palette: {
//         primary: systemColors.primary,
//         background: systemColors.background,
//         backgroundSecondary: systemColors.backgroundSecondary,
//         text: systemColors.text,
//         textSecondary: systemColors.textSecondary,
//         type: "dark",
//       },
//       typography: {
//         useNextVariants: true,
//         fontFamily: "'Lato', sans-serif",
//         fontSize: 14,
//       },
//       overrides: {
//         MuiToggleButton: {
//           root: { color: systemColors.text.main },
//           "&$selected": {
//             color: systemColors.primary.main,
//           },
//         },
//         MuiTypography: {
//           root: { color: systemColors.text.main + " !important" },
//         },
//         MuiStep: {
//           root: { textColor: systemColors.text.main },
//         },
//         MuiStepIcon: {
//           root: {
//             color: systemColors.textSecondary.main,
//           },
//           text: {
//             fill: systemColors.text.main,
//           },
//         },
//         MuiModal: {
//           root: {
//             zIndex: 1600,
//           },
//         },
//         MuiDialog: {
//           root: {
//             paddingRight: "0px !important",
//           },
//         },
//         MuiPaper: {
//           root: {
//             backgroundColor: systemColors.backgroundSecondary.main,
//           },

//           elevation2: {
//             boxShadow:
//               "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
//           },
//         },
//         MuiCard: {
//           root: {
//             backgroundColor:
//               systemColors.backgroundSecondary.main + "!important",
//           },
//         },
//         MuiFab: {
//           primary: { color: systemColors.text.main },
//         },
//         MuiSvgIcon: { colorSecondary: { color: systemColors.text.main } },

//         MaterialDatatableSearch: {
//           searchIcon: {
//             color: systemColors.text.main,
//           },
//         },
//         MaterialDatatableHeadCell: {
//           root: {
//             fontSize: "16px !important",
//           },
//           sortActive: {
//             color: systemColors.text.main,
//           },
//         },
//         MaterialDatatableFilter: {
//           resetLink: {
//             backgroundColor: "inherit !important",
//             color: systemColors.text.main,
//             border: "1px solid " + systemColors.text.main,
//             "&:hover": {
//               background: "transparent",
//               color: systemColors.primary.main,
//             },
//           },
//         },
//         MaterialDatatable: {
//           responsiveScroll: {
//             padding: "0px !important",
//           },
//         },
//         MaterialDatatableToolbarSelect: {
//           root: {
//             backgroundColor:
//               systemColors.backgroundSecondary.main + " !important",
//           },
//         },
//         MuiTable: {
//           root: {
//             backgroundColor: systemColors.background.main,
//           },
//         },
//         MuiTableRow: {
//           "&$selected": {
//             backgroundColor:
//               systemColors.backgroundSecondary.main + " !important",
//           },
//           hover: {
//             backgroundColor: systemColors.background.main,
//             cursor: "pointer",
//             "&:hover": {
//               backgroundColor:
//                 systemColors.backgroundSecondary.main + "!important",
//             },
//           },
//           root: {
//             backgroundColor: systemColors.background.main,
//           },
//           footer: {
//             background: systemColors.background.main,
//             "&:hover": {
//               backgroundColor: systemColors.background.main + "!important",
//             },
//           },
//         },
//         MaterialDatatableToolbar: {
//           root: {
//             backgroundColor: systemColors.background.main,
//           },
//           icon: {
//             color: systemColors.text.main,
//             "&:hover": { color: systemColors.primary.main },
//           },
//         },
//         MaterialDatatableFilterList: {
//           root: {
//             backgroundColor: systemColors.backgroundSecondary.main,
//             margin: 0,
//             padding: "0 16px 0 16px",
//           },
//         },
//         MuiPickersToolbar: {
//           toolbar: {
//             backgroundColor: systemColors.backgroundSecondary.main,
//           },
//         },
//         MuiPickersToolbarButton: {
//           toolbarBtnSelected: {
//             color: systemColors.primary.main + " !important",
//           },
//         },
//         MUIDataTableHeadCell: {
//           fixedHeader: {
//             zIndex: "1 !important",
//             backgroundColor:
//               systemColors.backgroundSecondary.main + "!important",
//           },
//           sortActive: {
//             color: systemColors.primary.main + "!important",
//           },
//         },
//         MUIDataTableSelectCell: {
//           headerCell: {
//             backgroundColor:
//               systemColors.backgroundSecondary.main + "!important",
//           },
//         },
//         MuiTableCell: {
//           root: {
//             padding: 5,
//           },
//           body: { color: systemColors.text.main },
//           head: {
//             color: systemColors.textSecondary.main,
//             backgroundColor: systemColors.background.main,
//           },
//         },
//         MuiFormLabel: {
//           root: { color: systemColors.textSecondary.main + " !important" },
//         },
//         WebDrawer: {
//           appBar: {
//             backgroundColor: systemColors.background.main,
//           },
//           root: {
//             backgroundColor: systemColors.background.main + " !important",
//           },
//         },
//         MuiTablePagination: {
//           toolbar: { backgroundColor: systemColors.background.main },
//           select: {
//             paddingRight: "25px",
//           },
//         },

//         MuiTableSortLabel: {
//           active: { color: systemColors.text.main },
//         },
//         MuiCheckbox: {
//           root: {
//             color: systemColors.text.main,
//             "&$checked": { color: systemColors.primary.main + " !important" },
//           },
//         },
//         MuiTabs: {
//           flexContainer: {
//             backgroundColor: systemColors.backgroundSecondary.main,
//           },
//         },
//         MuiTab: {
//           wrapper: {
//             color: systemColors.text.main,
//           },
//         },
//         MuiPrivateTabIndicator: {
//           colorPrimary: {
//             backgroundColor: systemColors.text.main,
//           },
//         },
//         MuiAppBar: {
//           colorPrimary: {
//             backgroundColor: systemColors.primary.main,
//           },
//         },

//         MuiSelect: {
//           icon: {
//             color: systemColors.text.main,
//           },
//         },

//         MuiPickersCalendarHeader: {
//           iconButton: {
//             backgroundColor: systemColors.background.main,
//             "& span": {
//               backgroundColor: systemColors.background.main,
//             },
//           },
//         },
//         MuiIconButton: {
//           colorInherit: { color: systemColors.text.main },
//           root: {
//             color: systemColors.text.main + " !important",
//             "&$disabled": {
//               color: systemColors.textSecondary.main + " !important",
//             },
//             // "&:hover": {
//             //   color: systemColors.text.main + " !important",
//             //   background: alpha(systemColors.primary.main, 0.1) + " !important"
//             // }
//           },
//           // label: {
//           //   "&:hover": {
//           //     color: systemColors.text.main + " !important"
//           //   }
//           // }
//         },
//         MuiInputBase: {
//           root: { color: systemColors.text.main },
//           input: {
//             color: systemColors.text.main,
//           },
//         },
//         MuiInputLabel: {
//           animated: { color: systemColors.text.main + " !important" },
//         },
//         MuiInput: {
//           underline: {
//             "&:before": {
//               borderBottom: `1px solid ${systemColors.text.main} !important`,
//             },
//             "&:after": {
//               borderBottom: `1px solid ${systemColors.primary.main}`,
//             },
//           },
//         },
//         MuiListItemIcon: {
//           root: { color: systemColors.text.main },
//         },
//         MuiMenuItem: {
//           root: { color: systemColors.text.main },
//         },
//         MuiChip: {
//           avatarColorPrimary: {
//             color: systemColors.text.main,
//           },
//           deleteIconColorPrimary: {
//             color: systemColors.textSecondary.main,
//           },
//         },

//         MuiAvatar: {
//           colorDefault: { color: systemColors.backgroundSecondary.main },
//         },
//         CustomToolbarSelect: {
//           iconButton: {
//             color: systemColors.text.main,
//           },
//         },
//         MuiSwitch: {
//           icon: {
//             color: systemColors.textSecondary.main,
//           },
//           iconChecked: {
//             color: systemColors.primary.main,
//           },
//           bar: {
//             backgroundColor: systemColors.textSecondary.main,
//           },
//         },
//         MuiRadio: {
//           root: { color: systemColors.textSecondary.main },
//           "&$checked": { color: systemColors.primary.main },
//         },
//         DropFile: {
//           thumb: {
//             border: systemColors.text.main + " !important",
//           },
//           dropzoneWithImage: {
//             background: systemColors.text.main + " !important",
//           },
//         },
//         MuiStepConnector: {
//           line: {
//             borderColor: systemColors.textSecondary.main,
//           },
//         },
//         MuiSpeedDialAction: {
//           button: {
//             backgroundColor: systemColors.backgroundSecondary.main,
//             "& *": { color: systemColors.text.main + " !important" },
//             "&:hover": { backgroundColor: systemColors.primary.main },
//           },
//         },
//         "&i.icon": { width: "1em !important" },
//         confirmButton: {
//           backgroundColor: systemColors.primary.main + " !important",
//           color: systemColors.text.main + " !important",
//         },
//         cancelButton: {
//           backgroundColor:
//             systemColors.backgroundSecondary.main + " !important",
//           color: systemColors.text.main + " !important",
//         },

//         // ui: {
//         //   "&&.table": {
//         //     background: systemColors.primary.main
//         //   }
//         // }
//       },
//     }));
//     return (
//       <StyledEngineProvider injectFirst>
//         (
//           <ThemeProvider theme={theme}>
//           <StartNavigation
//             isLogin={this.props.isLogin}
//             isLoginFunction={this.props.isLoginFunction}
//             isLogoutFunction={this.props.isLogoutFunction}
//           />
//         </ThemeProvider>
//         )
//       </StyledEngineProvider>
//     );
//   }
// }

// const mapDispatchToProps = {
//   onSettings: addSettings,
// };
// const mapStateToProps = ({ Settings }) => {
//   return {
//     settings: Settings.settings,
//   };
// };

// const IndexConnected = connect(mapStateToProps, mapDispatchToProps)(Index);



// export default IndexConnected;


import React, { Component } from "react";
import { connect } from "react-redux";
import StartNavigation from "./StartNavigation";
import ApiHandler from "../services/ApiHandler";
import { setUrlApi } from "../Config";
import { addSettings } from "../actions/Settings/system_actions";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { clearStorage } from "../utils/Utils";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadSettings();
  }

  loadSettings = () => {
    ApiHandler.Setting.Setting.getSettings()
      .then(({ data }) => {
        this.props.onSettings(data);
      })
      .catch(() => {
        console.log("Error settings");
        clearStorage();
        setUrlApi();
      });
  };

  render() {
    const { settings } = this.props;
    let primary = "#296084";
    let background = "#303030";
    let backgroundSecondary = "#424242";
    let text = "#ffffff";
    let textSecondary = "#c6c6c6";

    if (settings) {
      const { systemSettings } = settings;
      const {
        colorPrimary,
        colorBackground,
        colorBackgroundSecondary,
        colorText,
        colorTextSecondary,
      } = systemSettings;
      primary = colorPrimary;
      background = colorBackground;
      backgroundSecondary = colorBackgroundSecondary;
      text = colorText;
      textSecondary = colorTextSecondary;
    }

    const theme = createTheme({
      palette: {
        primary: { main: primary },
        background: {
          default: background,
          paper: backgroundSecondary,
        },
        text: {
          primary: text,
          secondary: textSecondary,
        },
        mode: "dark",
      },
      typography: {
        fontFamily: "'Lato', sans-serif",
        fontSize: 14,
      },
      components: {
        MuiToggleButton: {
          styleOverrides: {
            root: {
              color: text,
              "&.Mui-selected": {
                color: primary,
              },
            },
          },
        },
        MuiTypography: {
          styleOverrides: {
            root: {
              color: `${text} !important`,
            },
          },
        },
        MuiStepIcon: {
          styleOverrides: {
            root: {
              color: textSecondary,
            },
            text: {
              fill: text,
            },
          },
        },
        MuiModal: {
          styleOverrides: {
            root: {
              zIndex: 1600,
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            root: {
              paddingRight: "0px !important",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: backgroundSecondary,
            },
            elevation2: {
              boxShadow:
                "0px 11px 15px -7px rgba(0, 0, 0, 0.2), " +
                "0px 24px 38px 3px rgba(0, 0, 0, 0.14), " +
                "0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: `${backgroundSecondary} !important`,
            },
          },
        },
        MuiFab: {
          styleOverrides: {
            primary: {
              color: text,
            },
          },
        },
        MuiSvgIcon: {
          styleOverrides: {
            colorSecondary: {
              color: text,
            },
          },
        },
        // Add style overrides for other MUI components here
        // ...
        // Example for MuiButton:
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
      },
    });

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <StartNavigation
            isLogin={this.props.isLogin}
            isLoginFunction={this.props.isLoginFunction}
            isLogoutFunction={this.props.isLogoutFunction}
          />
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}

const mapDispatchToProps = {
  onSettings: addSettings,
};

const mapStateToProps = ({ Settings }) => {
  return {
    settings: Settings.settings,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);