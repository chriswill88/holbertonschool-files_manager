import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  static getStatus(req, res) {
    res.status(200).send({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(req, res) {
    res.status(200).send({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
  }
}
