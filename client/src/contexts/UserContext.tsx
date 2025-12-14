import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useLocalStorage from '@/hooks/useLocalStorage';
import { base } from '@/lib/base';
import type { User } from '@/lib/interfaces';

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetchUser: () => void;
    clearUser: () => void;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage<string | null>("accessToken", null);
    const [, setRefreshToken, removeRefreshToken] = useLocalStorage<string | null>("refreshToken", null);

    const { data: userData, isLoading, isError, error, refetch } = useQuery<User | null>({
        queryKey: ['userData', accessToken], // Add accessToken to queryKey so it refetches on change
        queryFn: async () => {
            if (!accessToken) {
                return null;
            }
            const response = await axios.get(`${base}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data.data;
        },
        enabled: !!accessToken, // Only fetch if accessToken exists
    });

    const login = (newAccessToken: string, newRefreshToken: string) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    };

    const logout = () => {
        removeAccessToken();
        removeRefreshToken();
        // Optional: you might want to clear the query cache or reset the user state immediately if needed,
        // but since accessToken becomes null, the query key changes and it might re-run or be disabled.
        // However, react-query will keep the stale data by default. 
        // We rely on the `userData` being derived from the query. 
        // If accessToken is null, query is disabled. `userData` might persist from cache.
        // Let's ensure we return null if no token.
    };

    // If there is no access token, force user to null even if query has stale data
    const user = accessToken ? (userData || null) : null;

    return (
        <UserContext.Provider
            value={{
                user,
                isLoading,
                isError,
                error: error as Error | null,
                refetchUser: refetch,
                clearUser: logout, // Map clearUser to logout for backward compatibility or clarity
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
