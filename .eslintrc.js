module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'prettier/flowtype', 'prettier/react'],
    env: {
        jest: true,
        node: true,
    },
    plugins: ['prettier', 'flowtype'],
    rules: {
        'array-callback-return': 'off',
        indent: 'off',
        'no-return-assign': 'off',
        'no-underscore-dangle:': 'off',
        'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
        'no-underscore-dangle': 'off',
        'flowtype/use-flow-type': 'error',
        'flowtype/define-flow-type': 'error',
        'flowtype/require-valid-file-annotation': ['error', 'always'],
        'prefer-rest-params': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/no-unused-prop-types': 'off',
        'react/require-default-props': 'off',
        'react/no-multi-comp': 'off',
        'react/sort-comp': 'off',
        'react/no-multi-comp': 'off',
        'react/prop-types': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/html-has-lang': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/test.js',
                    '**/*.test.js',
                ],
            },
        ],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'es5',
                tabWidth: 4,
                printWidth: 90,
            },
        ],
    },
};
