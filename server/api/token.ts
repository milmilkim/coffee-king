import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY!;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const payload = {
    coffee: body.coffee,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
  };

  const token = jwt.sign(payload, secretKey);
  return { token };
});
