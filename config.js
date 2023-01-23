const config = {};

config.dev = {
    name: 'dev',
    port: 41069,
}

config.prod = {
    name: 'prod',
    port: 41070,
}

const envName = process.env.NODE_ENV
const env = config[envName] ? config[envName] : config.dev;

export default env;