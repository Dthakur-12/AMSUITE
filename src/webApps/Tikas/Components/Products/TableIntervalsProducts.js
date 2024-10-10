import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Icon, Label, Menu, Table } from "semantic-ui-react";

import styles from "../../../../assets/styles/Tikas_styles/Products/AssignProductsStyles";

const TableIntervalsProducts = (props) => {
  const { classes, t, theme, products, handleChangeStock, isDetails } = props;

  return (
    <div>
      {/* <main className={classes.layout}> */}
      <Table celled>
        <Table.Header className={classes.backgroundHeader}>
          <Table.Row>
            <Table.HeaderCell className={classes.header}>
              {t("ProductsStock")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className={classes.body}>
          <Table.Row>
            <Table.Cell>
              {products.map((prod, index) => (
                <Table.Row
                  className={index % 2 ? classes.row : classes.rowPair}
                >
                  <Grid container spacing={24}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        // required={.rut}
                        // type="number"
                        //label={t("RUT")}
                        value={prod.name}
                        // onChange={handleChangeStock(prod.id)}
                        fullWidth
                        // helperText={t("inputEmpty")}
                        disabled={true}

                        // error={this.state.formErrors.rut}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        disabled={isDetails}
                        // required={.rut}
                        InputProps={{ inputProps: { min: 0 } }}
                        type="number"
                        //label={t("RUT")}
                        value={prod.stock}
                        onChange={handleChangeStock(prod.id, prod.name)}
                        fullWidth
                        //  helperText={t("inputEmpty")}
                        FormHelperTextProps={
                          {
                            // style: { opacity: this.state.formErrors.rut ? 1 : 0 },
                          }
                        }
                        // error={this.state.formErrors.rut}
                      />
                    </Grid>
                  </Grid>
                </Table.Row>
              ))}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {/* </main> */}
    </div>
  );
};

TableIntervalsProducts.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(TableIntervalsProducts)
);
