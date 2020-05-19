const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
const mongoosePaginate = require('mongoose-paginate');
const Place = require('./Place');
const FavoritePlace = require('./FavoritePlaces');

let userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name: String,
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.post('save',function (user,next) {
    User.count({}).then(count=>{
        if(count ==1){
            // user.Admin = true;
            // user.save().then(next());
            User.update({'_id':user._id},{admin: true}).then(result =>{
                next();
            })
        }
    })
});

userSchema.virtual('places').get(function () {
    return Place.find({_user: this._id});
});
userSchema.virtual('favorites').get(function () {
    return FavoritePlace.find({_user: this._id},{'_place': true}).then(favs=>{
        let placeIds = favs.map(fav => fav._place);
        return Place.find({'_id':{$in: placeIds}})
    })
})
userSchema.plugin(mongooseBcrypt);
userSchema.plugin(mongoosePaginate);
const User = mongoose.model('User',userSchema);

module.exports = User;