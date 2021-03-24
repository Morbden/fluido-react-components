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

const Range = styled.input`
  --thumb-size: 0.25rem;
  --thumb-color: var(--primary, #4285f4);

  position: absolute;
  top: 0;
  left: 0;
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
    border-radius: 99px;
    border: none;
    background: transparent;
    background-image: radial-gradient(
      circle at center,
      var(--thumb-color) var(--thumb-size),
      transparent var(--thumb-size)
    );
    cursor: pointer;
  }
  &::-moz-range-thumb {
    height: 2rem;
    width: 1rem;
    border-radius: 99px;
    border: none;
    background: transparent;
    background-image: radial-gradient(
      circle at center,
      var(--thumb-color) var(--thumb-size),
      transparent var(--thumb-size)
    );
    cursor: pointer;
  }
  &::-ms-thumb {
    height: 2rem;
    width: 1rem;
    border-radius: 99px;
    border: none;
    background: transparent;
    background-image: radial-gradient(
      circle at center,
      var(--thumb-color) var(--thumb-size),
      transparent var(--thumb-size)
    );
    cursor: pointer;
  }

  &:focus {
    --thumb-size: 0.5rem;
    outline: none;
  }
`

const Block = styled.div<BlockProps>`
  position: absolute;
  width: calc(${(p) => p.size}rem - 0.5rem);
  height: 0.5rem;
  border-radius: 999px;
  left: calc(0.25rem + ${(p) => p.start}rem);
  background-color: var(--primary);
  opacity: 0.6;
  transition: all 50ms ease;
`

const NavigationDots: React.FC<NavigationDotsProps> = ({
  length = 0,
  active = 0,
  group = [],
  onClick,
}) => {
  const indicatorList = new Array(length).fill(0)
  const blockStart = group.findIndex((e) => e)
  const blockWidth = group.reduce((p, e) => p + (e ? 1 : 0), 0)
  return (
    <StyledNavigationDots>
      <Block start={blockStart} size={blockWidth} />
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
      {indicatorList.map((_, i) => (
        <NavigationDot key={i} />
      ))}
    </StyledNavigationDots>
  )
}

export default NavigationDots