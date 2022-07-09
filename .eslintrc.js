module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'eslint-disable-next-line': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    'vue/html-indent': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/require-default-prop': 0,
    'space-before-function-paren': 0
  }
}
