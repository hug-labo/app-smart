import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type Props = { label: string; onPress: () => void; loading?: boolean; disabled?: boolean; variant?: 'primary' | 'outline' };

export function PrimaryButton({ label, onPress, loading = false, disabled = false, variant = 'primary' }: Props) {
  return (
    <Pressable disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.button, variant === 'outline' && styles.outline, (disabled || loading) && styles.disabled, pressed && styles.pressed]}>
      {loading ? <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#1D5C48'} /> : <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: '#1D5C48', borderRadius: 14, minHeight: 54, justifyContent: 'center', paddingHorizontal: 20, width: '100%' },
  outline: { backgroundColor: '#FFFFFF', borderColor: '#D6E1DC', borderWidth: 1 },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  text: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 15 },
  outlineText: { color: '#1D5C48' },
});
