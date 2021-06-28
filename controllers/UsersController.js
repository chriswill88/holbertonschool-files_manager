import sha1 from 'sha1';
import { ObjectID } from 'bson';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const DB_DATABASE = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'files_manager';
const users = dbClient.client.db(DB_DATABASE).collection('users');

export default class UsersController {
  static async postNew(req, res) {
    // credentials
    const { email } = req.body;
    const { password } = req.body;

    // check if credentials are present
    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    // get user's email from the database
    const users = dbClient.client.db(DB_DATABASE).collection('users');
    const userEmail = await users.findOne({ email });

    // check if email already exists
    if (userEmail) res.status(400).send({ error: 'Already exist' });
    else await users.insertOne({ email, password: sha1(password) });

    // response
    const response = await users.findOne({ email });
    return res.status(201).send(response);
  }

  static async getMe(req, res) {
    const xToken = req.headers['x-token'];

    if (xToken) {
      // get userId from redis
      const currentUserId = await redisClient.get(xToken);
      // get user from DB using userId
      const userInDb = await users.findOne({ _id: ObjectID(currentUserId) });
      if (userInDb) {
        delete userInDb._id;
        return res.status(200).send(userInDb);
      }
      return res.status(401).send({ error: 'Unauthorized' });
    }
    return res.status(401).send({ error: 'Unauthorized' });
  }
}
