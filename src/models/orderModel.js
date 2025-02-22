import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cartQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: [true, 'Address is required'],
  },

  shippingAddressGoogleMap: {
    type: String,
    required: [true, 'Address is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'contact number is required'],
    validate: {
      validator: function (v) {
        return /^(\+\d{1,3})?(\d{7,15})$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`,
    },
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Orders = mongoose.model('Orders', orderSchema);
