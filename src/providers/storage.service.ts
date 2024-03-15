import { Injectable } from '@nestjs/common';
import { Endpoint, S3 } from 'aws-sdk';

@Injectable()
export class StorageService {
  endpoint = new Endpoint(process.env.S3_ENDPOINT);

  s3 = new S3({
    endpoint: this.endpoint,
    credentials: {
      accessKeyId: process.env.S3_KEY_ID,
      secretAccessKey: process.env.S3_APP_KEY,
    },
  });

  storageImage = async (meet_id, path, buffer, mimetype) => {
    const file = await this.s3
      .upload({
        Bucket: process.env.S3_BUCKET,
        Key: `meets/${meet_id}/${path}`,
        Body: buffer,
        ContentType: mimetype,
      })
      .promise();

    return file;
  };

  // Verify images' address to delete
  deleteImage = async (path) => {
    await this.s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: path,
      })
      .promise();
  };
}
