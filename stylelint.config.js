module.exports = {
  plugin: [
    'stylelint-scss'
  ],
  extends: [
    'stylelint-config-standard'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['function', 'if', 'for', 'each', 'include', 'mixin', 'content']
    }]
  }
}
