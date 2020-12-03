import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Logo from './Logo'

storiesOf('Logo', module)
  .addDecorator(withInfo)
  .add('Flowminder Logo', () => (
    <div style={{ backgroundColor: '#00D2B3', color: '#fff', padding: '10px' }}>
      <Logo />
    </div>
  ))
