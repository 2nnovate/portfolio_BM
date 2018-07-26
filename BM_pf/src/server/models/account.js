import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    salt: String,
    region: String,
    order: [{
      storeId: String,
      storeImage: String,
      storeCategories: String,
      storeName: String,
      menuPrice: Number,
      menuName: String,
      selectedOptions: String,
      optionPrice: Number,
      payPrice: Number,
      date:{
          created: { type: Date, default: Date.now }
      }
    }],
    cart: [{
      storeId: String,
      storeImage: String,
      storeCategories: String,
      storeName: String,
      menuPrice: Number,
      menuName: String,
      selectedOptions: String,
      optionPrice: Number,
      payPrice: Number,
      date:{
          created: { type: Date, default: Date.now }
      }
    }],
    created: { type: Date, default: Date.now }
});

export default mongoose.model('account', Account);
