/** @format */

export function delay(seconds) {
  // eslint-disable-next-line arrow-parens
  return new Promise((resolve) =>
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    setTimeout(() => resolve(true), seconds * 1000)
  )
}
