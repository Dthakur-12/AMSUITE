import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import PanTool from '@mui/icons-material/PanTool'
import EditIcon from '@mui/icons-material/EditRounded'
import DetailsIcon from '@mui/icons-material/FormatListBulletedRounded'
import { withStyles } from '@mui/styles';
import { isNullOrUndefined } from 'util'
import NoteAdd from '@mui/icons-material/NoteAdd'
import { withTranslation } from 'react-i18next'
import { Icon } from 'semantic-ui-react'
import CustomStyles from '../../../assets/styles/Shared_Styles/DataTable/CustomToolBarSelectStyles'
import NewReleases from '@mui/icons-material/NewReleases'
import Fab from '@mui/material/Fab'

class CustomToolbarSelect extends React.Component {
  constructor(props) {
    super(props)
    const { selectedRows } = props
    this.state = {
      selectedRows,
    }
  }

  handleAddDocument = () => {
    const { addDocument, selectedRows } = this.props
    addDocument(selectedRows.data[0].dataIndex)
  }

  handleDelete = () => {
    const { onDelete, selectedRows, isMustering } = this.props
    if (selectedRows.data.length > 1) {
      if (isMustering) onDelete(selectedRows.data.map((x) => x.dataIndex))
      else onDelete(selectedRows.data.map((x) => x.index))
    } else onDelete([selectedRows.data[0].dataIndex])
  }
  handleFinish = () => {
    const { onFinish, selectedRows } = this.props
    onFinish(selectedRows.data[0].dataIndex)
  }
  handleEdit = () => {
    const { onEdit, selectedRows } = this.props
    onEdit(selectedRows.data[0].dataIndex)
  }
  handleDetails = () => {
    const { onDetails, selectedRows } = this.props
    onDetails(selectedRows.data[0].dataIndex)
  }

  handleAssignReaders = () => {
    const { assignReaders, selectedRows } = this.props
    assignReaders(selectedRows.data[0].dataIndex)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedRows } = nextProps
    if (selectedRows !== prevState.selectedRows) {
      return {
        selectedRows: selectedRows,
      }
    } else return null
  }

  render() {
    const { classes } = this.props
    const { selectedRows } = this.state
    const {
      onEdit,
      onDelete,
      onFinish,
      onDetails,
      assignReaders,
      addDocument,
      isStaffOutOfBoundaries,
      staffOutOfBoundariesName,
      t,
      permitsToEdit = true,
      permitsToDelete = true,
    } = this.props

    return (
      (<div style={{ display: 'flex' }}>
        {!isNullOrUndefined(onDelete) && permitsToDelete && (
          <Tooltip title={t('delete')}>
            <IconButton className={classes.iconButton} onClick={this.handleDelete} size="large">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {!isNullOrUndefined(onFinish) && selectedRows.data.length === 1 && (
          <Tooltip title={t('finish')}>
            <IconButton className={classes.iconButton} onClick={this.handleFinish} size="large">
              <PanTool />
            </IconButton>
          </Tooltip>
        )}
        {!isNullOrUndefined(isStaffOutOfBoundaries) && (
          <Tooltip
            // style={{ "*": { fontSize: "0.8em" } }}
            title={t('CantDeleteZone') + staffOutOfBoundariesName}
          >
            <span>
              <IconButton className={classes.iconButton} disableRipple disabled size="large">
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <span hidden={selectedRows.data.length !== 1 && !permitsToEdit}>
          {!isNullOrUndefined(onEdit) &&
            onEdit &&
            permitsToEdit &&
            selectedRows.data.length === 1 && (
              <Tooltip title={t('edit')}>
                <IconButton className={classes.iconButton} onClick={this.handleEdit} size="large">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          {!isNullOrUndefined(onDetails) && selectedRows.data.length === 1 && (
            <Tooltip title={t('details')}>
              <IconButton className={classes.iconButton} onClick={this.handleDetails} size="large">
                <DetailsIcon />
              </IconButton>
            </Tooltip>
          )}
          {!isNullOrUndefined(assignReaders) &&
            this.props.permitsToAssingReaders && (
              <Tooltip title={t('AssignReader')}>
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleAssignReaders}
                  style={{ paddingBottom: '15px' }}
                  size="large">
                  <Icon name='address card' style={{ margin: 0 }} />
                </IconButton>
              </Tooltip>
            )}
          {!isNullOrUndefined(addDocument) && (
            <Tooltip title={t('AddDocument')}>
              <IconButton
                className={classes.iconButton}
                onClick={this.handleAddDocument}
                size="large">
                <NoteAdd />
              </IconButton>
            </Tooltip>
          )}
        </span>
      </div>)
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, {
    name: 'CustomToolbarSelect',
  })(CustomToolbarSelect)
)
