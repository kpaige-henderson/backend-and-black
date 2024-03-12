const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}]
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk({
      include: [{model: Product}]
    });
    if (!tag) {
      res.status(404).json({message: 'Can not find tag'});
      return;
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id}
    });
    if (!updatedTag[0]) {
      res.status(404).json({message: 'Can not find tag'});
      return;
    }
    res.json({message: 'Tag updated successfully'});
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy(req.body, {
      where: { id: req.params.id}
    });
    if (!deletedTag) {
      res.status(404).json({message: 'Can not find tag'});
      return;
    }
    res.json({message: 'Tag deleted successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
module.exports = router;
