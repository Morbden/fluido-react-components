export const testIsSSR = () => {
  try {
    return !window
  } catch (err) {
    return true
  }
}
