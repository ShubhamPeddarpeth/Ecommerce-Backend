import { Reviews } from '../models/reviewsModel.js';

export const createReviews = async (req, res) => {


  try {
    const {productId,userId, rating, comment } = req.body;

    const reviews = new Reviews({  productId,userId,rating, comment });

    const savedReviews = await reviews.save();

    const newReviews = await Reviews.findById(savedReviews._id).populate(
      'userId'
    );

    res.status(201).json(newReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    const reviews = await Reviews.find({ productId }).populate('userId');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReviews = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewsId = req.params.id;
    const updatedReviews = await Reviews.findByIdAndUpdate(
      reviewsId,
      { rating, comment },
      { new: true }
    );
    if (!updatedReviews) {
      return res.status(404).json({ message: 'Reviews Not Found' });
    }
    res.json(updatedReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReviews = async (req, res) => {
  try {
    const reviewsId = req.params.id;
    const deleteReviews = await Reviews.findByIdAndDelete(reviewsId);

    if (!deleteReviews) {
      res.status(404).json({ message: 'Reviews Not Deleted' });
    }

    res.status(201).json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
