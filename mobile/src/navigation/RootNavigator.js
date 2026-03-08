import React from "react"
import AuthNavigator from "./AuthNavigator"
import AppNavigator from "./AppNavigator"

export default function RootNavigator() {

  const isLoggedIn = false

  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />

}