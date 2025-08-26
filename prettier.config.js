// prettier.config.js
module.exports = {
    semi: false,
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'avoid',
    vueIndentScriptAndStyle: true,
    overrides: [
      {
        files: '*.md',
        options: {
          proseWrap: 'always',
        },
      },
    ],
  }
  