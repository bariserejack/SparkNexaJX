import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import Animated, {
  Easing,
  FadeInDown,
  FadeInRight,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Theme } from '../constants/Theme';
import { useAppTheme } from '../lib/theme';
import { useDrawerBack } from '../lib/useDrawerBack';

type VaultActionKey = 'add' | 'send' | 'freeze';

const actions: Array<{ key: VaultActionKey; label: string; icon: string; color: string }> = [
  { key: 'add', label: 'Add funds', icon: 'add', color: '#14B8A6' },
  { key: 'send', label: 'Send', icon: 'arrow-up', color: '#0EA5E9' },
  { key: 'freeze', label: 'Freeze', icon: 'snow-outline', color: '#F97316' },
];

const transactions = [
  { id: '1', title: 'Marketplace deposit', meta: 'Mira Studio', amount: '+$120.00', time: '10:24 AM', type: 'in' },
  { id: '2', title: 'Booking hold', meta: 'Crown Barber', amount: '-$25.00', time: 'Yesterday', type: 'out' },
  { id: '3', title: 'Vault top up', meta: 'Bank transfer', amount: '+$60.00', time: 'Jun 9', type: 'in' },
];

const walletSteps = [
  { title: 'Verify identity', detail: 'Confirm your name, phone, and email before activating payments.' },
  { title: 'Add payment source', detail: 'Connect a card, bank account, or marketplace payout method.' },
  { title: 'Enable Face ID', detail: 'Protect deposits, withdrawals, and sends with biometric unlock.' },
  { title: 'Fund wallet', detail: 'Add your first balance to start booking or receiving payments.' },
];

function VaultPulseIcon({ enabled, backgroundColor }: { enabled: boolean; backgroundColor: string }) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [pulse]);

  const haloMotion = useAnimatedStyle(() => ({
    opacity: enabled ? interpolate(pulse.value, [0, 1], [0.18, 0.42]) : 0,
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.9, 1.26]) }],
  }));

  const iconMotion = useAnimatedStyle(() => ({
    transform: [{ scale: enabled ? interpolate(pulse.value, [0, 1], [1, 1.06]) : 1 }],
  }));

  return (
    <View style={styles.vaultPulseWrap}>
      <Animated.View style={[styles.vaultPulseHalo, haloMotion]} />
      <Animated.View style={[styles.faceIdIcon, { backgroundColor }, iconMotion]}>
        <Ionicons name={enabled ? 'scan-outline' : 'lock-open-outline'} size={18} color={enabled ? '#14B8A6' : Theme.brand.primary} />
      </Animated.View>
    </View>
  );
}

function PremiumVaultAction({
  action,
  index,
  cardColor,
  borderColor,
  textColor,
  onPress,
}: {
  action: (typeof actions)[number];
  index: number;
  cardColor: string;
  borderColor: string;
  textColor: string;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const lift = useSharedValue(0);
  const glow = useSharedValue(0);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [glow]);

  const pressMotion = useAnimatedStyle(() => ({
    transform: [{ translateY: lift.value }, { scale: scale.value }],
  }));

  const glowMotion = useAnimatedStyle(() => ({
    opacity: interpolate(glow.value, [0, 1], [0.16, 0.34]),
  }));

  return (
    <Animated.View entering={FadeInRight.delay(230 + index * 70).duration(420)} style={styles.actionTileWrap}>
      <Animated.View style={pressMotion}>
        <Pressable
          onPress={onPress}
          onPressIn={() => {
            scale.value = withSpring(0.96, { damping: 15, stiffness: 220 });
            lift.value = withTiming(-4, { duration: 120 });
          }}
          onPressOut={() => {
            scale.value = withSpring(1, { damping: 14, stiffness: 180 });
            lift.value = withTiming(0, { duration: 150 });
          }}
          style={[styles.actionTile, { backgroundColor: cardColor, borderColor }]}
        >
          <Animated.View style={[styles.actionGlow, { backgroundColor: action.color }, glowMotion]} />
          <LinearGradient
            colors={[`${action.color}22`, 'rgba(255,255,255,0.02)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.actionIcon, { backgroundColor: `${action.color}24` }]}>
            <Ionicons name={action.icon as any} size={16} color={action.color} />
          </View>
          <View>
            <Text style={[styles.actionText, { color: textColor }]}>{action.label}</Text>
            <Text style={[styles.actionSubText, { color: action.color }]}>Secured</Text>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

function VaultFlowPanel({
  flow,
  onClose,
  activeTheme,
  isDark,
}: {
  flow: VaultActionKey;
  onClose: () => void;
  activeTheme: ReturnType<typeof useAppTheme>['activeTheme'];
  isDark: boolean;
}) {
  const flowMeta = {
    add: {
      title: 'Add funds',
      kicker: 'TOP UP WALLET',
      icon: 'add',
      color: '#14B8A6',
      cta: 'Add money',
      amount: '$150.00',
      helper: 'Choose how much you want to add to your spendable vault balance.',
    },
    send: {
      title: 'Send money',
      kicker: 'SECURE TRANSFER',
      icon: 'arrow-up',
      color: '#0EA5E9',
      cta: 'Send securely',
      amount: '$120.00',
      helper: 'Select a recipient, enter amount, then verify before sending.',
    },
    freeze: {
      title: 'Freeze funds',
      kicker: 'VAULT CONTROL',
      icon: 'snow-outline',
      color: '#F97316',
      cta: 'Freeze balance',
      amount: '$25.00',
      helper: 'Lock funds from spending while keeping them protected in your vault.',
    },
  }[flow];

  const chips = flow === 'freeze' ? ['$25', '$50', '$100', 'All'] : ['$50', '$100', '$150', '$200'];
  const keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

  return (
    <Animated.View entering={FadeInDown.duration(360)} style={[styles.flowOverlay, { backgroundColor: activeTheme.background }]}>
      <View style={styles.flowHeader}>
        <TouchableOpacity
          onPress={onClose}
          style={[styles.flowBackButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
        >
          <Ionicons name="chevron-back" size={16} color={activeTheme.text} />
        </TouchableOpacity>
        <View style={styles.flowTitleWrap}>
          <Text style={[styles.flowKicker, { color: activeTheme.textMuted }]}>{flowMeta.kicker}</Text>
          <Text style={[styles.flowTitle, { color: activeTheme.text }]}>{flowMeta.title}</Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          style={[styles.flowBackButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
        >
          <Ionicons name="close" size={16} color={activeTheme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.flowContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(80).duration(520).springify()} style={styles.flowHero}>
          <LinearGradient
            colors={flow === 'freeze' ? ['#1F2937', '#111827'] : [flowMeta.color, '#2563EB']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.flowHeroTop}>
            <View style={styles.flowHeroIcon}>
              <Ionicons name={flowMeta.icon as any} size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.flowHeroStatus}>{flow === 'freeze' ? 'LOCK READY' : 'INSTANT'}</Text>
          </View>
          <Text style={styles.flowAmount}>{flowMeta.amount}</Text>
          <Text style={styles.flowHelper}>{flowMeta.helper}</Text>
        </Animated.View>

        {flow === 'send' ? (
          <Animated.View entering={FadeInRight.delay(150).duration(420)} style={[styles.flowCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.flowLabel, { color: activeTheme.textMuted }]}>Recipient</Text>
            <View style={styles.recipientRow}>
              <View style={[styles.recipientAvatar, { backgroundColor: `${flowMeta.color}22` }]}>
                <Text style={[styles.recipientInitial, { color: flowMeta.color }]}>M</Text>
              </View>
              <View style={styles.recipientMeta}>
                <Text style={[styles.recipientName, { color: activeTheme.text }]}>Mira Studio</Text>
                <Text style={[styles.recipientSub, { color: activeTheme.textMuted }]}>NexaMarket seller - Bridal service</Text>
              </View>
              <Ionicons name="checkmark-circle" size={18} color={flowMeta.color} />
            </View>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInRight.delay(150).duration(420)} style={[styles.flowCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.flowLabel, { color: activeTheme.textMuted }]}>
              {flow === 'add' ? 'Payment source' : 'Freeze source'}
            </Text>
            <View style={styles.bankCardRow}>
              <View style={[styles.bankIcon, { backgroundColor: `${flowMeta.color}22` }]}>
                <Ionicons name={flow === 'add' ? 'card-outline' : 'shield-checkmark-outline'} size={16} color={flowMeta.color} />
              </View>
              <View style={styles.recipientMeta}>
                <Text style={[styles.recipientName, { color: activeTheme.text }]}>
                  {flow === 'add' ? 'Visa ending 8842' : 'Spendable balance'}
                </Text>
                <Text style={[styles.recipientSub, { color: activeTheme.textMuted }]}>
                  {flow === 'add' ? 'Instant card top up' : '$230 available to freeze'}
                </Text>
              </View>
              <TouchableOpacity style={[styles.changePill, { backgroundColor: activeTheme.background }]}>
                <Text style={[styles.changeText, { color: flowMeta.color }]}>Change</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <Animated.View entering={FadeInDown.delay(210).duration(420)} style={[styles.flowCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <Text style={[styles.flowLabel, { color: activeTheme.textMuted }]}>Amount</Text>
          <Text style={[styles.amountInputDisplay, { color: activeTheme.text }]}>{flowMeta.amount}</Text>
          <View style={styles.amountChipRow}>
            {chips.map((chip) => (
              <TouchableOpacity key={chip} style={[styles.amountChip, { backgroundColor: chip === '$150' || chip === '$25' ? flowMeta.color : activeTheme.background }]}>
                <Text style={[styles.amountChipText, { color: chip === '$150' || chip === '$25' ? '#FFFFFF' : activeTheme.text }]}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {flow === 'freeze' ? (
          <Animated.View entering={FadeInDown.delay(260).duration(420)} style={[styles.freezeNotice, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Ionicons name="lock-closed-outline" size={17} color={flowMeta.color} />
            <View style={styles.recipientMeta}>
              <Text style={[styles.recipientName, { color: activeTheme.text }]}>Screen-lock protection</Text>
              <Text style={[styles.recipientSub, { color: activeTheme.textMuted }]}>Frozen funds require fingerprint unlock before release.</Text>
            </View>
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(310).duration(420)} style={styles.keypadGrid}>
          {keypad.map((key) => (
            <TouchableOpacity key={key} style={[styles.keypadButton, { backgroundColor: activeTheme.card }]}>
              <Text style={[styles.keypadText, { color: activeTheme.text }]}>{key}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(360).duration(420)} style={styles.flowFooter}>
          <TouchableOpacity style={[styles.flowSecondaryButton, { borderColor: activeTheme.border, backgroundColor: activeTheme.card }]} onPress={onClose}>
            <Text style={[styles.flowSecondaryText, { color: activeTheme.text }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowPrimaryButton} onPress={onClose}>
            <LinearGradient colors={[flowMeta.color, '#2563EB']} style={styles.flowPrimaryGradient}>
              <Ionicons name={flow === 'freeze' ? 'lock-closed' : 'checkmark'} size={16} color="#FFFFFF" />
              <Text style={styles.flowPrimaryText}>{flowMeta.cta}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
}

export default function SecureVaultScreen() {
  const { activeTheme, isDark } = useAppTheme();
  const handleBack = useDrawerBack();
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeFlow, setActiveFlow] = useState<VaultActionKey | null>(null);
  const lockPulse = useSharedValue(0);

  useEffect(() => {
    lockPulse.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [lockPulse]);

  const lockHaloMotion = useAnimatedStyle(() => ({
    opacity: interpolate(lockPulse.value, [0, 1], [0.16, 0.42]),
    transform: [{ scale: interpolate(lockPulse.value, [0, 1], [0.88, 1.22]) }],
  }));

  const lockIconMotion = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(lockPulse.value, [0, 1], [1, 1.06]) }],
  }));

  const unlockVault = async () => {
    if (isVerifying || isUnlocked) return;
    setIsVerifying(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Unlock Secure Vault',
          cancelLabel: 'Cancel',
          fallbackLabel: 'Use device passcode',
          disableDeviceFallback: false,
        });
        setIsUnlocked(result.success);
        return;
      }

      setTimeout(() => setIsUnlocked(true), 900);
    } finally {
      setTimeout(() => setIsVerifying(false), 450);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={[styles.glowMint, { opacity: isDark ? 0.18 : 0.09 }]} />
      <View style={[styles.glowBlue, { opacity: isDark ? 0.12 : 0.07 }]} />

      <Animated.View entering={FadeInUp.duration(520)} style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={16} color={activeTheme.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.kicker, { color: activeTheme.textMuted }]}>WALLET</Text>
          <Text style={[styles.title, { color: activeTheme.text }]}>Secure Vault</Text>
        </View>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
          onPress={unlockVault}
          accessibilityRole="button"
          accessibilityLabel="Verify fingerprint"
        >
          <Ionicons name="finger-print-outline" size={17} color={Theme.brand.primary} />
        </TouchableOpacity>
        {isVerifying ? (
          <Animated.View entering={FadeInDown.duration(260)} style={[styles.verifyToast, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Ionicons name="finger-print-outline" size={14} color={Theme.brand.primary} />
            <Text style={[styles.verifyToastText, { color: activeTheme.text }]}>Verifying fingerprint</Text>
          </Animated.View>
        ) : null}
      </Animated.View>

      {!isUnlocked ? (
        <View style={styles.lockStage}>
          <Animated.View entering={FadeInDown.delay(120).duration(560).springify()} style={[styles.lockCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <LinearGradient
              colors={isDark ? ['rgba(20,184,166,0.22)', 'rgba(14,165,233,0.08)'] : ['rgba(20,184,166,0.16)', 'rgba(14,165,233,0.06)']}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.lockIconStage}>
              <Animated.View style={[styles.lockHalo, lockHaloMotion]} />
              <Animated.View style={[styles.lockIconCircle, lockIconMotion]}>
                <Ionicons name="finger-print-outline" size={48} color="#FFFFFF" />
              </Animated.View>
            </View>
            <Text style={[styles.lockTitle, { color: activeTheme.text }]}>Vault Locked</Text>
            <Text style={[styles.lockSub, { color: activeTheme.textMuted }]}>
              Verify your fingerprint to access your protected wallet.
            </Text>
            <Pressable style={styles.unlockButton} onPress={unlockVault}>
              <LinearGradient colors={['#14B8A6', '#0EA5E9']} style={styles.unlockGradient}>
                <Ionicons name={isVerifying ? 'scan-outline' : 'finger-print-outline'} size={17} color="#FFFFFF" />
                <Text style={styles.unlockText}>{isVerifying ? 'Verifying...' : 'Unlock Secure Vault'}</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </View>
      ) : (

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(80).duration(620).springify()} style={styles.cardStack}>
          <View style={[styles.cardShadow, { backgroundColor: isDark ? 'rgba(20,184,166,0.20)' : 'rgba(20,184,166,0.15)' }]} />
          <View style={[styles.cardShadowAlt, { backgroundColor: isDark ? 'rgba(14,165,233,0.16)' : 'rgba(14,165,233,0.12)' }]} />
          <BlurView
            intensity={isDark ? 25 : 55}
            tint={isDark ? 'dark' : 'light'}
            style={[styles.balanceCard, { borderColor: activeTheme.border }]}
          >
            <LinearGradient colors={['#050816', '#083344', '#0F766E']} style={StyleSheet.absoluteFillObject} />
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.cardLabel}>Protected balance</Text>
                <Text style={styles.cardBalance}>$255.00</Text>
              </View>
              <View style={styles.cardChip}>
                <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.cardMuted}>Vault ID</Text>
                <Text style={styles.cardValue}>NXJ-8842</Text>
              </View>
              <View>
                <Text style={styles.cardMuted}>Escrow hold</Text>
                <Text style={styles.cardValue}>$25.00</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(160).duration(520)} style={styles.walletSummaryRow}>
          <View style={[styles.walletSummaryTile, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.walletSummaryValue, { color: activeTheme.text }]}>$230</Text>
            <Text style={[styles.walletSummaryLabel, { color: activeTheme.textMuted }]}>Spendable</Text>
          </View>
          <View style={[styles.walletSummaryTile, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.walletSummaryValue, { color: activeTheme.text }]}>$25</Text>
            <Text style={[styles.walletSummaryLabel, { color: activeTheme.textMuted }]}>In escrow</Text>
          </View>
          <View style={[styles.walletSummaryTile, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.walletSummaryValue, { color: activeTheme.text }]}>98%</Text>
            <Text style={[styles.walletSummaryLabel, { color: activeTheme.textMuted }]}>Protected</Text>
          </View>
        </Animated.View>

        <View style={styles.actionGrid}>
          {actions.map((action, index) => (
            <PremiumVaultAction
              key={action.label}
              action={action}
              index={index}
              cardColor={activeTheme.card}
              borderColor={activeTheme.border}
              textColor={activeTheme.text}
              onPress={() => setActiveFlow(action.key)}
            />
          ))}
        </View>

        <Animated.View entering={FadeInDown.delay(320).duration(520)} style={[styles.securityPanel, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={styles.securityHeader}>
            <View style={[styles.securityIcon, { backgroundColor: activeTheme.background }]}>
              <Ionicons name="lock-closed-outline" size={16} color="#14B8A6" />
            </View>
            <View style={styles.securityTextWrap}>
              <Text style={[styles.securityTitle, { color: activeTheme.text }]}>Escrow shield</Text>
              <Text style={[styles.securitySub, { color: activeTheme.textMuted }]}>Protected deposits for marketplace bookings.</Text>
            </View>
            <Text style={styles.securityScore}>98%</Text>
          </View>
          <View style={[styles.meterTrack, { backgroundColor: activeTheme.background }]}>
            <LinearGradient colors={['#14B8A6', '#0EA5E9']} style={[styles.meterFill, { width: '98%' }]} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(390).duration(520)} style={[styles.faceIdCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={styles.faceIdTop}>
            <VaultPulseIcon enabled={faceIdEnabled} backgroundColor={faceIdEnabled ? 'rgba(20,184,166,0.16)' : activeTheme.background} />
            <View style={styles.faceIdTextWrap}>
              <Text style={[styles.faceIdTitle, { color: activeTheme.text }]}>Face ID unlock</Text>
              <Text style={[styles.faceIdSub, { color: activeTheme.textMuted }]}>
                Require Face ID before sending funds, withdrawing, or changing wallet settings.
              </Text>
            </View>
            <Switch
              value={faceIdEnabled}
              onValueChange={setFaceIdEnabled}
              trackColor={{ false: activeTheme.border, true: 'rgba(20,184,166,0.45)' }}
              thumbColor={faceIdEnabled ? '#14B8A6' : activeTheme.textMuted}
            />
          </View>
          <TouchableOpacity style={[styles.faceIdButton, { backgroundColor: activeTheme.background }]}>
            <Ionicons name={faceIdEnabled ? 'checkmark-circle' : 'scan'} size={15} color={faceIdEnabled ? '#14B8A6' : Theme.brand.primary} />
            <Text style={[styles.faceIdButtonText, { color: faceIdEnabled ? '#14B8A6' : Theme.brand.primary }]}>
              {faceIdEnabled ? 'Face ID is active' : 'Set up Face ID'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(460).duration(420)} style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Open Wallet Account</Text>
          <Text style={[styles.stepCount, { color: activeTheme.textMuted }]}>4 steps</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(520)} style={[styles.stepsCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          {walletSteps.map((step, index) => (
            <Animated.View key={step.title} entering={FadeInRight.delay(540 + index * 55).duration(360)}>
              <View style={styles.stepRow}>
                <View style={[styles.stepNumber, { backgroundColor: index < 2 ? '#14B8A6' : activeTheme.background }]}>
                  <Text style={[styles.stepNumberText, { color: index < 2 ? '#FFFFFF' : activeTheme.textMuted }]}>{index + 1}</Text>
                </View>
                <View style={styles.stepTextWrap}>
                  <Text style={[styles.stepTitle, { color: activeTheme.text }]}>{step.title}</Text>
                  <Text style={[styles.stepDetail, { color: activeTheme.textMuted }]}>{step.detail}</Text>
                </View>
                <Ionicons
                  name={index < 2 ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={index < 2 ? '#14B8A6' : activeTheme.textMuted}
                />
              </View>
              {index < walletSteps.length - 1 ? <View style={[styles.stepDivider, { backgroundColor: activeTheme.border }]} /> : null}
            </Animated.View>
          ))}
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Activity</Text>
          <TouchableOpacity
            style={[styles.historyButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
            onPress={() => router.push('/transaction-history')}
          >
            <Text style={[styles.historyButtonText, { color: activeTheme.text }]}>View all</Text>
            <Ionicons name="chevron-forward" size={14} color={activeTheme.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          {transactions.map((item, index) => {
            const incoming = item.type === 'in';
            return (
              <Animated.View
                key={item.id}
                entering={FadeInRight.delay(index * 70).duration(380)}
                style={[styles.transactionRow, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
              >
                <View style={[styles.transactionIcon, { backgroundColor: incoming ? 'rgba(20,184,166,0.14)' : 'rgba(249,115,22,0.14)' }]}>
                  <Ionicons name={incoming ? 'arrow-down' : 'arrow-up'} size={14} color={incoming ? '#14B8A6' : '#F97316'} />
                </View>
                <View style={styles.transactionText}>
                  <Text style={[styles.transactionTitle, { color: activeTheme.text }]}>{item.title}</Text>
                  <Text style={[styles.transactionMeta, { color: activeTheme.textMuted }]}>{item.meta} - {item.time}</Text>
                </View>
                <Text style={[styles.transactionAmount, { color: incoming ? '#14B8A6' : activeTheme.text }]}>{item.amount}</Text>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
      )}

      {activeFlow ? (
        <VaultFlowPanel
          flow={activeFlow}
          onClose={() => setActiveFlow(null)}
          activeTheme={activeTheme}
          isDark={isDark}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glowMint: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#14B8A6',
  },
  glowBlue: {
    position: 'absolute',
    bottom: 90,
    left: -110,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#0EA5E9',
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  verifyToast: {
    position: 'absolute',
    right: 22,
    top: 106,
    zIndex: 20,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  verifyToastText: { fontSize: 12, fontWeight: '900' },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1 },
  kicker: { fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  title: { fontSize: 29, fontWeight: '900', letterSpacing: -0.8, marginTop: 2 },
  lockStage: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'center',
    paddingBottom: 70,
  },
  lockCard: {
    borderWidth: 1,
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  lockIconStage: {
    width: 132,
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  lockHalo: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 40,
    backgroundColor: '#14B8A6',
  },
  lockIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14B8A6',
  },
  lockTitle: { fontSize: 28, fontWeight: '900', letterSpacing: -0.7 },
  lockSub: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 260,
  },
  unlockButton: {
    marginTop: 22,
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
  },
  unlockGradient: {
    height: 54,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  unlockText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  content: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 42 },
  cardStack: { minHeight: 224, justifyContent: 'flex-end' },
  cardShadow: {
    position: 'absolute',
    left: 18,
    right: 18,
    top: 8,
    height: 190,
    borderRadius: 30,
    transform: [{ rotate: '-2deg' }],
  },
  cardShadowAlt: {
    position: 'absolute',
    left: 34,
    right: 6,
    top: 20,
    height: 176,
    borderRadius: 30,
    transform: [{ rotate: '3deg' }],
  },
  balanceCard: {
    minHeight: 206,
    borderRadius: 30,
    borderWidth: 1,
    padding: 22,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  cardLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.9 },
  cardBalance: { color: '#FFFFFF', fontSize: 43, fontWeight: '900', letterSpacing: -1.2, marginTop: 8 },
  cardChip: {
    width: 48,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', gap: 18 },
  cardMuted: { color: 'rgba(255,255,255,0.62)', fontSize: 11, fontWeight: '800', marginBottom: 4 },
  cardValue: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  walletSummaryRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  walletSummaryTile: {
    flex: 1,
    minHeight: 74,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  walletSummaryValue: { fontSize: 18, fontWeight: '900' },
  walletSummaryLabel: { fontSize: 11, fontWeight: '800', marginTop: 3 },
  actionGrid: { flexDirection: 'row', gap: 10, marginTop: 16 },
  actionTileWrap: { flex: 1 },
  actionTile: {
    minHeight: 86,
    borderRadius: 22,
    borderWidth: 1,
    padding: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  actionGlow: {
    position: 'absolute',
    right: -26,
    top: -24,
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  actionIcon: { width: 34, height: 34, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: 13, fontWeight: '900' },
  actionSubText: { marginTop: 3, fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.8 },
  securityPanel: {
    marginTop: 16,
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
  },
  securityHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  securityIcon: { width: 40, height: 40, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  securityTextWrap: { flex: 1 },
  securityTitle: { fontSize: 15, fontWeight: '900' },
  securitySub: { fontSize: 12, fontWeight: '600', lineHeight: 17, marginTop: 2 },
  securityScore: { color: '#14B8A6', fontSize: 18, fontWeight: '900' },
  meterTrack: { height: 7, borderRadius: 999, overflow: 'hidden', marginTop: 14 },
  meterFill: { height: '100%', borderRadius: 999 },
  faceIdCard: {
    marginTop: 16,
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
  },
  faceIdTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  faceIdIcon: { width: 42, height: 42, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  vaultPulseWrap: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vaultPulseHalo: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#14B8A6',
  },
  faceIdTextWrap: { flex: 1, minWidth: 0 },
  faceIdTitle: { fontSize: 15, fontWeight: '900' },
  faceIdSub: { fontSize: 12, fontWeight: '600', lineHeight: 17, marginTop: 2 },
  faceIdButton: {
    height: 40,
    borderRadius: 14,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  faceIdButtonText: { fontSize: 13, fontWeight: '900' },
  stepCount: { fontSize: 12, fontWeight: '800' },
  stepsCard: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  stepRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  stepNumber: { width: 30, height: 30, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { fontSize: 12, fontWeight: '900' },
  stepTextWrap: { flex: 1, minWidth: 0 },
  stepTitle: { fontSize: 14, fontWeight: '900', marginBottom: 3 },
  stepDetail: { fontSize: 12, fontWeight: '600', lineHeight: 17 },
  stepDivider: { height: 1, marginLeft: 42 },
  sectionHeader: {
    marginTop: 28,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 19, fontWeight: '900' },
  filterButton: { width: 34, height: 34, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  historyButton: {
    minHeight: 34,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyButtonText: { fontSize: 12, fontWeight: '900' },
  transactionList: { gap: 10 },
  transactionRow: {
    minHeight: 70,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: { width: 40, height: 40, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  transactionText: { flex: 1, minWidth: 0 },
  transactionTitle: { fontSize: 14, fontWeight: '900', marginBottom: 3 },
  transactionMeta: { fontSize: 11, fontWeight: '700' },
  transactionAmount: { fontSize: 14, fontWeight: '900' },
  flowOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
  flowHeader: {
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flowBackButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowTitleWrap: { flex: 1 },
  flowKicker: { fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  flowTitle: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5, marginTop: 2 },
  flowContent: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 36 },
  flowHero: {
    minHeight: 178,
    borderRadius: 30,
    padding: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  flowHeroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  flowHeroIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowHeroStatus: { color: 'rgba(255,255,255,0.78)', fontSize: 11, fontWeight: '900', letterSpacing: 1.1 },
  flowAmount: { color: '#FFFFFF', fontSize: 42, fontWeight: '900', letterSpacing: -1.2, marginTop: 18 },
  flowHelper: { color: 'rgba(255,255,255,0.76)', fontSize: 12, fontWeight: '700', lineHeight: 18, maxWidth: 280 },
  flowCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    marginTop: 14,
  },
  flowLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  recipientRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  recipientAvatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipientInitial: { fontSize: 18, fontWeight: '900' },
  recipientMeta: { flex: 1, minWidth: 0 },
  recipientName: { fontSize: 14, fontWeight: '900' },
  recipientSub: { fontSize: 11, fontWeight: '700', marginTop: 3, lineHeight: 16 },
  bankCardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bankIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePill: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 11 },
  changeText: { fontSize: 11, fontWeight: '900' },
  amountInputDisplay: { fontSize: 34, fontWeight: '900', letterSpacing: -0.8 },
  amountChipRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  amountChip: {
    flex: 1,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountChipText: { fontSize: 12, fontWeight: '900' },
  freezeNotice: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  keypadGrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  keypadButton: {
    width: '30.9%',
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadText: { fontSize: 18, fontWeight: '800' },
  flowFooter: { flexDirection: 'row', gap: 10, marginTop: 18 },
  flowSecondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowSecondaryText: { fontSize: 13, fontWeight: '900' },
  flowPrimaryButton: { flex: 1.6, height: 52, borderRadius: 18, overflow: 'hidden' },
  flowPrimaryGradient: {
    flex: 1,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  flowPrimaryText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
});
