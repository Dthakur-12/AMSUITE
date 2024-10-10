import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import {
  requestDocumentFiles,
  requestDownloadDocFile,
} from "../../actions/Aludoc/documents_action";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";
import styles from "../../assets/styles/Aludoc_styles/Document_styles/detailsDocumentStyles.js";
import { withStyles } from '@mui/styles';

const formValues = {
  name: "",
  expirationDate: new Date(),
  dischargeDate: new Date(),
  documentType: undefined,
  notes: "",
  status: undefined,
  enterprise: undefined,
  person: undefined,
  vehicle: undefined,
};

const withDetailsDocuments = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { initValues, enterprise, person, vehicle, t } = props;
      this.state = {
        showEnterprises: true,
        detailsDocument: initValues ? initValues : formValues,
        adjuncts: [],
        enterprise: enterprise,
        person: person,
        vehicle: vehicle,
        formErrors: {},
        SelectedStateOption: {
          0: { value: 0, label: t("correct") },
          1: { value: 1, label: t("toReview") },
          2: { value: 2, label: t("Rejected") },
        },
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }
    componentDidMount() {
      const { enterprise, person, register, vehicle } = this.props;
      this.setState((prevState) => ({
        detailsDocument: {
          ...prevState.detailsDocument,
          enterprise: enterprise,
          person: person,
          register: register,
          vehicle: vehicle,
        },
      }));
      NavBarAludoc.hideLoader();
      this.props.requestDocumentFiles(this.state.detailsDocument.id);
    }
    downloadFile = (id, name, mimeType) => {
      this.props.requestDownloadDocFile(id);
      this.setState({
        nameDownload: name,
        mimeType: mimeType,
      });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.adjuncts !== prevState.adjuncts ||
        nextProps.downloadFile !== prevState.downloadFile ||
        nextProps.successDownloadFile !== prevState.successDownloadFile
      ) {
        return {
          adjuncts: nextProps.adjuncts,
          downloadFile: nextProps.downloadFile,
          successDownloadFile: nextProps.successDownloadFile,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      if (
        this.state.successDownloadFile &&
        this.state.successDownloadFile !== prevState.successDownloadFile
      ) {
        let test =
          "data:" + this.state.mimeType + ";base64," + this.state.downloadFile;

        require("downloadjs")(test, this.state.nameDownload);
      }
    }

    render() {
      const { detailsDocument, adjuncts, SelectedStateOption } = this.state;

      const { isDialog } = this.props;
      return (
        <Component
          isDialog={isDialog}
          detailsDocument={detailsDocument}
          adjuncts={adjuncts}
          SelectedStateOption={SelectedStateOption}
          downloadFile={this.downloadFile}
        />
      );
    }
  });
const mapStateToProps = ({ Document }) => {
  return {
    // isLoading: DocumentFiles.isLoading,
    // createSuccess: DocumentFiles.createSuccess,
    adjuncts: Document.documentFiles,
    downloadFile: Document.downloadFile,
    successDownloadFile: Document.successDownloadFile,
  };
};

const mapDispatchToProps = {
  requestDocumentFiles: requestDocumentFiles,
  requestDownloadDocFile: requestDownloadDocFile,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withStyles(styles, { withTheme: true }),
  withDetailsDocuments
);
