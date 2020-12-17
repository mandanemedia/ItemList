class TestContext {
  private _world

  public setWorld(world): void {
    this._world = world
  }
}

export const testContext = new TestContext()
