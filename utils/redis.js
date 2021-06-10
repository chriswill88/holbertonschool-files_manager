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
    return this.client.connected;
  }

  async get(key) {
    await this.getter(key).catch(console.error);
  }

  async set(key, value, duration) {
    await this.setter(key, value, 'EX', duration).catch(console.error);
  }

  async del(key) {
    await this.deleter(key).catch(console.error);
  }
}

const redisClient = new RedisClient();

export default redisClient;
