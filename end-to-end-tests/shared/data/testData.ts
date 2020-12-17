import { randomId } from '../utils'

export const customer = {
  data: {
    type: 'customer',
    name: 'Test User',
    email: `testUser_${randomId()}@epmoltin.com`,
    password: 'password',
  },
}
export const inventory = {
  type: 'test',
  action: 'create',
  quantity: 1,
}