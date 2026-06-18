import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  id: string;
  title: string;
  price: number;
  onPress?: () => void;
};

export default function ListingCard({ id, title, price, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.thumb} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  body: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700' },
  price: { marginTop: 6, color: '#444' },
});
