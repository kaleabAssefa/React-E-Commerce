// A minimal custom middleware, on top of the thunk middleware Redux
// Toolkit already includes by default. Logs every dispatched action and
// the resulting state, which is handy while wiring up new features.
const logger = (store) => (next) => (action) => {
  const result = next(action)

  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.log('[redux]', action.type, {
      payload: action.payload,
      nextState: store.getState(),
    })
  }

  return result
}

export default logger
