import React from "react"
import './App.css'

import { createBrowserRouter, createRoutesFromElements, RouterProvider , Route } from "react-router-dom"
import NavBar from "./components/navbar/navbar"
import SellerHomePage from "./pages/SellerHomePage/seller-home-page"
import HomePageForm from "./pages/SellerHomePage/homepage-form/homepage-form"
import ListPropertyPage from "./pages/ListPropertyPage/list-property-page"
import Overlay from "./components/overlay/overlay"
import NotFound from "./components/notfound/notfound"
import ConformationPage from "./pages/ConformationPage/conformation-page"
import PreopertyPreview from "./pages/PropertyPreview/property-preview"
import Verify from "./pages/SellerHomePage/verify/verify"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<NavBar/>}>
      <Route path="/" element={<SellerHomePage/>}>
          <Route index element={<HomePageForm/>}/>
          <Route path="verify" element={<Verify/>}/>
      </Route>
      <Route path="list-property" element={<ListPropertyPage/>}/>
      <Route path="list-property/conformation-page" element={<ConformationPage/>}/>
      <Route path="overlay" element={<Overlay/>}/>
      <Route path="property-preview" element={<PreopertyPreview/>}/>
      <Route path="*" element={<NotFound/>}/>
  </Route>
))

export default function App(){
  return(
    <RouterProvider router={router}/>
  )
}