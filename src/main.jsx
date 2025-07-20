import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthProvider from './Contex/AuthProvider';
import { RouterProvider } from 'react-router';
import { router } from './Routers/Router';

// ✅ TanStack Query Client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// ✅ Query Client & Stripe Key
const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_PYMENT_PUB_KEY); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
