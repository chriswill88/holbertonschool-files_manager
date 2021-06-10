const redis = require('redis');
const util = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient().on('error', (error) => console.log(error));
    this.getter = util.promisify(this.client.get).bind(this.client);
    this.setter = util.promisify(this.client.set).bind(this.client);
    this.deleter = util.promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.on('ready').then(() => true);
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