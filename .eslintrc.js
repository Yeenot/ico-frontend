module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "linebreak-style": 0,
    "no-tabs": 0,
    "indent": 0,
    "no-console": 0,
    "no-unused-vars": 0,
    "no-undef": 0,
    "no-func-names": 0,
    "no-alert": 0,
    "no-trailing-spaces": 0,
    "no-plusplus": 0,
    "quote-props": 0,
    "no-param-reassign": 0,
    "no-nested-ternary": 0,
    "no-shadow": 0,
    "no-confusing-arrow": 0,
    "radix": 0,
    "arrow-body-style": 0,
    "no-restricted-syntax": 0,
    "no-prototype-builtins": 0,
    "no-new-object": 0,
    "max-len": 0,
    "no-multi-assign": 0,
    "semi": 0,
    "comma-dangle": 0,
    "space-before-function-paren": 0,
    "no-multiple-empty-lines": 0,
    "standard/no-callback-literal": 0,
    "handle-callback-err": 0,
    "no-mixed-spaces-and-tabs": 0
  },
  globals: {}
}
