import React from 'react'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import RootReducer from '../reducers/Root_reducer'
import MockTheme from './themeMock'

const ProviderMock = (props) => {
  const store = createStore(RootReducer, props.initialState)
  return (
    <Provider store={store}>
      <MockTheme>
        <Router>{props.children}</Router>
      </MockTheme>
    </Provider>
  )
}

export default ProviderMock
