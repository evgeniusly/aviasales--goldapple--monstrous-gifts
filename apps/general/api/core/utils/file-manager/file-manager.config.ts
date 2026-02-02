export const fileManagerConfig = {
  endpoint: process.env.MODERN__S3__ENDPOINT || 'http://localhost:9000',
  accessKeyId: process.env.MODERN__S3__ACCESS_KEY_ID,
  secretAccessKey: process.env.MODERN__S3__SECRET_ACCESS_KEY,
  bucketName: process.env.MODERN__S3__BUCKET_NAME || 'spec-bucket',
}
