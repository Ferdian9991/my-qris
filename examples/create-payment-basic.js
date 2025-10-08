import { makeQRPayment, readQRCodeFromURL } from "my-qris";

(async () => {
  // Read QR code from URL
  const qris = await readQRCodeFromURL("https://example.com/qrcode.png");

  // Create a new QR code payment with specified amount and fee
  const newCode = makeQRPayment({
    qrCode: qris,
    // Specify the amount and fee details here
    amount: 10000,
    fee: 30,
    feeType: "percentage",
  });

  console.log(newCode);
})();
