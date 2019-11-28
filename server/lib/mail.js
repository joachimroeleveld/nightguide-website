const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TEMPLATE_IDS = {
  guestList: 'd-0dea0cb92635483a8917e8f83ca91e63',
  qrCode: 'd-c43f13fff33d4c03a18b335832ca10a4',
};

function sendMail(msg) {
  return sgMail.send(msg);
}

module.exports = {
  TEMPLATE_IDS,
  sendMail,
};
