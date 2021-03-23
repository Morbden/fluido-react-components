import { useRipple } from '@fluido/react-effects'
import cx from 'classnames'
import { forwardRef } from 'react'
import styled from 'styled-components'

export interface ButtonProps {
  children?: any
  radius?: number | string
  disabled?: boolean
  ripple?: boolean
  marginless?: boolean
  className?: string
  classText?: string
  kind?: 'fill' | 'text' | 'outline'
  type?: 'link' | 'button' | 'submit' | 'reset'
  color?: 'clear' | 'secondary'
  elevation?: number
  leading?: React.ReactNode
  trailing?: React.ReactNode
  [key: string]: any
}

interface StyledNodeProps {
  radius?: number | string
}

const StyledNode = styled.button<StyledNodeProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 2.25rem;
  min-width: 4rem;
  margin: 0;
  padding: 0;
  border-radius: ${(p) =>
    (p.radius && ((!isNaN(+p.radius) && p.radius + 'px') || p.radius)) || 0};
  border: none;
  outline: none;
  color: var(--on-button);
  user-select: none;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;

  --disabled: var(--on-surface-disabled);
  --transition: 250ms linear;
  transition: color var(--transition);

  &.primary-color {
    --button: var(--button-custom, var(--primary, #4285f4));
    --on-button: var(--on-button-custom, var(--on-primary-high-emphasis, #fff));
  }
  &.secondary-color {
    --button: var(--button-custom, var(--secondary, #aa66cc));
    --on-button: var(--on-button-custom, var(--on-secondary, #fff));
  }
  &.clear-color {
    --button: var(--button-custom, transparent);
    --on-button: var(--on-button-custom, currentColor);
  }

  &:not(.clear-color):is(.text, .outline) {
    color: var(--button);
  }

  & > :not(.button-text) {
    border-radius: ${(p) =>
      (p.radius && ((!isNaN(+p.radius) && p.radius + 'px') || p.radius)) || 0};
  }

  & > :not(.button-text) {
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

    & > .text {
      flex: 1 0 auto;
    }
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
      kind = 'fill',
      color,
      ripple = false,
      radius = 0,
      marginless = false,
      elevation = 0,
      ...props
    }: ButtonProps,
    fRef: any,
  ) => {
    const { anchor } = useRipple({
      disabled: !ripple,
    })

    const handleRef = (node: HTMLButtonElement) => {
      if (fRef) {
        if (typeof fRef === 'function') {
          fRef(node)
        } else {
          fRef.current = node
        }
      }
      if (ripple && anchor) {
        anchor.current = node
      }
    }

    return (
      <StyledNode
        as={type === 'link' ? 'a' : 'button'}
        ref={handleRef}
        radius={radius}
        className={cx('tap-area', 'type-button', className, {
          outline: kind === 'outline',
          text: kind === 'text',
          marginless: marginless,
          'no-ripple': !ripple,
          'primary-color': !color,
          'secondary-color': color === 'secondary',
          'clear-color': color === 'clear',
        })}
        tabIndex={0}
        type={type}
        data-disabled={props.disabled || false}
        disabled={props.disabled || false}
        {...props}>
        <div
          className={cx(
            'button-bg',
            kind !== 'text' && `elevation-${elevation}`,
          )}
        />
        <div className='button-overlay'></div>
        <div className='button-pixelate'></div>
        <div className='button-text'>
          {leading && <span className='button-leading'>{leading}</span>}
          <span className={cx('text', classText)}>{children}</span>
          {trailing && <span className='button-trailing'>{trailing}</span>}
        </div>
      </StyledNode>
    )
  },
)

export default Button
