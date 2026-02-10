import aviasalesLogo from '@assets/images/aviasalesLogo.svg'
import clientLogo from '@assets/images/clientLogo.svg'
import gameParticlesClose from '@assets/images/gameParticlesClose.png'
import gameParticlesFar from '@assets/images/gameParticlesFar.png'
import gamePersonMob from '@assets/images/gamePersonMob.png'
import homeGifts from '@assets/images/homeGifts.png'
import homeParticlesClose from '@assets/images/homeParticlesClose.png'
import homeParticlesFar from '@assets/images/homeParticlesFar.png'
import homeParticlesMob from '@assets/images/homeParticlesMob.png'
import homePersonBody from '@assets/images/homePersonBody.png'
import homePersonHand from '@assets/images/homePersonHand.png'
import loaderAnim from '@assets/images/loader.webp'
import loaderParticles from '@assets/images/loaderParticles.png'
import loaderParticlesMob from '@assets/images/loaderParticlesMob.png'
import personIngame from '@assets/images/personIngame80.webp'

export const preloads = {
  preApp: [aviasalesLogo, clientLogo],
  preAppDesk: [],
  preAppMob: [],

  preHome: [homePersonBody, homePersonHand],
  preHomeDesk: [homeParticlesClose, homeParticlesFar, homeGifts],
  preHomeMob: [homeParticlesMob],

  preGame: [loaderAnim],
  preGameDesk: [gameParticlesClose, gameParticlesFar, loaderParticles, personIngame],
  preGameMob: [gamePersonMob, loaderParticlesMob],

  inGame: [],
  inGameDesk: [],
  inGameMob: [],

  preResults: [],
  preResultsDesk: [],
  preResultsMob: [],
}
