import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import PlusIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import { List, ListItemIcon } from "@mui/material";
import { isValueEmptyOrNull } from "../../../utils/HelperFunctions";
import Fab from "@mui/material/Fab";
import classnames from "classnames";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import DataTableDialog from "./DataTableDialog";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";
import CustomStyles from "../../../assets/styles/Shared_Styles/DataTable/DataTableSelectStyles";

//*PARAMETROS*

// handleConfirm: Funcion que se ejecuta al confirmar la selección  de los elementos,
//                recive como parametro los elementos seleccionados y los setea al estado
//                correspondiente a rowSelected
//                Ej:
//                  handleEnterpriseSelected = (enterprise) => {
//                      this.setState(prevState => ({
//                          newDocumentType: {
//                          ...prevState.newEnterprise, enterprises: enterprise
//                          },
//                      }));
//                  }

// loadDataFunction: Funcion que trae los elementos del DataTable
//                   Ej:
//                      {ApiHandler.EasyAccess.Enterprise.getEnterprises}

// elements: Arreglo con la lista de elementos que se quiere setear/seleccionar
//                   Ej
//                      {this.state.newDocumentType.enterprises}

//element: objeto unico con la misma función que elements pero para el caso en que multipleSelect es false

// primaryTitle: Titulo Principal. Ej: "Asignar Empresas"

// title: Texto que se vera al lado del boton. Ej: "Empresas"

//multipleSelect: true/false, si es true se permite seleccionar varios elementos de lo contrario uno solo

//attribute: string que indica el nombre del atributo del elemento que se desea mostrar.

// DataTableColumns: Columnas que se mostraran en la DataTable
//                      Ej con una unica columna:
//                           {enterpriseColumns}
//                            Donde enterprise Columns fue instanciado previamente como:
//                            const enterpriseColumns = [
//                                  {
//                                      name: "Nombre", (este campo es el valor que se ve en el titulo de la columna)
//                                      field: "name", (nombre del parametro en el que viene el valor, tiene que ser exactamente igual)
//                                      options: {
//                                      sort: true,
//                                      filter: true,
//                                      sortDirection: 'asc', (opcional)
//                                      customBodyRender: (data) => {
//                                          if (data.name)
//                                              return (
//                                                  <Typography value={data.name}>
//                                                      {data.name}
//                                                  </Typography>
//                                              )
//                                          }
//                                      },
//                                  }
//                             ]

//icon: string con el nombre del icono(semantic ui) con el que se desea mostrar los elementos seleccionados,
// hasError | texto en rojo si es true
// extraData    |
// extraData1   | soporta hasta 3 parametros extra para el llamado de la api
// extraData2   |

class DataTableSelect extends Component {
  constructor(props) {
    super(props);
    const { elements, element } = props;
    this.state = {
      showElements: true,
      openDialog: false,
      elements: elements,
      element: element
    };
  }

  openDataTable = () => {
    this.setState({
      openDialog: true
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let newValues = {};

    if (
      nextProps.elements !== prevState.elements ||
      nextProps.element !== prevState.element
    ) {
      if (nextProps.multipleSelect) {
        if (nextProps.elements !== prevState.elements) {
          newValues.elements = nextProps.elements;
        }
      } else if (nextProps.element !== prevState.element) {
        newValues.element = nextProps.element;
      }
      return newValues;
    } else return null;
  }

  handleSelected = element => {
    const { handleConfirm } = this.props;
    handleConfirm(element);
    this.setState({
      openDialog: false
    });
  };

  render = () => {
    const {
      classes,
      isDetails,
      DataTableColumns,
      hasError,
      title,
      multipleSelect,
      attribute,
      loadDataFunction,
      primaryTitle,
      dataTableTitle,
      dataTableSubTitle,
      t,
      mdSubtitle
    } = this.props;
    const { showElements, elements, element } = this.state;
    if (isValueEmptyOrNull(elements) && multipleSelect) return <span />;

    return (
      (<div>
        {multipleSelect && (
          <div>
            {primaryTitle && (
              <div>
                <div className={classes.customTitle}>
                  <Typography
                    component="h1"
                    color="primary"
                    //style={{ color: "red !important" }}
                    variant="subtitle1"
                  >
                    {primaryTitle}
                  </Typography>
                  {isValueEmptyOrNull(elements) && (
                    <CircularProgress
                      size={20}
                      className={classes.customCircular}
                    />
                  )}
                </div>
                <Divider className={classes.customDivider} />
              </div>
            )}
          </div>
        )}
        {!multipleSelect && (
          <div>
            <div className={classes.customTitle}>
              <Typography
                component="h1"
                color="primary"
                style={{ color: "red !important" }}
                variant="subtitle1"
              >
                {primaryTitle}
              </Typography>
            </div>
            <Divider className={classes.customDivider} />
          </div>
        )}
        <List className={classes.listRoot}>
          {multipleSelect && (
            <ListItem style={{ padding: 0 }}>
              {!isDetails && (
                <Fab
                  size="small"
                  color="default"
                  onClick={this.openDataTable}
                  className={classes.customFab}
                >
                  <PlusIcon />
                </Fab>
              )}
              {!isDetails && (
                <ListItemText
                  disableTypography
                  inset
                  primary={
                    <Typography
                      type="body2"
                      className={hasError ? classes.withError : ""}
                    >
                      {title +
                        (elements.length !== 0 ? ": " + elements.length : "")}
                    </Typography>
                  }
                />
              )}
              {
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: showElements
                  })}
                  disabled={elements.length === 0}
                  onClick={() =>
                    this.setState({ showElements: !this.state.showElements })
                  }
                  size="large">
                  <ExpandMore />
                </IconButton>
              }
            </ListItem>
          )}

          {!multipleSelect && (
            <List className={classes.listRoot}>
              <ListItem style={{ padding: 0 }}>
                {!isDetails && (
                  <Fab
                    size="small"
                    color="default"
                    className={classes.customFab}
                    onClick={this.openDataTable}
                  >
                    <PlusIcon />
                  </Fab>
                )}
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      className={hasError ? classes.withError : ""}
                    >
                      {element ? element[attribute] : t("Unspecified")}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          )}

          {multipleSelect && (
            <Collapse in={this.state.showElements} timeout="auto" unmountOnExit>
              <List dense component="div" disablePadding>
                {elements.map(element => (
                  <ListItem key={element.id} className={classes.nested}>
                    <ListItemIcon key={element[attribute]}>
                      {this.props.icon ? (
                        <Icon name={this.props.icon} size="large" />
                      ) : (
                        <ChevronIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText inset primary={element[attribute]} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </List>
        {multipleSelect && (
          <div>
            {!isValueEmptyOrNull(elements) && (
              <DataTableDialog
                open={this.state.openDialog}
                onConfirm={this.handleSelected}
                onClose={() => this.setState({ openDialog: false })}
                title={dataTableTitle}
                mdSubtitle={mdSubtitle ? mdSubtitle : undefined}
                subTitle={dataTableSubTitle}
                loadDataFunction={loadDataFunction}
                rowsSelected={this.state.elements}
                multipleSelect={multipleSelect}
                columns={DataTableColumns}
                extraData={this.props.extraData}
                extraData1={this.props.extraData1}
                extraData2={this.props.extraData2}
              />
            )}
          </div>
        )}
        {!multipleSelect && (
          <div>
            {
              <DataTableDialog
                open={this.state.openDialog}
                onConfirm={this.handleSelected}
                onClose={() => this.setState({ openDialog: false })}
                title={dataTableTitle}
                subTitle={dataTableSubTitle}
                mdSubtitle={mdSubtitle ? mdSubtitle : undefined}
                loadDataFunction={loadDataFunction}
                rowsSelected={
                  !isNullOrUndefined(element)                
                    ? [
                        element
                      ]
                    : []
                }
                multipleSelect={multipleSelect}
                columns={DataTableColumns}
                extraData={this.props.extraData}
                extraData1={this.props.extraData1}
                extraData2={this.props.extraData2}
              />
            }
          </div>
        )}
      </div>)
    );
  };
}

// const InitalConnected = connect(null, mapDispatchToProps)(Init)
DataTableSelect.propTypes = {
  title: PropTypes.string,
  elements: PropTypes.array,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(DataTableSelect)
);
