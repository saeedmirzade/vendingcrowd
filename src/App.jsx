import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/notFount/NotFound";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const Login = lazy(() => import("./sections/layouts/login/Login"));
  const Home = lazy(() => import("./sections/layouts/home/Home"));
  const OrderDetail = lazy(() =>
    import("./sections/layouts/orderDetail/OrderDetail")
  );

  const UserDash = lazy(() => import("./sections/layouts/userDash/UserDash"));
  const googleClientId = "YOUR_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<UserDash />} />
            <Route path="/dashboard/:page" element={<UserDash />} />
            <Route path="/order-details/:id" element={<OrderDetail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
