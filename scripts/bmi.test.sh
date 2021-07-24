#!/usr/bin/env bash

currentDir=$(dirname $0)

$currentDir/../node_modules/.bin/mocha $currentDir/../tests/bmi.test.js --exit