import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import { logger } from '@kosyanmedia/devcom-logger-node'

import { FileManagerUploadInput } from './defs'
import { fileManagerConfig } from './file-manager.config'

export class FileManagerService {
  protected readonly s3Client: S3Client
  protected readonly buckerName: string

  constructor() {
    this.s3Client = new S3Client({
      endpoint: fileManagerConfig.endpoint,
      credentials: {
        accessKeyId: fileManagerConfig.accessKeyId!,
        secretAccessKey: fileManagerConfig.secretAccessKey!,
      },
    })
    this.buckerName = fileManagerConfig.bucketName
  }

  public async uploadFile(input: FileManagerUploadInput): Promise<void> {
    logger.log('Uploading file to bucket %s', this.buckerName)

    const payload: PutObjectCommandInput = {
      Bucket: this.buckerName,
      Key: input.key ?? `upload-${Date.now()}`,
      Body: input.data,
      ContentType: input.contentType,
    }
    await this.s3Client.send(new PutObjectCommand(payload))

    logger.log('File uploaded to bucket %s successfully', this.buckerName)
  }
}
