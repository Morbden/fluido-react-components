import { Meta, Story } from '@storybook/react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import useInViewScrollInterpolation, {
  UseInViewScrollInterpolationProps,
} from './index'

const ComponentMeta: Meta = {
  title: 'UseInViewScrollInterpolation',
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
  .box {
    position: relative;
    width: 25rem;
    height: 25rem;
    background-color: steelblue;
    box-sizing: border-box;
    padding: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    & > .item {
      position: fixed;
      top: calc(50% - 2rem);
      left: calc(50% - 2rem);
      width: 4rem;
      height: 4rem;
      background: linear-gradient(to bottom, purple, green);
    }
  }
`

interface ExtraProps {
  stiffness: number
  damping: number
  mass: number
}

const Template: Story<UseInViewScrollInterpolationProps & ExtraProps> = (
  args,
) => {
  const { stiffness, damping, mass, ...props } = args

  const { ref, result } = useInViewScrollInterpolation({
    ...props,
    ease: {
      rotate: {
        stiffness,
        damping,
        mass,
      },
    },
    interpolations: {
      rotate: [0, 360],
    },
  })

  return (
    <Container>
      <div className='box' ref={ref}>
        <motion.div style={result} className='item' />
      </div>
    </Container>
  )
}

export const FirstState = Template.bind({})
FirstState.args = {
  debug: true,
  behaviorStart: 'entering',
  behaviorEnd: 'gone',
  thresholdOffsetStart: 0,
  thresholdOffsetEnd: 0,
  rootMarginOffsetStart: 0,
  rootMarginOffsetEnd: 0,
  damping: 20,
  mass: 1,
  stiffness: 100,
}

FirstState.argTypes = {
  behaviorStart: {
    control: {
      type: 'radio',
      options: ['entering', 'visible'],
    },
  },
  behaviorEnd: {
    control: {
      type: 'radio',
      options: ['leaving', 'gone'],
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
