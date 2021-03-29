import { Meta, Story } from '@storybook/react'
import { MdAccountCircle } from 'react-icons/md'
import SelectField, { SelectFieldProps } from './index'

const ComponentMeta: Meta = {
  title: 'SelectField',
}

export default ComponentMeta

const Template: Story<SelectFieldProps> = ({ leading, ...args }) => (
  <SelectField
    name='selectField'
    leading={leading && <MdAccountCircle size='24' />}
    {...args}>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </SelectField>
)

export const allProps = Template.bind({})
allProps.args = {
  label: 'A Label',
  placeholder: 'A Placeholder',
  disabled: false,
  leading: true,
  error: '',
}
