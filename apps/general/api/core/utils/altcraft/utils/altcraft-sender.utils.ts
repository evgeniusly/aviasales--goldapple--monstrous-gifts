import { GetUserInfoAdvertisingResp, PostImportAdvertisingV2Req } from '@kosyanmedia/altcraft-sender-client'

import { SubscriptionsData } from '../defs'

export const buildCustomSubscriptionPayload = (email: string, campaign: string): PostImportAdvertisingV2Req => ({
  email,
  campaign,
  market: 'ru',
  permissions: { partner: [campaign] },
})

export const buildSubscriptionData = (campaign: string, data: GetUserInfoAdvertisingResp): SubscriptionsData => ({
  target: true,
  aviasales: !!data.permission_host,
  customer: !!data.permission_partners && data.permission_partners.includes(campaign),
})

export const buildDefaultSubscriptionData = (): SubscriptionsData => ({
  target: false,
  aviasales: false,
  customer: false,
})
