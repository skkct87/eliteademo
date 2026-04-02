import fs from 'fs';
import path from 'path';

export function makeArtifactsDir(runId: string) {
  const artifactsDir = path.join('artifacts', runId);
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }
  const screenshotsDir = path.join(artifactsDir, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  return artifactsDir;
}
