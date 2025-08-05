import { register } from 'ts-node';
register({
  transpileOnly: true,
  compilerOptions: {
    module: 'ESNext',
  },
});

const config = await import('../.storybook/startup.ts');
export default config.default;
