import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/vans/Vans"
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/VanDetail"
import Dashboard, { loader as dashboardLoader } from "./Host/Dashboard"
import Income from "./Host/Income"
import Reviews from "./Host/Reviews"
import HostVans, { loader as hostVansLoader } from "./Host/HostVans"
import HostVanDetail, { loader as hostVanDetailLoader } from "./Host/VanDetailLayout"
import HostVanInfo from "./Host/HostVansDetail"
import HostVanPricing from "./Host/HostVansPricing"
import HostVanPhotos from "./Host/HostVansPhotos"
import NotFound from "./pages/NotFound"
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login"
import Layout from "./components/Layout";
import HostLayout from "./Host/HostLayout";
import Error from "./components/Error"
import { requireAuth } from "./utils"

import "./server"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route
      path="login"
      element={<Login />}
      loader={loginLoader}
      action={loginAction}
    />
    <Route
      path="vans"
      element={<Vans />}
      errorElement={<Error />}
      loader={vansLoader}
    />
    <Route
      path="vans/:id"
      element={<VanDetail />}
      errorElement={<Error />}
      loader={vanDetailLoader}
    />

    <Route path="host" element={<HostLayout />} errorElement={<Error />}>

      <Route
        index
        element={<Dashboard />}
        loader={dashboardLoader}
      />
      <Route
        path="income"
        element={<Income />}
        loader={async ({ request }) => await requireAuth(request)}
      />
      <Route
        path="reviews"
        element={<Reviews />}
        loader={async ({ request }) => await requireAuth(request)}
      />
      <Route
        path="vans"
        element={<HostVans />}
        errorElement={<Error />}
        loader={hostVansLoader}
      />
      <Route
        path="vans/:id"
        element={<HostVanDetail />}
        errorElement={<Error />}
        loader={hostVanDetailLoader}
      >
        <Route
          index
          element={<HostVanInfo />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="pricing"
          element={<HostVanPricing />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="photos"
          element={<HostVanPhotos />}
          loader={async ({ request }) => await requireAuth(request)}
        />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);