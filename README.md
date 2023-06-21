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

# Install Passport for authentication -> npm install passport passport-local passport-local-mongoose

# Install jwt token for authentication with passport -> npm install passport-jwt jsonwebtoken

# Install accept file uploading -> npm install multer
