import { Product } from '../models/productModel.js';
import { uploadImageToCloudinery } from '../utils/fileUpload.js';
import { toSlug } from '../utils/helpers.js';

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.body;
    const slug = toSlug(name);
    const file = req.file;
    const imageUrl = await uploadImageToCloudinery(file);
    const product = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
      slug,
      quantity,
    });

    const resp = await product.save();

    const newProduct = await Product.findById(resp._id).populate('category');
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const productId = req.query.productId || null;
    const query = {};

    if (productId) {
      query.category = productId;
    }

    const products = await Product.find({ ...query })
      .populate('category')
      .populate('reviews');

    if (!products) {
      return res.status(404).json({ message: 'Product Not Found' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const productId = req.params.id;

    // Find product by ID and populate category and reviews fields
    const product = await Product.findById(productId)
      .populate('category')
      .populate('reviews');

    // Check if product exists
    if (!product) {
      // Return error message if product not found with status code 404
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the found product as JSON response
    res.json(product);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const file = req.file;
    let imageUrl = null;

    if (file) {
      imageUrl = await uploadImageToCloudinery(file);
    }

    if (imageUrl) {
      req.body.imageUrl = imageUrl;
    }

    req.body.slug = toSlug(req.body.name);

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ message: 'Product Not Product' });
    }

    const updateProduct = await product.populate('category');

    res.status(201).json(updateProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' });
    }
    res.status(200).json({ message: 'Product  Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
