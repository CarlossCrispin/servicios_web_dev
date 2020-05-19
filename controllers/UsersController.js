const buildParams = require('../controllers/helpers').builderParams;

const User = require('../models/User');

const validParams = ['email', 'name', 'password']

function create(req, res, next) {
    let params = buildParams(validParams, req.body)
    User.create(params).then(user => {
        req.user = user;
        console.log(user);
        next();
        // res.json(user);
    }).catch(err => {
        res.status(422).json({
            err
        })
    })
}
function index(req, res) {
    User.paginate({}, { page: req.query.page || 1, limit: 5, sort: { _id: -1 } })
        .then((docs) => {
            res.json(docs);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
}

function myPlaces(req,res) {
    console.log('-->',req.user);
    
    User.findOne({'_id': req.user.id }).then(user=>{
        console.log(user.places);
        
        user.places.then(places=>{
            res.json(places);
        }).then(err=>{
            res.json(err);
        })
    })
}
/* function destroyAll(req,res) {
    User.remove({}).then(r=>res.json({}));
} */
module.exports = {
    index,
    create,
    myPlaces
    // destroyAll
}