const qrcode = require('qrcode');

function generateQrCode(data, version) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(
      data,
      {
        format: 'image/jpeg',
        version,
      },
      (err, url) => {
        if (err) return reject(err);
        const base64 = url.split(',')[1];
        resolve(base64);
      }
    );
  });
}

module.exports = {
  generateQrCode,
};
