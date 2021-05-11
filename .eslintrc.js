module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },
  rules: {
    'semi': 0,
    'quote-props': 0,
    'quotes': 0,
    'linebreak-style': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'object-curly-spacing': 0,
    'comma-dangle': 0,
    'no-unused-vars': 1,
    'jsx-a11y/anchor-is-valid': 0,
    'comma-spacing': 0,
    'no-trailing-spaces': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'eol-last': 0,
    'no-underscore-dangle': 0,
    'operator-linebreak': 0,
    'no-multiple-empty-lines': 0,
    'import/prefer-default-export': 0,
    'global-require': 0,
    'space-before-blocks': 0,
    'no-use-before-define': 0,
    'max-len': 1,
    'arrow-parens': 0,
    'no-nested-ternary': 0,
    'prefer-template': 0,
    'keyword-spacing': 0,
    'no-empty': 0,
    
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/alt-text': 0,

    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 1,
    'react/button-has-type': 0,
    'react/jsx-wrap-multilines': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-boolean-value': 1,
  },
};
