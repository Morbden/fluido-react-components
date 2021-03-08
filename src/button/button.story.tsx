import { Meta, Story } from '@storybook/react'
import Button, { ButtonProps } from './index'
import '../styles/material.scss'
import '../styles/elevation.scss'

const ComponentMeta: Meta = {
  title: 'Button',
}

export default ComponentMeta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const clearButton = Template.bind({})
clearButton.args = {
  children: 'Button',
} as ButtonProps

export const colorButton = Template.bind({})
colorButton.args = {
  children: 'Button',
  color: 'secondary',
} as ButtonProps

colorButton.argTypes = {
  color: {
    control: {
      type: 'select',
      options: ['', 'secondary', 'clear'],
    },
  },
}

export const typedButton = Template.bind({})
typedButton.args = {
  children: 'Button',
  kind: 'outline',
} as ButtonProps

typedButton.argTypes = {
  kind: {
    control: {
      type: 'select',
      options: ['', 'text', 'outline'],
    },
  },
}

export const allProps = Template.bind({})
allProps.args = {
  children: 'Button',
  kind: 'outline',
  rounded: false,
  disabled: false,
  marginless: false,
  noRipple: false,
  elevation: 2,
  leading: 'LEAD',
  trailing: 'TRAIL',
} as ButtonProps

allProps.argTypes = {
  color: {
    control: {
      type: 'select',
      options: ['', 'secondary', 'clear'],
    },
  },
  kind: {
    control: {
      type: 'select',
      options: ['', 'text', 'outline'],
    },
  },
}
