export class Configuration {

  private world : any

  public setWorld(world):void {
    this.world = world;
  }

  public getApiBaseUrl() : string {
    return this.world.parameters['apiBaseUrl'] || 'http://localhost:9000'
  }
}

export const configuration = new Configuration()
