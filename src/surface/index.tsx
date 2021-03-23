import cx from 'classnames'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export interface SurfaceProps {
  className?: string
  elevation?: number
  radius?: number | string
  [key: string]: any
}

interface StyledSurfaceProps {
  radius?: number | string
}

const StyledSurface = styled(motion.div)<StyledSurfaceProps>`
  position: relative;
  background-color: var(--surface);
  color: var(--on-surface-high-emphasis);
  border-radius: ${(p) =>
    (p.radius &&
      ((!isNaN(parseFloat(p.radius as any)) && p.radius + 'px') || p.radius)) ||
    0};
`

const Surface: React.FunctionComponent<SurfaceProps> = ({
  children,
  className,
  elevation = 1,
  radius = 0,
  ...props
}) => {
  return (
    <StyledSurface
      radius={radius}
      className={cx(className, `elevation-${elevation}`)}
      {...props}>
      {children}
    </StyledSurface>
  )
}

export default Surface
