const Review = require("../models/reviewModel");

const getReviewsByService = async (req, res) => {
    try {
        const reviews = await Review.find({ service: req.params.id });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const alreadyReviewed = await Review.findOne({
            user: req.user._id,
            service: req.params.id,
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: "Već ste ostavili recenziju za ovu uslugu." });
        }

        const review = await Review.create({
            user: req.user._id,
            service: req.params.id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReviewsByService, createReview };