import { createHmac, timingSafeEqual } from 'crypto';

const DEFAULT_TTL_DAYS = 90;

const getSecret = (): string => {
    const secret = process.env.PREVIEW_LINK_SECRET;
    if (!secret) {
        throw new Error('PREVIEW_LINK_SECRET is not configured');
    }
    return secret;
};

const computeSignature = (target: string, expires: number): string => {
    return createHmac('sha256', getSecret())
        .update(`${target}.${expires}`)
        .digest('base64url');
};

export const signPreviewToken = (target: string, ttlDays: number = DEFAULT_TTL_DAYS): string => {
    const expires = Math.floor(Date.now() / 1000) + ttlDays * 86400;
    return `${expires}.${computeSignature(target, expires)}`;
};

export const verifyPreviewToken = (target: string, token: string): boolean => {
    try {
        const [expiresStr, signature] = token.split('.');
        const expires = Number(expiresStr);
        if (!Number.isFinite(expires) || !signature) return false;
        if (expires < Math.floor(Date.now() / 1000)) return false;

        const expected = Buffer.from(computeSignature(target, expires));
        const provided = Buffer.from(signature);
        return expected.length === provided.length && timingSafeEqual(expected, provided);
    } catch {
        return false;
    }
};
