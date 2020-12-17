import { setWorldConstructor } from 'cucumber'
import { api } from '../shared/classes'
import { configuration } from '../shared/classes/configuration'
import { requestLogger } from '../shared/classes/logging'
import { logger } from '../shared/utils'
import { testContext } from '../shared/classes/TestContext'

export class World {
  public items
  public headers
  public attach: Function
  public parameters: { [key: string]: any }

  constructor({ attach, parameters }) {
    api.response = undefined
    api.error = undefined
    api.errorData = undefined
    this.attach = attach
    this.parameters = parameters
    this.setWorld()
  }

  private setWorld(): void {
    configuration.setWorld(this)
    requestLogger.setWorld(this)
    api.setWorld(this)
    testContext.setWorld(this)

    logger.info(`apiBaseUrl : ${configuration.getApiBaseUrl()}`)
  }
}

setWorldConstructor(World)
