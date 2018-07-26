import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Store = new Schema({
    owner_id: String,
    name: String,
    region: [String],
    thumbNail: String,
    categories: String,
    explain: String,
    availNow: Boolean,
    deliveryTime: String,
    minPriceToOrder: Number,
    inform: {
      availTime: String,
      offDay: String,
      tel: String,
      owner: String
    },
    menuCategories: [String],
    menus: [
      {
        image: String,
        categories: String,
        name: String,
        price: Number
      }
    ],
    options: [
      {
        name: String,
        price: Number
      }
    ],
    reviews: [
      {
        author: String,
        contents: String,
        imageUrl: String,
        starRate: Number,
        date: {
            created: { type: Date, default: Date.now },
            edited: { type: Date, default: Date.now }
        },
        is_edited: { type: Boolean, default: false }
      }
    ],
    saveStore: [String],
    orderCount: Number,
    starRate: Number
});

export default mongoose.model('store', Store);
