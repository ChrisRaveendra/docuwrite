import express from 'express';
import { User, Document } from '../models/models';
const router = new express.Router();

router.get('/', (req, res, next) => {
  // 401 = unauthorized
  res.status(req.user ? 200 : 401).json({
    user: req.user
  });
});

router.get('/newdoc', (req, res, next) => {
  
  const doc = new Document({
    title: req.body.title,
    owners: [req.user._id]
  });
  doc.save().catch(err => {
    console.log('Error occurred in creating new document with code ', err.code);
    res.status(500).json({
      success: false,
      error: err
    })
  })
  .then((newDoc) => {
    res.status(200).json({
      success: true,
      docID: newDoc._id,
    })
  })
});


module.exports = router;
