import middy from "@middy/core";
import cors from "@middy/http-cors";
import { autoProxyResponse } from "middy-autoproxyresponse";
import csv from "csv-parser";

import s3Factory from "../utils/s3Factory";
import { BUCKET, UPLOADED_FOLDER, PARSED_FOLDER } from "../constants";


const handler = async event => {
  const s3 = s3Factory.getS3();

  event.Records.forEach(record => {
    const fileKey = record.s3.object.key;
    const s3Stream = s3.getObject({
      Bucket: BUCKET,
      Key: fileKey
    }).createReadStream();

    s3Stream.pipe(csv())
      .on('data', data => {
        console.log("New record", data);
      })
      .on('end', async () => {
        console.log("End file reading.");

        console.log(`Copy from ${BUCKET}/${fileKey}`);

        const newFileKey = fileKey.replace(UPLOADED_FOLDER, PARSED_FOLDER);

        await s3.copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${fileKey}`,
          Key: newFileKey
        }).promise();

        console.log(`Copied into ${BUCKET}/${newFileKey}`);

        await s3.deleteObject({
          Bucket: BUCKET,
          Key: fileKey
        }).promise();

        console.log(`File ${BUCKET}/${fileKey} is deleted.`);
      });
  });

  return {
    statusCode: 202
  };
};

export default middy(handler)
  .use(cors())
  .use(autoProxyResponse());