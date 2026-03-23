import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

const MIN_SIZE = 0;
const MAX_SIZE = 40;
const TICK_SPACING = 11;
const SUBTICKS_PER_UNIT = 10;
const INITIAL_SIZE = 20;

export default function SpaceTypeScreen({ navigation }) {
  const [roomName, setRoomName] = useState("Living room");
  const [unit, setUnit] = useState("m2");
  const [roomSize, setRoomSize] = useState(INITIAL_SIZE);
  const [rulerWidth, setRulerWidth] = useState(0);

  const scrollRef = useRef(null);
  const didSetInitialPosition = useRef(false);

  const ticks = useMemo(() => {
    const result = [];
    const totalTickCount = (MAX_SIZE - MIN_SIZE) * SUBTICKS_PER_UNIT + 1;

    for (let index = 0; index < totalTickCount; index += 1) {
      const remainder = index % SUBTICKS_PER_UNIT;
      const rawValue = MIN_SIZE + index / SUBTICKS_PER_UNIT;
      const snappedValue = Math.round(rawValue);

      let type = "minor";

      if (remainder === 0) {
        type = "major";
      } else if (remainder === 5) {
        type = "medium";
      }

      result.push({
        id: `tick-${index}`,
        index,
        type,
        value: snappedValue,
      });
    }

    return result;
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("SetSpaceName");
  };

  const handleContinue = () => {
    navigation.navigate("AllDevices");
  };

  const getTickIndexForValue = (value) => {
    const clampedValue = Math.max(MIN_SIZE, Math.min(MAX_SIZE, value));
    return (clampedValue - MIN_SIZE) * SUBTICKS_PER_UNIT;
  };

  const getScrollXForValue = (value) => {
    return getTickIndexForValue(value) * TICK_SPACING;
  };

  const getNearestValueFromScrollX = (scrollX) => {
    const rawIndex = scrollX / TICK_SPACING;
    const nearestValue = Math.round(MIN_SIZE + rawIndex / SUBTICKS_PER_UNIT);

    return Math.max(MIN_SIZE, Math.min(MAX_SIZE, nearestValue));
  };

  const scrollToValue = (value, animated = true) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      x: getScrollXForValue(value),
      animated,
    });
  };

  const ensureInitialRulerPosition = () => {
    if (rulerWidth <= 0 || didSetInitialPosition.current) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToValue(INITIAL_SIZE, false);
        didSetInitialPosition.current = true;
      });
    });
  };

  useEffect(() => {
    ensureInitialRulerPosition();
  }, [rulerWidth]);

  const handleSelectValue = (value) => {
    const clampedValue = Math.max(MIN_SIZE, Math.min(MAX_SIZE, value));
    setRoomSize(clampedValue);
    scrollToValue(clampedValue, true);
  };

  const handleRulerScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const nextValue = getNearestValueFromScrollX(scrollX);

    setRoomSize((prev) => (prev === nextValue ? prev : nextValue));
  };

  const handleRulerScrollEnd = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const nextValue = getNearestValueFromScrollX(scrollX);

    setRoomSize(nextValue);
    scrollToValue(nextValue, true);
  };

  const renderTick = (tickItem) => {
    return (
      <TouchableOpacity
        key={tickItem.id}
        activeOpacity={0.85}
        onPress={() => handleSelectValue(tickItem.value)}
        style={styles.tickTouch}
      >
        <View
          style={[
            styles.tick,
            tickItem.type === "minor" && styles.tickMinor,
            tickItem.type === "medium" && styles.tickMedium,
            tickItem.type === "major" && styles.tickMajor,
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2F3A4E" />

      <View style={styles.container}>
        <View style={styles.darkHeader}>
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Create a new space</Text>
              <Text style={styles.headerSubtitle}>Organise your space</Text>
            </View>

            <View style={styles.stepWrapper}>
              <Text style={styles.stepLabel}>Step</Text>
              <Text style={styles.stepValue}>3/7</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.topHandle} />

          <View style={styles.imageCard}>
            <Image
              source={require("../../../assets/images/room-cover.png")}
              style={styles.roomImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.imageActionButton}
              activeOpacity={0.8}
            >
              <AntDesign name="picture" size={18} color="#2F80ED" />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>What’s your room name?</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                value={roomName}
                onChangeText={setRoomName}
                placeholder="Living room"
                placeholderTextColor="#A0A8B7"
                style={styles.input}
              />
            </View>

            <Text style={[styles.label, styles.secondLabel]}>
              What’s your room size?
            </Text>

            <View style={styles.unitRow}>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "m2" && styles.unitButtonActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setUnit("m2")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    unit === "m2" && styles.radioOuterActive,
                  ]}
                >
                  {unit === "m2" && <View style={styles.radioInner} />}
                </View>
                <Text
                  style={[
                    styles.unitButtonText,
                    unit === "m2" && styles.unitButtonTextActive,
                  ]}
                >
                  size in m²
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "ft2" && styles.unitButtonActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setUnit("ft2")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    unit === "ft2" && styles.radioOuterActive,
                  ]}
                >
                  {unit === "ft2" && <View style={styles.radioInner} />}
                </View>
                <Text
                  style={[
                    styles.unitButtonText,
                    unit === "ft2" && styles.unitButtonTextActive,
                  ]}
                >
                  size in ft²
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sizeValueWrapper}>
              <Text style={styles.sizeValue}>{roomSize}</Text>
              <Text style={styles.sizeUnit}>
                {unit === "m2" ? "m²" : "ft²"}
              </Text>
            </View>

            <View
              style={styles.rulerWrapper}
              onLayout={(event) =>
                setRulerWidth(event.nativeEvent.layout.width)
              }
            >
              <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
                snapToInterval={TICK_SPACING}
                decelerationRate="fast"
                contentContainerStyle={[
                  styles.rulerContent,
                  rulerWidth > 0 && {
                    paddingHorizontal: rulerWidth / 2 - TICK_SPACING / 2,
                  },
                ]}
                onContentSizeChange={ensureInitialRulerPosition}
                onScroll={handleRulerScroll}
                onMomentumScrollEnd={handleRulerScrollEnd}
                onScrollEndDrag={handleRulerScrollEnd}
              >
                {ticks.map(renderTick)}
              </ScrollView>

              <View pointerEvents="none" style={styles.centerIndicator} />
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FA",
  },

  container: {
    flex: 1,
    backgroundColor: "#F6F7FA",
  },

  darkHeader: {
    backgroundColor: "#2F3A4E",
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 112,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 10,
  },

  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  headerCenter: {
    alignItems: "center",
    flex: 1,
    marginTop: 4,
    paddingHorizontal: 8,
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 100,
    color: "#FFFFFF",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  headerSubtitle: {
    marginTop: -25,
    fontSize: 15,
    lineHeight: 24,
    color: "#D8DEE8",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  stepWrapper: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 52,
    paddingTop: 20,
    paddingBottom: 4,
  },

  stepLabel: {
    fontSize: 15,
    lineHeight: 55,
    color: "#D6DDE8",
    fontFamily: "NotoSansRegular",
  },

  stepValue: {
    fontSize: 12,
    lineHeight: 15,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
    marginTop: -15,
    textAlign: "right",
  },

  contentCard: {
    flex: 1,
    marginTop: -84,
    marginHorizontal: -1,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    overflow: "hidden",
  },

  topHandle: {
    alignSelf: "center",
    width: 70,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#BAC4D3",
    marginBottom: 14,
  },

  imageCard: {
    marginHorizontal: 30,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },

  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 24,
  },

  imageActionButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#9AA5B5",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  formSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  label: {
    fontSize: 16,
    lineHeight: 22,
    color: "#566171",
    fontFamily: "NotoSansMedium",
    marginBottom: 12,
  },

  secondLabel: {
    marginTop: 20,
  },

  inputWrapper: {
    height: 56,
    borderWidth: 1,
    borderColor: "#DDE3EC",
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  input: {
    fontSize: 18,
    color: "#576171",
    fontFamily: "NotoSansRegular",
  },

  unitRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  unitButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE3EC",
    backgroundColor: "#FFFFFF",
    marginRight: 12,
  },

  unitButtonActive: {
    borderColor: "#2F80ED",
    backgroundColor: "#FFFFFF",
  },

  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#C1C8D4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  radioOuterActive: {
    borderColor: "#2F80ED",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2F80ED",
  },

  unitButtonText: {
    fontSize: 16,
    color: "#9AA4B5",
    fontFamily: "NotoSansRegular",
  },

  unitButtonTextActive: {
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  sizeValueWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 22,
  },

  sizeValue: {
    fontSize: 52,
    lineHeight: 54,
    color: "#2F80ED",
    fontFamily: "CatamaranBold",
  },

  sizeUnit: {
    marginTop: 16,
    marginLeft: 4,
    fontSize: 16,
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  rulerWrapper: {
    marginTop: 8,
    height: 78,
    justifyContent: "flex-end",
    position: "relative",
    overflow: "hidden",
  },

  rulerContent: {
    alignItems: "center",
    height: 78,
  },

  tickTouch: {
    width: TICK_SPACING,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
  },

  tick: {
    width: 4,
    borderRadius: 999,
  },

  tickMinor: {
    height: 32,
    backgroundColor: "#D7E8FF",
  },

  tickMedium: {
    height: 48,
    backgroundColor: "#C6DCF9",
  },

  tickMajor: {
    height: 68,
    backgroundColor: "#C6DCF9",
  },

  centerIndicator: {
    position: "absolute",
    alignSelf: "center",
    width: 4,
    height: 68,
    borderRadius: 999,
    backgroundColor: "#2F80ED",
    top: 5,
  },

  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
  },

  continueButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  continueButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },
});