import { State } from '@hookstate/core'
import cx from 'classnames'
import { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../button'

export interface SnackbarStateProps {
  action?: VoidFunction
  actionLabel?: string
  duration?: number
  icon?: React.ReactNode
  message?: string
  type?: 'default' | 'error' | 'warning' | 'success'
}

export interface SnackbarProps {
  action?: VoidFunction
  actionLabel?: string
  icon?: React.ReactNode
  message?: string
  onClose?: VoidFunction
  snack?: State<SnackbarStateProps>
  type?: 'default' | 'error' | 'warning' | 'success'
}

const StyledSnackbar = styled.div`
  position: relative;
  background-color: var(--on-surface-high-emphasis);
  color: var(--surface);
  display: flex;
  align-items: center;
  padding: 0 0.5rem 4px;
  height: 3rem;
  box-shadow: 0px 5px 6px -3px var(--elevation-umbra),
    0px 9px 12px 1px var(--elevation-penumbra),
    0px 3px 16px 2px var(--elevation-ambient);

  &.with-timer {
    animation: snack-opacity 0.25s linear,
      snack-opacity 0.25s calc(var(--timer-value, 3s) + 0.25s) linear reverse
        forwards;
  }

  &.type-error {
    background-color: var(--error);
    color: var(--on-error);
  }
  &.type-warning {
    background-color: var(--warning);
    color: var(--on-warning);
  }
  &.type-success {
    background-color: var(--success);
    color: var(--on-success);
  }

  .icon {
    margin-right: 0.5rem;
  }
  .action {
    margin-left: auto;
  }

  .snack-timer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: currentColor;
    opacity: 0.5;
    animation: loading-snack var(--timer-value, 3s) linear;
  }

  @keyframes loading-snack {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  @keyframes snack-opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Snackbar: React.FunctionComponent<SnackbarProps> = ({
  snack,
  message,
  actionLabel,
  action,
  icon,
  type = 'default',
  onClose,
}) => {
  if (snack) {
    useEffect(() => {
      const tId = setTimeout(
        onClose,
        snack.duration.value + 500 /* extra para animação */,
      )

      return () => {
        clearTimeout(tId)
      }
    }, [])
  }

  const timer = snack ? snack.duration.value : 0
  const tType = snack ? snack.type.value : type
  const tIcon = snack ? snack.icon.value : icon
  const tMessage = snack ? snack.message.value : message
  const tActionLabel = snack ? snack.actionLabel.value : actionLabel
  const tAction = snack ? snack.action.value : action

  return (
    <StyledSnackbar
      className={cx(`type-${tType}`, {
        'with-timer': !!timer,
      })}
      style={
        {
          '--timer-value': `${timer}ms`,
        } as { [key: string]: any } & React.CSSProperties
      }>
      {tIcon && <div className='icon'>{tIcon}</div>}
      <div className='type-body'>{tMessage}</div>
      {tAction && (
        <div className='action'>
          <Button
            color='clear'
            onClick={() => {
              alert('asd')
              if (onClose) onClose()
              if (tAction) tAction()
            }}>
            {tActionLabel}
          </Button>
        </div>
      )}
      <div className='snack-timer' />
    </StyledSnackbar>
  )
}

export default Snackbar
