var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/moneyforhand');
var Bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var MerchantSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

MerchantSchema.virtual('password')
  .set(function(value) {
    this.passwordHash = Bcrypt.hashSync(value);
    console.log(value, this, 'issaPassword');
  });

MerchantSchema.statics.login = function(username, password, callback) {
  this.model.find({ username: username }, (err, merchant) => {
    return Bcrypt.compare(password, merchant.passwordHash, (err, res) => {
      if (err) return false;
      return merchant;
    })
  });
}


var Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = Merchant;
