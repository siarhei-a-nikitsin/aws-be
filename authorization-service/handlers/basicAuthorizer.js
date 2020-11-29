import { logEvent } from '../common/logging';

const generatePolicy = (principalId, resource, effect = 'Allow') => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});

const handler = async (event, ctx, cb) => {
  logEvent(event);

  if (event.type !== 'TOKEN') {
    cb('Unauthorized');
  }

  try {
    const { authorizationToken } = event;

    const authorizationTokenParts = authorizationToken.split(' ');

    let isAllowed = true;
    let userName = 'unknown';

    if (!authorizationToken || authorizationTokenParts.length !== 2
      || authorizationTokenParts[0] !== 'Basic' || !authorizationTokenParts[1]) {
      isAllowed = false;
    } else {
      try {
        const encodedCredentials = authorizationToken.split(' ')[1];

        const buffer = Buffer.from(encodedCredentials, 'base64');
        const plainCredentials = buffer.toString('utf-8').split(':');
        userName = plainCredentials[0];
        const password = plainCredentials[1];

        console.log(`username: ${userName} and password: ${password}, buffer = ${buffer.toString('utf-8')}`);

        const expectedUserPassword = process.env[userName];

        isAllowed = expectedUserPassword === password;
      } catch (e) {
        isAllowed = false;
      }
    }

    const policy = generatePolicy(userName, event.methodArn, isAllowed ? 'Allow' : 'Deny');

    cb(null, policy);
  } catch (error) {
    cb(`Unauthorized: ${error.message}`);
  }
};

export default handler;
