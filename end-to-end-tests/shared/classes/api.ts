import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { assert } from 'chai'
import * as Endpoints from '../endpoints/path'
import { logger } from '../utils'
import { requestLogger } from './logging'
import { configuration } from './configuration'

export class Api {
  public response: any
  public error: any
  public errorData: any

  private world: any

  private axiosInstance = axios.create({})

  constructor() {
    requestLogger.addInterceptors(this.axiosInstance)
  }

  get = async (path: string, config: AxiosRequestConfig, failOnError = true): Promise<object> => {
    this.logRequest({}, config)
    try {
      this.response = await this.axiosInstance.get(path, config)
      this.logResponse()
      return this.response.data
    } catch (error) {
      this.logError(error, failOnError)
    }
  }

  post = async (path: string, requestObject: object, config?: AxiosRequestConfig, failOnError = true): Promise<object> => {
    this.logRequest(requestObject, config)
    try {
      this.response = await this.axiosInstance.post(path, requestObject, config)
      this.logResponse()

      return this.response.data
    } catch (error) {
      this.logError(error, failOnError)
    }
  }

  put = async (path: string, requestObject: object, config: AxiosRequestConfig, failOnError = true): Promise<any> => {
    this.logRequest(requestObject, config)
    try {
      this.response = await this.axiosInstance.put(path, requestObject, config)
      this.logResponse()

      if (this.response.data) {
        return this.response.data
      }
      return this.response
    } catch (error) {
      this.logError(error, failOnError)
    }
  }

  delete = async (path: string, config: AxiosRequestConfig, failOnError = true): Promise<any> => {
    try {
      this.response = await this.axiosInstance.delete(path, config)
      this.logResponse()

      if (this.response.data) {
        return this.response.data
      }
      return this.response
    } catch (error) {
      this.logError(error, failOnError)
    }
  }

  private getDefaultHeaders = (): object => {
    return { 'Content-Type': 'application/json' }
  }

  logResponse = (): void => {
    logger.info(this.response.config)
    logger.info('status code: ' + this.response.status)
    logger.info('status text: ' + this.response.statusText)
    logger.info(this.response.data)
  }

  logRequest = (request, config): void => {
    logger.info(request)
    logger.info(config)
  }

  logError = (error: object, failOnError = true): void => {
    this.error = error
    const errorObjStr = JSON.stringify(error)

    if ('error' in error) {
      this.errorData = error['response'].data
    } else {
      throw error
    }

    if (failOnError) {
      logger.error(errorObjStr)
      logger.error(this.errorData)
      assert.fail(JSON.stringify(this.errorData))
    } else {
      logger.info(errorObjStr)
      logger.info(this.errorData)
    }
  }

  public setWorld(world): void {
    this.world = world
    this.axiosInstance.defaults.baseURL = configuration.getApiBaseUrl()
  }
}

export const api = new Api()
