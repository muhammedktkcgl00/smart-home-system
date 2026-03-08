import React from "react"
import { View, StyleSheet } from "react-native"

import AppText from "../../components/common/AppText"
import AppButton from "../../components/common/AppButton"

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <AppText>Login Screen</AppText>

      <AppButton title="Login" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})