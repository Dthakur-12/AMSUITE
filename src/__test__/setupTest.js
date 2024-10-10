import 'jest-canvas-mock'
import 'jest-localstorage-mock'
import React from 'react'
global.fetch = require('jest-fetch-mock')
global.setImmediate = jest.useRealTimers
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  withTranslation: () => (Component) => {
    const WrappedComponent = (props) => {
      return <Component {...props} />
    }
    WrappedComponent.defaultProps = {
      ...Component.defaultProps,
      t: (str) => str,
    }
    return WrappedComponent
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))
