import { Avatar, Grid, LinearProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PermissionIcon from "@mui/icons-material/AccessibilityNewRounded";
import React, { Component } from "react";
import { Entities } from "../../../../utils/Enums";
import { withTranslation } from "react-i18next";
import { Divider, Dropdown, Table } from "semantic-ui-react";
import ApiHandler from "../../../../services/ApiHandler";
import ProductsPermissions from "./ProductsPermissions";
import { camelize, camelize2 } from "../../../../utils/HelperFunctions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { withStyles } from '@mui/styles';
import CustomStyles from "../../../../assets/styles/User_styles/Register_styles/userPermissionsStyles";
import { connect } from "react-redux";
import { requestGetLicense } from "../../../../actions/Settings/license_actions";

const mapStateToProps = ({ License }) => {
  const { license } = License;
  return {
    licensedProducts: license ? license.productNames : [],
    licensedEntities: license ? license.entities : {},
  };
};

const mapDispatchToProps = { requestGetLicense };

const defaultEntities = (entities) => {
  return {
    ...entities,
    SETTINGS: 25,
    REPORTS_EASYACCESS: 31,
    REPORTS_ALUDOC: 32,
    REPORTS_TIKAS: 33,
    REPORTS_MUSTERING: 34,
    REPORTS_ALUTEL_MOBILE: 35,
  };
};

class UserPermissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectAll: false,
      checked: { 1: false, 2: false, 3: false, 4: false },
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.licensedEntities !== prevState.licensedEntities) {
      return {
        licensedEntities: nextProps.licensedEntities,
      };
    }
    return null;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checked !== prevState.checked) {
    }
    if (
      Object.entries(this.state.licensedEntities).length !== 0 &&
      this.state.licensedEntities !== prevState.licensedEntities
    ) {
      this.processLicense({
        entities: defaultEntities(this.state.licensedEntities),
        products: this.state.products,
      });
    }
    if (
      this.state.entitiesToShow &&
      this.state.entitiesToShow !== prevState.entitiesToShow
    ) {
      this.state.activities.map((act) => this.updateChecked(act.key));
    }
  }

  componentDidMount() {
    const { productsSelected, t, requestGetLicense } = this.props;
    ApiHandler.AMSuite.User.GetClientPermissions().then(({ data }) => {
      const { products, activities } = data;
      let newProducts = productsSelected
        ? products.map((product) => {
            return {
              ...product,
              selected: productsSelected.includes(product.id),
            };
          })
        : products;
      this.setState({
        products: newProducts,
        activities: activities.map((activity) => {
          return {
            key: activity.id,
            text: t(activity.name),
            value: activity.id,
          };
        }),
      });
      requestGetLicense();
    });
  }

  updateChecked = (activity) => {
    const { permissionsSelected } = this.props;
    let toShowLength = this.getEntitiesToShow(activity).length;

    this.setState((prevState) => ({
      checked: {
        ...prevState.checked,
        [activity]:
          permissionsSelected[activity] &&
          permissionsSelected[activity].length > 0 &&
          permissionsSelected[activity].length === toShowLength,
      },
    }));
  };

  processLicense = (data) => {
    //     const { products, entities = [] } = data;
    //     const entitiesKeys = Object.keys(entities);
    //     let productsWithLicence = products.filter((p) => p.licence);

    //     let productsSelected = productsWithLicence.filter(
    //       (p) => p.selected || p.name === "System"
    //     );
    //     let productsSelected = productsWithLicence.filter((p) => p.selected);
    //     const validEntities = entitiesKeys.map((name) => {
    //       const newName = name.split(" ").join("_");
    //       const entitieId = Entities[newName];
    //       return { name: name, id: entitieId };
    //     });
    //     let entitiesToShow = validEntities.filter((e) =>
    //       productsSelected.some((p) => p.entities.some((eId) => e.id === eId))
    //     );
    // <<<<<<< HEAD
    //     this.props.updateEntities(validEntities);
    // =======

    //     if (this.props.updateEntities) this.props.updateEntities(entitiesToShow);

    // >>>>>>> parent of 4c688a47 (Merge branch 'develop-tpp-personGroup' into develop)
    //     this.setState({
    //       validEntities,
    //       entitiesToShow,
    //       isLoading: false,
    //       products: productsWithLicence,
    //     });
    const { products, entities = [] } = data;
    const entitiesKeys = Object.keys(entities);

    let productsWithLicence = products.filter((p) => p.licence);
    let productsSelected = productsWithLicence.filter(
      (p) => p.selected || p.name === "System"
    );
    const validEntities = entitiesKeys.map((name) => {
      const newName = name.split(" ").join("_");
      const entitieId = Entities[newName];
      return { name: newName, id: entitieId };
    });
    let entitiesToShow = validEntities.filter((e) =>
      productsSelected.some((p) => p.entities.some((eId) => e.id === eId))
    );
    this.props.updateEntities(validEntities);

    this.setState({
      validEntities,
      //entitiesToShow: validEntities,
      entitiesToShow,
      isLoading: false,
      products: productsWithLicence,
    });
  };

  entitiesUserEdit = (activity) => {
    const { permissionsSelected } = this.props;
    let value = [];

    permissionsSelected[activity] &&
      permissionsSelected[activity].map((permission) => {
        !value.some((v) => v === parseInt(permission)) &&
          (value = [...value, parseInt(permission)]);

        return 0;
      });
    return value;
  };

  isOnlyVisibleAndEditable = (entity) => {
    const entities = [
      Entities.SETTINGS,
      Entities.REPORTS_EASYACCESS,
      Entities.REPORTS_ALUDOC,
      Entities.REPORTS_TIKAS,
      Entities.REPORTS_MUSTERING,
      Entities.REPORTS_ALUTEL_MOBILE,
      Entities.LICENSES,
    ];
    return entities.includes(entity);
  };

  isOnlyVisible = (entity) => {
    const entities = [9];
    return entities.includes(entity);
  };

  getEntitiesToShow = (activity) => {
    const { entitiesToShow } = this.state;
    const { t } = this.props;
    let entities = [];
    switch (activity) {
      case 1:
      case 3:
        entitiesToShow.map((m) => {
          !this.isOnlyVisibleAndEditable(m.id) &&
            !this.isOnlyVisible(m.id) &&
            (entities = [
              ...entities,
              {
                key: m.id,
                text: t(camelize2(m.name.toLocaleLowerCase())),
                value: m.id,
              },
            ]);
          return 0;
        });
        return entities;
      case 2:
        entitiesToShow.map((m) => {
          !this.isOnlyVisible(m.id) &&
            (entities = [
              ...entities,
              {
                key: m.id,
                text: t(camelize2(m.name.toLocaleLowerCase())),
                value: m.id,
              },
            ]);
          return 0;
        });
        return entities;
      case 4:
        entitiesToShow.map(
          (m) =>
            (entities = [
              ...entities,
              {
                key: m.id,
                text: t(camelize2(m.name.toLocaleLowerCase())),
                value: m.id,
              },
            ])
        );
        entities.push({
          key: 38,
          text: t(camelize2("APPROVE_VISITS".toLocaleLowerCase())),
          // "ApproveVisits": "Aprobar Visitas",

          //"ApproveVisits": "Approve Visits",
          value: 38,
        });
        return entities;
      default:
        return entities;
    }
  };

  handleSelectProduct = (id) => (e) => {
    let productsUpdated = [...this.state.products];
    productsUpdated.filter((item) => item.id === id)[0].selected =
      !productsUpdated.filter((item) => item.id === id)[0].selected;
    let validEntitiesProcessed = {};

    this.state.validEntities.forEach((element) => {
      validEntitiesProcessed = {
        ...validEntitiesProcessed,
        [element.name]: {},
      };
    });
    this.processLicense({
      products: productsUpdated,
      entities: validEntitiesProcessed,
    });
  };

  selectAll = (event) => {
    const activity = event.currentTarget.value;
    const { handlePermissionChange } = this.props;
    let selectedAll = !this.state.checked[activity];
    let entitiesToShow = this.getEntitiesToShow(parseInt(activity));
    this.setState((prevState) => ({
      checked: {
        ...prevState.checked,
        [activity]: !prevState.checked[activity],
      },
    }));
    if (selectedAll) {
      let entitiesIds = entitiesToShow.map((e) => e.key);
      handlePermissionChange(null, {
        value: entitiesIds,
        entity: activity,
      });
      /*let allEntities  =*/
      // entitiesToShow.map((entity) => {
      // handlePermissionChange(null, {
      //   value: entitiesIds,
      //   entity: activity,
      // });
      // return 0;
      // });
    } else {
      handlePermissionChange(null, { value: [], entity: activity });
    }
  };

  render() {
    const { classes, handlePermissionChange, hideHeader, t } = this.props;
    //const Selected = { ...permissionsSelected };
    const {
      products,
      activities,

      // validEntities,
      //entitiesToShow,
      isLoading,
    } = this.state;
    return (
      <Paper elevation={0} className={classes.paper}>
        {!hideHeader && (
          <div style={{ width: "100%" }}>
            <div className={classes.avatarDiv}>
              <Avatar className={classes.avatar}>
                <PermissionIcon />
              </Avatar>
            </div>
            <Typography
              component="h1"
              variant="h5"
              className={classes.customTitle}
            >
              {t("Permissions")}
            </Typography>
            <div style={{ width: "100%", marginBottom: 14 }}>
              <Divider className={classes.customDivider} />
              {isLoading && <LinearProgress style={{ height: 1 }} />}
            </div>
          </div>
        )}
        {!isLoading && (
          <Grid container spacing={24}>
            <Grid item xs={12} md={2}>
              <ProductsPermissions
                products={products}
                handleSelect={this.handleSelectProduct}
                {...this.props}
                classes={{}}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <Table celled structured className={classes.customtable}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width="3" className={classes.customColor}>
                      {t("Activity")}
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      colSpan="4"
                      className={classes.customColor}
                    >
                      {t("entity")}
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width="3"
                      className={classes.customColor}
                    />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {activities.map((activity, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell width="3">
                          {t(camelize(activity.text.toLocaleLowerCase()))}
                        </Table.Cell>
                        <Table.Cell colSpan="4">
                          <Dropdown
                            placeholder={t("Activity")}
                            // disabled={
                            //   !validEntities.some(e => e.id === entity.id)
                            // }
                            fluid
                            multiple
                            search
                            key={activity.key}
                            entity={activity.key}
                            selection
                            options={this.getEntitiesToShow(activity.key)}
                            noResultsMessage={t("WithoutResult")}
                            onChange={handlePermissionChange}
                            value={this.entitiesUserEdit(activity.key)}
                            className={classes.customDropDown}
                          />
                        </Table.Cell>
                        <Table.Cell width="3">
                          <FormControlLabel
                            value={activity.key.toString()}
                            control={
                              <Checkbox
                                checked={this.state.checked[activity.key]}
                                onChange={this.selectAll}
                                // style={{ padding: 0, paddingRight: "11px" }}
                                color="primary"
                              />
                            }
                            label={t("SelectAll")}
                          />
                        </Table.Cell>
                        {/* ) : (
                          <Dropdown
                            key={entity.id}
                            placeholder={t("Activity")}
                            disabled={
                              !validEntities.some(e => e.id === entity.id)
                            }
                            fluid
                            multiple
                            search
                            entity={entity.id}
                            selection
                            options={
                              this.isOnlyVisible(entity.id)
                                ? activities.filter(
                                    activity => activity.value === 4
                                  )
                                : !this.isOnlyVisibleAndEditable(entity.id)
                                ? activities
                                : activities.filter(
                                    activity =>
                                      activity.value === 2 ||
                                      activity.value === 4
                                  )
                            }
                            noResultsMessage={t("WithoutResult")}
                            onChange={handlePermissionChange}
                          />
                        ) }*/}
                      </Table.Row>
                    );
                  })}
                  {/* {entitiesToShow &&
                    entitiesToShow.map((entity, index) => (
                      <Table.Row key={index}>
                        <Table.Cell width="4">
                          {t(camelize(entity.name.toLocaleLowerCase()))}
                        </Table.Cell>
                        <Table.Cell colSpan="3">
                          {permissionsSelected &&
                          permissionsSelected[entity.id] ? (
                            <Dropdown
                              placeholder={t("Activity")}
                              disabled={
                                !validEntities.some(e => e.id === entity.id)
                              }
                              fluid
                              multiple
                              search
                              key={entity.id}
                              entity={entity.id}
                              selection
                              options={
                                this.isOnlyVisible(entity.id)
                                  ? activities.filter(
                                      activity => activity.value === 4
                                    )
                                  : !this.isOnlyVisibleAndEditable(entity.id)
                                  ? activities
                                  : activities.filter(
                                      activity =>
                                        activity.value === 2 ||
                                        activity.value === 4
                                    )
                              }
                              noResultsMessage={t("WithoutResult")}
                              onChange={handlePermissionChange}
                              value={permissionsSelected[entity.id].map(
                                permission => {
                                  return this.state.activities[permission - 1]
                                    .value;
                                }
                              )}
                            />
                          ) : (
                            <Dropdown
                              key={entity.id}
                              placeholder={t("Activity")}
                              disabled={
                                !validEntities.some(e => e.id === entity.id)
                              }
                              fluid
                              multiple
                              search
                              entity={entity.id}
                              selection
                              options={
                                this.isOnlyVisible(entity.id)
                                  ? activities.filter(
                                      activity => activity.value === 4
                                    )
                                  : !this.isOnlyVisibleAndEditable(entity.id)
                                  ? activities
                                  : activities.filter(
                                      activity =>
                                        activity.value === 2 ||
                                        activity.value === 4
                                    )
                              }
                              noResultsMessage={t("WithoutResult")}
                              onChange={handlePermissionChange}
                            />
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          {!validEntities && <CircularProgress size={22} />}
                          {validEntities &&
                            validEntities.some(e => e.id === entity.id) && (
                              <Icon
                                color="grey"
                                name="checkmark"
                                size="large"
                              />
                            )}
                        </Table.Cell>
                      </Table.Row>
                    ))} */}
                </Table.Body>
              </Table>
            </Grid>
          </Grid>
        )}
      </Paper>
    );
  }
}

const UserPermissionsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPermissions);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(UserPermissionsConnected)
);
