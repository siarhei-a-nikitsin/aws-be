import { S3 } from "aws-sdk";


const REGION = "eu-west-1";

const getS3 = () => new S3({ region: REGION });

export default { getS3 };