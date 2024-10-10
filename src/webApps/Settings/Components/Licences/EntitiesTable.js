import React from "react";
import { withTranslation } from "react-i18next";
import { Table } from "semantic-ui-react";
import { isNullOrUndefined } from "util";
import DetailsEntitieElement from "./DetailsEntitieElement";
import { camelize } from "../../../../utils/HelperFunctions";

const EntitiesTable = props => {
  const { t } = props;
  return (
    <Table celled inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>{t("LicensedAmount")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Used")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Remaining")}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!isNullOrUndefined(props.entities) &&
          Object.keys(props.entities)
            .slice(props.offset, props.offset + props.limit)
            .map(function(key) {              
              if(!isNullOrUndefined(props.entities[key]))
              return (
                <DetailsEntitieElement
                  key={key}
                  name={t(camelize(key.toLocaleLowerCase()))}
                  maxValue={props.entities[key].maxValue}
                  currentValue={props.entities[key].currentValue}
                />
              );
            })}
      </Table.Body>
    </Table>
  );
};

export default withTranslation()(EntitiesTable);
