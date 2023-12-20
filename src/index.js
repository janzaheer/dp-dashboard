import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux";
import store from "./store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from '@react-oauth/google';


let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="597419296556-vv79jg6uqvko1rmqndeqllpjdf5tm13a.apps.googleusercontent.com">
        <Provider store={store}>
            <PersistGate persistor={persistor} >
                <App />
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>

);
// clindID
// 169858684361-la5bpa0vlthm20bvi108ilgfcn47egdq.apps.googleusercontent.com

// CSS
// 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