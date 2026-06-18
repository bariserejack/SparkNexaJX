import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { Theme } from '../../constants/Theme';
import { useAppTheme } from '../../lib/theme';

const categories = ['All', 'Hair', 'Beauty', 'Repairs', 'Design', 'Events'];

const listings = [
  {
    id: '1',
    title: 'Bridal Hairstyle & Wig Install',
    seller: 'Mira Studio',
    category: 'Hair',
    price: 120,
    deposit: 30,
    rating: '4.9',
    distance: '2.4 km',
    serviceMode: 'Home service',
    accent: '#14B8A6',
    icon: 'sparkles-outline',
  },
  {
    id: '2',
    title: 'Men Haircut & Beard Trim',
    seller: 'Crown Barber',
    category: 'Hair',
    price: 25,
    deposit: 10,
    rating: '4.8',
    distance: '1.1 km',
    serviceMode: 'Shop visit',
    accent: '#F97316',
    icon: 'cut-outline',
  },
  {
    id: '3',
    title: 'Makeup Artist for Events',
    seller: 'Glow Haus',
    category: 'Beauty',
    price: 85,
    deposit: 20,
    rating: '5.0',
    distance: '4.8 km',
    serviceMode: 'Home service',
    accent: '#0EA5E9',
    icon: 'color-wand-outline',
  },
  {
    id: '4',
    title: 'Phone Screen Repair',
    seller: 'FixPoint Mobile',
    category: 'Repairs',
    price: 95,
    deposit: 25,
    rating: '4.7',
    distance: '3.2 km',
    serviceMode: 'Drop-off',
    accent: '#22C55E',
    icon: 'phone-portrait-outline',
  },
  {
    id: '5',
    title: 'Logo & Flyer Design',
    seller: 'Pixel Forge',
    category: 'Design',
    price: 60,
    deposit: 15,
    rating: '4.9',
    distance: 'Online',
    serviceMode: 'Remote',
    accent: '#8B5CF6',
    icon: 'color-palette-outline',
  },
];

export default function MarketplaceScreen() {
  const { activeTheme, isDark } = useAppTheme();
  const params = useLocalSearchParams<{ category?: string }>();
  const initialCategory = categories.includes(params.category || '') ? params.category || 'All' : 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return listings.filter((listing) => {
      const matchesCategory = activeCategory === 'All' || listing.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        listing.title.toLowerCase().includes(normalizedQuery) ||
        listing.seller.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={[styles.glowTop, { opacity: isDark ? 0.16 : 0.08 }]} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={16} color={activeTheme.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={[styles.kicker, { color: activeTheme.textMuted }]}>MARKETPLACE</Text>
          <Text style={[styles.title, { color: activeTheme.text }]}>NexaMarket</Text>
        </View>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}
          onPress={() => router.push('/marketplace/new')}
          accessibilityRole="button"
          accessibilityLabel="Create listing"
        >
          <Ionicons name="add" size={17} color={Theme.brand.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BlurView
          intensity={isDark ? 30 : 65}
          tint={isDark ? 'dark' : 'light'}
          style={[styles.hero, { borderColor: activeTheme.border }]}
        >
          <LinearGradient colors={['#071A2F', '#0F766E', '#0EA5E9']} style={StyleSheet.absoluteFillObject} />
          <View style={styles.heroTextWrap}>
            <View style={styles.heroBadge}>
              <Ionicons name="diamond-outline" size={13} color="#FFFFFF" />
              <Text style={styles.heroBadgeText}>Premium local market</Text>
            </View>
            <Text style={styles.heroTitle}>Find sellers, chat, book, and pay deposits safely.</Text>
            <View style={styles.heroMetaRow}>
              <View style={styles.heroPill}>
                <Ionicons name="shield-checkmark" size={13} color="#FFFFFF" />
                <Text style={styles.heroPillText}>Deposit protected</Text>
              </View>
              <View style={styles.heroPill}>
                <Ionicons name="chatbubbles" size={13} color="#FFFFFF" />
                <Text style={styles.heroPillText}>Chat before booking</Text>
              </View>
            </View>
          </View>
          <View style={styles.heroPrice}>
            <Text style={styles.heroPriceLabel}>From</Text>
            <Text style={styles.heroPriceValue}>$25</Text>
          </View>
        </BlurView>

        <View style={styles.trustRow}>
          <View style={[styles.trustTile, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.trustValue, { color: activeTheme.text }]}>4.9</Text>
            <Text style={[styles.trustLabel, { color: activeTheme.textMuted }]}>Avg rating</Text>
          </View>
          <View style={[styles.trustTile, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.trustValue, { color: activeTheme.text }]}>24h</Text>
            <Text style={[styles.trustLabel, { color: activeTheme.textMuted }]}>Fast booking</Text>
          </View>
          <View style={[styles.trustTile, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.trustValue, { color: activeTheme.text }]}>Safe</Text>
            <Text style={[styles.trustLabel, { color: activeTheme.textMuted }]}>Deposits</Text>
          </View>
        </View>

        <View style={[styles.searchBar, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <Ionicons name="search-outline" size={16} color={activeTheme.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search hair, makeup, repairs..."
            placeholderTextColor={activeTheme.textMuted}
            style={[styles.searchInput, { color: activeTheme.text }]}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryTrack}>
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: active ? Theme.brand.primary : activeTheme.card,
                    borderColor: active ? Theme.brand.primary : activeTheme.border,
                  },
                ]}
              >
                <Text style={[styles.categoryText, { color: active ? '#FFFFFF' : activeTheme.textMuted }]}>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Available now</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => router.push('/marketplace/new')}>
            <Ionicons name="storefront-outline" size={13} color={Theme.brand.primary} />
            <Text style={styles.sectionActionText}>Sell</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.sectionMeta, { color: activeTheme.textMuted }]}>{filteredListings.length} services near you</Text>

        <View style={styles.listGrid}>
          {filteredListings.map((listing) => (
            <TouchableOpacity
              key={listing.id}
              activeOpacity={0.88}
              onPress={() => router.push(`/marketplace/${listing.id}`)}
              style={[styles.listingCard, { backgroundColor: activeTheme.cardElevated, borderColor: activeTheme.border, shadowColor: activeTheme.shadow }]}
            >
              <View style={[styles.listingVisual, { backgroundColor: `${listing.accent}1F` }]}>
                <LinearGradient colors={[`${listing.accent}E6`, `${listing.accent}5C`]} style={StyleSheet.absoluteFillObject} />
                <Ionicons name={listing.icon as any} size={26} color="#FFFFFF" />
              </View>
              <View style={styles.listingBody}>
                <View style={styles.listingTopRow}>
                  <Text style={[styles.listingCategory, { color: listing.accent }]}>{listing.category}</Text>
                  <View style={[styles.ratingPill, { backgroundColor: activeTheme.background }]}>
                    <Ionicons name="star" size={11} color="#F59E0B" />
                    <Text style={[styles.ratingText, { color: activeTheme.text }]}>{listing.rating}</Text>
                  </View>
                </View>
                <Text style={[styles.listingTitle, { color: activeTheme.text }]} numberOfLines={2}>
                  {listing.title}
                </Text>
                <Text style={[styles.sellerText, { color: activeTheme.textMuted }]} numberOfLines={1}>
                  {listing.seller}
                </Text>
                <View style={styles.listingMetaRow}>
                  <View style={[styles.metaBadge, { backgroundColor: activeTheme.background }]}>
                    <Ionicons name="location-outline" size={11} color={activeTheme.textMuted} />
                    <Text style={[styles.metaBadgeText, { color: activeTheme.textMuted }]}>{listing.distance}</Text>
                  </View>
                  <View style={[styles.metaBadge, { backgroundColor: activeTheme.background }]}>
                    <Ionicons name="briefcase-outline" size={11} color={activeTheme.textMuted} />
                    <Text style={[styles.metaBadgeText, { color: activeTheme.textMuted }]}>{listing.serviceMode}</Text>
                  </View>
                </View>
                <View style={styles.priceRow}>
                  <View>
                    <Text style={[styles.priceText, { color: activeTheme.text }]}>${listing.price}</Text>
                    <Text style={[styles.depositText, { color: activeTheme.textMuted }]}>Deposit ${listing.deposit}</Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={[styles.chatButton, { backgroundColor: activeTheme.background }]}
                      onPress={(event) => {
                        event.stopPropagation();
                        router.push({ pathname: '/pulse', params: { dmName: listing.seller, dmColor: listing.accent } });
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={`Chat with ${listing.seller}`}
                    >
                      <Ionicons name="chatbubble-ellipses-outline" size={14} color={Theme.brand.primary} />
                    </TouchableOpacity>
                    <View style={[styles.arrowButton, { backgroundColor: Theme.brand.primary }]}>
                      <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#14B8A6',
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
  headerTitleWrap: { flex: 1 },
  kicker: { fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  title: { fontSize: 29, fontWeight: '900', letterSpacing: -0.8, marginTop: 2 },
  content: { paddingHorizontal: 22, paddingBottom: 40 },
  hero: {
    minHeight: 190,
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 14,
  },
  heroTextWrap: { flex: 1 },
  heroLabel: { color: 'rgba(255,255,255,0.78)', fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  heroBadge: {
    alignSelf: 'flex-start',
    minHeight: 30,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.8 },
  heroTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', lineHeight: 29, marginTop: 8 },
  heroMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  heroPill: {
    height: 30,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroPillText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  heroPrice: {
    width: 74,
    height: 74,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPriceLabel: { color: 'rgba(255,255,255,0.82)', fontSize: 11, fontWeight: '800' },
  heroPriceValue: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', marginTop: 2 },
  trustRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  trustTile: {
    flex: 1,
    minHeight: 70,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  trustValue: { fontSize: 18, fontWeight: '900' },
  trustLabel: { fontSize: 11, fontWeight: '800', marginTop: 3 },
  searchBar: {
    height: 50,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '700' },
  categoryTrack: { gap: 10, paddingVertical: 16 },
  categoryButton: {
    height: 36,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: { fontSize: 12, fontWeight: '900' },
  sectionHeader: {
    marginTop: 2,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  sectionMeta: { fontSize: 12, fontWeight: '700', marginTop: -6, marginBottom: 12 },
  sectionAction: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sectionActionText: { color: Theme.brand.primary, fontSize: 12, fontWeight: '900' },
  listGrid: { gap: 12 },
  listingCard: {
    minHeight: 134,
    borderRadius: 24,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    gap: 13,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  listingVisual: {
    width: 96,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listingBody: { flex: 1, minWidth: 0 },
  listingTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  listingCategory: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.7 },
  ratingPill: { height: 24, borderRadius: 10, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 11, fontWeight: '900' },
  listingTitle: { fontSize: 17, fontWeight: '900', lineHeight: 21, marginTop: 10 },
  sellerText: { fontSize: 12, fontWeight: '700', marginTop: 4 },
  listingMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 9 },
  metaBadge: {
    minHeight: 24,
    borderRadius: 10,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaBadgeText: { fontSize: 10, fontWeight: '800' },
  priceRow: { marginTop: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceText: { fontSize: 18, fontWeight: '900' },
  depositText: { fontSize: 11, fontWeight: '800', marginTop: 2 },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chatButton: { width: 32, height: 32, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  arrowButton: { width: 32, height: 32, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
