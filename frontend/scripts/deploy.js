import { execSync } from 'child_process';
import fs from 'fs';
import { promises as fsp } from 'fs';
import os from 'os';
import path from 'path';

const run = (command, options = {}) => {
  execSync(command, { stdio: 'inherit', shell: true, ...options });
};

const cwd = process.cwd();
const repoRoot = path.resolve(cwd, '..');
const distPath = path.resolve(cwd, 'dist');
const tempRoot = path.join(os.tmpdir(), 'ai-placement-gh-pages');
const worktreePath = path.join(tempRoot, 'worktree');

const cleanDirectory = async (dir) => {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    if (entry.name === '.git') return;
    const fullPath = path.join(dir, entry.name);
    await fsp.rm(fullPath, { recursive: true, force: true });
  }));
};

const copyDirectory = async (src, dest) => {
  await fsp.cp(src, dest, { recursive: true });
};

const branchExists = () => {
  try {
    execSync('git rev-parse --verify gh-pages', { cwd: repoRoot, stdio: 'ignore', shell: true });
    return true;
  } catch {
    return false;
  }
};

const removeTemp = async () => {
  if (fs.existsSync(worktreePath)) {
    try {
      run(`git -C "${repoRoot}" worktree remove "${worktreePath}" --force`);
    } catch {
      // ignore
    }
  }
  if (fs.existsSync(tempRoot)) {
    await fsp.rm(tempRoot, { recursive: true, force: true });
  }
};

const main = async () => {
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist folder not found. Run npm run build first.');
    process.exit(1);
  }

  await removeTemp();
  await fsp.mkdir(worktreePath, { recursive: true });

  try {
    run(`git -C "${repoRoot}" worktree add --detach "${worktreePath}"`);

    if (branchExists()) {
      run(`git -C "${worktreePath}" checkout gh-pages`);
    } else {
      run(`git -C "${worktreePath}" checkout --orphan gh-pages`);
    }

    await cleanDirectory(worktreePath);
    await copyDirectory(distPath, worktreePath);

    run(`git -C "${worktreePath}" add --all`);

    const status = execSync('git status --porcelain', { cwd: worktreePath, encoding: 'utf8', shell: true });
    if (!status.trim()) {
      console.log('No changes to deploy.');
      return;
    }

    run('git commit -m "Deploy frontend to GitHub Pages"', { cwd: worktreePath });
    run('git push origin gh-pages --force', { cwd: worktreePath });

    console.log('Deployment completed successfully.');
  } finally {
    await removeTemp();
  }
};

main().catch((error) => {
  console.error('Deployment failed:', error.message || error);
  process.exit(1);
});
