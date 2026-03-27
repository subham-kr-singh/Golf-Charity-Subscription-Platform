const express = require('express');
const multer = require('multer');
const winnerController = require('../controllers/winner.controller');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG and JPEG allowed.'));
    }
  }
});

router.get('/my-wins', verifyToken, winnerController.getMyWins);
router.post('/:id/submit-proof', verifyToken, upload.single('proof'), winnerController.submitProof);

module.exports = router;
