'use client';

import { useEffect, useState } from 'react';

export interface AuthUser {
    email: string;
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function checkAuth() {
            try {
                const res = await fetch('/api/admin/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.authenticated && isMounted) {
                        setUser({ email: data.user.email });
                        setIsAdmin(true);
                    } else if (isMounted) {
                        setUser(null);
                        setIsAdmin(false);
                    }
                } else if (isMounted) {
                    setUser(null);
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                if (isMounted) {
                    setUser(null);
                    setIsAdmin(false);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    return { user, isAdmin, loading };
}
