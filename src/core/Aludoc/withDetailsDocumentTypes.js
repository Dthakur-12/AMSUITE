import React from "react";
import { compose } from "redux";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import styles from "../../assets/styles/Aludoc_styles/Document_styles/detailsDocumentTypeStyles.js";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';

const withDetailsDocumentTypes = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { initValues, t } = props;
      this.state = {
        showEnterprises: true,
        entities: [
          { value: 1, label: t("enterprise") },
          { value: 2, label: t("vehicle") },
          { value: 3, label: t("person") },
        ],
        selectedEntity: "",
        documentType: initValues,
      };
    }

    componentDidMount() {
      NavBarAludoc.hideLoader();
    }

    render() {
      const { isDialog } = this.props;

      const { documentType } = this.state;
      return <Component documentType={documentType} isDialog={isDialog} />;
    }
  });

export default compose(
  withTranslation(),
  withStyles(styles, { withTheme: true }),
  withDetailsDocumentTypes
);
