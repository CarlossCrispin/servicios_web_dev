const FavoritePlace = require("../models/FavoritePlaces");
const { builderParams } = require("./helpers");
const User = require("../models/User");

const validParams = ['_place'];

function find(req,res,next) {
    FavoritePlace.findById(req.params.id).then(fav=>{
        req.mainObj = fav;
        req.favorite = fav;
        next();
    }).catch(next);
}

function create(req,res) {
    console.log("crear");
    
    let params = builderParams(validParams,req.body);
    console.log(req.user);
    
    params['_user'] = req.user.id;
    FavoritePlace.create(params).then(favorite=>{
        res.json(favorite)
    }).catch(err=>{
        res.status(422).json({err}); 
    })
}


function destroy(req,res) {
    req.favorite.remove().then(doc=>{
        res.json({
            msj: 'Delete fav'
        })
    }).catch(err=>{
        res.status(500).json({err});
    })
}
function index(req, res) {
    /* FavoritePlace.paginate({}, { page: req.query.page || 1, limit: 5, sort: { _id: -1 } })
        .then((docs) => { 
            res.json(docs);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        }); */
    User.findOne({'_id': req.user.id}).then(user=>{
        user.favorites.then(places=>{
            res.json(places);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        });
    })
}
function show(req, res) {
    //revisar
    res.json(req.favorite);
    console.log('pasa',req.favorite);
    
}
module.exports = {find,create,destroy,index,show}