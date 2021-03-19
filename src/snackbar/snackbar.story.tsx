import { Meta, Story } from '@storybook/react'
import Snackbar, { SnackbarProps } from './index'
import { MdInfo } from 'react-icons/md'

const ComponentMeta: Meta = {
  title: 'Snackbar',
}

export default ComponentMeta

interface ExtraProps {
  withIcon?: boolean
}

const Template: Story<SnackbarProps & ExtraProps> = ({ withIcon, ...args }) => (
  <div style={{ width: '20rem' }}>
    <Snackbar icon={withIcon && <MdInfo size='24' />} {...args} />
  </div>
)

export const allProps = Template.bind({})
allProps.args = {
  message: 'A alert message!',
  actionLabel: 'OK',
  type: 'default',
  withIcon: false,
}
allProps.argTypes = {
  type: {
    control: {
      type: 'select',
      options: ['default', 'error', 'warning', 'success'],
    },
  },
}
