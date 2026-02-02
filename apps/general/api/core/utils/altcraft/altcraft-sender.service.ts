import { AltcraftSender, PostImportAdvertisingV2Req } from '@kosyanmedia/altcraft-sender-client'
import { Logger } from '@kosyanmedia/devcom-logger'
import { logger } from '@kosyanmedia/devcom-logger-node'

import { altcraftSenderConfig } from './altcraft-sender.config'
import { RegisterInput, SubscriptionsData, SubscriptionsInput } from './defs'
import { buildCustomSubscriptionPayload, buildDefaultSubscriptionData, buildSubscriptionData } from './utils'

export class AltcraftSenderService {
  protected readonly logger: Logger = logger
  protected readonly client: AltcraftSender

  constructor() {
    const { baseUrl, password, username } = altcraftSenderConfig
    if (!baseUrl || !username || !password) {
      throw new Error('AltcraftSenderService is not configured properly.')
    }

    this.client = new AltcraftSender({
      baseURL: baseUrl,
      auth: { username, password },
    })
  }

  public async subscriptions(input: SubscriptionsInput): Promise<SubscriptionsData> {
    const { email } = input
    const { campaign } = altcraftSenderConfig

    if (!campaign) {
      throw new Error('Campaign is not defined.')
    }

    try {
      this.logger.log('Check subscriptions for %s', email)
      const { data } = await this.client.api.getUserInfoAdvertising({ email })
      return buildSubscriptionData(campaign, data)
    } catch (error) {
      this.logger.error('Error at subscription: %o', error)
      return buildDefaultSubscriptionData()
    }
  }

  public async register(input: RegisterInput): Promise<void> {
    const { email } = input
    const { campaign } = altcraftSenderConfig

    if (!campaign) {
      throw new Error('Campaign is not defined.')
    }

    const payload: PostImportAdvertisingV2Req = { email, campaign, market: 'ru' }
    this.logger.log('Subscribe %o: ', payload)
    try {
      await this.client.api.postImportAdvertisingV2(payload)
    } catch (error) {
      this.logger.error('Error at registration: %o', error)
      throw error
    }
  }

  public async subscribeToCustomer(input: RegisterInput): Promise<void> {
    const { email } = input
    const { campaign } = altcraftSenderConfig

    if (!campaign) {
      throw new Error('Campaign is not defined.')
    }

    const payload = buildCustomSubscriptionPayload(email, campaign)
    this.logger.log('Subscribe to %s - %o', campaign, payload)
    try {
      await this.client.api.postImportAdvertisingV2(payload)
    } catch (error) {
      this.logger.error('Error at subscription: %o', error)
      throw error
    }
  }
}
