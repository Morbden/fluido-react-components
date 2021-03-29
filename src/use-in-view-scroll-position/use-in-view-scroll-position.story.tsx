import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import useInViewScrollPosition, { UseInViewScrollPositionProps } from './index'

const ComponentMeta: Meta = {
  title: 'UseInViewScrollPosition',
  parameters: { layout: 'fullscreen' },
}

export default ComponentMeta

const Container = styled.div`
  --start-color: yellowgreen;
  --end-color: crimson;
  --dots-color: black;
  height: 6000px;
  padding-top: 2000px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: lightsteelblue;
  > div {
    position: relative;
    width: 400px;
    height: 200px;
    background-color: steelblue;
    box-sizing: border-box;
    padding: 1rem;
    font-size: 1.5rem;
  }
`

const Template: Story<UseInViewScrollPositionProps> = (args) => {
  const { ref, ...extra } = useInViewScrollPosition(args)

  return (
    <Container>
      <div className='box' ref={ref}></div>
    </Container>
  )
}

export const FirstState = Template.bind({})
FirstState.args = {
  debug: true,
  behaviorStart: 'entering',
  behaviorEnd: 'gone',
  thresholdOffsetStart: 0.3,
  thresholdOffsetEnd: 0.3,
  rootMarginOffsetStart: 0,
  rootMarginOffsetEnd: 0,
}

FirstState.argTypes = {
  behaviorStart: {
    control: {
      type: 'select',
      options: ['entering', 'visible'],
    },
  },
  behaviorEnd: {
    control: {
      type: 'select',
      options: ['gone', 'leaving'],
    },
  },
  thresholdOffsetStart: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
  thresholdOffsetEnd: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
}
