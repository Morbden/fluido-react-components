import { Meta, Story } from '@storybook/react'
import Button, { ButtonProps } from './index'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import '../styles/material.scss'
import '../styles/typography.scss'
import '../styles/elevation.scss'

const ComponentMeta: Meta = {
  title: 'Button',
}

export default ComponentMeta

const Template: Story<ButtonProps> = (args) => {
  const { leading, trailing, ...props } = args
  return (
    <Button
      leading={leading && <MdAccountCircle size='24' />}
      trailing={trailing && <MdClose size='24' />}
      {...props}
    />
  )
}

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
  leading: true,
  trailing: true,
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
