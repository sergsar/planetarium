export const sleep = (ms: number) => {
  return new Promise((resolveFunc) => setTimeout(resolveFunc, ms))
}
