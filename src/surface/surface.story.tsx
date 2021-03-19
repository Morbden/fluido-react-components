import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import Surface, { SurfaceProps } from './index'

const ComponentMeta: Meta = {
  title: 'Surface',
}

export default ComponentMeta

const Container = styled.div`
  width: 100%;

  & > * {
    margin: auto;
    width: 20rem;
    height: 20rem;
  }
`

const Template: Story<SurfaceProps> = (args) => (
  <Container>
    <Surface {...args} />
  </Container>
)

export const allProps = Template.bind({})
allProps.args = {
  elevation: 1,
  radius: 8,
}
allProps.argTypes = {
  radius: {
    control: {
      type: 'range',
      max: 64,
      min: 0,
      step: 1,
    },
  },
  elevation: {
    control: {
      type: 'range',
      max: 24,
      min: 0,
      step: 1,
    },
  },
}
