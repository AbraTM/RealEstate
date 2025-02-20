import React from "react"
import './App.css'

import { createBrowserRouter, createRoutesFromElements, RouterProvider , Route, useLocation, Outlet } from "react-router-dom"
import NavBar from "./components/navbar/navbar"
import SellerHomePage from "./pages/SellerHomePage/seller-home-page"
import ListPropertyPage from "./pages/ListPropertyPage/list-property-page"
import Overlay from "./components/overlay/overlay"
import NotFound from "./components/notfound/notfound"
import ConformationPage from "./pages/ConformationPage/conformation-page"
import PreopertyPreview from "./pages/PropertyPreview/property-preview"
import Properties_Page from "./pages/Properties/properties-page"
import Property from "./pages/Properties/property"
import Homepage from "./pages/HomePage/homepage"
import UserProfile from "./pages/UserProfile/UserProfile"
import Protected from "./components/protected/protected"
import { AuthProvider } from "../context/AuthContext"

const MainLayout = () => {
  const location = useLocation()
  const hideNavBarOnPaths = ["/"]
  return (
    <>
      {!hideNavBarOnPaths.includes(location.pathname) && <NavBar />}
      <Outlet />
    </>
  )
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<MainLayout />}>11
    {/* Public Routes */}
    <Route path="/" element={<Homepage />}/>
    <Route path="login" element={<SellerHomePage/>}/>
    <Route path="properties" element={<Properties_Page/>}/>
    <Route path="properties/:id" element={<Property/>}></Route>

    {/* Protected Routes */}
    <Route element={<Protected />}>
      <Route path="list-property" element={<ListPropertyPage/>}/>
      <Route path="list-property/conformation-page" element={<ConformationPage/>}/>
      <Route path="overlay" element={<Overlay/>}/>
      <Route path="property-preview" element={<PreopertyPreview/>}/>
      <Route path="user-profile" element={<UserProfile/>}/>
    </Route>

    {/* Catch All Undefined Routes */}
    <Route path="*" element={<NotFound/>}/>
  </Route>
))



export default function App(){
  return(
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}