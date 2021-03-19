import cx from 'classnames'
import { forwardRef } from 'react'
import styled from 'styled-components'
import Badge from '../badge'

export interface IconButtonProps {
  children?: any
  type?: 'button' | 'submit' | 'reset'
  badge?: boolean | number | string
  className?: string
  disabled?: boolean
  size?: number | number
  [key: string]: any
}

interface StyledIconButtonProps {
  size?: number | number
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  --icon-button-size: ${(p) =>
    (p.size && ((!isNaN(+p.size) && p.size + 'px') || p.size)) || ''};
  appearance: none;
  background-color: transparent;
  width: var(--icon-button-size, 2.5rem);
  height: var(--icon-button-size, 2.5rem);
  border: 0;
  padding: 0;
  margin: 0;
  color: var(--icon-button-color, inherit);
  font-size: inherit;
  border-radius: var(--icon-button-border-radius, 999px);
  cursor: pointer;
  position: relative;
  z-index: 0;

  &:disabled {
    color: var(--on-surface-disabled);
    cursor: default;
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }

  .button {
    width: 100%;
    height: 100%;
    color: inherit;
    border: none;
    border-radius: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transition: transform 100ms var(--easing-standard, ease-in-out),
      opacity 100ms var(--easing-standard, ease-in-out);
    will-change: transform;
    z-index: -1;
  }

  &:not(:disabled) {
    &:hover .button::after {
      opacity: 0.04;
    }

    &:focus .button::after {
      opacity: 0.12;
      animation: grow 100ms var(--easing-standard, ease-in-out);
    }

    &:active .button::after {
      opacity: 0.12;
      transform: scale(0.9);
    }
  }

  @keyframes grow {
    from {
      transform: scale(0.0001);
    }
    to {
      transform: scale(1);
    }
  }
`

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      badge = '',
      type = 'button',
      disabled,
      size,
      ...props
    },
    ref,
  ) => {
    return (
      // Todos os botões devem respeitar a área ideal de clique de 48px (3rem).
      // O tamanho visual do botão é definido no componente filho.
      <StyledIconButton
        ref={ref}
        size={size}
        type={type as 'button' | 'submit' | 'reset'}
        className={cx('type-button', className)}
        disabled={disabled}
        {...props}>
        <div className={'button'}>{children}</div>

        {/* Badges são opcionais que servem para indicar notificações direto no ícone. */}
        {!!badge && <Badge>{badge}</Badge>}
      </StyledIconButton>
    )
  },
)

export default IconButton
