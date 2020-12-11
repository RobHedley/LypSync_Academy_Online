import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import HeaderBar from './HeaderBar'

storiesOf('Header Bar', module)
  .addDecorator(withInfo)
  .add('Header Bar', () => (
    <React.Fragment>
      <HeaderBar>Test content</HeaderBar>
    </React.Fragment>
  ))
