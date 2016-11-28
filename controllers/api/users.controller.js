var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);
/*router.get('/userList',userList);*/
router.post('/contact',contact);

module.exports = router;



function contact(req,res){
    console.log(req.body);
    console.log("i made iur hete");
    userService.contact(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
    
    
}
/*function userList(req,res){
    userService.userList(req,res).then(function (userList) {
            if (userList) {
                res.send(userList);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 
      
}*/


/*function contactlist(req,res){
    userService.contactlist().then(function(){
        
    });
}*/

function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                
                res.send({ token: token });
           
            } else {
               
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}




