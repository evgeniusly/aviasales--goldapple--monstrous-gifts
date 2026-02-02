import { logger } from '@kosyanmedia/devcom-logger-node'
import type { RequestOption } from '@modern-js/bff-core'

import { MessageResponse, MessageStatus, SubscriptionInput } from '~core/defs'
import { marketingApi } from '~core/utils'

export async function post(request: RequestOption<never, SubscriptionInput>): Promise<MessageResponse> {
  if (!request.data) {
    logger.error('Request data is required for subscription.')
    return { status: MessageStatus.error }
  }
  logger.log('Subscribe to Avisales for a user with %o', request.data)

  const email = request.data.email
  if (!email) {
    logger.error('Email is required for subscription.')
    return { status: MessageStatus.error }
  }

  await marketingApi.subscribe({ email })
  return { status: MessageStatus.ok }
}
