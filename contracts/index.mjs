import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

export {
  Contract,
  ledger,
  pureCircuits,
} from '../managed/contract/index.js';
import { Contract } from '../managed/contract/index.js';

const contractDirectory = path.dirname(fileURLToPath(import.meta.url));
export const zkConfigPath = path.resolve(contractDirectory, '..', 'managed');

export const createCompiledEduFundContract = (witnesses) =>
  CompiledContract.make('edufund', Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(zkConfigPath),
  );
