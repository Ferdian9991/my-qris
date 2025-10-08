import fs from "fs";
import { Jimp } from "jimp";
import QrCode from "qrcode-reader";

/**
 * A helper class for generating or reading QR codes.
 * @class QRHelper
 */
export default class QRHelper {
  /**
   * Reads a QR code from an image file and returns the decoded text.
   *
   * @param {string} imagePath - The path to the image file containing the QR code.
   * @return {Promise<string>} A promise that resolves to the decoded QR code text.
   */
  static async readQRCodeFromFile(imagePath: string): Promise<string> {
    try {
      // Read binary file into a Buffer
      const fileBuffer = await fs.promises.readFile(imagePath);

      // Pass Buffer to Jimp
      const image = await Jimp.read(fileBuffer);

      // Create a QR code reader
      const qr = new QrCode();

      return new Promise((resolve, reject) => {
        qr.callback = (err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value?.result || null);
          }
        };

        qr.decode(image.bitmap);
      });
    } catch (error: any) {
      throw new Error("Failed to read image: " + error.message);
    }
  }

  /**
   * Reads a QR code from an image URL and returns the decoded text.
   *
   * @param {string} url - The URL of the image containing the QR code.
   * @return {Promise<string>} A promise that resolves to the decoded QR code text.
   */
  static async readQRCodeFromURL(url: string): Promise<string> {
    try {
      // Load image from URL using Jimp
      const image = await Jimp.read(url);

      // Create a QR code reader
      const qr = new QrCode();

      return new Promise((resolve, reject) => {
        qr.callback = (err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value?.result || null);
          }
        };

        qr.decode(image.bitmap);
      });
    } catch (error: any) {
      throw new Error("Failed to read image from URL: " + error.message);
    }
  }
}
