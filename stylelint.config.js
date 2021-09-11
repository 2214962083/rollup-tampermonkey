//@ts-check

module.exports = /** @type { Partial<import('stylelint').Configuration> } */ ({
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind']
      }
    ],
    'block-no-empty': null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-comma-newline-after': null,
    'function-name-case': null,
    'function-parentheses-newline-inside': null,
    'function-max-empty-lines': null,
    'function-whitespace-after': null,
    indentation: null,
    'number-leading-zero': null,
    'number-no-trailing-zeros': null,
    'rule-empty-line-before': null,
    'selector-combinator-space-after': null,
    'selector-list-comma-newline-after': null,
    'selector-pseudo-element-colon-notation': null,
    'unit-no-unknown': null,
    'value-list-max-empty-lines': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null
  }
})
