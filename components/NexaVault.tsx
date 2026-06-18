import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  balance: number;
  onDeposit?: () => void;
  onWithdraw?: () => void;
};

export default function NexaVault({ balance, onDeposit, onWithdraw }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>NexaVault</Text>
      <Text style={styles.balance}>${balance.toFixed(2)}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={onDeposit}>
          <Text style={styles.btnText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.outline]} onPress={onWithdraw}>
          <Text style={[styles.btnText, styles.outlineText]}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12 },
  title: { fontSize: 14, fontWeight: '700' },
  balance: { fontSize: 22, fontWeight: '800', marginTop: 8 },
  row: { flexDirection: 'row', marginTop: 12, gap: 8 },
  btn: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#0ea5a4', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  outline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0ea5a4' },
  outlineText: { color: '#0ea5a4' },
});
