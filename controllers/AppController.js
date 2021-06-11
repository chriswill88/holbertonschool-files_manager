export default class AppController {
  static getStatus(req, res) {
    res.status(200).send(JSON.stringify('{"redis":true,"db":true}'));
  }

  static getStats(req, res) {
    res.status(200).send(JSON.stringify('{"users":4,"files":30}'));
  }
}
