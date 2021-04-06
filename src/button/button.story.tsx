import { Meta, Story } from '@storybook/react'
import Button, { ButtonProps } from './index'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import '@fluido/sass-styles/lib/material.scss'
import '@fluido/sass-styles/lib/typography.scss'
import '@fluido/sass-styles/lib/elevation.scss'

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
      options: ['fill', 'text', 'outline'],
    },
  },
}

export const allProps = Template.bind({})
allProps.args = {
  children: 'Button',
  kind: 'fill',
  elevation: 2,
  radius: 0,
  ripple: true,
  marginless: false,
  disabled: false,
  leading: true,
  trailing: true,
} as ButtonProps

allProps.argTypes = {
  elevation: {
    control: {
      type: 'range',
      min: 0,
      max: 24,
      step: 1,
    },
  },
  radius: {
    control: {
      type: 'range',
      min: 0,
      max: 32,
      step: 1,
    },
  },
  color: {
    control: {
      type: 'select',
      options: ['', 'secondary', 'clear'],
    },
  },
  kind: {
    control: {
      type: 'select',
      options: ['fill', 'text', 'outline'],
    },
  },
}
