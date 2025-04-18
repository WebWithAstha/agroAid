import mongoose from 'mongoose';
const marketDataSchema = new mongoose.Schema({
    name: String,
    market: String,
    prices: [
        {
            max_price: Number,
            min_price: Number,
            date: String,
        },
    ],
});

export default mongoose.model('MarketData', marketDataSchema);
