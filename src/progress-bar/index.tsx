import styled from 'styled-components'

interface ProgressBarProps {
  max?: number
  value?: number
  buffer?: number
}

const StyledProgressBar = styled.div`
  min-width: 10rem;
  height: 4px;
  position: relative;
  --progress-color: var(--primary);
  transition: all 250ms linear;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--progress-color);
    transition: all 250ms linear;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-image: linear-gradient(
      to right,
      var(--progress-color) 0,
      var(--progress-color) 50%,
      transparent 50%
    );
    background-repeat: repeat-x;
    background-size: 8px;
    opacity: 0.38;
    width: calc(100% - var(--data-buffer));
    animation: out-buffer-animation 3s linear infinite;
  }

  .value {
    width: var(--data-value);
  }
  .buffer {
    opacity: 0.38;
    width: var(--data-buffer);
  }

  @keyframes out-buffer-animation {
    0% {
      opacity: 0;
      background-position-x: 0;
    }
    50% {
      opacity: 0.38;
      background-position-x: -160px;
    }
    100% {
      opacity: 0;
      background-position-x: -160px;
    }
  }
`

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  max = 100,
  value = 0,
  buffer,
}) => {
  let newValue = value / max
  buffer = (buffer || max) / max

  newValue *= 100
  buffer *= 100

  return (
    <StyledProgressBar
      role='progressbar'
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuemin={0}
      style={
        {
          '--data-value': newValue + '%',
          '--data-buffer': buffer + '%',
        } as React.CSSProperties
      }>
      <div className='buffer'></div>
      <div className='value'></div>
      <div className='indeterminate-1'></div>
      <div className='indeterminate-2'></div>
    </StyledProgressBar>
  )
}

export default ProgressBar
