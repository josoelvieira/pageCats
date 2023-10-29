"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./services/queryClient"

export const ReactQueryProvider = ({children}:  {children: React.ReactNode}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}