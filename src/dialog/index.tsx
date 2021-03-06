import { State } from '@hookstate/core'
import cx from 'classnames'
import { motion } from 'framer-motion'
import { MouseEventHandler, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { Portal } from 'react-portal'
import styled from 'styled-components'
import { useMediaQuery } from '../../utils'
import IconButton from '../icon-button'
import DialogActions from './dialog-actions'

interface DialogProps {
  title?: string
  open?: State<boolean>
  lock?: boolean
  breakpoint?: number
  isSSR?: number
  actions?: {
    [key: string]: VoidFunction
  }
  onClose?: (close: boolean) => void
  onSubmit?: SubmitHandler<Record<string, any>>
}

const dialogVariants = {
  close: {
    opacity: 0,
    y: '-100%',
    transition: {
      ease: 'easeOut',
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      ease: 'easeOut',
    },
  },
}

const StyledDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 200;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: collapse;
  backdrop-filter: blur(0);
  transition: backdrop-filter 0.2s ease-in-out, visibility 0.2s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--on-surface-disabled);
    opacity: 0;
    z-index: 201;
    transition: opacity 0.2s ease-in-out;
  }

  &.open {
    visibility: visible;
    backdrop-filter: blur(2px);
    transition: backdrop-filter 0.2s ease-in-out, visibility 0 0.2s ease-in-out;
  }
  &.open::after {
    opacity: 0.3;
  }

  .dialog {
    position: relative;
    z-index: 202;
    width: 100%;
    min-width: 20rem;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    background-color: var(--surface);
    border: 2px solid var(--on-surface-divider);
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .dialog.sm {
    width: unset;
    min-height: 3rem;
    max-width: 40rem;
  }

  .dialog > header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 3rem;
  }

  .dialog > header h1 {
    flex: 1 0;
    margin: 0 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dialog > div {
    flex: 1 0 auto;
    padding: 1rem 1rem 0;
  }

  .dialog > footer {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0.5rem;
  }
`

const Dialog: React.FunctionComponent<DialogProps> = ({
  children,
  actions,
  title,
  lock,
  open,
  isSSR = false,
  breakpoint = 560,
  onClose,
  onSubmit,
}) => {
  const sm = useMediaQuery(`(min-width: ${breakpoint}px)`)

  const handleClose = () => {
    open.set(false)
    if (onClose) onClose(false)
  }

  const handleScrimClick: MouseEventHandler<any> = (ev) => {
    const target = ev.target as HTMLElement
    if (target.getAttribute('data-scrim') === 'true' && !lock) {
      handleClose()
    }
  }

  useEffect(() => {
    if (!isSSR) {
      if (
        open.value &&
        !document.body.classList.contains('modal-opened-block')
      ) {
        document.body.classList.add('modal-opened-block')
      } else if (
        !open.value &&
        document.body.classList.contains('modal-opened-block')
      ) {
        document.body.classList.remove('modal-opened-block')
      }

      const escapePress = (ev: KeyboardEvent) => {
        if (open.value && !lock && ev.key === 'Escape' && onClose) {
          onClose(false)
        }
      }

      document.addEventListener('keydown', escapePress, true)
      return () => {
        document.removeEventListener('keydown', escapePress, true)
      }
    }
  }, [isSSR, open.value])

  return (
    <Portal>
      <StyledDialog
        className={cx({
          open: open.value,
        })}
        data-scrim='true'
        onMouseDown={handleScrimClick}>
        <motion.form
          role='dialog'
          aria-labelledby='dialog-title'
          variants={dialogVariants}
          initial='close'
          animate={open.value ? 'open' : 'close'}
          onSubmit={onSubmit}
          className={cx('dialog', { sm })}>
          <header>
            <h1 id='dialog-title' className='type-h4'>
              {title}
            </h1>
            {!lock && (
              <IconButton onClick={handleClose}>
                <MdClose size='24' />
              </IconButton>
            )}
          </header>
          <div>{children}</div>
          <footer>
            <DialogActions actions={actions} onClose={handleClose} />
          </footer>
        </motion.form>
      </StyledDialog>
    </Portal>
  )
}

export default Dialog
