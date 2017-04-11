modules.exports = {
    create: create,
    destroy: destroy
}


var json = require ('../../lib/form-json');
var encryption = require('../../');


function create(req, res, db){
    json(req, res, function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        db.get("SELECT * FROM user WHERE username=?", [username], function(err, user){
            if(err){
                console.error(err);
                res.statusCode = 500;
                res.end("Server Error");
                return;
            }
            if(!user){
                // username not in databse
            } else {
                var cryptedPassword = encryption.digest(password + user.salt)
                if(cryptedPassword != user.cryptedPassword){
                    // inccorect password
                } else{
                    // sucessful login
                    // store user.id in the cookie
                }
            }

        });
    });
}