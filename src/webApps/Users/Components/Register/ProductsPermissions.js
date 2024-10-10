import React from "react";
import { Icon, Step } from "semantic-ui-react";
import { withStyles } from '@mui/styles';
import styles from "../../../../assets/styles/User_styles/Register_styles/productsPermissionsStyles";
const ProductsPermissions = ({ products, handleSelect, classes }) => {
  return (
    <Step.Group
      size="tiny"
      vertical
      attached="top"
      className={classes.customGroup}
    >
      {products.map(
        (product, index) =>
          product.id !== 6 && (
            <Step
              key={product.id}
              onClick={handleSelect(product.id)}
              style={{ flexDirection: "column" }}
              active={product.selected}
              className={
                product.selected ? classes.customStepActive : classes.customStep
              }
            >
              <Icon name={product.iconName} className={classes.customIcon} />
              <Step.Content>
                <Step.Title className={classes.customText}>
                  {product.name}
                </Step.Title>
              </Step.Content>
            </Step>
          )
      )}
    </Step.Group>
  );
};

export default withStyles(styles, { withTheme: true })(ProductsPermissions);
