const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient().on('ready', (error) => console.log(error));

    this.getter = promisify(this.client.get).bind(this.client);
    this.setter = promisify(this.client.set).bind(this.client);
    this.deleter = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    await this.getter(key);
  }

  async set(key, value) {
    await this.setter(key, value);
  }

  async del(key) {
    await this.deleter(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;