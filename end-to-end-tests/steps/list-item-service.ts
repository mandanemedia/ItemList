import {TableDefinition, When} from 'cucumber'
import {api} from '../shared/classes'
import * as Path from '../shared/endpoints/path'
import { ProductObject } from '../shared/table-objects/table-data'
import * as Environment from '../shared/environment/env'
import {expect} from 'chai'
import {AxiosResponse} from 'axios'
import {ItemResponse} from '../shared/responses/items'

When('Get all Items in system', async function () {
  const response = await api.get('http://localhost:9000/items', {})
})

