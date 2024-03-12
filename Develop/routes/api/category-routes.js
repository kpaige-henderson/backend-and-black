const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // get all categories with products
  try {
    const categories = await Category.findAll({
      include: [{model: Product}]
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value with products
  try {
    const categories = await Category.findByPk({
      include: [{model: Product}]
    });
    if (!categories) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // POST create a new category
  try {
    const category = await Catergory.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // PUT update a category by its `id` value
  try {
    const updatedCategory = await Catergory.update(req.body, {
      where: { id: req.params.id}
    });
    if (!updatedCategory[0]) {
      res.status(404).json({message: 'Can not find category'});
      return;
    }
    res.json({message: 'Category updated successfully'});
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Catergory.destroy(req.body, {
      where: { id: req.params.id}
    });
    if (!deletedCategory) {
      res.status(404).json({message: 'Can not find category'});
      return;
    }
    res.json({message: 'Category deleted successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
