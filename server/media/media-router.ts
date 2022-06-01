import express from 'express';
import multer from 'multer';
import {
  getMedia,
  addMedia,
  deleteMedia,
  replaceMedia,
} from './media-controller';

const upload = multer();

export const mediaRouter = express
  .Router()
  .get('/media/:id', getMedia)
  .post('/media', upload.single('media'), addMedia)
  .put('/media/:id', upload.single('media'), replaceMedia)
  .delete('/media/:id', deleteMedia);
