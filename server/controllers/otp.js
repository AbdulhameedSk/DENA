const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

async function sendMail(email, otp) {
  const params = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<p>Your OTP is: <b>${otp}</b>. This OTP is valid for 3 minutes.</p>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'OTP Verification'
      }
    },
    Source: 'venkateshabotula2002@gmail.com',
  };

  try {
    const result = await ses.sendEmail(params).promise();
    return result;
  } catch (err) {
    console.log(err);
  }
}