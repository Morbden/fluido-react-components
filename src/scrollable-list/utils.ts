import { testIsSSR } from '../utils'
import * as easing from './easing'
import { uid } from 'uid'

/** Pegar o nó e transformar em Array */
interface ParseHtmlCollectionToArrayType {
  (el: HTMLCollection): Element[]
}

/** Retorna a posição do elemento em relação ao início da lista */
interface GetOffsetLeftType {
  (el: HTMLElement): number
}

/** Retorna a largura do elemento */
interface GetOffsetWidthType {
  (el: HTMLElement): number
}

/** Redução do número mais próximo */
interface GetNearestNumberType {
  (value: number): (prev: number, current: number) => number
}

/** Pegar as larguras dos filhos do nó */
interface GetChildrenWidthsType {
  (node: HTMLElement): number[]
}

/** Pegar as posições dos filhos do nó */
interface GetChildrenPositionsType {
  (node: HTMLElement, origin?: 'left' | 'right' | 'center'): number[]
}

/** Inicia animação via requestAnimationFrame */
interface StartAnimationType {
  (anime: (time: number) => void, validate: () => boolean): void
}

/** Anima o scroll para posição ou elemento */
interface AnimatedScrollToType {
  (
    node: HTMLElement,
    val: HTMLElement | number,
    opt?: {
      /** @default 300 */
      duration?: number
      /** @default 'linear'' */
      ease?:
        | 'linear'
        | 'easeIn'
        | 'easeOut'
        | 'easeInOut'
        | 'easeInQuad'
        | 'easeOutQuad'
        | 'easeInOutQuad'
        | 'easeInCubic'
        | 'easeOutCubic'
        | 'easeInOutCubic'
        | 'easeInQuart'
        | 'easeOutQuart'
        | 'easeInOutQuart'
        | 'easeInQuint'
        | 'easeOutQuint'
        | 'easeInOutQuint'
    },
  ): void
}

export const parseHtmlCollectionToArray: ParseHtmlCollectionToArrayType = (
  el,
) => {
  const result: Element[] = []
  for (let i = 0; i < el.length; i++) {
    result.push(el[i])
  }
  return result
}

export const getOffsetLeft: GetOffsetLeftType = (el) => el.offsetLeft

export const getOffsetWidth: GetOffsetWidthType = (el) => el.offsetWidth

export const getNearestNumber: GetNearestNumberType = (value) => (
  prev,
  current,
) => (Math.abs(current - value) < Math.abs(prev - value) ? current : prev)

export const getChildrenWidths: GetChildrenWidthsType = (node) => {
  const children = parseHtmlCollectionToArray(node.children)
  return children.map((el: HTMLElement) => getOffsetWidth(el))
}

export const getChildrenPositions: GetChildrenPositionsType = (
  node,
  origin = 'left',
) => {
  const children = parseHtmlCollectionToArray(node.children)
  return children.map((el: HTMLElement) => {
    const width = getOffsetWidth(el)
    const position = getOffsetLeft(el)
    switch (origin) {
      case 'right':
        return position + width
      case 'center':
        return position + width / 2
      case 'left':
      default:
        return position
    }
  })
}

const validadeBrowser = () => {
  try {
    return !!(window && window.requestAnimationFrame)
  } catch (err) {
    return false
  }
}

export const startAnimation: StartAnimationType = (anime, validate) => {
  if (!validadeBrowser()) return null
  // let startTime = 0

  // const timer = (t: number) => {
  //   if (!startTime) {
  //     startTime = t
  //   }
  //   return t - startTime
  // }
  const a = (t: number) => {
    anime(t)
    if (validate()) window.requestAnimationFrame(a)
  }
  a(0)
}

export const animatedScrollTo: AnimatedScrollToType = (node, val, opt = {}) => {
  if (testIsSSR()) return false
  let distance = -1
  const testPositions = () => distance < 0
  const duration = opt.duration || 300
  const ease = easing[opt.ease || 'easeInOutCubic']
  const start: number = +window.getComputedStyle(node).paddingInlineStart || 16
  const scrollPos: number = node.scrollLeft

  if (val instanceof HTMLElement && testPositions()) {
    distance = val.offsetLeft - scrollPos
  } else {
  }
  if (!isNaN(+val) && testPositions()) {
    distance = (val as number) || 0
  }

  const clearNode = () => {
    node.removeAttribute('data-scroll-start')
    node.removeAttribute('data-scroll-scrollPos')
    node.removeAttribute('data-scroll-distance')
    node.removeAttribute('data-scroll-timer')
    node.removeAttribute('data-scroll-id')
  }

  node.setAttribute('data-scroll-start', start.toString())
  node.setAttribute('data-scroll-scrollPos', scrollPos.toString())
  node.setAttribute('data-scroll-distance', distance.toString())
  node.setAttribute('data-scroll-timer', '')
  const id = uid(4)
  node.setAttribute('data-scroll-id', id)

  // if (validadeBrowser()) {
  //   startAnimation(
  //     (now) => {
  //       let startTime = +node.getAttribute('data-scroll-timer')
  //       if (!startTime) {
  //         node.setAttribute('data-scroll-timer', now)
  //         startTime = now
  //       }

  //       const time = now - startTime
  //       const spos = +node.getAttribute('data-scroll-scrollPos')
  //       const s = +node.getAttribute('data-scroll-start')
  //       const d = +node.getAttribute('data-scroll-distance')

  //       if (time >= duration || d - s === 0) {
  //         const to = spos + d - s
  //         node.scrollTo(to, 0)
  //         clearNode()
  //       }
  //       const posTime = time / duration
  //       const validPos = posTime < 1 ? posTime : 1
  //       const easeTime = ease(validPos)
  //       const to = (d - s) * easeTime + spos
  //       node.scrollTo(to, 0)
  //     },
  //     () => node.getAttribute('data-scroll-id') === id,
  //   )
  // } else {
  const to = scrollPos + distance - start
  node.scrollTo(to, 0)
  clearNode()
  // }
}
