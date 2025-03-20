import React ,{lazy,Suspense} from "react";
import ReactDOM from "react-dom";
import AnimatedBook from "./components/BookLoader";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App =lazy(()=>import('./App'))

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="186528455819-lv45ts5lvieg87p536o2ka61qd5uaprc.apps.googleusercontent.com">
    <Suspense fallback={<AnimatedBook />}>
    <App />
    </Suspense >
    </GoogleOAuthProvider>
  </React.StrictMode>
);