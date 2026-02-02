import { logger } from '@kosyanmedia/devcom-logger-node'
import type { RequestOption } from '@modern-js/bff-core'

import { MessageResponse, MessageStatus, UploadInput } from '../core/defs'
import { FileManagerService, isFileManagerEnabled } from '../core/utils'

let fileManagerService: FileManagerService

export async function post(request: RequestOption<never, UploadInput>): Promise<MessageResponse> {
  if (!isFileManagerEnabled()) {
    logger.warn('File manager is not enabled.')
  }
  if (!fileManagerService) {
    fileManagerService = new FileManagerService()
  }

  logger.log('Upload files with request.')
  const payload = request.data?.payload
  if (!payload) {
    logger.error('Payload is required for file upload.')
    return { status: MessageStatus.error }
  }

  try {
    const buffer = Buffer.from(await payload.arrayBuffer())
    logger.debug('File buffer size: %d bytes', buffer.length)
    await fileManagerService.uploadFile({ data: buffer, contentType: payload.type })
  } catch (error) {
    logger.error('File upload failed: %o', error)
    return { status: MessageStatus.error }
  }

  logger.log('Files uploaded successfully.')
  return { status: MessageStatus.ok }
}
