import { Meta, Story } from '@storybook/react'
import TextField, { TextFieldProps } from './index'
import { MdAccountCircle, MdAlarm } from 'react-icons/md'

const ComponentMeta: Meta = {
  title: 'TextField',
}

export default ComponentMeta

const Template: Story<TextFieldProps> = ({ trailing, leading, ...args }) => (
  <TextField
    name='textField'
    trailing={trailing && <MdAccountCircle size='24' />}
    leading={leading && <MdAlarm size='24' />}
    {...args}
  />
)

export const withMask = Template.bind({})
withMask.args = {
  label: 'CPF/CNPJ',
  maskConfig: ['999.999.999-99', '99.999.999/9999-99'],
}
export const allProps = Template.bind({})
allProps.args = {
  label: 'A Label',
  placeholder: 'A Placeholder',
  error: '',
  leading: true,
  trailing: true,
}
