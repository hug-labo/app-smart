import { MapPin } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

export function BrandMark() {
  return (
    <View style={styles.row}>
      <View style={styles.icon}><MapPin size={18} color="#FFFFFF" strokeWidth={2.5} /></View>
      <Text style={styles.brand}>GOLF <Text style={styles.brandLight}>TRACK</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  icon: { alignItems: 'center', backgroundColor: '#1D5C48', borderRadius: 11, height: 34, justifyContent: 'center', width: 34 },
  brand: { color: '#17352D', fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 1.4 },
  brandLight: { color: '#71807A', fontFamily: 'Inter_400Regular' },
});
