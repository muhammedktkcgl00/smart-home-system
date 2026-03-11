import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function HomeOverviewScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate("SetSpaceName");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileWrap}>
            <Image
              source={require("../../../assets/images/avatar.png")}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View>
              <Text style={styles.welcomeText}>Welcome home,</Text>
              <Text style={styles.nameText}>Kristin</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={20} color="#6B7485" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="menu-outline" size={24} color="#6B7485" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={require("../../../assets/images/home-home.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>
            Looks like you have no{"\n"}spaces set up.
          </Text>

          <Text style={styles.subtitle}>
            Add your house and start your smart life
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.homeIndicator} />
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },

  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  welcomeText: {
    fontSize: 14,
    color: "#9AA4B5",
    fontFamily: "NotoSansRegular",
  },

  nameText: {
    fontSize: 18,
    color: "#434C59",
    fontFamily: "CatamaranBold",
    lineHeight: 22,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    width: 1,
    height: 22,
    backgroundColor: "#E7EBF1",
    marginHorizontal: 8,
  },

  imageWrapper: {
    alignItems: "center",
    marginTop: 178,
  },

  image: {
    width: 270,
    height: 210,
  },

  textSection: {
    alignItems: "center",
    marginTop: 34,
  },

  title: {
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    color: "#3F4754",
    fontFamily: "CatamaranBold",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#8F98A8",
    fontFamily: "NotoSansRegular",
  },

  button: {
    marginTop: "auto",
    height: 56,
    borderRadius: 14,
    backgroundColor: "#2F80ED",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "NotoSansMedium",
  },
});