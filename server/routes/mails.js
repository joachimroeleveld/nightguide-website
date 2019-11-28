const express = require('express');
const bodyParser = require('body-parser');

const { asyncMiddleware } = require('../lib/express');
const qrcode = require('../lib/qrcode');
const mail = require('../lib/mail');
const { getEvent } = require('../lib/api');

const router = express.Router();

router.use(bodyParser.json());

router.post(
  '/qr-code',
  asyncMiddleware(async (req, res, next) => {
    const { eventId, email } = req.body;

    const event = await getEvent(eventId);
    const venue = event.organiser.venue;

    const qrcodeBase64 = await qrcode.generateQrCode(
      venue.tickets.qrCode.text,
      venue.tickets.qrCode.version
    );
    const msg = {
      to: email,
      from: 'noreply@nightguide.app',
      templateId: mail.TEMPLATE_IDS.qrCode,
      dynamic_template_data: {
        venue: venue.name,
        qrCodeInfo: event.tickets.qrCodeInfo.en, // TODO: translate
      },
      attachments: [
        {
          content: qrcodeBase64,
          filename: 'qr-code.png',
          type: 'image/png',
          disposition: 'inline',
          content_id: 'qrcode',
        },
      ],
    };

    await mail.sendMail(msg);

    res.end();
  })
);

router.post(
  '/guest-list',
  asyncMiddleware(async (req, res, next) => {
    const { eventId, email } = req.body;

    const event = await getEvent(eventId);
    const venue = event.organiser.venue;

    const msg = {
      to: email,
      from: 'noreply@nightguide.app',
      templateId: mail.TEMPLATE_IDS.guestList,
      dynamic_template_data: {
        venue: venue.name,
        guestList: venue.tickets.guestListReference,
        guestListInfo: event.tickets.guestListInfo.en, // TODO: translate
      },
    };

    await mail.sendMail(msg);

    res.end();
  })
);

module.exports = router;
