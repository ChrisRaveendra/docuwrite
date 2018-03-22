import express from 'express';
import mongoose from 'mongoose';
import { User, Document } from '../models/models';

const router = new express.Router();

router.get('/', (req, res, next) => {
  // 401 = unauthorized
  res.status(req.user ? 200 : 401).json({
    user: req.user,
  });
});

router.get('/newdoc', (req, res) => {
  if (req.user) {
    const doc = new Document({
      ownedBy: req.user._id,
      owners: [req.user._id],
    });
    doc.save().catch((err) => {
      console.log('Error occurred in creating new document with code ', err.code);
      res.status(500).json({
        success: false,
        message: err,
      });
    })
    .then(newDoc => Document.findById(newDoc.id).populate('ownedBy').exec())
    .then((newDoc) => {
      res.status(200).json({
        success: true,
        docs: newDoc,
      });
    })
    .catch((err) => {
      console.log('Error occurred in populating newly created doc: ', err);
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'not logged in on server',
    });
  }
});

router.get('/docs', (req, res, next) => {
  if (req.user) {
    Document.find({ owners: { $in: [mongoose.Types.ObjectId(req.user.id)] } })
    .populate('ownedBy')
    .exec()
    .catch((err) => {
      console.log('error in fetching documents\n', err);
      res.status(500).json({
        success: false,
        error: err,
      });
    })
    .then((docs) => {
      res.status(200).json({
        success: true,
        docs,
      });
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'not logged in on server',
    });
  }
});
module.exports = router;
