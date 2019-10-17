import { StringDecoder } from 'string_decoder'

const decoder = new StringDecoder('utf8')

export const decode = (str: string): string =>
  decoder.write(Buffer.from(str, 'hex'))

const encoder = new StringDecoder('hex')

export const encode = (str: string): string =>
  encoder.write(Buffer.from(str, 'utf8'))
