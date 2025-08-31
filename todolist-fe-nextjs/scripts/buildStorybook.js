import { execSync } from 'child_process';
execSync('storybook build', { stdio: 'inherit' });