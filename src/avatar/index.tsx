import Color from 'color'
import { forwardRef } from 'react'
import styled from 'styled-components'

export interface AvatarProps {
  picture?: string
  /** @default 'initials' */
  render?:
    | 'male'
    | 'female'
    | 'human'
    | 'identicon'
    | 'initials'
    | 'bottts'
    | 'avataaars'
    | 'jdenticon'
    | 'gridy'
  name?: string
  size?: number
  backgroundColor?: string
  className?: string
  /** Configurações extras no [site da api](https://avatars.dicebear.com/styles) */
  config?: NodeJS.Dict<string>
  [key: string]: any
}

const StyledButton = styled.button`
  position: relative;
  display: flex;
  flex: 0 0 fit-content;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  border: none;
  background-color: var(--secondary);
  color: var(--on-secondary);
  border-radius: 9999px;
  overflow: hidden;
  outline: none;
  cursor: default;

  & img {
    display: block;
    object-fit: cover;
  }
`

const Avatar = forwardRef<HTMLButtonElement, AvatarProps>(
  (
    {
      picture,
      name = '',
      render = 'initials',
      size = 48,
      className,
      backgroundColor,
      config = {},
      ...props
    },
    fRef,
  ) => {
    let cBackgroundColor: Color

    try {
      cBackgroundColor = Color(backgroundColor)
    } catch (err) {
      cBackgroundColor = Color('transparent')
    }

    const handleRef = (node: HTMLButtonElement) => {
      if (fRef) {
        if (typeof fRef === 'function') {
          fRef(node)
        } else {
          fRef.current = node
        }
      }
    }

    return (
      <StyledButton
        ref={handleRef}
        style={{
          backgroundColor: cBackgroundColor.rgb().string(),
          color:
            (backgroundColor &&
              (cBackgroundColor.isLight() ? 'black' : 'white')) ||
            'inherit',
        }}
        className={className}
        {...props}>
        <img
          draggable='false'
          width={size + 'px'}
          height={size + 'px'}
          src={
            picture ||
            `https://avatars.dicebear.com/api/${render}/${encodeURI(
              name,
            )}.svg?${
              backgroundColor
                ? 'b=%23' + cBackgroundColor.hex().substr(1) + '&'
                : ''
            }w=${+size}&h=${+size}&${Object.entries(config)
              .map((e) => e.join('='))
              .join('&')}`
          }
          alt={name}
          onError={(ev) => {
            const el = ev.target as HTMLImageElement
            if (!el.src.includes('/images/fallback-avatar.jpg'))
              el.src = '/images/fallback-avatar.jpg'
          }}
        />
      </StyledButton>
    )
  },
)

export default Avatar
