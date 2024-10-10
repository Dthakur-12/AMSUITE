import React from 'react'
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Select from 'react-select'
import components from '../../../Shared/ReactSelect'
import InputLabel from '@mui/material/InputLabel'
import LinearProgress from '@mui/material/LinearProgress'
import { Icon, Divider, Input, Button, TextArea } from 'semantic-ui-react'
import { FormHelperText } from '@mui/material'
import { withTranslation } from 'react-i18next'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { isValueEmptyOrNull } from '../../../../utils/HelperFunctions'
import CustomStyles from '../../../../assets/styles/Settings_styles/System/GeneralStyles'

class General extends React.Component {
  render() {
    const {
      classes,
      theme,
      t,
      handleChange,
      timezone,
      formErrors,
      systemDTO,
      zonaHoraria,
      isCreating,
      handleEneableDisableUseSSL,
      handleEneableDisable,
      handleSendEmail,
      handleRecipentSender,
      openRecipentSender,
      recipent,
      handleManualSync,
    } = this.props

    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
        width: '100%',
        menuList: {
          maxHeight: 100,
        },
      }),
    }

    return (
      <main style={{ marginTop: '4%' }}>
        <div>
          <LinearProgress
            className={classes.customLinearProgress}
            style={{
              opacity: isCreating ? '1' : '0',
            }}
            variant='query'
          />
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid
                item
                xs={12}
                md={12}
                style={{ marginBottom: 5, zIndex: 100 }}
              >
                <InputLabel style={{ fontSize: '13px' }} htmlFor='timezone'>
                  {t('TimeZone')}
                </InputLabel>
                <Select
                  id='timezone'
                  classes={classes}
                  styles={selectStyles}
                  options={zonaHoraria}
                  components={components}
                  value={timezone}
                  onChange={handleChange('timeZone')}
                  placeholder={t('TimeZone')}
                  maxMenuHeight={200}
                  isLoading={false}
                />
                <FormHelperText
                  style={{
                    opacity: formErrors.timezone ? 1 : 0,
                  }}
                  error={formErrors.timezone}
                >
                  {t('inputEmpty')}
                </FormHelperText>
              </Grid>
              <Grid className={classes.majorAlignment}>
                <Divider horizontal>
                  <InputLabel style={{ fontSize: '13px' }}>
                    {t('EmailOfTheSystem')}
                  </InputLabel>
                </Divider>
                <Grid
                  container
                  spacing={24}
                  style={{ marginBottom: 10, marginTop: 5 }}
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.infoTextField}
                      type='text'
                      label={t('EmailServer')}
                      fullWidth
                      //value={systemDTO.emailServer}
                      value={systemDTO.emailServer}
                      onChange={handleChange('emailServer')}
                    />
                    <TextField
                      className={classes.infoTextField}
                      type='text'
                      label={t('From')}
                      fullWidth
                      value={systemDTO.emailFrom}
                      onChange={handleChange('emailFrom')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.infoTextField}
                      type='text'
                      label={t('email')}
                      fullWidth
                      value={systemDTO.email}
                      onChange={handleChange('email')}
                    />
                    <TextField
                      className={classes.infoTextField}
                      type='password'
                      label={t('password')}
                      fullWidth
                      value={systemDTO.password}
                      onChange={handleChange('password')}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={systemDTO.useSSL}
                          value={systemDTO.useSSL}
                          color='primary'
                          onChange={handleEneableDisableUseSSL}
                        />
                      }
                      label={t('UseSSL')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.infoTextField}
                      type='number'
                      label={t('PortSMTP')}
                      fullWidth
                      value={systemDTO.smtpPort}
                      s
                      onChange={handleChange('smtpPort')}
                    />
                  </Grid>

                  <Grid container style={{ height: '90px' }}>
                    <Grid item xs={6} className={classes.customLinksViaEmail}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={systemDTO.addLinksToEmails}
                            value={systemDTO.addLinksToEmails}
                            color='primary'
                            onChange={handleEneableDisable}
                          />
                        }
                        label={t('EneableLinksViaEmail')}
                      />
                    </Grid>

                    {systemDTO.addLinksToEmails && (
                      <Grid
                        item
                        xs={6}
                        md={6}
                        className={classes.customLinksViaEmail}
                      >
                        <div>
                          <TextField
                            disabled={!systemDTO.addLinksToEmails}
                            fullWidth
                            style={{
                              maxWidth: '25%',
                              marginTop: 0,
                              marginBottom: 0,
                            }}
                            id='selectHttp/s'
                            select
                            label={t('Protocol')}
                            margin='normal'
                            value={
                              systemDTO.addLinksToEmails
                                ? this.props.protocol
                                : ''
                            }
                            onChange={this.props.handleChangeProtocol}
                          >
                            {[
                              { value: 'http', label: 'http://' },
                              { value: 'https', label: 'https://' },
                            ].map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>

                          <TextField
                            style={{ maxWidth: '75%' }}
                            fullWidth
                            type=''
                            disabled={!systemDTO.addLinksToEmails}
                            label={t('BaseURL')}
                            value={
                              systemDTO.addLinksToEmails
                                ? this.props.baseUrl
                                : ''
                            }
                            onChange={this.props.handleChangeUrl}
                            placeholder={t('someDomain.com/')}
                          />
                        </div>
                      </Grid>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ marginTop: '-4%', display: 'flex' }}
                  >
                    <TextField
                      fullWidth
                      style={{
                        maxWidth: '25%',
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                      id='preferredLanguage'
                      select
                      label={t('Language')}
                      margin='normal'
                      value={systemDTO.preferredLanguage}
                      onChange={handleChange('preferredLanguage')}
                    >
                      {[
                        { value: 1, label: t('spanish') },
                        { value: 2, label: t('english') },
                      ].map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Typography
                      style={{
                        maxWidth: '70%',
                        marginTop: '6.5%',
                        marginLeft: '5%',
                      }}
                    >
                      {t('SelectLanguageForEmailNotification')}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ marginTop: '-4%', display: 'flex' }}
                  >
                    <Button
                      fullWidth
                      variant='contianed'
                      id='testEmail'
                      onClick={handleRecipentSender(true)}
                    >
                      {t('TestEmail')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {Number(localStorage.getItem('operatingMode')) === 1 && (
              <Grid className={classes.majorAlignment}>
                <Divider horizontal>
                  <InputLabel style={{ fontSize: '13px' }}>
                    Lenel OnGuard
                  </InputLabel>
                </Divider>
                <Grid item xs={12}>
                  <Button
                    style={{ width: '100%' }}
                    variant='contianed'
                    id='forceSync'
                    onClick={() => handleManualSync('partial')}
                  >
                    {t('forceSync')}
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 12 }}>
                  <Button
                    style={{ width: '100%' }}
                    variant='contianed'
                    id='forceSyncFull'
                    onClick={() => handleManualSync('full')}
                  >
                    {t('forceSyncFull')}
                  </Button>
                </Grid>
              </Grid>
              )}
            </Grid>
          </Paper>
        </div>

        <Dialog
          onClose={handleRecipentSender(false)}
          aria-labelledby='simple-dialog-title'
          open={openRecipentSender}
        >
          <DialogTitle id='simple-dialog-title'>
            {t('SendTestEmailTo')}
          </DialogTitle>
          <DialogContent>
            {/* <Typography>{t("Recipent")}</Typography> */}
            <Input
              action
              className={classes.imeiInput}
              style={{ width: '100%' }}
              onChange={handleChange('recipent')}
              value={recipent}
            >
              <input />
              <Button className={classes.inputButton} onClick={handleSendEmail}>
                <Icon name='mail' className={classes.leftIcon} />
                {t('Send')}
              </Button>
            </Input>
          </DialogContent>
        </Dialog>
      </main>
    )
  }
}

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(General)
)
