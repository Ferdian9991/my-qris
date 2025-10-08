import fs from "fs";
import QRCode from "qrcode";
import { Jimp } from "jimp";
import QrCode from "qrcode-reader";
import QrCodeTerminal from "qrcode-terminal";
import DefaultError from "./errors/DefaultError";

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
    } catch (error) {
      throw new DefaultError("Failed to read image: " + error.message);
    }
  }

  /**
   * Reads a QR code from an image URL and returns the decoded text.
   *
   * @param {string} url - The URL of the image containing the QR code.
   * @return {Promise<string>} A promise that resolves to the decoded QR code text.
   */
  static async readQRCodeFromURL(url: string): Promise<string> {
    // Load image from URL using Jimp
    const image = await Jimp.read(url);

    // Create a QR code reader
    const qr = new QrCode();

    // Read the QR code from the image
    return new Promise((resolve) => {
      qr.callback = (err, value) => {
        if (err) {
          throw new DefaultError("Failed to decode QR Code: " + err);
        } else {
          resolve(value?.result || null);
        }
      };

      qr.decode(image.bitmap);
    });
  }

  /**
   * Generates a QR code and prints its Data URL to the console.
   *
   * @param {string} code - The text to encode in the QR code.
   * @return {Promise<string>} A promise that resolves to the Data URL of the generated QR code.
   */
  static async generateQRDataUrl(code: string): Promise<string> {
    try {
      return await QRCode.toDataURL(code);
    } catch (err) {
      throw new DefaultError("Failed to generate QR Code: " + err.message);
    }
  }

  /**
   * Generates a QR code and prints it to the terminal.
   *
   * @param {string} code - The text to encode in the QR code.
   * @param {boolean} small - Whether to generate a small-sized QR code.
   * @return {Promise<void>} A promise that resolves when the QR code has been printed to the terminal.
   */
  static async printQRTerminal(
    code: string,
    small: boolean = false
  ): Promise<void> {
    try {
      QrCodeTerminal.generate(code, { small });
    } catch (error) {
      throw new DefaultError(
        "Failed to print QR Code to terminal: " + error.message
      );
    }
  }
}
