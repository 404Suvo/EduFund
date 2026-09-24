import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const isWindows = os.platform() === 'win32';
const contractSource = 'contracts/edufund.compact';
const outputDir = 'managed';

console.log(`[EduFund] Compiling Compact contract: ${contractSource} -> ${outputDir}`);

if (!fs.existsSync(contractSource)) {
  console.error(`[EduFund Error] Contract source not found: ${contractSource}`);
  process.exit(1);
}

try {
  if (isWindows) {
    // Run via WSL Ubuntu where compact compiler is installed
    const wslPath = process.cwd().replace(/\\/g, '/').replace(/^([A-Za-z]):/, (_, drive) => `/mnt/${drive.toLowerCase()}`);
    console.log(`[EduFund] Executing compiler via WSL at ${wslPath}...`);
    const cmd = `wsl -d Ubuntu -- bash -c "cd '${wslPath}' && export PATH=\\"\\$HOME/.local/bin:\\$PATH\\" && compact compile ${contractSource} ${outputDir}"`;
    execSync(cmd, { stdio: 'inherit' });
  } else {
    // Linux/CI native compact CLI
    console.log(`[EduFund] Executing native compact compiler...`);
    execSync(`compact compile ${contractSource} ${outputDir}`, { stdio: 'inherit' });
  }
  console.log(`[EduFund] Compact contract successfully compiled to ${outputDir}/`);
} catch (err) {
  console.error(`[EduFund] Compilation failed:`, err.message);
  process.exit(1);
}
