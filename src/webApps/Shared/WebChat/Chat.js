import React, { Component } from 'react'
import CustomStyles from '../../../assets/styles/AccessControl_styles/WebChat_styles/chatContainer'
import { withStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material'
import Message from './Message'
import { Input } from 'semantic-ui-react'
import ReactLoading from 'react-loading'
import moment from 'moment'
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      mustScroll: false,
      interval: null,
    }
    this.messagesEndRef = React.createRef()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      messages: nextProps.messages,
    }
  }

  scrollToBottom = () => {
    this.messagesEndRef.scrollTop =
      this.messagesEndRef.scrollHeight - this.messagesEndRef.clientHeight
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.messages.length !== this.props.messages.length &&
        prevProps.messages.length === 0) ||
      this.state.mustScroll === true
    ) {
      this.scrollToBottom()
      this.setState({ mustScroll: false })
    }
  }

  componentWillUnmount() {
    const { interval } = this.state
    if (interval) clearInterval(interval)
    window.removeEventListener('resize', this.updateScreenMode)
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 })
  }

  componentDidMount() {
    const { handleLoadMoreMessages } = this.props
    this.setState({
      interval: setInterval(() => {
        const date = new Date()
        date.setSeconds(date.getSeconds() - 5)
        console.log(
          '🚀 ~ file: Chat.js:57 ~ Chat ~ interval:setInterval ~ date:',
          date
        )
        handleLoadMoreMessages(true, date.toISOString())
      }, 5000),
    })
    this.updateScreenMode()
    window.addEventListener('resize', this.updateScreenMode)
    this.scrollToBottom()
  }

  listenScrollEvent = (e) => {
    const { messages, messagesDataCount } = this.props
    // && messages.length < messagesDataCount
    if (e.target.scrollTop === 0) {
      this.props.handleLoadMoreMessages(false, null, this.props.messages.length)
    }
  }

  stringIsBlank = (str) => {
    return !str || /^\s*$/.test(str);
  }

  handleSendMessage = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
      if (!this.stringIsBlank(event.target.value)) {
        this.props.handleSendMessage(event.target.value)
        event.target.value = ''
        this.setState({ mustScroll: true })
      }
    }
  }

  daysAreEqual = (firstDate, secondDate) => {
    const day1 = new Date(firstDate).getDate()
    const day2 = new Date(secondDate).getDate()
    return day1 === day2
  }

  render() {
    const { title, body, t, classes, messages = [] } = this.props
    const messagesReversed = messages.slice(0).reverse()
    return (
      <div>
        <Grid
          container
          className={classes.chatContainer}
          style={this.state.isDesktop ? {} : { width: '85%' }}
        >
          <Grid item xs={12} className={classes.chatHeader}>
            <Typography variant='h4' className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid container className={classes.chatBody}>
            <div
              className={classes.messageContainer}
              onScroll={this.listenScrollEvent}
              ref={(ref) => {
                this.messagesEndRef = ref
              }}
            >
              {this.props.isLoadingMoreMessages && (
                <ReactLoading
                  className={classes.historyLoader}
                  type={'spinningBubbles'}
                  color={'#ffffff'}
                  height={30}
                  width={30}
                />
              )}
              {messages.length === this.props.messagesDataCount &&
                messages.length > 0 && (
                  <Typography className={classes.dateDivider}>
                    {moment
                      .utc(messages.slice(-1)[0].fechaHora)
                      .local()
                      .format('DD MMM YYYY')}
                  </Typography>
                )}
              {messagesReversed.map((m, index) => {
                if (
                  index < messages.length - 1 &&
                  !this.daysAreEqual(
                    m.fechaHora,
                    messagesReversed[index + 1].fechaHora
                  )
                )
                  return (
                    <div key={index}>
                      <Message message={m} key={index * 200} />
                      <Typography
                        className={classes.dateDivider}
                        key={index * 500}
                      >
                        {moment
                          .utc(messagesReversed[index + 1].fechaHora)
                          .local()
                          .format('DD MMM YYYY')}
                      </Typography>
                    </div>
                  )
                else return <Message message={m} key={index * 1000} />
              })}
            </div>
            {this.props.isLoadingNewMessages && (
              <ReactLoading
                className={classes.typingLoader}
                type={'bubbles'}
                color={'#ffffff'}
                height={'10%'}
                width={'15%'}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Input
              className={classes.input}
              icon='send'
              placeholder='Type a message...'
              onKeyPress={this.handleSendMessage}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(CustomStyles)(Chat)
