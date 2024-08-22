const UserService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if( !username || !password){
      return res.status(400).json({ error: "username or password is empty" });
    }
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if( !username || !password){
      return res.status(401).json({ error: "username or password is empty" });
    }
    const data = await UserService.authenticateUser(username, password, res);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
};

exports.verifyOneTimeLink = async (req, res)=>{
   try{
    const token = req.params.token;
    const payload = await UserService.verifyOneTimeLink(token, res);
    res.json({ payload });
   }catch(error){
    res.status(500).json({ error: 'something went wrong' });
   }
}

