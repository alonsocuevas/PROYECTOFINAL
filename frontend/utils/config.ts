interface Config {
  NEXT_URL: string;
  NITRO_URL: string;
  [key: string]: string;
};

const config: Config = {
  NITRO_URL: 'http://192.168.1.10/nitro/',
  NEXT_URL: 'http://192.168.1.10/',
};

export default config;