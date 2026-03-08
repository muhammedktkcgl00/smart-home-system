import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import AppText from "../../components/common/AppText"
import AppInput from "../../components/common/AppInput"
import AppButton from "../../components/common/AppButton"
import colors from "../../theme/colors"
import spacing from "../../theme/spacing"

export default function ResetPasswordScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.title}>Reset Password</AppText>
        <AppText style={styles.subtitle}>
          Enter your email address and we will send you a reset link.
        </AppText>
      </View>

      <View style={styles.form}>
        <AppInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.buttonSpacer} />

        <AppButton title="Send Reset Link" onPress={() => {}} />

        <TouchableOpacity
          style={styles.backWrapper}
          onPress={() => navigation.navigate("Login")}
        >
          <AppText style={styles.backText}>Back to Sign In</AppText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: 80,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    marginTop: spacing.lg,
  },
  buttonSpacer: {
    height: spacing.lg,
  },
  backWrapper: {
    alignItems: "center",
    marginTop: spacing.lg,
  },
  backText: {
    color: colors.primary,
    fontWeight: "600",
  },
})