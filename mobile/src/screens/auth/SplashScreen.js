import React from "react"
import { View, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"

import AppText from "../../components/common/AppText"
import AppButton from "../../components/common/AppButton"
import colors from "../../theme/colors"
import spacing from "../../theme/spacing"

export default function SplashScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../../../assets/images/splash-home.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <AppText style={styles.title}>
          Easy living with your{"\n"}smart home 💡
        </AppText>

        <AppText style={styles.description}>
          Get your smart devices in one place and manage all of these with a
          few taps.
        </AppText>

        <View style={styles.dotsWrapper}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <AppButton
          title="Continue"
          onPress={() => navigation.navigate("Login")}
        />
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
    paddingBottom: spacing.xl,
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    marginTop: spacing.lg,
  },
  image: {
    width: 300,
    height: 300,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 38,
    marginBottom: spacing.md,
  },
  description: {
    textAlign: "center",
    color: colors.textSecondary,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  dotsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#D0D5DD",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
  },
  buttonWrapper: {
    marginBottom: spacing.md,
  },
})