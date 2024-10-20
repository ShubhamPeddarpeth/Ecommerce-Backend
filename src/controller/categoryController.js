import { Category } from '../models/categoryModel.js';
import { toSlug } from '../utils/helpers.js';
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = toSlug(name);

    const category = new Category({ name,slug });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatecategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
      'Invalid name provided', typeof name;
      return res.status(400).json({ message: 'Valid name is required' });
    }
    const slug = toSlug(name);
    const category = await Category.findById(
      req.params.id);

    //check category exists
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update category name and slug, then save it to the database
    category.name = name;
    category.slug = slug;
    await category.save();

    // Return the updated category as JSON response
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
  

    const category = await Category.findById(req.params.id);

    //if category exists
    if (!category) {
      return res.status(404).json({ message: 'Category Not Found' });
    }

    await category.deleteOne();
    res.json({ message: 'Category Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
