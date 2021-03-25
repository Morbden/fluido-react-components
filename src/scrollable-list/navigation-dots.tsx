import styled from 'styled-components'
import NavigationDot from './navigation-dot'

interface NavigationDotsProps {
  length?: number
  active?: number
  group?: boolean[]
  onClick?: (index: number) => void
}

interface BlockProps {
  start?: number
  size?: number
}

interface RangeDotProps {
  position?: number
}

const StyledNavigationDots = styled.div`
  --dots-color: var(--on-surface-disabled, gray);
  bottom: -2rem;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 0;
  &::after {
    content: '';
    position: absolute;
    left: var(--thumb-size);
    width: 2.5rem;
    height: 0.5rem;
    border-radius: 999px;
    z-index: -1;
  }
`

const Label = styled.label`
  --thumb-size: 0.5;
  --thumb-color: var(--primary, #4285f4);

  position: absolute;
  top: 0;
  left: 0;
  background: none;
  border: none;
  appearance: none;
  width: 100%;
  height: 2rem;
`

const RangeDot = styled.div<RangeDotProps>`
  position: absolute;
  top: 0.5rem;
  left: ${(p) => p.position}rem;
  pointer-events: none;
  width: 1rem;
  height: 1rem;
  border-radius: var(--thumb-border-radius, 999px);
  border-style: var(--thumb-border-style, solid);
  border-width: var(--thumb-border-width, 0);
  border-color: var(--thumb-border-color, var(--primary, #4285f4));
  transform: scale(var(--thumb-scale, 0.5));
  background-color: var(--thumb-color, var(--primary, #4285f4));
  transition: all 250ms ease;
`

const Range = styled.input`
  background: none;
  border: none;
  appearance: none;
  width: 100%;
  height: 2rem;
  -webkit-tap-highlight-color: transparent;
  margin: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 2rem;
    width: 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    height: 2rem;
    width: 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  &::-ms-thumb {
    height: 2rem;
    width: 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
  &:focus + * {
    --thumb-scale: var(--thumb-scale-active, 1);
  }
`

const Block = styled.div<BlockProps>`
  position: absolute;
  display: flex;
  padding: var(--group-padding-y, 0.75rem) var(--group-padding-x, 0.25rem);
  width: ${(p) => p.size}rem;
  height: 2rem;
  left: ${(p) => p.start}rem;
  transition: all 250ms ease;
  will-change: transform;
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: var(--group-background, var(--primary, #4285f4));
    border-radius: var(--group-border-radius, 999px);
    border-width: var(--group-border-width, 0);
    border-color: var(--group-border-color, var(--primary, #4285f4));
    opacity: var(--group-opacity, 1);
  }
`

const NavigationDots: React.FC<NavigationDotsProps> = ({
  length = 0,
  active = 0,
  group = [],
  onClick,
}) => {
  const indicatorList = new Array(length).fill(0)
  const blockStart = group.findIndex((e, i) => e || active === i)
  const blockWidth = group.reduce(
    (p, e, i) => p + (e || active === i ? 1 : 0),
    0,
  )
  return (
    <StyledNavigationDots>
      <Block start={blockStart} size={blockWidth} />
      <Label>
        <Range
          type='range'
          aria-valuemin={1}
          aria-valuemax={length}
          aria-valuenow={active + 1}
          aria-valuetext={`Item ${active + 1}`}
          max={length - 1}
          min={0}
          value={active}
          onInput={(ev) => {
            const target = ev.target as HTMLInputElement
            const value = +target.value as number
            if (onClick) onClick(value)
          }}
        />
        <RangeDot position={active} />
      </Label>
      {indicatorList.map((_, i) => (
        <NavigationDot key={i} />
      ))}
    </StyledNavigationDots>
  )
}

export default NavigationDots
