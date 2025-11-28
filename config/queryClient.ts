import { QueryClient } from '@tanstack/react-query';

// Default options for the QueryClient
const defaultQueryClientOptions = {
    queries: {
        // How long the data should be considered "fresh" before fetching in the background
        staleTime: 1000 * 60 * 5, // 5 minutes
        // How long unused data stays in the cache before being garbage collected
        cacheTime: 1000 * 60 * 15, // 15 minutes
        // Disable automatic refetching on window focus
        refetchOnWindowFocus: false,
        // Number of times to retry a failed request
        retry: 2, 
    },
    mutations: {
        // --- Global Error Handling for all Mutations ---
        onError: (error: Error) => {
            // This is the ideal place to show a global toast/alert for failed mutations.
            console.error("Global Mutation Error:", error.message);
            // Example for Expo/React Native: 
            // Alert.alert("Error", error.message || "An unknown error occurred.");
        }
    }
};

// Create the client instance
export const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
});