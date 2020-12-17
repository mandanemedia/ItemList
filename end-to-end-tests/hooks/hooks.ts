import { After } from 'cucumber'
import { logger } from '../shared/utils'

After(async function () {
  logger.info('.......... After hook ..........')
})
