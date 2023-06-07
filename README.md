# conFusionServer
# Express server 
npm install express@4.18.1 --save for create localhost server
# Express router
var sthRouter = express.Router()
# Body parser -> middleware parse the body of message
var bodyParser = require('body-parser');
app.use(bodyParser.json()); -> parse the JSON in the body

# Express session -> track authenticated
# npm install express-session session-file-store -> install session