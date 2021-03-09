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
  [key: string]: any
}

const StyledIconButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0;
  color: var(--icon-button-color, inherit);
  font-size: inherit;
  padding: 0.25rem;
  border-radius: var(--icon-button-border-radius, 999px);
  cursor: pointer;
  position: relative;

  &:disabled {
    color: var(--on-surface-disabled);
    cursor: default;
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }

  .button {
    color: inherit;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: inherit;
    outline: none;
    position: relative;
    text-decoration: none;
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

  .button-content {
    position: relative;
  }
`

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { children, className, badge = '', type = 'button', disabled, ...props },
    ref,
  ) => {
    return (
      // Todos os botões devem respeitar a área ideal de clique de 48px (3rem).
      // O tamanho visual do botão é definido no componente filho.
      <StyledIconButton
        ref={ref}
        type={type as 'button' | 'submit' | 'reset'}
        className={cx('type-button', className)}
        disabled={disabled}
        {...props}>
        <div className={'button'}>
          <div className={'button-content'}>{children}</div>
        </div>

        {/* Badges são opcionais que servem para indicar notificações direto no ícone. */}
        {!!badge && <Badge>{badge}</Badge>}
      </StyledIconButton>
    )
  },
)

export default IconButton
