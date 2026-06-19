import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '../../lib/theme';

function AnimatedTabIcon({
  color,
  focused,
  inactiveIcon,
  activeIcon,
  activeBg,
}: {
  color: string;
  focused: boolean;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  activeBg: string;
}) {
  const focus = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    focus.value = withSpring(focused ? 1 : 0, {
      damping: 14,
      stiffness: 180,
      mass: 0.7,
    });
  }, [focus, focused]);

  const iconWrapMotion = useAnimatedStyle(() => ({
    backgroundColor: focused ? activeBg : 'transparent',
    transform: [
      { translateY: interpolate(focus.value, [0, 1], [0, -3]) },
      { scale: interpolate(focus.value, [0, 1], [1, 1.08]) },
    ],
  }));

  const iconMotion = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(focus.value, [0, 1], [0.92, 1.08]) },
      { rotate: `${interpolate(focus.value, [0, 1], [-4, 0])}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.iconWrap, iconWrapMotion]}>
      <Animated.View style={iconMotion}>
        <Ionicons name={focused ? activeIcon : inactiveIcon} size={16} color={color} />
      </Animated.View>
    </Animated.View>
  );
}

function AnimatedTabLabel({ color, focused, label }: { color: string; focused: boolean; label: string }) {
  const focus = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    focus.value = withTiming(focused ? 1 : 0, { duration: 180 });
  }, [focus, focused]);

  const labelMotion = useAnimatedStyle(() => ({
    opacity: interpolate(focus.value, [0, 1], [0.68, 1]),
    transform: [{ translateY: interpolate(focus.value, [0, 1], [1, -1]) }],
  }));

  return <Animated.Text style={[styles.label, { color }, labelMotion]}>{label}</Animated.Text>;
}

function makeTabOptions(
  label: string,
  inactiveIcon: keyof typeof Ionicons.glyphMap,
  activeIcon: keyof typeof Ionicons.glyphMap,
  activeBg: string
) {
  return {
    title: label,
    tabBarLabel: ({ color, focused }: { color: string; focused: boolean }) => (
      <AnimatedTabLabel color={color} focused={focused} label={label} />
    ),
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <AnimatedTabIcon
        color={color}
        focused={focused}
        inactiveIcon={inactiveIcon}
        activeIcon={activeIcon}
        activeBg={activeBg}
      />
    ),
  };
}

export default function TabLayout() {
  const { activeTheme, themeMode } = useAppTheme();

  return (
    <Tabs
      key={themeMode}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: activeTheme.text,
        tabBarInactiveTintColor: activeTheme.textMuted,
        animation: 'shift',
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 190,
          },
        },
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: activeTheme.tabBar,
            borderTopColor: activeTheme.border,
          },
        ],
      }}
    >
      <Tabs.Screen name="index" options={makeTabOptions('Home', 'home-outline', 'home', 'rgba(115, 103, 240, 0.16)')} />
      <Tabs.Screen name="learn" options={makeTabOptions('Learn', 'library-outline', 'library', 'rgba(0, 210, 255, 0.16)')} />
      <Tabs.Screen name="explore" options={makeTabOptions('Explore', 'compass-outline', 'compass', 'rgba(255, 75, 43, 0.16)')} />
      <Tabs.Screen name="profile" options={makeTabOptions('Profile', 'person-outline', 'person', 'rgba(52, 199, 89, 0.16)')} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 1,
    paddingBottom: 6,
    paddingTop: 8,
    elevation: 0,
  },
  iconWrap: {
    width: 36,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
});
