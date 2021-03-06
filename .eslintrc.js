//@ts-check

module.exports = /** @type { import('eslint').Linter.Config } */ ({
  root: true,

  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaversion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true
    }
  },

  extends: [
    'plugin:mdx/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],

  // optional, if you want to lint code blocks at the same time
  settings: {
    'mdx/code-blocks': true,
    // optional, if you want to disable language mapper, set it to `false`
    // if you want to override the default language mapper inside, you can provide your own
    'mdx/language-mapper': {}
  },

  overrides: [
    {
      files: ['*.md'],
      rules: {
        'prettier/prettier': [
          2,
          {
            // unnecessary if you're not using `eslint-plugin-prettier`, but required if you are
            parser: 'markdown'
          }
        ]
      }
    },
    {
      files: ['*.md', '*.mdx'],
      extends: ['plugin:mdx/overrides']
    },
    {
      files: '**/*.{md,mdx}/**',
      extends: 'plugin:mdx/code-blocks'
    }
  ],

  rules: {
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // vue
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    'vue/require-default-prop': 'off',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/no-unused-vars': 'warn',
    'vue/comment-directive': [
      'warn',
      {
        reportUnusedDisableDirectives: false
      }
    ],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'mdx/no-unused-expressions': 'off',
    'no-undef': 'off'
  },

  globals: {
    h: true
  }
})
