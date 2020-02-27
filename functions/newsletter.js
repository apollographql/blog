const Mailchimp = require('mailchimp-api-v3');
const crypto = require('crypto');

const {MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID} = process.env;
const mailchimp = new Mailchimp(MAILCHIMP_API_KEY);

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const hash = crypto
      .createHash('md5')
      .update(event.body.toLowerCase())
      .digest('hex');
    const memberPath = `/lists/${MAILCHIMP_LIST_ID}/members/${hash}`;
    await mailchimp.put(memberPath, {
      email_address: event.body,
      status_if_new: 'subscribed'
    });

    await mailchimp.post(memberPath + '/tags', {
      tags: [
        {
          name: 'Blog',
          status: 'active'
        }
      ]
    });

    return {
      statusCode: 200,
      body: 'OK'
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message
    };
  }
};
