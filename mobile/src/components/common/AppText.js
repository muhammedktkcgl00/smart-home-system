import React from "react"
import { Text, StyleSheet } from "react-native"

import colors from "../../theme/colors"
import typography from "../../theme/typography"

export default function AppText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: colors.textPrimary,
    fontSize: typography.body
  }
})