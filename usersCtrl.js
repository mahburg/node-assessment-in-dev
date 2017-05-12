const data = require('./userData.json');

var exports = module.exports = {};

exports.getUsers = function (req, res, next) {
    let out = [];
    if (req.query.favorites || req.query.age || req.query.lastname || req.query.email) {
        if (req.query.favorites){
            for (let i = 0; i < data.length; i++){
                if (data[i].favorites.indexOf(req.query.favorites)!==-1){
                    out.push(data[i]);
                }
            }
        } else if (req.query.age) {
            for (let i = 0; i < data.length; i++){
                if (data[i].age < req.query.age){
                    out.push(data[i]);
                }
            }
        } else if (req.query.lastname){
            for (let i = 0; i < data.length; i++){
                if (data[i].last_name == req.query.lastname){
                    out.push(data[i]);
                }
            }
        } else {
            for (let i = 0; i < data.length; i++){
                if (data[i].email == req.query.email){
                    out=(data[i]);
                }
            }
        }
    } else {
        return res.status(200).json(data);
    }
    res.status(200).json(out);
}

exports.getUsersById = function (req,res,next) {
    for (let i = 0; i < data.length; i++){
        if (data[i].id == req.params.userId){
            return res.status(200).json(data[i]);
        }
    }
    res.status(404).json(null);
}

exports.getAdmins = function (req,res,next) {
    let out = [];
    for (let i = 0; i < data.length; i++){
        if (data[i].type == 'admin'){
            out.push(data[i]);
        }
    }
    res.status(200).json(out);
}

exports.getNonAdmins = function (req,res,next) {
    let out = [];
    for (let i = 0; i < data.length; i++){
        if (data[i].type != 'admin'){
            out.push(data[i]);
        }
    }
    res.status(200).json(out);
}

exports.getUserByType = function (req,res,next) {
    let out = [];
    for (let i = 0; i < data.length; i++){
        if (data[i].type == req.params.usrType){
            out.push(data[i]);
        }
    }
    res.status(200).json(out);
}

exports.updateUser = function (req,res,next) {
    let arr  = Object.keys(req.body)
    for (let i = 0; i < data.length; i++){
        if (data[i].id == req.params.userId){
            for (let j = 0; j< arr.length; j++){
                data[i][arr[j]] = req.body[arr[j]];
            }
        }
    }
    res.status(200).json(data);
}

exports.addUser = function (req,res,next) {
    let newUser = req.body;
    newUser.id = data.length+1;
    data.push(newUser);
    res.status(200).json(data);

}

exports.deleteUser = function (req,res,next) {
    for (let i = 0; i < data.length; i++){
        if (data[i].id == req.params.userId){
            data.splice(i,1);
            return res.status(200).json(data);
        }
    }
}