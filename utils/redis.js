const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => console.log(error));

    this.getter = promisify(this.client.get).bind(this.client);
    this.setter = promisify(this.client.set).bind(this.client);
    this.deleter = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.ready;
  }

  async get(key) {
    await this.getter(key).catch((error) => console.log(error));
  }

  async set(key, value, duration) {
    await this.setter(key, value, 'EX', duration).catch((error) => console.log(error));
  }

  async del(key) {
    await this.deleter(key).catch((error) => console.log(error));
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
