import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-this-in-production';
const key = new TextEncoder().encode(JWT_SECRET);

export interface AdminPayload {
    email: string;
    role: string;
}

export async function signJWT(payload: AdminPayload): Promise<string> {
    return await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(key);
}

export async function verifyJWT(token: string): Promise<AdminPayload | null> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        });
        return payload as unknown as AdminPayload;
    } catch (error) {
        return null;
    }
}

export async function getSession(): Promise<AdminPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;
    return await verifyJWT(token);
}
