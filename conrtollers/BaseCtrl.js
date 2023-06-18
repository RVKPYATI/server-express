const ucFirst = require("../tools/ucFirst");
class BaseCtrl {
  constructor(model) {
    this.model = model;

    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async getById(req, res) {
    try {
      const data = await this.model.findById(req.params.id).exec();
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: "Error get", err });
    }
  }

  async getAll(req, res) {
    try {
      const query = req.query.q;
      const page = req.query.page || 0;
      const limit = req.query.limit || 10;
      const tag = req.query.tag;
      const random = req.query.random;
      if (random === "true") {
        const data = await this.model.aggregate([{ $sample: { size: 5 } }]);
        return res.json(data);
      }
      if (tag) {
        const data = await this.model
          .find({ tag_article: ucFirst(tag) })
          .sort({ publication_date: -1 })
          .skip(page * limit)
          .limit(limit);
        return res.json(data);
      }

      if (query) {
        const data = await this.model.find({
          $text: { $search: query },
        });
        return res.json(data);
      }
      const data = await this.model
        .find({})
        .sort({ publication_date: -1 })
        .skip(page * limit)
        .limit(limit);
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: "Error get ALL", err });
    }
  }

  async deleteById(req, res) {
    try {
      await this.model.findByIdAndRemove(req.params.id);
      res.json({
        message: "Deleted news",
      });
    } catch (err) {
      res.status(400).json({ message: "Error delete", err });
    }
  }
}

module.exports = BaseCtrl;
