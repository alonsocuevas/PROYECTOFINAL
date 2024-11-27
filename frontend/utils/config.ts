interface Config {
  NEXT_URL: string;
  NITRO_URL: string;
  [key: string]: string;
};

const config: Config = {
  NITRO_URL: 'http://localhost:3000/',
  NEXT_URL: 'http://localhost:3001/',
};

export default config;