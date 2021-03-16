import { MotionValue, useTransform, useViewportScroll } from 'framer-motion'
import useInViewScrollPosition, {
  UseInViewScrollPositionProps,
} from '../use-in-view-scroll-position'

export interface InterpolationProps<T = any> {
  [key: string]: T[]
}

export interface InterpolationStepProps {
  /** step vai de [0-1] */
  [key: string]: number[]
}

export interface InterpolationResult<T = any> {
  [key: string]: MotionValue<T>
}

export interface UseInViewScrollInterpolationProps<T = any>
  extends UseInViewScrollPositionProps {
  interpolations?: InterpolationProps<T>
  interpolationSteps?: InterpolationStepProps
}

export interface UseInViewScrollInterpolationResult<T = any> {
  result: InterpolationResult<T>
  ref?: (node: any) => void
}

export interface UseInViewScrollInterpolationType<T = any> {
  (
    args?: UseInViewScrollInterpolationProps<T>,
  ): UseInViewScrollInterpolationResult<T>
}

const useInViewScrollInterpolation: UseInViewScrollInterpolationType = (
  args = {},
) => {
  const { interpolations, interpolationSteps, ...props } = args

  const { scrollY: scroll } = useViewportScroll()
  const { ref, start, end } = useInViewScrollPosition(props)

  const result: InterpolationResult = {}

  for (const r in interpolations) {
    const steps = interpolationSteps && interpolationSteps[r]

    const genSteps = () => {
      const interval = end - start
      if (steps) {
        return steps.map((s) => start + s * interval)
      } else {
        const length = interpolations[r].length
        const step = interval / (length - 1)
        return Array(length)
          .fill(0)
          .map((_, i) => start + i * step)
      }
    }
    const finalSteps = genSteps()

    result[r] = useTransform(scroll, finalSteps, interpolations[r])
  }

  return { ref, result }
}

export default useInViewScrollInterpolation
