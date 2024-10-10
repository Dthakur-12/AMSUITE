import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import React from 'react'
import { withTranslation } from 'react-i18next'
import Users from './Users'
import UserGroup from './UserGroup/UserGroup'
import ADGroup from './UserGroup/ADGroup'
import SalmGroupList from './SamlGroup/SalmGroupList'
import MusteringUsers from './MusteringUsers'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import styles from '../../../assets/styles/User_styles/userAdministrationStyles'

import ApiHandler from '../../../services/ApiHandler'

// const panes = t => [
//   {
//     menuItem: t("Users"),
//     render: () => <Users />
//   },
//   {
//     menuItem: t("UserGroups"),
//     render: () => <UserGroup />
//   },
//   {
//     menuItem: t("ADGroups"),
//     render: () => <ADGroup />
//   }
// ];

function TabContainer({ children, dir, isDesktop }) {
  return (
    <Typography
      component='div'
      dir={dir}
      style={{ padding: isDesktop ? 8 * 3 : '8px 0 0 0' }}
    >
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}
class UserAdministration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      loading: true,
    }
  }

  componentDidMount() {
    this.updateScreenMode()
    window.addEventListener('resize', this.updateScreenMode)
    this.loadSystemSettings()
  }

  loadSystemSettings = () => {
    ApiHandler.Setting.Setting.getSystemSetting()
      .then(({ data }) => {
        this.setState({
          saml: data.data.enable_SAML,
          actDirectory: data.data.enable_AD,
          loading: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenMode)
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 })
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = (index) => {
    this.setState({ value: index })
  }

  render() {
    const { classes, t, theme } = this.props
    return (
      <div>
        <main className={classes.layout}>
          <div className={classes.fill}>
            <div className={classes.root}>
              <AppBar position='relative' className={classes.customAppBar}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor='primary'
                  textColor='primary'
                  variant='fullWidth'
                  centered
                >
                  <Tab label={t('User')} className={classes.tab} />
                  <Tab label={t('UserGroups')} className={classes.tab} />
                  <Tab label={t('SamlGroups')} className={classes.tab} />
                  <Tab label={t('ADGroups')} className={classes.tab} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer
                  dir={theme.direction}
                  isDesktop={(this, this.state.isDesktop)}
                >
                  <Users />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <UserGroup />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <SalmGroupList />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <ADGroup />
                </TabContainer>
              </SwipeableViews>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

UserAdministration.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(UserAdministration)
)
