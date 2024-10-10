import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import { withStyles } from '@mui/styles';
import styles from "../../assets/styles/Aludoc_styles/Control_styles/detailsControlStyles.js";

import { withTranslation } from "react-i18next";
import { requestDocumentType } from "../../actions/Aludoc/documentType_action";
import { requestPersonByControl } from "../../actions/Aludoc/controls_actions";
import { requestPersons } from "../../actions/EasyAccess/Person_actions";

let pagePeople = 0;
let rowsPerPagePeople = 10;

const withDetailsControl = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { initValues, currentUser } = props;
      const control = initValues
        ? {
            contractorCompany: initValues.contractorCompany.id,
            creationDate: initValues.creationDate,
            documentTypes: initValues.documentTypes,
            hiredCompany: initValues.hiredCompany
              ? initValues.hiredCompany
              : null,
            id: initValues.id,
            internal: initValues.internal,
            name: initValues.name,
            people: initValues.people,
            disableBadges: initValues.disableBadges,
          }
        : null;
      this.state = {
        isLoadingEnterprises: true,
        isLoadingStatus: true,
        openDialogPerson: false,
        showPerson: true,
        contractorCompany: initValues
          ? initValues.contractorCompany
          : undefined,
        hiredCompany: initValues ? initValues.hiredCompany : undefined,
        persons: [],
        documentTypes: initValues ? initValues.documentTypes : [],
        personsCount: initValues ? initValues.peopleCount : 0,
        newControl: control
          ? control
          : {
              name: "Mi control 1",
              documentTypes: [],
              people: [],
              Internal: false,
            },
        currentUser: currentUser,
        showDocumentType: true,
        isNewControl: true,
        steps: [
          { name: "details", bool: true },
          { name: "Persons", bool: false },
        ],
        openDialogDocument: false,
        openDialogContractingEnterprise: false,

        formErrors: {},
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.initValues !== prevState.initValues) {
        return {
          initValues: nextProps.initValues,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.initValues !== this.state.initValues) {
        this.setState({
          personsCount: this.state.initValues.peopleCount,
          persons: this.state.initValues.people,
        });
      }
    }

    componentDidMount() {
      NavBarAludoc.hideLoader();
    }

    handleChangeStep = (bool) => {
      this.setState((prevState) => ({
        isNewControl: bool,
      }));
    };

    handleChangePage = (e) => {
      const { requestPersonByControl } = this.props;
      const { newControl } = this.state;
      const value = e.currentTarget.value;
      if (value === "next") pagePeople = pagePeople + 1;
      else if (value === "previous" && pagePeople > 0) {
        pagePeople = pagePeople - 1;
      }
      requestPersonByControl({
        start: pagePeople * rowsPerPagePeople,
        length: rowsPerPagePeople,
        order: "",
        search: "",
        ControlId: newControl.id,
      });
    };

    handleChangeRowsPerPage = (e) => {
      const { requestPersonByControl } = this.props;
      const { newControl } = this.state;
      const value = Number(e.currentTarget.dataset.value);
      rowsPerPagePeople = value;
      requestPersonByControl({
        start: pagePeople * rowsPerPagePeople,
        length: rowsPerPagePeople,
        order: "",
        search: "",
        ControlId: newControl.id,
      });
    };

    expandDocType = () => {
      this.setState((prevState) => ({
        showDocumentType: !prevState.showDocumentType,
      }));
    };

    expandPersons = () => {
      console.log("entro expandPersons");
      this.setState((prevState) => ({
        showPerson: !prevState.showPerson,
      }));
    };

    render() {
      const {
        openDialogDocument,
        documentTypeOnCreate,
        openDialogNewDocumentType,
        openDialogPerson,
        newControl,
        showDocumentType,
        documentTypes,
        contractorCompany,
        hiredCompany,
        isCreating,
        isSuccess,
        steps,
        personsCount,
        persons,
        isNewControl,
        showPerson,
      } = this.state;
      const { successPrs, loadingPrs, requestPersons } = this.props;
      return (
        <Component
          contractorCompany={contractorCompany}
          documentTypes={documentTypes}
          showDocumentType={showDocumentType}
          newControl={newControl}
          openDialogDocument={openDialogDocument}
          documentTypeOnCreate={documentTypeOnCreate}
          openDialogNewDocumentType={openDialogNewDocumentType}
          openDialogPerson={openDialogPerson}
          hiredCompany={hiredCompany}
          isSuccess={isSuccess}
          isCreating={isCreating}
          steps={steps}
          personsCount={personsCount}
          persons={persons}
          successPrs={successPrs}
          loadingPrs={loadingPrs}
          requestPersons={requestPersons}
          isNewControl={isNewControl}
          showPerson={showPerson}
          pagePeople={pagePeople}
          rowsPerPagePeople={rowsPerPagePeople}
          handleChangeStep={this.handleChangeStep}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          expandDocType={this.expandDocType}
        />
      );
    }
  });

const mapStateToProps = ({ DocumentType, Persons }) => {
  return {
    successDocTypes: DocumentType.successDocTypes,
    info: DocumentType.info,
    loadingPrs: Persons.loading,
    successPrs: Persons.successPrs,
    persons: Persons.persons,
  };
};

const mapDispatchToProps = {
  requestDocumentType: requestDocumentType,
  requestPersons: requestPersons,
  requestPersonByControl: requestPersonByControl,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withStyles(styles, { withTheme: true }),
  withDetailsControl
);
