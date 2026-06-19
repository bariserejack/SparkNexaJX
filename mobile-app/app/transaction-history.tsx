import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useDrawerBack } from '../lib/useDrawerBack';
import { Theme } from '../constants/Theme';
import { useAppTheme } from '../lib/theme';

const FILTERS = ['All', 'Deposits', 'Withdrawals', 'Transfers', 'Frozen'];

const TRANSACTIONS = [
  { id: '1', name: 'Mira Studio', method: 'MasterCard **** 8842', amount: '+$120.00', date: 'Today', type: 'Deposits', status: 'Completed', icon: 'arrow-down' },
  { id: '2', name: 'Crown Barber', method: 'Escrow hold', amount: '-$25.00', date: 'Yesterday', type: 'Transfers', status: 'Protected', icon: 'arrow-up' },
  { id: '3', name: 'Spendable balance', method: 'Vault freeze', amount: '-$25.00', date: 'Jun 12', type: 'Frozen', status: 'Locked', icon: 'snow-outline' },
  { id: '4', name: 'Bank transfer', method: 'MasterCard **** 8842', amount: '+$60.00', date: 'Jun 9', type: 'Deposits', status: 'Completed', icon: 'arrow-down' },
  { id: '5', name: 'Pixel Forge', method: 'NexaMarket seller', amount: '-$15.00', date: 'Jun 7', type: 'Transfers', status: 'Completed', icon: 'arrow-up' },
  { id: '6', name: 'Wallet withdrawal', method: 'Bank account', amount: '-$80.00', date: 'Jun 3', type: 'Withdrawals', status: 'Completed', icon: 'return-up-forward-outline' },
  { id: '7', name: 'Glow Haus', method: 'Deposit reversal', amount: '+$20.00', date: 'May 29', type: 'Deposits', status: 'Returned', icon: 'arrow-down' },
];

function amountIsIncoming(amount: string) {
  return amount.trim().startsWith('+');
}

export default function TransactionHistoryScreen() {
  const { activeTheme, isDark } = useAppTheme();
  const handleBack = useDrawerBack();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTransactions = useMemo(
    () => TRANSACTIONS.filter((item) => activeFilter === 'All' || item.type === activeFilter),
    [activeFilter]
  );

  const totalIn = TRANSACTIONS.filter((item) => amountIsIncoming(item.amount)).length;
  const totalOut = TRANSACTIONS.length - totalIn;

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={[styles.glowTop, { opacity: isDark ? 0.16 : 0.08 }]} />
      <View style={[styles.glowBottom, { opacity: isDark ? 0.12 : 0.06 }]} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
        >
          <Ionicons name="chevron-back" size={16} color={activeTheme.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.kicker, { color: activeTheme.textMuted }]}>SECURE VAULT</Text>
          <Text style={[styles.title, { color: activeTheme.text }]}>My Transactions</Text>
        </View>
        <TouchableOpacity style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <Ionicons name="download-outline" size={16} color={Theme.brand.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(520)} style={styles.summaryCard}>
          <LinearGradient colors={['#062D33', '#0F766E', '#0EA5E9']} style={StyleSheet.absoluteFillObject} />
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>Total movement</Text>
              <Text style={styles.summaryAmount}>$325.00</Text>
            </View>
            <View style={styles.summaryIcon}>
              <Ionicons name="swap-vertical" size={18} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryPill}>
              <Text style={styles.summaryPillValue}>{totalIn}</Text>
              <Text style={styles.summaryPillLabel}>Deposits</Text>
            </View>
            <View style={styles.summaryPill}>
              <Text style={styles.summaryPillValue}>{totalOut}</Text>
              <Text style={styles.summaryPillLabel}>Outgoing</Text>
            </View>
          </View>
        </Animated.View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTrack}>
          {FILTERS.map((filter, index) => {
            const active = activeFilter === filter;
            return (
              <Animated.View key={filter} entering={FadeInRight.delay(index * 45).duration(360)}>
                <TouchableOpacity
                  onPress={() => setActiveFilter(filter)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: active ? '#063F46' : activeTheme.card,
                      borderColor: active ? '#063F46' : activeTheme.border,
                    },
                  ]}
                >
                  <Text style={[styles.filterText, { color: active ? '#FFFFFF' : activeTheme.text }]}>{filter}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>

        <View style={styles.listHeader}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Recent activity</Text>
          <Text style={[styles.sectionMeta, { color: activeTheme.textMuted }]}>{filteredTransactions.length} records</Text>
        </View>

        <View style={styles.transactionList}>
          {filteredTransactions.map((item, index) => {
            const incoming = amountIsIncoming(item.amount);
            const accent = incoming ? '#14B8A6' : item.type === 'Frozen' ? '#F97316' : '#111827';
            return (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(index * 55).duration(390)}
                style={[styles.transactionCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
              >
                <View style={[styles.transactionIcon, { backgroundColor: incoming ? 'rgba(20,184,166,0.12)' : item.type === 'Frozen' ? 'rgba(249,115,22,0.12)' : activeTheme.background }]}>
                  <Ionicons name={item.icon as any} size={16} color={accent} />
                </View>
                <View style={styles.transactionBody}>
                  <Text style={[styles.transactionName, { color: activeTheme.text }]}>{item.name}</Text>
                  <View style={styles.methodRow}>
                    <View style={styles.cardMarkRed} />
                    <View style={styles.cardMarkYellow} />
                    <Text style={[styles.transactionMethod, { color: activeTheme.textMuted }]} numberOfLines={1}>{item.method}</Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={[styles.transactionAmount, { color: incoming ? '#14B8A6' : activeTheme.text }]}>{item.amount}</Text>
                  <Text style={[styles.transactionDate, { color: activeTheme.textMuted }]}>{item.date}</Text>
                  <Text style={[styles.transactionStatus, { color: accent }]}>{item.status}</Text>
                </View>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glowTop: {
    position: 'absolute',
    top: -90,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#14B8A6',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 120,
    left: -120,
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
    width: 42,
    height: 42,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, alignItems: 'center' },
  kicker: { fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  title: { marginTop: 2, fontSize: 24, fontWeight: '900', letterSpacing: -0.4 },
  content: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 42 },
  summaryCard: {
    minHeight: 168,
    borderRadius: 30,
    padding: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  summaryLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.9 },
  summaryAmount: { color: '#FFFFFF', fontSize: 38, fontWeight: '900', letterSpacing: -1, marginTop: 8 },
  summaryIcon: { width: 44, height: 44, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' },
  summaryStats: { flexDirection: 'row', gap: 10 },
  summaryPill: { flex: 1, borderRadius: 16, padding: 12, backgroundColor: 'rgba(255,255,255,0.14)' },
  summaryPillValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  summaryPillLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11, fontWeight: '800', marginTop: 2 },
  filterTrack: { gap: 10, paddingVertical: 18 },
  filterChip: { minHeight: 44, paddingHorizontal: 18, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  filterText: { fontSize: 14, fontWeight: '800' },
  listHeader: { marginTop: 4, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  sectionMeta: { fontSize: 12, fontWeight: '800' },
  transactionList: { gap: 12 },
  transactionCard: {
    minHeight: 84,
    borderRadius: 28,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: { width: 50, height: 50, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  transactionBody: { flex: 1, minWidth: 0 },
  transactionName: { fontSize: 15, fontWeight: '900' },
  methodRow: { marginTop: 5, flexDirection: 'row', alignItems: 'center' },
  cardMarkRed: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444' },
  cardMarkYellow: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#F59E0B', marginLeft: -4, marginRight: 6 },
  transactionMethod: { flex: 1, fontSize: 12, fontWeight: '700' },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 16, fontWeight: '900' },
  transactionDate: { marginTop: 4, fontSize: 12, fontWeight: '700' },
  transactionStatus: { marginTop: 4, fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.6 },
});
