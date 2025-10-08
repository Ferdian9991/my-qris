/**
 * Represents a default error, typically used when data does not meet specified criteria or requirements.
 *
 * This class extends the native `Error` object and is used to handle default errors in various contexts, such as form inputs or API request payloads.
 * It sets a custom error type code (`E400`) and includes this in the error name.
 *
 * @class DefaultError
 * @extends {Error}
 */
export default class DefaultError extends Error {
  /**
   * The type of error represented by this class.
   *
   * This error type helps identify default failures in logs or error handling mechanisms.
   *
   * @type {string}
   * @default "E400"
   */
  public errType: string = "E400";

  /**
   * Creates an instance of the `ErrorValidation` class.
   *
   * @param {string} message - The error message that provides additional context about the default failure.
   */
  constructor(message: string) {
    super(message);
    this.name = `[${this.errType}]`;
  }
}
