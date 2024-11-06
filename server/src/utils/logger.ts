export const appLogger = (message: string, ...rest: string[]) => {
  // eslint-disable-next-line no-console
  console.log(message, ...rest)
}

appLogger.error = appLogger.bind(null, "Error:")
appLogger.warning = appLogger.bind(null, "Warning:")
appLogger.log = appLogger.bind(null, "Log:")
