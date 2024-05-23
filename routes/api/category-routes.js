const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// `/api/categories`, GET route to get all categories (including associated products).
router.get('/', async (req, res) => {
  try {
      const categoryData = await Category.findAll({
          include: [{ model: Product }],
          order: [['id', 'ASC']]
      });
      res.status(200).json(categoryData);

  } catch (err) {
      res.status(500).json(err);
  }
});

// `/api/categories/id`, GET route to get a single category (including associated products).
router.get('/:id', async (req, res) => {
  try {
      const categoryData = await Category.findByPk(req.params.id, {
          include: [{ model: Product }]
      });

      if (!categoryData) {
          res.status(404).json({ message: 'No category found with this id.' });
          return;
      }

      res.status(200).json(categoryData);

  } catch (err) {
      res.status(500).json(err);
  }
});

// `/api/categories`, POST route to create a new category. The request body should provide a category_name property and value.
router.post('/', (req, res) => {
    Category.create(req.body)
        .then((category) => {
            res.status(200).json(category);
        })

        .catch((err) => {
            res.status(400).json(err);
        });
});


// `/api/categories/:id`, PUT route to update a category by id. The category id should be provided as the request parameter. If the product ids associated with the category need to be updated, the entire set of product ids which should now be associated with the product need to be provided.
router.put('/:id', (req, res) => {
  Category.update(req.body, {
      where: {
          id: req.params.id,
      },
  })
      .then((category) => {
          if (req.body.productIds && req.body.productIds.length) {

              Category.findAll({
                  where: { category_id: req.params.id }
              }).then((resultingCategory) => {

                  const productIds = resultingCategory.map(({ product_id }) => product_id);
                  const newProductIds = req.body.productIds
                      .filter((product_id) => !productIds.includes(product_id))
                      .map((product_id) => {
                          return {
                              category_id: req.params.id,
                              product_id,
                          };
                      });

                  const productIdsToRemove = productIds
                      .filter(({ product_id }) => !req.body.productIds.includes(product_id))
                      .map(({ id }) => id);

                  return Promise.all([
                      Category.destroy({ where: { id: productIdsToRemove } }),
                      Category.bulkCreate(newProductIds),
                  ]);
              });
          }

          return res.json(`Number of rows updated: ${JSON.stringify(category)}`);
      })
      .catch((err) => {
          res.status(400).json(err);
      });
});

// `/api/categories/:id`, DELETE route to delete a category by id.
router.delete('/:id', async (req, res) => {
  try {
      const categoryData = await Category.destroy({
          where: {
              id: req.params.id
          }
      });

      if (!categoryData) {
          res.status(404).json({ message: 'No category found with this id.' });
          return;
      }

      return res.status(200).json(`Number of rows deleted: ${JSON.stringify(categoryData)}`);

  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
