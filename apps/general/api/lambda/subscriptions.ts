import { logger } from '@kosyanmedia/devcom-logger-node'
import type { RequestOption } from '@modern-js/bff-core'

import { SubscriptionInput } from '~core/defs'
import { altcraftSenderService, SubscriptionsData } from '~core/utils'

export async function get(request: RequestOption<SubscriptionInput>): Promise<SubscriptionsData | null> {
  logger.log('Get subscriptions with request %o', request.query)

  const email = request.query.email
  if (!email) {
    logger.error('Email is required for getting subscriptions.')
    return null
  }

  return altcraftSenderService.subscriptions({ email })
}
