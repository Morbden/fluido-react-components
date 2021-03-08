import { useRipple } from '@fluido/react-effects'
import cx from 'classnames'
import { forwardRef } from 'react'
import styled from 'styled-components'

export interface ButtonProps {
  children?: any
  rounded?: boolean
  disabled?: boolean
  noRipple?: boolean
  marginless?: boolean
  className?: string
  classText?: string
  kind?: 'text' | 'outline'
  type?: 'link' | 'button' | 'submit' | 'reset'
  color?: 'clear' | 'secondary'
  elevation?: number
  leading?: React.ReactNode
  trailing?: React.ReactNode
  [key: string]: any
}

const StyledNode = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 2.25rem;
  min-width: 4rem;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  color: var(--on-button);
  user-select: none;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  clip-path: inset(2px 2px 2px 2px);

  --disabled: var(--on-surface-disabled);
  --transition: 250ms linear;
  transition: color var(--transition);

  &.primary-color {
    --button: var(--primary, #4285f4);
    --on-button: var(--on-primary-high-emphasis, #fff);
  }
  &.secondary-color {
    --button: var(--secondary, #aa66cc);
    --on-button: var(--on-secondary, #fff);
  }
  &.clear-color {
    --button: transparent;
    --on-button: currentColor;
  }

  &.text,
  &.outline {
    color: var(--button);
  }

  &.rounded,
  &.rounded :is(.button-bg, .button-overlay) {
    border-radius: 999px;
  }

  & :is(.button-bg, .button-overlay) {
    box-sizing: border-box;
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    transition: all var(--transition);
    overflow: hidden;
    background-color: transparent;
  }

  &.marginless {
    clip-path: unset;
    & :is(.button-bg, .button-overlay) {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  &:not(.outline):not(.text) {
    & .button-bg {
      background-color: var(--button);
    }
    &:is([data-disabled='true'], :disabled) .button-bg {
      opacity: 0.24;
    }
  }

  &.outline .button-bg {
    border: 2px solid currentColor;
  }

  & .button-overlay {
    background-color: currentColor;
    opacity: 0;
    transition: opacity 0.15s;
  }

  &:hover:not(:is([data-disabled='true'], :disabled)) .button-overlay {
    opacity: 0.12;
  }
  &.no-ripple:is(:focus, :active):not(:is([data-disabled='true'], :disabled))
    .button-overlay {
    opacity: 0.24;
  }

  & .button-text {
    position: relative;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    width: 100%;
  }
  &.text .button-text {
    padding: 0 0.5rem;
  }

  &[data-disabled='true'],
  &:disabled {
    --button: var(--disabled);
    --on-button: var(--disabled);
    cursor: default;
    pointer-events: none;
  }

  & .button-leading,
  & .button-trailing {
    display: flex;
    align-items: center;
  }
  & .button-leading {
    margin-right: 0.5rem;
    margin-left: -0.25rem;
  }
  & .button-trailing {
    margin-left: 0.5rem;
    margin-right: -0.25rem;
  }
`

const Button = forwardRef<HTMLButtonElement | HTMLLinkElement, ButtonProps>(
  (
    {
      children,
      className,
      classText,
      leading,
      trailing,
      type = 'button',
      kind = '',
      color,
      noRipple = false,
      rounded = false,
      marginless = false,
      elevation = 0,
      ...props
    },
    fRef,
  ) => {
    const { anchor } = useRipple({
      disabled: noRipple,
    })

    const handleRef = (node: HTMLButtonElement) => {
      if (fRef) {
        if (typeof fRef === 'function') {
          fRef(node)
        } else {
          fRef.current = node
        }
      }
      if (!noRipple && anchor) {
        anchor.current = node
      }
    }

    return (
      <StyledNode
        as={type === 'link' ? 'a' : 'button'}
        ref={handleRef}
        className={cx('tap-area', className, {
          outline: kind === 'outline',
          text: kind === 'text',
          rounded: rounded,
          marginless: marginless,
          'no-ripple': noRipple,
          'primary-color': !color,
          'secondary-color': color === 'secondary',
          'clear-color': color === 'clear',
        })}
        tabIndex={0}
        type={type}
        data-disabled={props.disabled || false}
        disabled={props.disabled || false}
        {...props}>
        <div className={cx('button-bg', `elevation-${elevation}`)} />
        <div className='button-overlay'></div>
        <div className='button-pixelate'></div>
        <div className='button-text'>
          {leading && <span className='button-leading'>{leading}</span>}
          <span className={cx('type-button', classText)}>{children}</span>
          {trailing && <span className='button-trailing'>{trailing}</span>}
        </div>
      </StyledNode>
    )
  },
)

export default Button
