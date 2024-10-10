const styles = (theme) => ({
    main: {
      width: "auto",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      flex: 1,
      //marginLeft: theme.spacing(3),
      //marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
        width: 500,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    iconButton: {
      backgroundColor: theme.palette.background.main,
      color: theme.palette.text.main,
    },
    popper: {
      zIndex: 500,
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down('lg')]: {
        maxHeight: "70%",
        width: "90%",
      },
    },
    fill: {
      marginTop: theme.spacing(8),
      marginLeft: "5%",
      marginRight: "5%",
    },
    paper: {
      width: 500,
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: `${theme.palette.background.main} !important`,
    },
    paperMobile: {
      width: "100%",
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: `${theme.palette.background.main} !important`,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    buttonIcon: {
      color: `${theme.palette.text.main} !important`,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(2),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
    customButton: {
      color: `${theme.palette.text.main} !important`,
    },
    customCircularProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
      color: `${theme.palette.text.main} !important`,
    },
  });
  
  export default styles;
  