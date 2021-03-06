import cx from 'classnames'
import { forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components'

interface TextFieldProps {
  name: string
  label?: string
  placeholder?: string
  type?: string
  trailing?: React.ReactNode
  leading?: React.ReactNode
  maskConfig?: string | { [key: string]: any }
  isSSR?: boolean
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
  }

  &[data-disabled='true'] input {
    background-color: var(--surface);
    color: var(--on-surface-disabled);
  }

  & > span {
    margin-left: 1rem;
  }

  & input {
    background-color: var(--surface);
    color: var(--on-surface-high-emphasis);
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    height: 3rem;
    border: 1px solid var(--on-surface-divider);
    outline: none;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
      isSSR = false,
      ...props
    },
    fRef,
  ) => {
    const [ref, setRef] = useState<HTMLInputElement>(null)

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
        const Mask = require('inputmask').default
        let iMask = new Mask(maskConfig)
        iMask.mask(ref)

        return () => {
          iMask.remove()
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
          {!!leading && <span className='leading'>{leading}</span>}
          <input ref={handleRef} name={name} type={type} {...props} />
          {!!trailing && <span className='trailing'>{trailing}</span>}
        </div>
        <span className='input-error type-caption'>{error || ''}</span>
      </StyledTextField>
    )
  },
)
export default TextField
