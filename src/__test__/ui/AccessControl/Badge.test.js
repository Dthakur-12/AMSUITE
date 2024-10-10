import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import NewBadge from '../../../webApps/AccessControl/Components/Badge/NewBadge'
import ProviderMock from '../../../__mocks__/appmock'
import BadgeTypes from '../../../webApps/AccessControl/Components/Badge/BadgeTypes'
import fetch from 'jest-fetch-mock'

jest.mock('../../../webApps/AccessControl/utils/NavBarAccessControl')

describe('<NewBadge />', () => {
  it('New Badge Renders', () => {
    render(
      <ProviderMock
        initialState={{ Settings: { customFields: { badges: [] } } }}
      >
        <NewBadge />
      </ProviderMock>
    )
    expect(screen.getAllByText('NewBadge')).toHaveLength(1)
  })
})

// describe('<BadgeTypes />', () => {
//   it('Badge Type Renders', () => {
//     fetch.mockResponse({
//       data: () => ({
//         data: [{ name: '1' }, { name: '2' }],
//       }),
//     })
//     render(
//       <ProviderMock initialState={{}}>
//         <BadgeTypes />
//       </ProviderMock>
//     )
//     expect(screen.getAllByText('BadgeType')).toHaveLength(1)
//   })
// })
