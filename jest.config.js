const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

const config = {
	preset: 'jest-preset-angular',
	roots: ['<rootDir>'],
	setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
}

module.exports = config
