import { StyleSheet, Text, View } from 'react-native';
import { BatteryCharging, Bell, LockKeyhole, MapPinned } from 'lucide-react-native';
import { BrandMark } from '@/components/BrandMark';

const items = [
  { icon: MapPinned, title: 'Une localisation discrète', text: 'La position est transmise à l’organisation toutes les 15 secondes environ, uniquement pendant votre partie.' },
  { icon: Bell, title: 'Le suivi en arrière-plan', text: 'Après le démarrage, vous pouvez verrouiller votre téléphone. Android continue à envoyer votre position.' },
  { icon: BatteryCharging, title: 'Une batterie préservée', text: 'Le mode de précision équilibré est conçu pour suivre le rythme d’une partie sans vider votre batterie.' },
  { icon: LockKeyhole, title: 'Vos données', text: 'Votre groupe est identifié par son nom. Aucune information personnelle n’est demandée.' },
];

export default function InfoScreen() {
  return <View style={styles.screen}><View style={styles.content}><BrandMark /><Text style={styles.title}>Besoin d’aide ?</Text><Text style={styles.subtitle}>Quelques repères pour jouer l’esprit tranquille.</Text><View style={styles.list}>{items.map(({ icon: Icon, title, text }) => <View key={title} style={styles.item}><View style={styles.icon}><Icon color="#1D5C48" size={21} /></View><View style={styles.copy}><Text style={styles.itemTitle}>{title}</Text><Text style={styles.itemText}>{text}</Text></View></View>)}</View><Text style={styles.footer}>Golf Track · Suivi de compétition</Text></View></View>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F5F8F6', flex: 1 },
  content: { gap: 22, padding: 24, paddingTop: 30 },
  title: { color: '#17352D', fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -0.7, marginTop: 26 },
  subtitle: { color: '#60736A', fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 23, marginTop: -12 },
  list: { gap: 12, marginTop: 8 },
  item: { alignItems: 'flex-start', backgroundColor: '#FFFFFF', borderColor: '#E1EAE5', borderRadius: 15, borderWidth: 1, flexDirection: 'row', gap: 13, padding: 15 },
  icon: { alignItems: 'center', backgroundColor: '#EAF3EE', borderRadius: 11, height: 42, justifyContent: 'center', width: 42 },
  copy: { flex: 1, gap: 5 },
  itemTitle: { color: '#17352D', fontFamily: 'Inter_700Bold', fontSize: 14 },
  itemText: { color: '#71807A', fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
  footer: { color: '#9AA9A2', fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 10, textAlign: 'center' },
});
