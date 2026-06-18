import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Theme } from '../constants/Theme';
import { useAppTheme } from '../lib/theme';
import { useDrawerBack } from '../lib/useDrawerBack';

const actions = [
  { label: 'Add funds', icon: 'add', color: '#14B8A6' },
  { label: 'Send', icon: 'arrow-up', color: '#0EA5E9' },
  { label: 'Freeze', icon: 'snow-outline', color: '#F97316' },
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

export default function SecureVaultScreen() {
  const { activeTheme, isDark } = useAppTheme();
  const handleBack = useDrawerBack();
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={[styles.glowMint, { opacity: isDark ? 0.18 : 0.09 }]} />
      <View style={[styles.glowBlue, { opacity: isDark ? 0.12 : 0.07 }]} />

      <View style={styles.header}>
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
        <View style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <Ionicons name="finger-print-outline" size={17} color={Theme.brand.primary} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardStack}>
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
        </View>

        <View style={styles.walletSummaryRow}>
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
        </View>

        <View style={styles.actionGrid}>
          {actions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={[styles.actionTile, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
              activeOpacity={0.86}
            >
              <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                <Ionicons name={action.icon as any} size={16} color={action.color} />
              </View>
              <Text style={[styles.actionText, { color: activeTheme.text }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.securityPanel, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
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
        </View>

        <View style={[styles.faceIdCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={styles.faceIdTop}>
            <View style={[styles.faceIdIcon, { backgroundColor: faceIdEnabled ? 'rgba(20,184,166,0.16)' : activeTheme.background }]}>
              <Ionicons name="scan-outline" size={18} color={faceIdEnabled ? '#14B8A6' : activeTheme.textMuted} />
            </View>
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
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Open Wallet Account</Text>
          <Text style={[styles.stepCount, { color: activeTheme.textMuted }]}>4 steps</Text>
        </View>

        <View style={[styles.stepsCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          {walletSteps.map((step, index) => (
            <View key={step.title}>
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
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Activity</Text>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Ionicons name="options-outline" size={14} color={activeTheme.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          {transactions.map((item) => {
            const incoming = item.type === 'in';
            return (
              <View
                key={item.id}
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
              </View>
            );
          })}
        </View>
      </ScrollView>
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
  actionTile: {
    flex: 1,
    minHeight: 86,
    borderRadius: 22,
    borderWidth: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  actionIcon: { width: 34, height: 34, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: 13, fontWeight: '900' },
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
});
