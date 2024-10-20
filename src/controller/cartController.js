import { Cart } from '../models/cartModel.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, cartQuantity } = req.body;

    let cart = await Cart.findOne({ userId, productId });

    if (cart) {
      cart.cartQuantity += parseInt(cartQuantity);
    } else {
      cart = new Cart({ userId, productId, cartQuantity });
    }

    const savedCart = await cart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
      const userId = req.params.userId; // Assuming the userId is passed in the request parameters

    const carts = await Cart.find({ userId }).populate('productId');
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartById = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { userId, cartItems },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteCartById = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllCartsById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await Cart.deleteMany({ userId });

    res.json({ message: `${result.deletedCount} carts deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



