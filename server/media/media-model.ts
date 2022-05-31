import { GridFSBucket } from 'mongodb';
import mongoose, {connection} from 'mongoose';

export let bucket: any;
(async () => {
    await mongoose.connection.on('connected', () => {
        const { db } = mongoose.connection;
        bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'media',
        });
    })
}) ();