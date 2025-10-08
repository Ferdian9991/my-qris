import QRHelper from "./QRHelper";
import QRIS from "./QRIS";

/**
 * Re-exports the readQRCodeFromFile method from QRHelper for external use.
 */
export const readQRCodeFromFile = QRHelper.readQRCodeFromFile;

/**
 * Re-exports the readQRCodeFromURL method from QRHelper for external use.
 */
export const readQRCodeFromURL = QRHelper.readQRCodeFromURL;

/**
 * Re-exports the generateQRDataUrl method from QRHelper for external use.
 */
export const generateQRDataUrl = QRHelper.generateQRDataUrl;

/**
 * Package main class for MyQRIS
 * @class MyQRIS
 */
export default class MyQRIS extends QRIS {
  /**
   * Creates an instance of the MyQRIS class.
   * This class extends the QRIS class and includes the QRHelper for QR code related functionalities.
   */
  constructor() {
    super();
  }
}
