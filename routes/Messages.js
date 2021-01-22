const express = require('express')
const router = express.Router()
//const {getAllUsers, addNewUser, deleteUser, getOneUser, updateUser} = require('../controllers/Messages')
router.get('/', (req, res) => {
res.send('In Chat')
});

// router.post("/add",addNewUser)

// router.delete("/:id",deleteUser)

// router.get("/:id",getOneUser)

// router.put("/:id",updateUser)

module.exports = router;