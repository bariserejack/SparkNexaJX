import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { Theme } from '../../constants/Theme';
import { useAppTheme } from '../../lib/theme';

const listingData = [
  {
    id: '1',
    title: 'Bridal Hairstyle & Wig Install',
    seller: 'Mira Studio',
    category: 'Hair',
    price: 120,
    deposit: 30,
    rating: '4.9',
    reviews: 42,
    completedJobs: 118,
    verified: true,
    distance: '2.4 km',
    serviceMode: 'Home service',
    response: 'Replies in 8 min',
    accent: '#14B8A6',
    icon: 'sparkles-outline',
    description: 'Clean bridal styling, wig install, frontal prep, and finishing for events or private appointments.',
  },
  {
    id: '2',
    title: 'Men Haircut & Beard Trim',
    seller: 'Crown Barber',
    category: 'Hair',
    price: 25,
    deposit: 10,
    rating: '4.8',
    reviews: 86,
    completedJobs: 203,
    verified: true,
    distance: '1.1 km',
    serviceMode: 'Shop visit',
    response: 'Replies in 5 min',
    accent: '#F97316',
    icon: 'cut-outline',
    description: 'Fresh cuts, beard trims, shape-ups, and simple grooming packages with same-day slots.',
  },
  {
    id: '3',
    title: 'Makeup Artist for Events',
    seller: 'Glow Haus',
    category: 'Beauty',
    price: 85,
    deposit: 20,
    rating: '5.0',
    reviews: 31,
    completedJobs: 74,
    verified: true,
    distance: '4.8 km',
    serviceMode: 'Home service',
    response: 'Replies in 12 min',
    accent: '#0EA5E9',
    icon: 'color-wand-outline',
    description: 'Soft glam, full glam, birthdays, weddings, and studio-ready event makeup.',
  },
  {
    id: '4',
    title: 'Phone Screen Repair',
    seller: 'FixPoint Mobile',
    category: 'Repairs',
    price: 95,
    deposit: 25,
    rating: '4.7',
    reviews: 64,
    completedJobs: 156,
    verified: false,
    distance: '3.2 km',
    serviceMode: 'Drop-off',
    response: 'Replies in 20 min',
    accent: '#22C55E',
    icon: 'phone-portrait-outline',
    description: 'Screen replacement, diagnostics, charging-port fixes, and quick repair estimates.',
  },
  {
    id: '5',
    title: 'Logo & Flyer Design',
    seller: 'Pixel Forge',
    category: 'Design',
    price: 60,
    deposit: 15,
    rating: '4.9',
    reviews: 27,
    completedJobs: 91,
    verified: true,
    distance: 'Online',
    serviceMode: 'Remote',
    response: 'Replies in 15 min',
    accent: '#8B5CF6',
    icon: 'color-palette-outline',
    description: 'Logo refresh, event flyers, social media graphics, and quick brand kits for small businesses.',
  },
];

const buyerReviews = [
  { id: '1', name: 'Ada M.', rating: '5.0', text: 'Very neat work and arrived on time. I paid deposit first and everything went smoothly.' },
  { id: '2', name: 'Tomi K.', rating: '4.8', text: 'Good communication before the appointment. The chat helped us agree on the exact style.' },
];

const sellerBookings = [
  { id: '1', label: 'Available today', value: '3 slots' },
  { id: '2', label: 'Deposit required', value: 'Protected' },
  { id: '3', label: 'Cancellation', value: '24h notice' },
];

export default function ListingDetailScreen() {
  const { activeTheme, isDark } = useAppTheme();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [note, setNote] = useState('');
  const [bookingRequested, setBookingRequested] = useState(false);
  const [depositPaid, setDepositPaid] = useState(false);

  const listing = useMemo(() => listingData.find((item) => item.id === id) ?? listingData[0], [id]);
  const balance = 255;
  const remaining = listing.price - listing.deposit;
  const goBackToMarketplace = () => {
    router.replace({ pathname: '/marketplace', params: { category: listing.category } });
  };
  const openSellerChat = () => {
    router.push({ pathname: '/pulse', params: { dmName: listing.seller, dmColor: listing.accent } });
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      goBackToMarketplace();
      return true;
    });

    return () => subscription.remove();
  }, [listing.category]);

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={[styles.glow, { backgroundColor: listing.accent, opacity: isDark ? 0.16 : 0.08 }]} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBackToMarketplace}
          style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={16} color={activeTheme.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.kicker, { color: activeTheme.textMuted }]}>{listing.category.toUpperCase()}</Text>
          <Text style={[styles.title, { color: activeTheme.text }]} numberOfLines={1}>{listing.seller}</Text>
        </View>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
          onPress={() => router.push('/secure-vault')}
          accessibilityRole="button"
          accessibilityLabel="Open wallet"
        >
          <Ionicons name="wallet-outline" size={16} color={Theme.brand.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BlurView intensity={isDark ? 25 : 60} tint={isDark ? 'dark' : 'light'} style={[styles.heroCard, { borderColor: activeTheme.border }]}>
          <LinearGradient colors={[`${listing.accent}E8`, `${listing.accent}66`]} style={StyleSheet.absoluteFillObject} />
          <View style={styles.heroIcon}>
            <Ionicons name={listing.icon as any} size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.heroTitle}>{listing.title}</Text>
          <Text style={styles.heroSub}>{listing.description}</Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.heroPill}>
              <Ionicons name="star" size={13} color="#FFFFFF" />
              <Text style={styles.heroPillText}>{listing.rating} ({listing.reviews})</Text>
            </View>
            <View style={styles.heroPill}>
              <Ionicons name="location-outline" size={13} color="#FFFFFF" />
              <Text style={styles.heroPillText}>{listing.distance}</Text>
            </View>
            <View style={styles.heroPill}>
              <Ionicons name="chatbubble-ellipses-outline" size={13} color="#FFFFFF" />
              <Text style={styles.heroPillText}>{listing.response}</Text>
            </View>
          </View>
        </BlurView>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.primaryAction, { backgroundColor: Theme.brand.primary }]} onPress={openSellerChat}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FFFFFF" />
            <Text style={styles.primaryActionText}>Chat Seller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryAction, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]} onPress={() => setBookingRequested(true)}>
            <Ionicons name="calendar-outline" size={16} color={activeTheme.text} />
            <Text style={[styles.secondaryActionText, { color: activeTheme.text }]}>Request</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.sellerCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={[styles.sellerAvatar, { backgroundColor: `${listing.accent}22` }]}>
            <Text style={[styles.sellerAvatarText, { color: listing.accent }]}>{listing.seller.charAt(0)}</Text>
          </View>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerNameRow}>
              <Text style={[styles.sellerName, { color: activeTheme.text }]}>{listing.seller}</Text>
              {listing.verified ? <Ionicons name="checkmark-circle" size={15} color="#14B8A6" /> : null}
            </View>
            <Text style={[styles.sellerSub, { color: activeTheme.textMuted }]}>
              {listing.completedJobs} completed jobs - {listing.response}
            </Text>
          </View>
          <TouchableOpacity style={[styles.sellerChatButton, { backgroundColor: activeTheme.background }]} onPress={openSellerChat}>
            <Ionicons name="chatbubble-ellipses-outline" size={15} color={Theme.brand.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.sellerBookingCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <Text style={[styles.cardTitle, { color: activeTheme.text }]}>Seller Booking Info</Text>
          <View style={styles.sellerBookingGrid}>
            {sellerBookings.map((item) => (
              <View key={item.id} style={[styles.sellerBookingTile, { backgroundColor: activeTheme.background }]}>
                <Text style={[styles.sellerBookingLabel, { color: activeTheme.textMuted }]}>{item.label}</Text>
                <Text style={[styles.sellerBookingValue, { color: activeTheme.text }]}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.reviewCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: activeTheme.text }]}>Buyer Reviews</Text>
            <Text style={[styles.reviewCount, { color: activeTheme.textMuted }]}>{listing.reviews} total</Text>
          </View>
          {buyerReviews.map((review, index) => (
            <View key={review.id}>
              <View style={styles.reviewRow}>
                <View style={[styles.reviewAvatar, { backgroundColor: activeTheme.background }]}>
                  <Text style={[styles.reviewAvatarText, { color: activeTheme.text }]}>{review.name.charAt(0)}</Text>
                </View>
                <View style={styles.reviewBody}>
                  <View style={styles.reviewTop}>
                    <Text style={[styles.reviewName, { color: activeTheme.text }]}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      <Ionicons name="star" size={11} color="#F59E0B" />
                      <Text style={[styles.reviewRatingText, { color: activeTheme.text }]}>{review.rating}</Text>
                    </View>
                  </View>
                  <Text style={[styles.reviewText, { color: activeTheme.textMuted }]}>{review.text}</Text>
                </View>
              </View>
              {index < buyerReviews.length - 1 ? <View style={[styles.reviewDivider, { backgroundColor: activeTheme.border }]} /> : null}
            </View>
          ))}
        </View>

        <View style={[styles.bookingCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: activeTheme.text }]}>Basic Booking Request</Text>
            <View style={[styles.statusPill, { backgroundColor: bookingRequested ? 'rgba(20,184,166,0.14)' : activeTheme.background }]}>
              <Text style={[styles.statusText, { color: bookingRequested ? '#14B8A6' : activeTheme.textMuted }]}>
                {bookingRequested ? 'Requested' : 'Draft'}
              </Text>
            </View>
          </View>
          <View style={styles.bookingGrid}>
            <InfoChip icon="briefcase-outline" label={listing.serviceMode} theme={activeTheme} />
            <InfoChip icon="cash-outline" label={`Total $${listing.price}`} theme={activeTheme} />
            <InfoChip icon="shield-checkmark-outline" label={`Deposit $${listing.deposit}`} theme={activeTheme} />
            <InfoChip icon="time-outline" label="Seller confirms time" theme={activeTheme} />
          </View>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Add a note, address, style details, or preferred time..."
            placeholderTextColor={activeTheme.textMuted}
            multiline
            textAlignVertical="top"
            style={[styles.noteInput, { backgroundColor: activeTheme.background, color: activeTheme.text }]}
          />
          <TouchableOpacity style={styles.requestButton} onPress={() => setBookingRequested(true)}>
            <Text style={styles.requestButtonText}>{bookingRequested ? 'Request Sent' : 'Send Booking Request'}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.walletCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: activeTheme.text }]}>Pay Deposit with Wallet</Text>
            <Ionicons name="wallet" size={18} color={Theme.brand.primary} />
          </View>
          <View style={styles.walletRows}>
            <MoneyRow label="Wallet balance" value={`$${balance}`} theme={activeTheme} />
            <MoneyRow label="Deposit due now" value={`$${listing.deposit}`} theme={activeTheme} strong />
            <MoneyRow label="Pay after service" value={`$${remaining}`} theme={activeTheme} />
          </View>
          <TouchableOpacity
            style={[styles.payButton, { backgroundColor: depositPaid ? '#14B8A6' : Theme.brand.primary }]}
            onPress={() => setDepositPaid(true)}
          >
            <Ionicons name={depositPaid ? 'checkmark-circle' : 'lock-closed-outline'} size={16} color="#FFFFFF" />
            <Text style={styles.payButtonText}>{depositPaid ? 'Deposit Paid' : `Pay $${listing.deposit} Deposit`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.walletLink} onPress={() => router.push('/secure-vault')}>
            <Text style={styles.walletLinkText}>Manage Secure Vault</Text>
            <Ionicons name="arrow-forward" size={13} color={Theme.brand.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoChip({ icon, label, theme }: { icon: any; label: string; theme: any }) {
  return (
    <View style={[styles.infoChip, { backgroundColor: theme.background }]}>
      <Ionicons name={icon} size={13} color={theme.textMuted} />
      <Text style={[styles.infoChipText, { color: theme.text }]}>{label}</Text>
    </View>
  );
}

function MoneyRow({ label, value, theme, strong }: { label: string; value: string; theme: any; strong?: boolean }) {
  return (
    <View style={styles.moneyRow}>
      <Text style={[styles.moneyLabel, { color: theme.textMuted }]}>{label}</Text>
      <Text style={[styles.moneyValue, { color: strong ? Theme.brand.primary : theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: { position: 'absolute', top: -90, right: -80, width: 260, height: 260, borderRadius: 130 },
  header: { paddingHorizontal: 22, paddingTop: 58, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerButton: { width: 40, height: 40, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headerText: { flex: 1, minWidth: 0 },
  kicker: { fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  title: { fontSize: 24, fontWeight: '900', letterSpacing: -0.6, marginTop: 2 },
  content: { paddingHorizontal: 22, paddingBottom: 42 },
  heroCard: { minHeight: 250, borderRadius: 30, borderWidth: 1, overflow: 'hidden', padding: 22, justifyContent: 'flex-end' },
  heroIcon: { width: 58, height: 58, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', lineHeight: 33 },
  heroSub: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '700', lineHeight: 19, marginTop: 8 },
  heroMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  heroPill: { minHeight: 30, borderRadius: 12, paddingHorizontal: 10, backgroundColor: 'rgba(255,255,255,0.16)', flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroPillText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  primaryAction: { flex: 1.25, height: 52, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  primaryActionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  secondaryAction: { flex: 1, height: 52, borderRadius: 18, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  secondaryActionText: { fontSize: 14, fontWeight: '900' },
  sellerCard: { marginTop: 16, borderRadius: 24, borderWidth: 1, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  sellerAvatar: { width: 48, height: 48, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  sellerAvatarText: { fontSize: 18, fontWeight: '900' },
  sellerInfo: { flex: 1, minWidth: 0 },
  sellerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sellerName: { fontSize: 16, fontWeight: '900' },
  sellerSub: { fontSize: 12, fontWeight: '700', marginTop: 3 },
  sellerChatButton: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  sellerBookingCard: { marginTop: 16, borderRadius: 26, borderWidth: 1, padding: 16 },
  sellerBookingGrid: { flexDirection: 'row', gap: 8, marginTop: 12 },
  sellerBookingTile: { flex: 1, minHeight: 66, borderRadius: 16, paddingHorizontal: 10, justifyContent: 'center' },
  sellerBookingLabel: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5 },
  sellerBookingValue: { fontSize: 13, fontWeight: '900', marginTop: 4 },
  reviewCard: { marginTop: 16, borderRadius: 26, borderWidth: 1, padding: 16 },
  reviewCount: { fontSize: 12, fontWeight: '800' },
  reviewRow: { flexDirection: 'row', gap: 12, paddingVertical: 12 },
  reviewAvatar: { width: 36, height: 36, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  reviewAvatarText: { fontSize: 13, fontWeight: '900' },
  reviewBody: { flex: 1, minWidth: 0 },
  reviewTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  reviewName: { fontSize: 14, fontWeight: '900' },
  reviewRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewRatingText: { fontSize: 11, fontWeight: '900' },
  reviewText: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 5 },
  reviewDivider: { height: 1, marginLeft: 48 },
  bookingCard: { marginTop: 16, borderRadius: 26, borderWidth: 1, padding: 16 },
  walletCard: { marginTop: 16, borderRadius: 26, borderWidth: 1, padding: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  cardTitle: { fontSize: 17, fontWeight: '900' },
  statusPill: { height: 28, borderRadius: 11, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' },
  statusText: { fontSize: 11, fontWeight: '900' },
  bookingGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  infoChip: { minHeight: 34, borderRadius: 13, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoChipText: { fontSize: 12, fontWeight: '800' },
  noteInput: { minHeight: 92, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginTop: 14, fontSize: 13, fontWeight: '700', lineHeight: 19 },
  requestButton: { height: 46, borderRadius: 16, backgroundColor: '#14B8A6', alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  requestButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  walletRows: { marginTop: 12, gap: 10 },
  moneyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  moneyLabel: { fontSize: 13, fontWeight: '700' },
  moneyValue: { fontSize: 15, fontWeight: '900' },
  payButton: { height: 48, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 },
  payButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  walletLink: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  walletLinkText: { color: Theme.brand.primary, fontSize: 13, fontWeight: '900' },
});
