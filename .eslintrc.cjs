module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    env: {
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: { project: ['./tsconfig.json'] },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        quotes: [2, 'single', {'avoidEscape': true}]
    },
    ignorePatterns: ['dist', 'node_modules']
}