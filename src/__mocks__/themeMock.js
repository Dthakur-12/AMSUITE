import React from 'react'
import {
  ThemeProvider,
  StyledEngineProvider,
  createMuiTheme,
  MuiThemeProvider,
  adaptV4Theme,
} from '@mui/material/styles';

function MockTheme({ children }) {
  const theme = createMuiTheme(adaptV4Theme({
    palette: {
      main: { main: '#FFF' },
      primary: { main: '#FFF' },
      background: { main: '#FFF' },
      backgroundSecondary: { main: '#FFF' },
      text: { main: '#FFF' },
      textSecondary: { main: '#FFF' },
      type: 'dark',
    },
    typography: {
      useNextVariants: true,
      fontFamily: "'Lato', sans-serif",
      fontSize: 14,
    },
    overrides: {
      MuiToggleButton: {
        root: { color: { main: '#FFF' } },
        '&$selected': {
          color: { main: '#FFF' },
        },
      },
      MuiTypography: {
        root: { color: { main: '#FFF' } + ' !important' },
      },
      MuiStep: {
        root: { textColor: { main: '#FFF' } },
      },
      MuiStepIcon: {
        root: {
          color: { main: '#FFF' },
        },
        text: {
          fill: { main: '#FFF' },
        },
      },
      MuiModal: {
        root: {
          zIndex: 1600,
        },
      },
      MuiDialog: {
        root: {
          paddingRight: '0px !important',
          zIndex: '99999 !important',
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: { main: '#FFF' },
        },

        elevation2: {
          boxShadow:
            '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
        },
      },
      MuiCard: {
        root: {
          backgroundColor: { main: '#FFF' } + '!important',
        },
      },
      MuiFab: {
        primary: {
          color: { main: '#FFF' },
          backgroundColor: '#296084',
          '&:hover': {
            backgroundColor: '#296084',
          },
        },
      },
      MuiSvgIcon: { colorSecondary: { color: { main: '#FFF' } } },

      MaterialDatatableSearch: {
        searchIcon: {
          color: { main: '#FFF' },
        },
      },
      MaterialDatatableHeadCell: {
        root: {
          fontSize: '16px !important',
        },
        sortActive: {
          color: { main: '#FFF' },
        },
      },
      MaterialDatatableFilter: {
        resetLink: {
          backgroundColor: 'inherit !important',
          color: { main: '#FFF' },
          border: '1px solid ' + { main: '#FFF' },
          '&:hover': {
            background: 'transparent',
            color: { main: '#FFF' },
          },
        },
      },
      MaterialDatatable: {
        responsiveScroll: {
          padding: '0px !important',
        },
      },
      MUIDataTableBodyCell: {
        root: {
          maxWidth: '214px',
          wordWrap: 'break-word',
        },
      },
      MuiCardContent: {
        root: {
          maxWidth: '417px',
          wordWrap: 'break-word',
          maxHeight: 'auto !important',
        },
      },
      MaterialDatatableToolbarSelect: {
        root: {
          backgroundColor: { main: '#FFF' } + ' !important',
        },
      },
      MuiTable: {
        root: {
          backgroundColor: { main: '#FFF' },
        },
      },
      MuiTableRow: {
        '&$selected': {
          backgroundColor: { main: '#FFF' } + ' !important',
        },
        hover: {
          backgroundColor: { main: '#FFF' },
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: { main: '#FFF' } + '!important',
          },
        },
        root: {
          backgroundColor: { main: '#FFF' },
        },
        footer: {
          background: { main: '#FFF' },
          '&:hover': {
            backgroundColor: { main: '#FFF' } + '!important',
          },
        },
      },
      MaterialDatatableToolbar: {
        root: {
          backgroundColor: { main: '#FFF' },
        },
        icon: {
          color: { main: '#FFF' },
          '&:hover': { color: { main: '#FFF' } },
        },
      },
      MaterialDatatableFilterList: {
        root: {
          backgroundColor: { main: '#FFF' },
          margin: 0,
          padding: '0 16px 0 16px',
        },
      },
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: { main: '#FFF' },
        },
      },
      MuiPickersToolbarButton: {
        toolbarBtnSelected: {
          color: { main: '#FFF' } + ' !important',
        },
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          zIndex: '1 !important',
          backgroundColor: { main: '#FFF' } + '!important',
        },
        sortActive: {
          color: { main: '#FFF' } + '!important',
        },
      },
      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: { main: '#FFF' } + '!important',
        },
      },
      MuiTableCell: {
        root: {
          padding: 5,
        },
        body: { color: { main: '#FFF' } },
        head: {
          color: { main: '#FFF' },
          backgroundColor: { main: '#FFF' },
        },
      },
      MuiFormLabel: {
        root: { color: { main: '#FFF' } + ' !important' },
      },
      WebDrawer: {
        appBar: {
          backgroundColor: { main: '#FFF' },
        },
        root: {
          backgroundColor: { main: '#FFF' } + ' !important',
        },
      },
      MuiTablePagination: {
        toolbar: { backgroundColor: { main: '#FFF' } },
        select: {
          paddingRight: '25px',
        },
      },

      MuiTableSortLabel: {
        active: { color: { main: '#FFF' } },
      },
      MuiCheckbox: {
        root: {
          color: { main: '#FFF' },
          '&$checked': { color: { main: '#FFF' } + ' !important' },
        },
      },
      MuiTabs: {
        flexContainer: {
          backgroundColor: { main: '#FFF' },
        },
      },
      MuiTab: {
        wrapper: {
          color: { main: '#FFF' },
        },
      },
      MuiPrivateTabIndicator: {
        colorPrimary: {
          backgroundColor: { main: '#FFF' },
        },
      },
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: { main: '#FFF' },
        },
      },

      MuiSelect: {
        icon: {
          color: { main: '#FFF' },
        },
      },

      MuiPickersCalendarHeader: {
        iconButton: {
          backgroundColor: { main: '#FFF' },
          '& span': {
            backgroundColor: { main: '#FFF' },
          },
        },
      },
      MuiIconButton: {
        colorInherit: { color: { main: '#FFF' } },
        root: {
          color: { main: '#FFF' } + ' !important',
          '&$disabled': {
            color: { main: '#FFF' } + ' !important',
          },
          // "&:hover": {
          //   color: {main: '#FFF'} + " !important",
          //   background: alpha({main: '#FFF'}, 0.1) + " !important"
          // }
        },
        // label: {
        //   "&:hover": {
        //     color: {main: '#FFF'} + " !important"
        //   }
        // }
      },
      MuiInputBase: {
        root: { color: { main: '#FFF' } },
        input: {
          color: { main: '#FFF' },
        },
      },
      MuiInputLabel: {
        animated: { color: { main: '#FFF' } + ' !important' },
      },
      MuiInput: {
        underline: {
          '&:before': {
            borderBottom: `1px solid ${{ main: '#FFF' }} !important`,
          },
          '&:after': {
            borderBottom: `1px solid ${{ main: '#FFF' }}`,
          },
        },
      },
      MuiListItemIcon: {
        root: { color: { main: '#FFF' } },
      },
      MuiMenuItem: {
        root: { color: { main: '#FFF' } },
      },
      MuiChip: {
        avatarColorPrimary: {
          color: { main: '#FFF' },
        },
        deleteIconColorPrimary: {
          color: { main: '#FFF' },
        },
      },

      MuiAvatar: {
        colorDefault: { color: { main: '#FFF' } },
      },
      CustomToolbarSelect: {
        iconButton: {
          color: { main: '#FFF' },
        },
      },
      MuiSwitch: {
        icon: {
          color: { main: '#FFF' },
        },
        iconChecked: {
          color: { main: '#FFF' },
        },
        bar: {
          backgroundColor: { main: '#FFF' },
        },
      },
      MuiRadio: {
        root: { color: { main: '#FFF' } },
        '&$checked': { color: { main: '#FFF' } },
      },
      DropFile: {
        thumb: {
          border: { main: '#FFF' } + ' !important',
        },
        dropzoneWithImage: {
          background: { main: '#FFF' } + ' !important',
        },
      },
      MuiStepConnector: {
        line: {
          borderColor: { main: '#FFF' },
        },
      },
      MuiSpeedDialAction: {
        button: {
          backgroundColor: { main: '#FFF' },
          '& *': { color: { main: '#FFF' } + ' !important' },
          '&:hover': { backgroundColor: { main: '#FFF' } },
        },
      },
      '&i.icon': { width: '1em !important' },
      confirmButton: {
        backgroundColor: { main: '#FFF' } + ' !important',
        color: { main: '#FFF' } + ' !important',
      },
      cancelButton: {
        backgroundColor: { main: '#FFF' } + ' !important',
        color: { main: '#FFF' } + ' !important',
      },
      MuiTypography: {
        body2: {
          wordBreak: 'break-all',
        },
      },
      MuiSnackbar: {
        root: {
          zIndex: '999999!important',
        },
      },
      MuiChip: {
        label: { maxWidth: '900px' },
      },
      // ui: {
      //   "&&.table": {
      //     background: {main: '#FFF'}
      //   }
      // }
    },
  }))
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StyledEngineProvider>
  );
}

export default MockTheme
