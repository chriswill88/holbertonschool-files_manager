import { ObjectID } from 'bson';
import sha1 from 'sha1';
import { uuid } from 'uuidv4';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const DB_DATABASE = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'files_manager';
const users = dbClient.client.db(DB_DATABASE).collection('users');

export default class AuthController {
  static async getConnect(req, res) {
    const base64 = req.headers.authorization;

    if (base64) {
      // get basic64 value
      const [, userInfoBase64] = base64.split(' ');
      // decode userInfoBase64
      const buff = Buffer.from(userInfoBase64, 'base64');
      // cast buff to string
      const userInfoString = buff.toString('utf-8');
      // get email and pwd from userInfoString
      const [userEmail, userPwd] = userInfoString.split(':');

      // find user in the database
      const dbUser = await users.findOne({ email: userEmail });
      // authenticate user
      if (dbUser && dbUser.password === sha1(userPwd)) {
        // create token to save in Redis { auth_<token>: dbUser.id }
        const genToken = uuid();
        redisClient.set(genToken, dbUser._id, 60 * 60 * 24);
        // RESPONSE
        return res.status(200).send({ token: genToken });
      }
    }
    return res.status(401).send({ error: 'Unauthorized' });
  }

  static async getDisconnect(req, res) {
    const xToken = req.headers['x-token'];

    if (xToken) {
      // get userId from redis
      const currentUserId = await redisClient.get(xToken);
      // get user from DB using userId
      const userInDb = await users.findOne({ _id: ObjectID(currentUserId) });
      if (userInDb) {
        redisClient.del(xToken);
        return res.status(204).send();
      }
      return res.status(401).send({ error: 'Unauthorized' });
    }
    return res.status(401).send({ error: 'Unauthorized' });
  }
}
