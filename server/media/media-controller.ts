import { NextFunction, Request, Response } from 'express';
import { Readable } from 'stream';
import { bucket } from './media-model';
import { GridFSFile } from 'mongodb';
import { Types } from 'mongoose';
import sharp from 'sharp';

export const getMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = new Types.ObjectId(req.params.id);

  const file = await bucket.find({ _id: _id }).next();
  if (!file || !file.contentType) {
    return res.status(404).json('File with id does not exist');
  }

  res.setHeader('Content-Type', file.contentType);
  const readableStream = bucket.openDownloadStream(_id);

  readableStream.pipe(res);
};

export const addMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    console.error('mycket fel');
    return res.status(400).json('fel');
  }

  const readableStream = Readable.from(req.file.buffer);

  const writableStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  const pipeline = sharp();

  pipeline
    .clone()
    .resize({
      width: 1000,
      height: 1000,
      fit: 'cover',
      position: sharp.strategy.entropy,
    })
    .pipe(writableStream)
    .on('finish', (file: GridFSFile) => res.status(201).json(file));

  readableStream.pipe(pipeline).on('error', next);
};

export const replaceMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    console.error('mycket fel');
    return res.status(400).json('fel');
  }

  const readableStream = Readable.from(req.file.buffer);

  const writableStream = bucket.openUploadStreamWithId(
    req.params.id,
    req.file.originalname,
    {
      contentType: req.file.mimetype,
    }
  );

  const pipeline = sharp();

  pipeline
    .clone()
    .resize({
      width: 1000,
      height: 1000,
      fit: 'cover',
      position: sharp.strategy.entropy,
    })
    .pipe(writableStream)
    .on('finish', (file: GridFSFile) => res.status(200).json(file));

  readableStream.pipe(pipeline).on('error', next);
};

export const deleteMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = new Types.ObjectId(req.params.id);

  const file = await bucket.find({ _id: _id }).next();
  if (!file) {
    return res.status(404).json('File with id does not exist');
  }

  await bucket.delete(_id);

  res.status(200).json(file);
};
