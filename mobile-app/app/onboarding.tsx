import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Platform, Pressable } from 'react-native';
import { Theme } from '../constants/Theme';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppLogo } from '../components/AppLogo';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  Easing,
  Extrapolation,
  type SharedValue,
  useAnimatedStyle, 
  useAnimatedScrollHandler,
  interpolate,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const SLIDES = [
  { 
    id: '1', 
    title: 'Neural\nInnovation', 
    desc: 'Deploy enterprise-grade projects with biometric precision and neural speed.', 
    icon: 'flash-outline',
    color: '#7367f0' 
  },
  { 
    id: '2', 
    title: 'Seamless\nLinkage', 
    desc: 'Sync your workspace across the global node network in real-time.', 
    icon: 'infinite-outline',
    color: '#ce9ffc' 
  },
  { 
    id: '3', 
    title: 'Elite\nProtocol', 
    desc: 'Your intellectual assets are shielded by proprietary 2026 neural encryption.', 
    icon: 'shield-half-outline',
    color: '#00E676' 
  },
];

function PaginationDot({ index, scrollX, activeColor }: { index: number; scrollX: SharedValue<number>; activeColor: string }) {
  const animatedDotStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const dotWidth = interpolate(scrollX.value, inputRange, [8, 28, 8], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.25, 1, 0.25], Extrapolation.CLAMP);
    return { width: dotWidth, opacity };
  });

  return <Animated.View style={[styles.dot, { backgroundColor: activeColor }, animatedDotStyle]} />;
}

function OnboardingSlide({ item, index, scrollX }: { item: typeof SLIDES[0]; index: number; scrollX: SharedValue<number> }) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [pulse]);

  const slideMotion = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      opacity: interpolate(scrollX.value, inputRange, [0.25, 1, 0.25], Extrapolation.CLAMP),
      transform: [
        { translateY: interpolate(scrollX.value, inputRange, [26, 0, 26], Extrapolation.CLAMP) },
        { scale: interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], Extrapolation.CLAMP) },
      ],
    };
  });

  const iconMotion = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      transform: [
        { translateX: interpolate(scrollX.value, inputRange, [70, 0, -70], Extrapolation.CLAMP) },
        { rotate: `${interpolate(scrollX.value, inputRange, [-10, 0, 10], Extrapolation.CLAMP)}deg` },
      ],
    };
  });

  const glowMotion = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.18, 0.42]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.92, 1.22]) }],
  }));

  const textMotion = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      transform: [
        { translateX: interpolate(scrollX.value, inputRange, [34, 0, -34], Extrapolation.CLAMP) },
      ],
    };
  });

  return (
    <Animated.View style={[styles.slide, slideMotion]}>
      <Animated.View entering={FadeInUp.delay(180).duration(700)}>
        <Animated.View style={[styles.iconContainer, iconMotion]}>
          <BlurView intensity={20} tint="light" style={styles.iconGlass}>
            <LinearGradient
              colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.01)']}
              style={StyleSheet.absoluteFill}
            />
            <Ionicons name={item.icon as any} size={46} color={item.color} />
          </BlurView>
          <Animated.View style={[styles.iconGlow, { backgroundColor: item.color }, glowMotion]} />
        </Animated.View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(700)}>
        <Animated.View style={[styles.textContainer, textMotion]}>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDesc}>{item.desc}</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const flatListRef = useRef<FlatList>(null);
  const brand = Theme.brand;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const ctaMotion = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      router.replace('/auth/login');
    }
  };

  const handlePressIn = () => {
    buttonScale.value = withTiming(0.96, { duration: 120, easing: Easing.out(Easing.quad) });
  };

  const handlePressOut = () => {
    buttonScale.value = withTiming(1, { duration: 180, easing: Easing.out(Easing.back(1.4)) });
  };

  const renderItem = ({ item, index }: { item: typeof SLIDES[0]; index: number }) => (
    <OnboardingSlide item={item} index={index} scrollX={scrollX} />
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#020205', '#0A0A12']} style={StyleSheet.absoluteFill} />
      
      {/* Dynamic Background Orbs */}
      <View style={[styles.ambientBlob, { top: -50, right: -50, backgroundColor: brand.primary }]} />
      <View style={[styles.ambientBlob, { bottom: 50, left: -100, backgroundColor: brand.accent }]} />

      <View style={styles.topBar}>
        <AppLogo size={42} />
        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <BlurView intensity={10} tint="dark" style={styles.skipBlur}>
            <Text style={styles.skipText}>BYPASS</Text>
          </BlurView>
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footerContainer}>
        {/* Pagination Dots */}
        <View style={styles.indicatorRow}>
          {SLIDES.map((_, i) => {
            return (
              <PaginationDot
                key={i}
                index={i}
                scrollX={scrollX}
                activeColor={activeIndex === i ? brand.primary : 'rgba(255,255,255,0.15)'}
              />
            );
          })}
        </View>

        <Pressable onPress={handleNext} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.ctaWrapper, ctaMotion]}>
          <LinearGradient
            colors={[brand.primary, '#ce9ffc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>
              {activeIndex === SLIDES.length - 1 ? "INITIALIZE" : "CONTINUE"}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF" />
          </LinearGradient>
          </Animated.View>
        </Pressable>
        
        <Text style={styles.progressText}>LINK STATUS: {activeIndex + 1} / {SLIDES.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020205' },
  ambientBlob: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    opacity: 0.1,
    filter: Platform.OS === 'ios' ? 'blur(80px)' : undefined,
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 25,
    right: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  skipBlur: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden'
  },
  skipText: {
    color: '#475569',
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 2,
  },
  slide: { width, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  
  iconContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  iconGlass: {
    width: 130,
    height: 130,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    zIndex: 2,
  },
  iconGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.25,
    filter: Platform.OS === 'ios' ? 'blur(30px)' : undefined,
  },

  textContainer: { alignItems: 'center' },
  slideTitle: { 
    color: '#FFF', 
    fontSize: 44, 
    fontWeight: '900', 
    textAlign: 'center', 
    letterSpacing: -1.5,
    lineHeight: 48 
  },
  slideDesc: { 
    color: '#64748B', 
    fontSize: 16, 
    textAlign: 'center', 
    marginTop: 20, 
    lineHeight: 26,
    maxWidth: 280,
    fontWeight: '500'
  },

  footerContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  indicatorRow: { 
    flexDirection: 'row', 
    marginBottom: 40, 
    alignItems: 'center',
    height: 10 
  },
  dot: { 
    height: 4, 
    borderRadius: 2, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    marginHorizontal: 4 
  },
  ctaWrapper: {
    width: width * 0.7,
    shadowColor: '#7367f0',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  btn: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, 
    borderRadius: 24,
    gap: 10
  },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 14, letterSpacing: 2 },
  progressText: {
    color: '#334155',
    fontSize: 9,
    fontWeight: '900',
    marginTop: 30,
    letterSpacing: 2.5
  }
});
