const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags, incl assoc. product data
router.get('/', async (req, res) => {
  try {
      const tagData = await Tag.findAll({
          include: [{ model: Product, through: ProductTag }],
          order: [['id', 'ASC']]
      });
      res.status(200).json(tagData);

  } catch (err) {
      res.status(500).json(err);
  }
});

// single tag by id, incl assoc. product data
router.get('/:id', async (req, res) => {
  try {
      const tagData = await Tag.findByPk(req.params.id, {
          include: [{ model: Product, through: ProductTag }],
      });

      if (!tagData) {
          res.status(404).json({ message: 'No tag found with this id.' });
          return;
      }

      res.status(200).json(tagData);

  } catch (err) {
      res.status(500).json(err);
  }
});

//create new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
      .then((tag) => {
          res.status(200).json(tag);
      })

      .catch((err) => {
          res.status(400).json(err);
      });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
      where: {
          id: req.params.id,
      },
  })
      .then((tag) => {
          return res.json(`Number of rows updated: ${JSON.stringify(tag)}`);
      })

      .catch((err) => {
          res.status(400).json(err);
      });
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
      const tagData = await Tag.destroy({
          where: {
              id: req.params.id
          }
      });

      if (!tagData) {
          res.status(404).json({ message: 'No tag found with this id.' });
          return;
      }

      return res.status(200).json(`Number of rows deleted: ${JSON.stringify(tagData)}`);

  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
