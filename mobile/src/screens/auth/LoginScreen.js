import React, { useState } from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import AppText from "../../components/common/AppText"
import AppInput from "../../components/common/AppInput"
import AppButton from "../../components/common/AppButton"
import colors from "../../theme/colors"
import spacing from "../../theme/spacing"

export default function LoginScreen() {
  const navigation = useNavigation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../assets/images/login-home.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <AppText style={styles.title}>Sign In</AppText>
        <AppText style={styles.subtitle}>
          Enter your email and password to continue
        </AppText>

        <View style={styles.form}>
          <AppInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.inputSpacer} />

          <AppInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotWrapper}
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <AppText style={styles.forgotText}>Forgot Password?</AppText>
          </TouchableOpacity>

          <AppButton title="Sign In" onPress={() => {}} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  image: {
    width: 240,
    height: 220,
  },
  content: {
    flex: 1,
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
    marginBottom: spacing.xl,
  },
  form: {
    marginTop: spacing.md,
  },
  inputSpacer: {
    height: spacing.md,
  },
  forgotWrapper: {
    alignSelf: "flex-end",
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  forgotText: {
    color: colors.primary,
    fontWeight: "600",
  },
})