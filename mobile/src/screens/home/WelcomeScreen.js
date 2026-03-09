import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"

import AppText from "../../components/common/AppText"
import colors from "../../theme/colors"
import { useAuth } from "../../store/auth/AuthContext"

export default function WelcomeScreen() {
  const { logout } = useAuth()

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Welcome Screen</AppText>
      <AppText style={styles.subtitle}>Fake login çalışıyor.</AppText>

      <TouchableOpacity style={styles.button} onPress={logout} activeOpacity={0.8}>
        <AppText style={styles.buttonText}>Logout</AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
})