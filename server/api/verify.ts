import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY!;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const decoded = jwt.verify(body.token, secretKey);
    return { data: decoded };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: '잘못된 토큰이다',
    });
  }
});
