import { FastifyReply } from 'fastify';

export const COOKIE_KEY = 'token';
const cookieOptions = { path: '/api', httpOnly: true };

export const setCookie = (reply: FastifyReply, value: string) => {
  reply.cookie(COOKIE_KEY, value, cookieOptions);
};

export const clearCookie = (reply: FastifyReply) => {
  reply.clearCookie(COOKIE_KEY, cookieOptions);
};
