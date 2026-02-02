import { GiveawayProvider } from '@kosyanmedia/devcom-spec-uikit/dist/collections'
import { ThemeProvider } from '@kosyanmedia/devcom-spec-uikit/dist/providers'
import { Outlet } from '@modern-js/runtime/router'

import { deadlineDate } from '~/defs'

import '@kosyanmedia/devcom-spec-uikit/dist/styles/global.scss'
import '~/styles/global.scss'

export default function Layout(): JSX.Element {
  return (
    <ThemeProvider>
      <GiveawayProvider deadline={deadlineDate}>
        <Outlet />
      </GiveawayProvider>
    </ThemeProvider>
  )
}
