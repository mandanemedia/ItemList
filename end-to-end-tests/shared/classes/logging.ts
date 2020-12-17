import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'

interface RequestResponsePair {
  request: AxiosRequestConfig
  response: AxiosResponse
}

export class RequestLogger {
  private log_requests: RequestResponsePair[]

  private last_request: AxiosRequestConfig | null

  private world: any

  constructor() {
    this.addInterceptors(axios)
  }

  public addInterceptors(axios: AxiosStatic | AxiosInstance):any {
    axios.interceptors.request.use((x) => {
      this.last_request = x
      return x
    })

    const processResponse = (x: AxiosResponse): any => {
      this.log_requests.push({
        request: this.last_request,
        response: x,
      })

      this.last_request = null
      this.attachLastRequest()
      return x
    }

    axios.interceptors.response.use(processResponse, (error): any => {
      return processResponse(error.response)
    })
  }

  private getRequestResponsePairAsString(item: RequestResponsePair): string {
    let logStatements = ''
    const request = item.request
    const response = item.response
    const requestLogLines = RequestLogger.getRequestLogLines(request)
    const responseLogLines = RequestLogger.getResponseLogLines(response)

    logStatements +=
      '**** Approximate HTTP Request & Response w/ Some Post Processing ****\n> ' + requestLogLines.join('\n> ') + '\n\n' + '< ' + responseLogLines.join('\n< ') + '\n'
    return logStatements
  }

  private static getResponseLogLines(response: AxiosResponse<any>): string[] {
    let responseLogLines: string[] = []
    responseLogLines.push('HTTP ?.? ' + response.status + ' ' + response.statusText + '')

    responseLogLines = responseLogLines.concat(RequestLogger.logHeaders(response.headers))

    const responseJsonData = JSON.stringify(response.data, null, 2)

    if (responseJsonData != null && responseJsonData.length > 0) {
      responseLogLines.push('')
      responseLogLines.push(responseJsonData)
    }
    return responseLogLines
  }

  private static getRequestLogLines(request: AxiosRequestConfig): string[] {
    let requestLogLines: string[] = []
    requestLogLines.push(request.method.toUpperCase() + ' ' + request.baseURL + '/' + request.url)

    requestLogLines = requestLogLines.concat(RequestLogger.logHeaders(request.headers))
    requestLogLines = requestLogLines.concat(RequestLogger.logHeaders(request.headers[request.method]))

    requestLogLines.push('')

    if (request.data != null) {
      if (request.headers['Content-Type'] == 'application/json') {
        requestLogLines.push(JSON.stringify(JSON.parse(request.data), null, 2))
      } else {
        requestLogLines.push(request.data)
      }
    }
    return requestLogLines
  }

  private static logHeaders(obj: any): string[] {
    const log: string[] = []
    if (obj != null) {
      for (const property in obj) {
        const val = obj[property]
        if (typeof val == 'string') {
          log.push(property + ': ' + val)
        }
      }
    }
    return log
  }

  public clearRequests(): void {
    this.log_requests = []
  }

  public getRequests(): RequestResponsePair[] {
    return this.log_requests
  }

  public setWorld(world): void {
    this.world = world
    this.log_requests = []
  }

  public attachLastRequest(): void {
    this.world.attach(Buffer.from(this.getRequestResponsePairAsString(this.log_requests[this.log_requests.length - 1])).toString('base64'))
  }
}

export const requestLogger = new RequestLogger()
