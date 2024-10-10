import React, { Component } from 'react'
import Typography from '@mui/material/Typography'
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import DataTableSelectAction from '../../../Shared/DataTable/DataTableSelectAction'
import PropTypes from 'prop-types'
import NavBarAludoc from '../../utils/NavBarAludoc'
import AddDocument from '@mui/icons-material/NoteAdd'

import { FormHelperText } from '@mui/material'

import green from '@mui/material/colors/green'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import {
  isValueEmptyOrNull,
  isArrayEmptyOrNull
} from '../../../../utils/HelperFunctions'
import SnackbarHandler from '../../../../utils/SnackbarHandler'
import { withTranslation } from 'react-i18next'
import { requestEnterprises } from '../../../../actions/EasyAccess/Enterprise_actions'
import {
  requestDocumentType,
  requestCreateDocumentType,
  requestEditDocumentType,
  requestCategories
} from '../../../../actions/Aludoc/documentType_action'
import styles from '../../../../assets/styles/Aludoc_styles/Document_styles/newDocumentTypeStyles.js'

class NewDocumentType extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.create !== prevState.create ||
      nextProps.successEditDT !== prevState.successEditDT ||
      nextProps.error !== prevState.error ||
      nextProps.errorType !== prevState.errorType ||
      nextProps.loading !== prevState.loading ||
      nextProps.incomplete !== prevState.incomplete ||
      nextProps.incompleteChange !== prevState.incompleteChange
    ) {
      return {
        create: nextProps.create,
        successEditDT: nextProps.successEditDT,
        error: nextProps.error,
        errorType: nextProps.errorType,
        loading: nextProps.loading,
        incomplete: nextProps.incomplete,
        incompleteChange: nextProps.incompleteChange
      }
    } else return null
  }

  componentDidUpdate(prevProps, prevState) {
    const { t, isInModal, onCreate } = this.props
    if (
      this.state.incomplete &&
      this.state.incompleteChange !== prevState.incompleteChange
    ) {
      SnackbarHandler.showMessage(t('inputIncomplete'), 'error')
    }
    if (this.state.create && prevState.create !== this.state.create) {
      this.props.requestDocumentType({
        start: 0,
        length: 10,
        order: 'value asc',
        search: ''
      })
      SnackbarHandler.showMessage(t('successCreateDocumentType'))
      !isInModal
        ? NavBarAludoc.appNavigation.history.replace('/documentType')
        : onCreate()
    }
    if (
      this.state.successEditDT &&
      this.state.successEditDT !== prevState.successEditDT
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true
      })
      this.props.loadData(true)
      SnackbarHandler.showMessage('Se edito con exito el tipo de documento')
      onCreate()
      setTimeout(() => {
        this.setState({
          isSuccess: false
        })
      }, 1000)
    }
    if (this.state.errorType && this.state.loading !== prevState.loading) {
      // console.log('this.state.error: ', this.state.error);
      // console.log('this.state.errorType: -' + this.state.errorType + '-')
      SnackbarHandler.showMessage(
        this.state.errorType
          ? t(this.state.errorType.error.errorData)
          : 'error',
        'error'
      )

      this.setState({
        isCreating: false,
        isSuccess: false
      })
    }
  }

  render() {
    const {
      isDialog,
      isEdit,
      classes,
      theme,
      t,
      isDesktop,
      handleCreate,
      handleEdit,
      formErrors,

      handleChange,
      newDocumentType,
      handleEnterpriseSelected
    } = this.props

    const enterpriseColumns = [
      {
        name: t('name'),
        field: 'name',
        options: {
          sort: true,
          filter: true,
          sortDirection: 'asc',
          customBodyRender: (data) => {
            if (data.name)
              return <Typography value={data.name}>{data.name}</Typography>
          }
        }
      }
    ]
    return (
      <main className={!isDialog ? classes.layout : undefined}>
        <div
          className={
            !isDialog && isDesktop
              ? classes.fill
              : !isDialog && !isDesktop
              ? classes.fillMobile
              : undefined
          }>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? '1' : '0',
              width: '100%',
              background: 'none',
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AddDocument />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isEdit ? t('editDocumentType') : t('newDocumentType')}
            </Typography>
            <Divider
              style={{ width: '100%', marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={12} className={classes.center}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    label={t('name')}
                    onChange={handleChange('value')}
                    fullWidth
                    helperText={t('inputEmpty')}
                    FormHelperTextProps={{
                      style: { opacity: formErrors.name ? 1 : 0 }
                    }}
                    error={formErrors.name}
                    value={newDocumentType.value}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} className={classes.center}>
                <Grid item xs={12} md={6}>
                  <DataTableSelectAction
                    handleConfirm={handleEnterpriseSelected}
                    loadDataAction={this.props.requestEnterprises}
                    elements={newDocumentType.enterprises}
                    primaryTitle={
                      this.props.isDetails
                        ? `${t('enterprises')} *`
                        : `${t('assignEnterprise')} *`
                    }
                    title={t('enterprise')}
                    DataTableColumns={enterpriseColumns}
                    multipleSelect={true}
                    attribute={'name'}
                    isDetails={this.props.isDetails}
                    info={this.props.enterprises}
                    success={this.props.successEnterprise}
                    loading={this.props.loadingEnterprises}
                  />

                  <FormHelperText
                    style={{
                      opacity: formErrors.enterprises ? 1 : 0
                    }}
                    error={formErrors.enterprises}>
                    {t('SelectAtLeastOneCompany')}
                  </FormHelperText>
                </Grid>
                {/* ---------------------------------------------------------------------------
                <Grid item xs={12} md={6} style={{ padding: "6px" }}>
                  <DataTableSelectAction
                    url={"/Aludoc/Categories/GetCategories"}
                    method={"GET"}
                    handleConfirm={this.handleCategorySelected}
                    loadDataAction={this.props.requestCategories}
                    elements={this.state.newDocumentType.categories}
                    primaryTitle={
                      this.props.isDetails
                        ? t("Cateogires")
                        : t("AssignCategories")
                    }
                    title={t("Categories")}
                    DataTableColumns={[
                      {
                        name: t("Name"),
                        field: "value",
                        options: {
                          sort: true,
                          filter: true,
                          sortDirection: "asc",
                          customBodyRender: data => {
                            if (data.value)
                              return (
                                <Typography value={data.value}>
                                  {data.value}
                                </Typography>
                              );
                          }
                        }
                      }
                    ]}
                    multipleSelect={true}
                    attribute={"value"}
                    isDetails={
                      this.props.isNewCtrlDoc ? false : this.props.isDetails
                    }
                    info={this.props.categories}
                    success={this.props.successCategories}
                    loading={this.props.loadingCategories}
                  />
                </Grid>
                --------------------------------------------------------------------------------------------*/}
              </Grid>
              <div
                className={classes.submit}
                style={{
                  position: 'relative',
                  width: '100%'
                }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={this.state.isCreating}
                  onClick={
                    this.state.isCreating
                      ? undefined
                      : isEdit
                      ? handleEdit
                      : handleCreate
                  }
                  style={{
                    background: this.state.isSuccess ? green[500] : undefined,
                    color: theme.palette.text.main,
                    marginTop: '-6%'
                  }}>
                  {this.state.isSuccess
                    ? isEdit
                      ? t('successEdit')
                      : t('successCreate')
                    : this.state.isCreating
                    ? ''
                    : isEdit
                    ? t('EditDocumentType')
                    : t('CreateDocumentType')}
                </Button>
                {this.state.isCreating && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: -12,
                      marginLeft: -12,
                      color: 'white'
                    }}
                  />
                )}
              </div>
            </Grid>
          </Paper>
        </div>
      </main>
    )
  }
}

NewDocumentType.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const mapStateToProps = ({ DocumentType, Enterprise }) => {
  return {
    // documentTypes: DocumentType.documentType,
    // loadingDocumentType: DocumentType.loading,
    // create: DocumentType.create,
    // successEditDT: DocumentType.successEditDT,
    // loading: DocumentType.loading,
    // error: DocumentType.error,
    // errorType: DocumentType.errorType,
    // successEnterprise: Enterprise.successEnterprise,
    // enterprises: Enterprise.enterprises,
    // categories: DocumentType.categories,
    // loadingEnterprises: Enterprise.loading,
  }
}

const mapDispatchToProps = {
  requestCreateDocumentType: requestCreateDocumentType,
  requestDocumentType: requestDocumentType,
  requestEditDocumentType: requestEditDocumentType,
  requestEnterprises: requestEnterprises,
  requestCategories: requestCategories
}

const NewDocumentTypeConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDocumentType)

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewDocumentTypeConnected)
)
