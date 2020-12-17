import winston, { format } from 'winston'
import { LOG_LEVEL } from '../environment/env'

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
      format: format.prettyPrint({ colorize: true }),
    }),
  ],
})

export const sleep = (ms: number): Promise<object> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export const randomId = (): string => {
  return Math.random().toString().substr(2, 5)
}

export const toBoolean = (value): boolean => {
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  }
  return value
}

export const toNumber = (value): number => {
  if (value != undefined && value !== '' && !isNaN(value)) return Number(value)
  return value
}

export const getLatestItemInArray = (objArray: object[]): any => {
  return objArray[objArray.length - 1]
}

export const replaceItemInArray = (objArray: object[], updateObj: object): void => {
  objArray.forEach(function (obj, i) {
    if (obj['data'].id === updateObj['data'].id) objArray[i] = updateObj
  })
}
