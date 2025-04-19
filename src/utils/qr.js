const QRCode = require('qrcode');

const generarQRCode = async (data) => {
  try {
    const qrCode = await QRCode.toDataURL(data); // Devuelve el QR como una URL de imagen
    return qrCode;
  } catch (err) {
    throw new Error('Error al generar el QR: ' + err.message);
  }
};

module.exports = { generarQRCode };