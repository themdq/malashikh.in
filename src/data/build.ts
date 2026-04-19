import { execSync } from 'child_process';

function getCommitHash(): string {
  if (process.env.COMMIT_HASH) return process.env.COMMIT_HASH;
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
}

function getDeployEntries() {
  try {
    const lines = execSync(
      'git log -7 --format="%ad|%s" --date="format:%b %d %H:%M"'
    ).toString().trim().split('\n');
    return lines.map(line => {
      const sep = line.indexOf('|');
      return {
        date: line.slice(0, sep).toLowerCase(),
        status: 'ok' as const,
        msg: line.slice(sep + 1),
        dur: '—',
      };
    });
  } catch {
    return [];
  }
}

export const buildHash = getCommitHash();
export const deployEntries = getDeployEntries();
