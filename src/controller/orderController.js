import { Orders } from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmount,
      shippingAddress,
      shippingAddressGoogleMap,
      contactNumber,
    } = req.body;
    const orders = new Orders({
      userId,
      products,
      totalAmount,
      shippingAddress,
      shippingAddressGoogleMap,
      contactNumber,
    });
    const savedOrders = await orders.save();

    res.status(201).json(savedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderByUserId = async (req, res) => {
  try {
        const userId = req.params.userId;

    const orders = await Orders.find({ userId }).populate('products.productId').populate('userId');
    res.json(orders);

  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate('products.productId ')
      .populate('userId');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateorders = async (req, res) => {
  try {
    const orderId = req.params.id;

    const updates = req.body;

    const options = { new: true };

    const updateOrders = await Orders.findByIdAndUpdate(
      orderId,
      updates,
      options
    );

    if (!updateOrders) {
      return res.status(404).josn({ message: 'Orders Not Found' });
    }

    res.status(200).json(updateOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrders = async (req, res) => {
  try {
    const order = await Orders.findByIdAndDelete(req.params.id);

    if (!order) {
     return res.status(404).json({ message: 'Orders Not Found' });
    }

    res.status(200).json({
      success: true,
      message: 'Oders deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
