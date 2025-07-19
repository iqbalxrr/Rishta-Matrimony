import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthProvider from './Contex/AuthProvider';
import { RouterProvider } from 'react-router';
import { router } from './Routers/Router';

// ✅ import TanStack Query Client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ create a client instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
