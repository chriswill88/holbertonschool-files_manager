const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => console.error(error));

    this.getter = promisify(this.client.get).bind(this.client);
    this.setter = promisify(this.client.set).bind(this.client);
    this.deleter = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return await this.getter(key);
  }

  async set(key, value, duration) {
    await this.setter(key, value, 'EX', duration);
  }

  async del(key) {
    await this.deleter(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;