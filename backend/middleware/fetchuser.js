const jwt = require('jsonwebtoken');
const Secret_Key = 'secretkeyofnamjyot'

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error: "Please authenticate using a valid token"})
    }

    try{
        const data = jwt.verify(token, Secret_Key)
        req.user = data.user
        next();
    }
    catch (err) {
        res.status(401).json({error: "Please authenticate using a valid token"})
    }
}

module.exports = fetchUser;