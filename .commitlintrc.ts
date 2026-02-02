import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-regex-match'],
  rules: {
    'subject-case': [RuleConfigSeverity.Disabled],
    'body-match': [RuleConfigSeverity.Error, 'always', '^[a-zA-Z0-9\\s.,!?\'"()\\-_:;@#\\$%&*+=/\\\\\\[\\]{}<>|~`]*$'],
  },
}

export default Configuration
