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
 * Re-exports the printQRTerminal method from QRHelper for external use.
 */
export const printQRTerminal = QRHelper.printQRTerminal;

/**
 * Re-exports the makeQRPayment method from QRIS for external use.
 */
export const makeQRPayment = QRIS.makeQRPayment;

/**
 * Re-exports the getInfo method from QRIS for external use.
 */
export const getInfo = QRIS.getInfo;
