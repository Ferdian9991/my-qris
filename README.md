<p align="center">
  <img src="https://github.com/Ferdian9991/my-qris/blob/main/banner.png" alt="My QRIS Banner" width="600">
</p>

<h1 align="center">
  <b>My QRIS</b> <br>
</h1>

<p align="center">A lightweight JavaScript package for generating and manipulating <b>QRIS (QR Code Indonesian Standard)</b> payments dynamically.</p>
  
<p align="center">
  <a href="https://github.com/Ferdian9991/my-qris/stargazers"><img src="https://img.shields.io/github/stars/Ferdian9991/my-qris?style=for-the-badge" /></a>
  <a href="https://github.com/Ferdian9991/my-qris/network/members"><img src="https://img.shields.io/github/forks/Ferdian9991/my-qris?style=for-the-badge" /></a>
  <a href="https://www.npmjs.com/package/my-qris"><img src="https://img.shields.io/npm/v/my-qris?style=for-the-badge&color=blue" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/Ferdian9991/my-qris?style=for-the-badge&color=green" /></a>
</p>

---

## 🚀 Installation

```bash
npm install my-qris
# or
yarn add my-qris
```

---

## 🔧 Usage Examples

### 1️⃣ Basic Payment QR

```js
import { makeQRPayment, readQRCodeFromURL } from "my-qris";

(async () => {
  const qris = await readQRCodeFromURL("https://example.com/qrcode.png");

  const newCode = makeQRPayment({
    qrCode: qris,
    amount: 10000,
    fee: 30,
    feeType: "percentage",
  });

  console.log(newCode);
})();
```

### 2️⃣ Generate Data URL

```js
import { generateQRDataUrl, makeQRPayment, readQRCodeFromURL } from "my-qris";

(async () => {
  const qris = await readQRCodeFromURL("https://example.com/qrcode.png");

  const newCode = makeQRPayment({
    qrCode: qris,
    amount: 10000,
    fee: 30,
    feeType: "percentage",
  });

  const qrUrl = await generateQRDataUrl(newCode);
  console.log(qrUrl);
})();
```

### 3️⃣ Print QR in Terminal

```js
import { makeQRPayment, printQRTerminal, readQRCodeFromURL } from "my-qris";

(async () => {
  const qris = await readQRCodeFromURL("https://example.com/qrcode.png");

  const newCode = makeQRPayment({
    qrCode: qris,
    amount: 10000,
    fee: 30,
    feeType: "percentage",
  });

  printQRTerminal(newCode, true);
})();
```

---

## 🧠 Function Reference

| Function                                          | Description                                                     | Parameters                                                                                                                    | Returns                      |
| ------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `readQRCodeFromURL(url)`                          | Reads and decodes a QR code from an image URL.                  | `url`: string — the source image URL.                                                                                         | QRIS data string             |
| `readQRCodeFromFile(filePath)`                          | Reads and decodes a QR code from an file locally.                  | `filePath`: string — the local path of image source.                                                                                         | QRIS data string             |
| `makeQRPayment({ qrCode, amount, fee, feeType })` | Generates a new QRIS payment code based on an existing QR code. | - `qrCode`: base QR string<br>- `amount`: transaction amount<br>- `fee`: fee value<br>- `feeType`: `"percentage"` or `"flat"` | New QRIS code string         |
| `generateQRDataUrl(qrString)`                     | Converts QRIS string into a Base64 QR image data URL.           | `qrString`: QRIS code string                                                                                                  | `Promise<string>` (data URL) |
| `getInfo(qrString)`                     | Detail information of QRIS like merchant name, etc.           | `qrString`: QRIS code string                                                                                                  | `QRISInfo`: Information of QRIS  |
| `printQRTerminal(qrString, small?)`               | Prints the QR code to terminal using ASCII format.              | - `qrString`: QRIS code<br>- `small` *(optional)*: boolean to toggle small display                                            | `void`                       |

---

## ✅ Features

| Feature                   | Status | Description                                           |
| ------------------------- | ------ | ----------------------------------------------------- |
| Read QR from URL          | ✅      | Decode QR image directly from any URL                 |
| Generate new QRIS payment | ✅      | Create dynamic QRIS with custom amount and fee        |
| Output as Data URL        | ✅      | Generate QR image as base64 data URI                  |
| Terminal QR print         | ✅      | Print QR directly in the console                      |
| Fee type control          | ✅      | Supports percentage and flat fee                      |
| TypeScript support        | ✅      | Fully typed with `.d.ts` declarations                 |
| Error handling            | ✅      | Includes `DefaultError` and `ValidationError` classes |
| Local file QR reading     | ✅      | Decode QR image locally                               |
| Get QRIS information      | ✅      | Detail information of QRIS like merchant name, etc.   |

---

## 🧾 License

**MIT License**
© 2025 Ferdian Satria ([@Ferdian9991](https://github.com/Ferdian9991))
</br>
See [LICENSE](./LICENSE) for more information.

---

## 💡 Contributing

Pull requests and issues are welcome!
If you’d like to add features or improve QR validation, please fork the repo and submit a PR.
