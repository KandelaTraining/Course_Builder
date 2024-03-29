import "../styles/css/index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import 'react-quill/dist/quill.snow.css'

import { store, persistor } from "../redux";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
