import React from 'react'
import PropTypes from 'prop-types'
import CustomStyles from '../../../assets/styles/AccessControl_styles/WebChat_styles/messageComponent'
import { Icon } from 'semantic-ui-react'

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@mui/material'
import { withStyles } from '@mui/styles';
import moment from 'moment-timezone'

function Message(props) {
  const { classes, message = {} } = props
  const timezone = moment.tz.guess()
  const hour = moment.utc(message.fechaHora).tz(timezone)
  const fullHour = hour.format('HH:MM')
  return (
    <Grid
      item
      xs={8}
      className={
        message.sourceId === -2 ? classes.rightMessage : classes.leftMessage
      }
    >
      <Card className={classes.messageCard}>
        <CardContent className='messageContent'>
          <Typography
            className={classes.messageText}
            style={{ overflowWrap: 'anywhere' }}
          >
            {message.texto}
          </Typography>
        </CardContent>
        <CardActions
          className={
            message.sourceId === -2
              ? classes.messageActions
              : classes.messageActionsLeft
          }
        >
          {message.status === 'pending' ? (
            <Icon disabled name='history' />
          ) : (
            <Typography className={classes.messageDate}>{fullHour}</Typography>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}

Message.propTypes = {}

export default withStyles(CustomStyles)(Message)
