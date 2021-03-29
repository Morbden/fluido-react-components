import cx from 'classnames'
import { forwardRef, useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import styled from 'styled-components'
import { testIsSSR } from '../utils'

export interface SelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  leading?: React.ReactNode
  error?: string
  disabled?: boolean
  required?: boolean
  [key: string]: any
}

const StyledSelectField = styled.label`
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

  select {
    appearance: none;
    background-color: var(--surface);
    color: var(--on-surface-high-emphasis);
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    height: 2.5rem;
    border: 1px solid var(--on-surface-divider);
    outline: none;
  }
  select:disabled {
    color: var(--on-surface-disabled);
  }
  option {
    line-height: 2.5rem;
  }

  &.with-leading select {
    padding-left: 2.5rem;
  }

  .icon-key,
  .leading {
    position: absolute;
    top: calc(50% + 1px);
    transform: translateY(-50%);
  }
  .leading {
    left: 0.5rem;
  }
  .icon-key {
    right: 0.5rem;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
  }

  .select-error {
    min-height: 1.25rem;
    color: var(--error);
  }
`

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      name,
      label,
      placeholder,
      leading,
      error,
      disabled,
      required,
      children,
      ...props
    },
    fRef,
  ) => {
    const [ref, setRef] = useState<HTMLSelectElement>(null)
    const isSSR = testIsSSR()

    const handleRef = (node: HTMLSelectElement) => {
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
    }, [isSSR, ref])

    return (
      <StyledSelectField
        data-disabled={disabled}
        className={cx({
          'with-leading': !!leading,
        })}>
        {label && (
          <span className='label type-subtitle-2'>
            {label} {required && <sup>*</sup>}
          </span>
        )}
        <div className='wrapper'>
          {!!leading && <div className='leading'>{leading}</div>}
          <select
            ref={handleRef}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            {...props}>
            {children}
          </select>
          <MdKeyboardArrowDown className='icon-key' size='24' />
        </div>
        <span className='input-error type-caption'>{error || ''}</span>
      </StyledSelectField>
    )
  },
)

export default SelectField
