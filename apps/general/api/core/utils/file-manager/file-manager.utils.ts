export const isFileManagerEnabled = (): boolean => {
  return !!process.env.MODERN__S3__ENDPOINT && process.env.MODERN__S3__ENDPOINT !== ''
}
