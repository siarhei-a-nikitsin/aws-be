import middy from '@middy/core';
import cors from '@middy/http-cors';
import { autoProxyResponse } from 'middy-autoproxyresponse';

import s3Factory from '../utils/s3Factory';
import { BUCKET, UPLOADED_FOLDER } from '../constants';

const handler = async (event) => {
  const { queryStringParameters: { name } } = event;
  const filePath = `${UPLOADED_FOLDER}${name}`;

  const s3 = s3Factory.getS3();
  const params = {
    Bucket: BUCKET,
    Key: filePath,
    Expires: 60,
    ContentType: 'text/csv',
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (error, signedUrl) => {
      if (error) {
        return reject(err);
      }

      resolve({
        signedUrl,
      });
    });
  });
};

export default middy(handler)
  .use(cors())
  .use(autoProxyResponse());
