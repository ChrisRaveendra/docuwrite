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

router.get('/newdoc', async (req, res) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'not logged in on server',
    });
    return;
  }
  const doc = new Document({
    ownedBy: req.user._id,
    owners: [req.user._id],
  });
  try {
    let newDoc = await doc.save();
    let populatedNewDoc = await Document.findById(newDoc.id).populate('ownedBy').exec();
    res.status(200).json({
      success: true,
      docs: populatedNewDoc,
    });
  } catch (err) {
    console.log('Error occurred in creating new document with code ', err.code);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});


router.get('/docs', async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'not logged in on server',
    });
    return;
  }
  Document.find({ owners: { $in: [mongoose.Types.ObjectId(req.user.id)] } })
  .populate('ownedBy')
  .sort({'createdAt': -1})
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
});


module.exports = router;
