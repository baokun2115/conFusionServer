const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

//create code for leaderRouter with same code as dishRouter and promoRouter
leaderRouter.route('/')
    .all((req,res,next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        next();
    }
    )
    .get((req, res, next) => {
        res.end('We send all leaders to you')
    }
    )
    .post((req, res, next) => {
        res.end('Will add ' + req.body.name + ' with details: ' + req.body.description)
    }
    )
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders')
    }
    )
    .delete((req, res, next) => {
        res.end('Deleting all leaders')
    }
    );
leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        res.end('We send ' + req.params.leaderId + ' to you!')
    }
    )
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST method is not allowed on /leaders/' + req.params.leaderId)
    }
    )
    .put((req, res, next) => {
        res.write('Update the leader: ' + req.params.leaderId + "\n")
        res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description)
    }
    )
    .delete((req, res, next) => {
        res.end('Deleting leader: ' + req.params.leaderId)
    }
    );
module.exports = leaderRouter;
