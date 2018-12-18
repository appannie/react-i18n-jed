#!/usr/bin/env node
// @flow
const { spawn } = require('child_process');
const path = require('path');

process.exitCode = 0;
process.on('exit', code => {
    console.log('---------');
    console.log('');
    if (code === 0) {
        console.log('Successful! The bad case tests work as expected!');
    } else {
        console.log('Failed! The bad case tests get broken!');
    }
    console.log('');
});

const runTest = filePath => {
    const pipe = spawn(
        'yarn',
        [
            'flow',
            'check-contents',
            `< ${path.join(process.cwd(), '__test__/bad-type/', filePath)}`,
        ],
        {
            shell: true,
        }
    );
    pipe.stdout.pipe(process.stdout);
    pipe.stderr.pipe(process.stdout);

    pipe.on('close', code => {
        if (code === 0) {
            console.log('!!!===!!!');
            console.log('Error, close with failed cases as Unexpected exitCode: ', code);
            process.exitCode += 1;
        } else {
            console.log('***===***');
            console.log('Close as Expected exitCode: ', code);
        }
    });

    pipe.on('error', err => {
        console.log('Error Found: ', err);
    });
};

const badCases = [
    'bad-props.flow.js',
    'bad-static-props.flow.js',
    'bad-props-stateless-component.flow.js',
];

badCases.forEach(filePath => runTest(filePath));
