import DefaultError from "./errors/DefaultError";
import ValidationError from "./errors/ValidationError";

/**
 * QRIS class for QR payment helpers
 * @class QRIS
 */
export default class QRIS {
  /**
   * Create a QR payment string with the specified amount and optional fee
   *
   * @param {Object} params - The parameters for creating the QR payment
   * @param {string} params.qrCode - The original QR code string
   * @param {number} params.amount - The amount to be paid
   * @param {number} [params.fee=0] - Optional fee to be added to the amount
   * @returns {string} - The modified QR code string with the new amount and fee
   */
  public static makeQRPayment({
    qrCode,
    amount,
    fee = 0,
    feeType = "flat",
  }: {
    qrCode: string;
    amount: number;
    fee?: number;
    feeType?: "flat" | "percentage";
  }): string {
    // Validate QR input
    if (!qrCode || typeof qrCode !== "string") {
      throw new ValidationError("QR code must be a non-empty string");
    }

    if (!QRIS.checkIsValid(qrCode)) {
      throw new ValidationError("Invalid QR code CRC16");
    }

    // Validate amount
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ValidationError("Amount must be a positive number");
    }

    // Validate amount is integer
    if (!Number.isInteger(amount)) {
      throw new ValidationError("Amount must be an integer");
    }

    // Validate fee
    if (!Number.isFinite(fee) || fee < 0) {
      throw new ValidationError("Fee must be a non-negative number");
    }

    if (feeType !== "flat" && feeType !== "percentage") {
      throw new ValidationError(
        "Invalid fee type, must be 'flat' or 'percentage'"
      );
    }

    if (feeType === "percentage" && fee > 100) {
      throw new ValidationError("Percentage fee cannot exceed 100%");
    }

    // Prepare QR base string (strip CRC16)
    const qris = qrCode.slice(0, -4);

    // Calculate amount + fee
    let finalFee = fee;
    if (fee > 0 && feeType === "percentage") {
      finalFee = Math.round((fee / 100) * amount);
    }

    const total = amount + finalFee;
    if (total <= 0) {
      throw new ValidationError("Total payment must be greater than zero");
    }

    // Construct new amount field
    let qrisAmount =
      "54" + total.toString().length.toString().padStart(2, "0") + total;

    // Extract fixed values and rebuild QR
    const qrisFixedValues = qris.replace(/010211/g, "010212").split("5802ID");
    qrisAmount += "5802ID";

    // Recalculate CRC16
    const qrisFixed =
      qrisFixedValues[0].trim() + qrisAmount + qrisFixedValues[1].trim();

    const qrisResult = qrisFixed + QRIS.convertCRC16(qrisFixed);

    // Ensure output is valid
    if (!QRIS.checkIsValid(qrisResult)) {
      throw new DefaultError(
        "Failed to generate valid QR code, please try again"
      );
    }

    return qrisResult;
  }

  /**
   * Validate if the provided QR code string is valid
   *
   * @param {string} qrCode - The QR code string to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  private static checkIsValid(qrCode: string): boolean {
    const qris = qrCode.slice(0, -4);
    const crc = qrCode.slice(-4);
    return crc === QRIS.convertCRC16(qris);
  }

  /**
   * Convert a string to CRC16 checksum
   *
   * @param {string} str - The input string to convert
   * @returns {string} - The CRC16 checksum as a hexadecimal string
   */
  private static convertCRC16(str: string): string {
    let crc = 0xffff;

    for (let c = 0; c < str.length; c++) {
      // XOR the high byte of CRC with the current character's code
      crc ^= str.charCodeAt(c) << 8;

      for (let i = 0; i < 8; i++) {
        // if MSB is set, shift left and apply polynomial (0x1021)
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          // if MSB not set, just shift left
          crc = crc << 1;
        }

        // keep CRC constrained to 16 bits
        crc &= 0xffff;
      }
    }

    // convert to 4-digit uppercase hex string
    let hex = (crc & 0xffff).toString(16).toUpperCase();

    // pad if only 3 chars for edge case
    if (hex.length === 3) hex = "0" + hex;

    return hex;
  }
}
