import jwt from 'jsonwebtoken';

const fetchuser = (req, res, next) => {
  const token = req.cookies?.jwt; // Optional chaining to avoid error if req.cookies is undefined
  if (!token) {
    return res.status(401).json({error: "Please Login first"});
  }

  // Check if token exists & is verified
    
  try {
    const data = jwt.verify(token, "thisissecretkey");
    req.userId = data.id;
    next();
}
 catch (error) {
    return res.status(401).send("Invalid token");
}
};


export default fetchuser
