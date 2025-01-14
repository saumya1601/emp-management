"use client";

import store from '@/redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function SignInLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <main>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
}
