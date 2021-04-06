import cx from 'classnames'
import { forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { testIsSSR } from '../utils'

export interface TextFieldProps {
  name: string
  label?: string
  placeholder?: string
  type?: string
  trailing?: React.ReactNode
  leading?: React.ReactNode
  maskConfig?: string | string[] | Inputmask.Options
  error?: string
  disabled?: boolean
  required?: boolean
  [key: string]: any
}

const StyledTextField = styled.label`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-bottom: 0.5rem;

  &[data-disabled='true'] {
    cursor: default;
    color: var(--on-surface-disabled);
    pointer-events: none;
  }

  & > span {
    margin-left: 1rem;
  }

  input {
    background-color: var(--surface);
    color: var(--on-surface-high-emphasis);
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    height: 2.5rem;
    border: 1px solid var(--on-surface-divider);
    outline: none;
  }
  input:disabled {
    color: var(--on-surface-disabled);
  }

  &.with-leading input {
    padding-left: 2.5rem;
  }
  &.with-trailing input {
    padding-right: 2.5rem;
  }

  .trailing,
  .leading {
    position: absolute;
    top: calc(50% + 1px);
    transform: translateY(-50%);
  }
  .leading {
    left: 0.5rem;
  }
  .trailing {
    right: 0.5rem;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
  }

  .input-error {
    min-height: 1.25rem;
    color: var(--error);
  }
`

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      type = 'text',
      placeholder,
      leading,
      trailing,
      error,
      disabled,
      required,
      maskConfig,
      ...props
    },
    fRef,
  ) => {
    const [ref, setRef] = useState<HTMLInputElement>(null)
    const isSSR = testIsSSR()

    const handleRef = (node: HTMLInputElement) => {
      if (fRef) {
        if (typeof fRef === 'function') {
          fRef(node)
        } else {
          fRef.current = node
        }
      }
      setRef(node)
    }

    useEffect(() => {
      if (!isSSR && ref && ref.hasAttribute('autofocus')) {
        ref.focus()
      }
      if (!isSSR && ref && maskConfig) {
        let iMask: Inputmask.Instance
        import('inputmask').then((Inputmask) => {
          const Mask = Inputmask.default
          iMask = new Mask(maskConfig as any)
          iMask.mask(ref)
        })

        return () => {
          if (iMask) iMask.remove()
        }
      }
    }, [isSSR, ref, maskConfig])

    return (
      <StyledTextField
        data-disabled={disabled}
        className={cx({
          'with-leading': !!leading,
          'with-trailing': !!trailing,
        })}>
        {label && (
          <span className='label type-subtitle-2'>
            {label} {required && <sup>*</sup>}
          </span>
        )}
        <div className='wrapper'>
          {!!leading && <div className='leading'>{leading}</div>}
          <input
            ref={handleRef}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            type={type}
            {...props}
          />
          {!!trailing && <div className='trailing'>{trailing}</div>}
        </div>
        <span className='input-error type-caption'>{error || ''}</span>
      </StyledTextField>
    )
  },
)
export default TextField
