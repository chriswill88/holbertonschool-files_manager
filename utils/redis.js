const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => console.error(error));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getter = promisify(this.client.get).bind(this.client);
    await getter(key);
  }

  async set(key, value, duration) {
    const setter = promisify(this.client.set).bind(this.client);
    await setter(key, value, 'EX', duration);
  }

  async del(key) {
    const deleter = promisify(this.client.del).bind(this.client);
    await deleter(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
