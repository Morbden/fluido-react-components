import { useEffect, useState } from 'react'
import { VirtualElement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'
import { IconType } from 'react-icons'
import styled from 'styled-components'
import Button from '../button'

export interface MenuProps {
  id: string
  label: string
  icon?: IconType | React.ReactNode | React.ReactElement | any
  divider?: string
}

interface PopMenuProps {
  anchor: (Element | VirtualElement) & HTMLElement
  list: MenuProps[]
  isSSR?: boolean
  onClick: (id: string) => void
}

const StyledPopMenu = styled.div`
  width: 14rem;

  & menu {
    margin: 0;
    padding: 0;
  }

  & menu > ul {
    background-color: var(--surface);
    color: var(--on-surface-high-emphasis);
    border: 2px solid var(--on-surface-divider);
    list-style: none;
    margin: 0;
    padding: 0.25rem 0;
    min-width: 8rem;
  }

  & menu > ul .button {
    text-transform: none;
    width: 100%;
    padding-left: 0.5rem;
  }
  & menu > ul .button :global(*) {
    text-transform: none;
    justify-content: flex-start;
    text-align: left;
  }

  & menu > ul hr {
    --size: 2px;
  }
`

const menuTransition = {
  delayChildren: 0.3,
  staggerChildren: 0.05,
}

const menuVariants = {
  initial: {
    opacity: 0,
    scaleY: 0,
  },
  open: {
    opacity: 1,
    scaleY: 1,
    transition: menuTransition,
  },
  close: {
    opacity: 0,
    scaleY: 1,
  },
}

const liVariants = {
  initial: {
    opacity: 0,
    y: '-100%',
  },
  open: {
    opacity: 1,
    y: 0,
  },
  close: {
    opacity: 0,
    y: 0,
  },
}

const PopMenu: React.FunctionComponent<PopMenuProps> = ({
  isSSR = false,
  anchor,
  list = [],
  onClick,
}) => {
  const [menu, setMenu] = useState<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  const popperObj = usePopper(anchor, menu, {
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-end', 'left'],
        },
      },
    ],
  })

  useEffect(() => {
    if (anchor) {
      const handleOpen = (ev: any) => {
        ev.preventDefault()
        ev.stopPropagation()
        setOpen((o) => !o)
      }

      anchor.addEventListener('click', handleOpen)
      return () => {
        anchor.removeEventListener('click', handleOpen)
      }
    }
  }, [open, anchor])

  useEffect(() => {
    if (!isSSR) {
      const handleExitClick = () => setOpen(false)

      window.addEventListener('click', handleExitClick)
      return () => {
        window.removeEventListener('click', handleExitClick)
      }
    }
  }, [isSSR])

  return (
    <StyledPopMenu
      ref={setMenu}
      className='menu-box'
      style={popperObj.styles.popper}
      {...popperObj.attributes.popper}>
      <AnimatePresence>
        {open && (
          <motion.menu
            variants={menuVariants}
            initial='initial'
            animate='open'
            exit='close'>
            <ul>
              {list.map((e) => (
                <motion.li key={e.id} variants={liVariants}>
                  <Button
                    kind='text'
                    marginless
                    className='button'
                    leading={e.icon && <e.icon size='18' />}
                    onClick={() => {
                      if (onClick) onClick(e.id)
                    }}>
                    {e.label}
                  </Button>
                  {e.divider && <hr />}
                </motion.li>
              ))}
            </ul>
          </motion.menu>
        )}
      </AnimatePresence>
    </StyledPopMenu>
  )
}

export default PopMenu
