export const appLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

appLogger.error = appLogger.bind(null, 'Error:')
appLogger.warning = appLogger.bind(null, 'Warning:')
appLogger.log = appLogger.bind(null, 'Log:')
