import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
  // 401 = unauthorized
  res.status(req.user ? 200 : 401).json({
    user: req.user
  });
});


module.exports = router;
