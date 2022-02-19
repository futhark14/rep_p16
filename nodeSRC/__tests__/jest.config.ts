import type {Config} from '@jest/types'
import { transform } from 'typescript'

const config: Config.InitialOptions = {
    verbose: true,
    transform: {"^.+\\.tsx?$": "ts-jest",},
    testMatch: ["**/nodeSRC/**/*.test.ts"],
  };
export default config;