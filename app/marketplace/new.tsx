import React, { useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Theme } from '../../constants/Theme';
import { useAppTheme } from '../../lib/theme';

const categories = ['Hair', 'Beauty', 'Repairs', 'Design', 'Events'];
const serviceModes = ['Home service', 'Shop visit', 'Remote', 'Drop-off'];

export default function CreateListingScreen() {
  const { activeTheme, isDark } = useAppTheme();
  const [category, setCategory] = useState('Hair');
  const [serviceMode, setServiceMode] = useState('Home service');
  const [title, setTitle] = useState('Bridal Hairstyle & Wig Install');
  const [price, setPrice] = useState('120');
  const [deposit, setDeposit] = useState('30');
  const [location, setLocation] = useState('Lekki Phase 1');
  const [description, setDescription] = useState('Clean styling, wig install, frontal prep, and finishing for events or home service.');
  const [published, setPublished] = useState(false);
  const goBackToMarketplace = () => router.replace('/marketplace');

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      goBackToMarketplace();
      return true;
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={[styles.glow, { opacity: isDark ? 0.16 : 0.08 }]} />
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
          <Text style={[styles.kicker, { color: activeTheme.textMuted }]}>SELLER</Text>
          <Text style={[styles.title, { color: activeTheme.text }]}>Create Listing</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.previewCard, { borderColor: activeTheme.border }]}>
          <LinearGradient colors={['#0F766E', '#0EA5E9']} style={StyleSheet.absoluteFillObject} />
          <Text style={styles.previewLabel}>Live preview</Text>
          <Text style={styles.previewTitle}>{title || 'Service title'}</Text>
          <Text style={styles.previewSub}>{category} - {serviceMode} - {location || 'Location'}</Text>
          <View style={styles.previewPriceRow}>
            <Text style={styles.previewPrice}>${price || '0'}</Text>
            <Text style={styles.previewDeposit}>Deposit ${deposit || '0'}</Text>
          </View>
        </View>

        <View style={[styles.formCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <Text style={[styles.formTitle, { color: activeTheme.text }]}>Service details</Text>
          <Field label="Service title" value={title} onChangeText={setTitle} placeholder="Example: Bridal hairstyle" theme={activeTheme} />
          <Field label="Location" value={location} onChangeText={setLocation} placeholder="Area or city" theme={activeTheme} />
          <Field label="Full price" value={price} onChangeText={setPrice} placeholder="120" theme={activeTheme} keyboardType="numeric" />
          <Field label="Deposit required" value={deposit} onChangeText={setDeposit} placeholder="30" theme={activeTheme} keyboardType="numeric" />

          <Text style={[styles.inputLabel, { color: activeTheme.textMuted }]}>Category</Text>
          <View style={styles.chipWrap}>
            {categories.map((item) => (
              <Chip key={item} label={item} active={category === item} onPress={() => setCategory(item)} theme={activeTheme} />
            ))}
          </View>

          <Text style={[styles.inputLabel, { color: activeTheme.textMuted }]}>Service mode</Text>
          <View style={styles.chipWrap}>
            {serviceModes.map((item) => (
              <Chip key={item} label={item} active={serviceMode === item} onPress={() => setServiceMode(item)} theme={activeTheme} />
            ))}
          </View>

          <Text style={[styles.inputLabel, { color: activeTheme.textMuted }]}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Tell customers what you offer..."
            placeholderTextColor={activeTheme.textMuted}
            multiline
            textAlignVertical="top"
            style={[styles.descriptionInput, { backgroundColor: activeTheme.background, color: activeTheme.text }]}
          />
        </View>

        <View style={[styles.publishCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
          <View style={[styles.publishIcon, { backgroundColor: activeTheme.background }]}>
            <Ionicons name="shield-checkmark-outline" size={18} color={Theme.brand.primary} />
          </View>
          <View style={styles.publishText}>
            <Text style={[styles.publishTitle, { color: activeTheme.text }]}>Deposit protected bookings</Text>
            <Text style={[styles.publishSub, { color: activeTheme.textMuted }]}>
              Customers can chat first, request a booking, then pay the deposit through Secure Vault.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.publishButton, { backgroundColor: published ? '#14B8A6' : Theme.brand.primary }]} onPress={() => setPublished(true)}>
          <Ionicons name={published ? 'checkmark-circle' : 'storefront-outline'} size={16} color="#FFFFFF" />
          <Text style={styles.publishButtonText}>{published ? 'Listing Ready' : 'Publish Listing'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Field({ label, theme, ...props }: any) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.inputLabel, { color: theme.textMuted }]}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
      />
    </View>
  );
}

function Chip({ label, active, onPress, theme }: { label: string; active: boolean; onPress: () => void; theme: any }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? Theme.brand.primary : theme.background,
          borderColor: active ? Theme.brand.primary : theme.border,
        },
      ]}
    >
      <Text style={[styles.chipText, { color: active ? '#FFFFFF' : theme.textMuted }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: {
    position: 'absolute',
    top: -90,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#0EA5E9',
  },
  header: { paddingHorizontal: 22, paddingTop: 58, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerButton: { width: 40, height: 40, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headerText: { flex: 1 },
  kicker: { fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  title: { fontSize: 29, fontWeight: '900', letterSpacing: -0.8, marginTop: 2 },
  content: { paddingHorizontal: 22, paddingBottom: 42 },
  previewCard: { minHeight: 180, borderRadius: 30, borderWidth: 1, overflow: 'hidden', padding: 20, justifyContent: 'flex-end' },
  previewLabel: { color: 'rgba(255,255,255,0.78)', fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  previewTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '900', lineHeight: 30, marginTop: 8 },
  previewSub: { color: 'rgba(255,255,255,0.82)', fontSize: 12, fontWeight: '800', marginTop: 8 },
  previewPriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  previewPrice: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  previewDeposit: { color: '#FFFFFF', fontSize: 12, fontWeight: '900', backgroundColor: 'rgba(255,255,255,0.16)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 12 },
  formCard: { marginTop: 16, borderRadius: 26, borderWidth: 1, padding: 16 },
  formTitle: { fontSize: 18, fontWeight: '900', marginBottom: 12 },
  fieldWrap: { marginBottom: 12 },
  inputLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  input: { height: 48, borderRadius: 16, paddingHorizontal: 13, fontSize: 14, fontWeight: '700' },
  descriptionInput: { minHeight: 100, borderRadius: 16, paddingHorizontal: 13, paddingVertical: 12, fontSize: 14, fontWeight: '700', lineHeight: 20 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: { minHeight: 36, borderRadius: 14, borderWidth: 1, paddingHorizontal: 13, alignItems: 'center', justifyContent: 'center' },
  chipText: { fontSize: 12, fontWeight: '900' },
  publishCard: { marginTop: 16, borderRadius: 24, borderWidth: 1, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'center' },
  publishIcon: { width: 42, height: 42, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  publishText: { flex: 1 },
  publishTitle: { fontSize: 15, fontWeight: '900' },
  publishSub: { fontSize: 12, fontWeight: '600', lineHeight: 17, marginTop: 2 },
  publishButton: { height: 52, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 },
  publishButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
});
