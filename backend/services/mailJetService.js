const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_SECRET_KEY
);

const sendEmail = async ({ to, subject, message }) => {
  try {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "billysimmons577@gmail.com",
            Name: "Test",
          },
          To: [
            {
              Email: to,
              Name: to.split("@")[0],
            },
          ],
          Subject: subject,
          TextPart: message,
          HTMLPart: `<h3>${message}</h3>`,
        },
      ],
    });

    const result = await request;
    const response = result.body.Messages[0];

    return response;
  } catch (err) {
    throw new Error("Failed to send email via Mailjet: " + err.message);
  }
};

module.exports = {
  sendEmail,
};
