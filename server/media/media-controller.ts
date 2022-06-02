import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Readable } from 'stream';
import { bucket } from './media-model';
import { GridFSFile } from 'mongodb';
import { Types } from 'mongoose';
import sharp from 'sharp';
import 'multer';
import { assertIsAdmin } from '../errorFunctions';

export const getMedia = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const _id = new Types.ObjectId(req.params.id);

    const file = await bucket.find({ _id: _id }).next();
    if (!file || !file.contentType) {
      res.status(404);
      throw new Error('Kan inte hitta fil med angivet id');
    }

    const readableStream = bucket.openDownloadStream(_id);

    res.setHeader('Content-Type', file.contentType);
    readableStream.pipe(res);
  }
);

export const addMedia = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte lägga till media utan att vara inloggad som admin'
    );

    if (!req.file) {
      res.status(400);
      throw new Error('Ingen fil mottagen');
    }

    const readableStream = Readable.from(req.file.buffer);

    const writableStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    const pipeline = sharp();

    pipeline
      .clone()
      .resize({ width: 500 })
      .pipe(writableStream)
      .on('finish', (file: GridFSFile) => res.status(201).json(file));

    readableStream.pipe(pipeline);
  }
);

export const replaceMedia = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte ersätta media utan att vara inloggad som admin'
    );

    if (!req.file) {
      res.status(400);
      throw new Error('Ingen fil mottagen');
    }

    const _id = new Types.ObjectId(req.params.id);

    const file = await bucket.find({ _id: _id }).next();
    if (!file) {
      res.status(404);
      throw new Error('Kan inte hitta fil med angivet id');
    }

    await bucket.delete(_id);

    const readableStream = Readable.from(req.file.buffer);

    const writableStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    const pipeline = sharp();

    pipeline
      .clone()
      .resize({ width: 500 })
      .pipe(writableStream)
      .on('finish', (file: GridFSFile) => res.status(201).json(file));

    readableStream.pipe(pipeline);
  }
);

export const deleteMedia = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte ta bort media utan att vara inloggad som admin'
    );

    const _id = new Types.ObjectId(req.params.id);

    const file = await bucket.find({ _id: _id }).next();
    if (!file) {
      res.status(404);
      throw new Error('Kan inte hitta fil med angivet id');
    }

    await bucket.delete(_id);

    res.status(200).json(file);
  }
);
