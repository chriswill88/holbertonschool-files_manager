export default class AppController {
  static getStatus(req, res) {
    res.status(200).send({ redis: true, db: true });
  }

  static getStats(req, res) {
    res.status(200).send({ users: 4, files: 30 });
  }
}
