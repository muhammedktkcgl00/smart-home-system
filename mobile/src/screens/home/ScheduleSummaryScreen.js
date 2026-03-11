import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ScheduleSummaryScreen({ navigation }) {
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("ScheduleCustomDate");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={22} color="#2F3A4E" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Schedule Summary</Text>
          <Text style={styles.subtitle}>
            Bu sonraki ekranı sonra figmaya göre yapacağız.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    color: "#3F4754",
    fontFamily: "CatamaranBold",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#8F98A8",
    fontFamily: "NotoSansRegular",
    textAlign: "center",
  },
});