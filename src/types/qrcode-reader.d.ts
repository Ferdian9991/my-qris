// types/qrcode-reader.d.ts
declare module "qrcode-reader" {
  import { Bitmap } from "jimp";

  interface QRCodeReaderCallback {
    (err: Error | null, result?: { result: string }): void;
  }

  class QrCode {
    callback?: QRCodeReaderCallback;
    decode(bitmap: Bitmap): void;
  }

  export default QrCode;
}
