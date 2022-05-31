import mongoose from 'mongoose';

export let bucket: any;
mongoose.connection.on('connected', () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'media',
  });
});
