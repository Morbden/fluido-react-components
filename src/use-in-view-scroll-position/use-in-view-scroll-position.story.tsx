import { Meta, Story } from '@storybook/react'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import useInViewScrollPosition, { UseInViewScrollPositionProps } from './index'

interface ThresholdProps {
  percentage: number
}

interface RootMarginProps {
  percentage: number
}

const ComponentMeta: Meta = {
  title: 'UseInViewScrollProgress',
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
const ThresholdTop = styled.div<ThresholdProps>`
  width: 0.5rem;
  position: absolute;
  left: -0.5rem;
  top: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
const ThresholdBottom = styled.div<ThresholdProps>`
  width: 0.5rem;
  position: absolute;
  right: -0.5rem;
  top: 0;
  height: 100%;
  background: linear-gradient(
    to top,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
const ThresholdLeft = styled.div<ThresholdProps>`
  width: 100%;
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  height: 0.5rem;
  background: linear-gradient(
    to right,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
const ThresholdRight = styled.div<ThresholdProps>`
  width: 100%;
  position: absolute;
  top: -0.5rem;
  left: 0;
  height: 0.5rem;
  background: linear-gradient(
    to left,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
const RootMarginTop = styled.div<RootMarginProps>`
  position: absolute;
  top: calc(-1 * ${(p) => p.percentage}px);
  left: -50%;
  right: -50%;
  border-top: 2px dotted var(--dots-color);
`
const RootMarginBottom = styled.div<RootMarginProps>`
  position: absolute;
  bottom: calc(-1 * ${(p) => p.percentage}px);
  left: -50%;
  right: -50%;
  border-bottom: 2px dotted var(--dots-color);
`
const RootMarginRight = styled.div<RootMarginProps>`
  position: absolute;
  right: calc(-1 * ${(p) => p.percentage}px);
  top: -50%;
  bottom: -50%;
  border-right: 2px dotted var(--dots-color);
`
const RootMarginLeft = styled.div<RootMarginProps>`
  position: absolute;
  left: calc(-1 * ${(p) => p.percentage}px);
  top: -50%;
  bottom: -50%;
  border-left: 2px dotted var(--dots-color);
`

const Template: Story<UseInViewScrollPositionProps> = (args) => {
  const { ref, ...extra } = useInViewScrollPosition(args)

  return (
    <Container>
      <div className='box' ref={ref}>
        <ThresholdTop percentage={args.thresholdY * 100} />
        <ThresholdBottom percentage={args.thresholdY * 100} />
        <ThresholdRight percentage={args.thresholdX * 100} />
        <ThresholdLeft percentage={args.thresholdX * 100} />
        <RootMarginTop percentage={args.rootMarginY} />
        <RootMarginBottom percentage={args.rootMarginY} />
        <RootMarginRight percentage={args.rootMarginX} />
        <RootMarginLeft percentage={args.rootMarginX} />
        <pre>{JSON.stringify(extra, null, 2)}</pre>
      </div>
    </Container>
  )
}

export const FirstState = Template.bind({})
FirstState.args = {
  thresholdX: 0.3,
  thresholdY: 0.3,
  rootMarginX: 0,
  rootMarginY: 0,
}

FirstState.argTypes = {
  thresholdX: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
  thresholdY: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
}
