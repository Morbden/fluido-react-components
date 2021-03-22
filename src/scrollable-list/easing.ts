interface EaseType {
  (t: number): number
}

export const linear: EaseType = (t) => t
export const easeInQuad: EaseType = (t) => Math.pow(t, 2)
export const easeOutQuad: EaseType = (t) => 1 - easeInQuad(1 - t)
export const easeInOutQuad: EaseType = (t) =>
  t < 0.5 ? easeInQuad(t * 2) / 2 : easeOutQuad(t * 2 - 1) / 2 + 0.5
export const easeIn: EaseType = easeInQuad
export const easeOut: EaseType = easeOutQuad
export const easeInOut: EaseType = easeInOutQuad
export const easeInCubic: EaseType = (t) => Math.pow(t, 3)
export const easeOutCubic: EaseType = (t) => 1 - easeInCubic(1 - t)
export const easeInOutCubic: EaseType = (t) =>
  t < 0.5 ? easeInCubic(t * 2) / 2 : easeOutCubic(t * 2 - 1) / 2 + 0.5
export const easeInQuart: EaseType = (t) => Math.pow(t, 4)
export const easeOutQuart: EaseType = (t) => 1 - easeInQuart(1 - t)
export const easeInOutQuart: EaseType = (t) =>
  t < 0.5 ? easeInQuart(t * 2) / 2 : easeOutQuart(t * 2 - 1) / 2 + 0.5
export const easeInQuint: EaseType = (t) => Math.pow(t, 5)
export const easeOutQuint: EaseType = (t) => 1 - easeInQuint(1 - t)
export const easeInOutQuint: EaseType = (t) =>
  t < 0.5 ? easeInQuint(t * 2) / 2 : easeOutQuint(t * 2 - 1) / 2 + 0.5
