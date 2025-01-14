"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decryptObject } from '@/utils/cryptoUtils';


const ProtectedRoute = ({ children, requiredRole }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const encryptedUser = localStorage.getItem('user');

        if (!encryptedUser) {
            router.replace('/login');
        } else {
            try {

                const decryptedUser = decryptObject(encryptedUser);

                if (!decryptedUser) {
                    router.replace('/login');
                    return;
                }

                const parsedUser = decryptedUser;

                if (parsedUser.role !== requiredRole) {
                    router.replace('/unauthorized');
                } else {
                    setIsAuthorized(true);
                }
            } catch (error) {
                console.error("Error decrypting user data:", error);
                router.replace('/login');
            }
        }
    }, [router, requiredRole]);

    if (!isAuthorized) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
