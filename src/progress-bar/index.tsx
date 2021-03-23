import styled from 'styled-components'

export interface ProgressBarProps {
  max?: number
  value?: number
  buffer?: number
  indeterminate?: boolean
}

const StyledProgressBar = styled.div`
  min-width: 10rem;
  height: 4px;
  position: relative;
  --progress: var(--progress-custom, var(--primary, #4285f4));
  overflow: hidden;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--progress);
    transition: all 150ms linear;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-image: linear-gradient(
      to right,
      var(--progress) 0,
      var(--progress) 50%,
      transparent 50%
    );
    background-repeat: repeat-x;
    background-size: 8px;
    opacity: 0.38;
    width: calc(100% - var(--data-buffer));
    transition: all 150ms linear;
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

  &[data-indeterminate='true'] {
    .indeterminate-1 {
      animation: increase 2s infinite;
    }
    .indeterminate-2 {
      animation: decrease 2s 0.5s infinite;
    }
  }

  @keyframes increase {
    from {
      left: -5%;
      width: 5%;
    }
    to {
      left: 130%;
      width: 100%;
    }
  }
  @keyframes decrease {
    from {
      left: -80%;
      width: 80%;
    }
    to {
      left: 110%;
      width: 10%;
    }
  }
`

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  max = 100,
  value,
  buffer,
  indeterminate = false,
}) => {
  const loading = indeterminate || isNaN(parseFloat(value as any))
  let newValue = (value || 0) / max
  let newBuffer = (buffer || max) / max

  newValue *= 100
  newBuffer *= 100

  if (newValue > 100) newValue = 100
  if (newBuffer > 100) newBuffer = 100
  if (newValue < 0) newValue = 0
  if (newBuffer < 0) newBuffer = 0

  if (loading) {
    newValue = 0
    newBuffer = 100
  }

  return (
    <StyledProgressBar
      role='progressbar'
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuemin={0}
      data-indeterminate={loading}
      style={
        {
          '--data-value': newValue + '%',
          '--data-buffer': newBuffer + '%',
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
