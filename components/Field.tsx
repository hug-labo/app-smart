import { Text, TextInput, StyleSheet, View } from 'react-native';

type Props = { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; keyboardType?: 'default' | 'numeric'; maxLength?: number };

export function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', maxLength }: Props) {
  return <View style={styles.wrap}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#9AA9A2" keyboardType={keyboardType} maxLength={maxLength} style={styles.input} /></View>;
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: { color: '#38534A', fontFamily: 'Inter_700Bold', fontSize: 12, letterSpacing: 0.3, textTransform: 'uppercase' },
  input: { backgroundColor: '#F8FBF9', borderColor: '#D6E1DC', borderRadius: 12, borderWidth: 1, color: '#17352D', fontFamily: 'Inter_400Regular', fontSize: 16, minHeight: 52, paddingHorizontal: 16 },
});
