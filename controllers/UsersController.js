import sha1 from 'sha1';
import dbClient from '../utils/db';

const DB_DATABASE = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'files_manager';

export default class UsersController {
  static async postNew(req, res) {
    // credentials
    const { email } = req.body;
    const { password } = req.body;

    // check if credentials are present
    if (!email) res.status(400).send({ error: 'Missing email' });
    if (!password) res.status(400).send({ error: 'Missing password' });

    // get user's email from the database
    const users = dbClient.client.db(DB_DATABASE).collection('users');
    const userEmail = await users.findOne({ email });

    // check if email already exists
    if (userEmail) res.status(400).send({ error: 'Already exist' });
    else await users.insertOne({ email, password: sha1(password) });

    // response
    res.status(201).send(await users.findOne({ email }));
  }
}
