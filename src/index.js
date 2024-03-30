// src/index.js

import React from 'react';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';
import './index.css'; // If you have global styles
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
    );
