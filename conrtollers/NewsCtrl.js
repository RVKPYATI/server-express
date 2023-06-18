const News = require("../models/News"),
  BaseCtrl = require("./BaseCtrl");

class NewsCtrl extends BaseCtrl {
  constructor(model) {
    super(model);
  }

  async createEntity(req, res) {
    let news = new News({
      title: req.body.title,
      image_url: req.body.image_url,
      article_url: req.body.article_url,
      article_preview: req.body.article_preview,
      publication_date: req.publication_date,
      tag_article: req.body.tag_article,
    });

    try {
      if (req.body) {
        await news.save();
        return res.json({ message: "News was created" });
      }
    } catch (err) {
      return res.status(400).json({ message: "Error create news", err });
    }
  }

  async updateEntity(req, res) {
    let reqBody = { title: req.body.title };

    try {
      const data = await News.findByIdAndUpdate(req.params.id, reqBody, {
        runValidators: true,
      });
      res.json({
        message: "Updated news",
        id: data._id,
      });
    } catch (err) {
      res.status(400).json({ message: "Error update news", err });
    }
  }
}

module.exports = new NewsCtrl(News);
