import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MapPin, Navigation, Radio, ShieldCheck } from 'lucide-react-native';
import { BrandMark } from '@/components/BrandMark';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useTracking } from '@/hooks/useTracking';

export default function TrackingScreen() {
  const { config, status, error, start, stop } = useTracking();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer); }, []);
  const active = status === 'tracking';

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.top}><BrandMark /><View style={[styles.livePill, active && styles.livePillActive]}><View style={[styles.dot, active && styles.dotActive]} /><Text style={styles.liveText}>{active ? 'EN LIGNE' : 'HORS LIGNE'}</Text></View></View>
    <View style={styles.hero}><Text style={styles.eyebrow}>SUIVI DE LA PARTIE</Text><Text style={styles.title}>{active ? 'Votre partie est visible' : 'Prêt à vous élancer ?'}</Text><Text style={styles.subtitle}>{active ? 'L’organisation reçoit votre position automatiquement.' : 'Lancez le suivi une fois sur le parcours. Vous pouvez garder votre téléphone dans votre poche.'}</Text></View>
    <View style={styles.mapCard}><View style={styles.mapPattern}><View style={styles.route}><View style={styles.routeLine} /><View style={styles.pin}><MapPin color="#FFFFFF" fill="#1D5C48" size={22} /></View><View style={styles.green}><Navigation color="#B36B3C" fill="#B36B3C" size={17} /></View></View><Text style={styles.mapLabel}>Position GPS</Text></View><View style={styles.mapBottom}><View><Text style={styles.smallLabel}>PARTIE</Text><Text style={styles.group}>{config?.name || 'Groupe non configuré'}</Text></View><View style={styles.hole}><Text style={styles.smallLabel}>DÉPART</Text><Text style={styles.group}>{config ? `Trou ${config.startHole} · ${config.startTime}` : '—'}</Text></View></View></View>
    {error && <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View>}
    <PrimaryButton label={active ? 'Arrêter le suivi' : 'Démarrer le suivi'} onPress={active ? stop : start} loading={status === 'starting'} disabled={!config} variant={active ? 'outline' : 'primary'} />
    {!config && <Pressable style={styles.setupHint}><Text style={styles.setupHintText}>Configurez d’abord votre groupe dans l’onglet « Mon groupe ».</Text></Pressable>}
    <View style={styles.statusCard}><View style={styles.statusIcon}><ShieldCheck color="#1D5C48" size={22} /></View><View style={styles.statusCopy}><Text style={styles.statusTitle}>{active ? 'Suivi sécurisé' : 'Votre position reste privée'}</Text><Text style={styles.statusText}>{active ? `Dernière vérification à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : 'Seule l’organisation de la compétition reçoit votre position.'}</Text></View><Radio color={active ? '#2C9B72' : '#A8B8B0'} size={22} /></View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F5F8F6', flex: 1 },
  content: { gap: 20, padding: 24, paddingBottom: 120, paddingTop: 30 },
  top: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  livePill: { alignItems: 'center', backgroundColor: '#EEF1EF', borderRadius: 20, flexDirection: 'row', gap: 7, paddingHorizontal: 11, paddingVertical: 7 },
  livePillActive: { backgroundColor: '#E3F3EC' },
  dot: { backgroundColor: '#9AA9A2', borderRadius: 5, height: 8, width: 8 },
  dotActive: { backgroundColor: '#2C9B72' },
  liveText: { color: '#60736A', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 0.7 },
  hero: { gap: 9, marginTop: 22 },
  eyebrow: { color: '#B36B3C', fontFamily: 'Inter_700Bold', fontSize: 11, letterSpacing: 1.8 },
  title: { color: '#17352D', fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -0.7, lineHeight: 36 },
  subtitle: { color: '#60736A', fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 23 },
  mapCard: { backgroundColor: '#FFFFFF', borderColor: '#E1EAE5', borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  mapPattern: { backgroundColor: '#E2F0E7', height: 190, justifyContent: 'center', overflow: 'hidden', position: 'relative' },
  route: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  routeLine: { backgroundColor: '#9BC6AC', height: 3, position: 'absolute', transform: [{ rotate: '-24deg' }], width: 145 },
  pin: { alignItems: 'center', backgroundColor: '#1D5C48', borderColor: '#FFFFFF', borderRadius: 20, borderWidth: 4, height: 42, justifyContent: 'center', width: 42 },
  green: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 2, height: 36, justifyContent: 'center', marginLeft: 100, shadowColor: '#17352D', shadowOpacity: 0.12, shadowRadius: 8, width: 36 },
  mapLabel: { bottom: 12, color: '#4D7461', fontFamily: 'Inter_700Bold', fontSize: 11, left: 16, position: 'absolute' },
  mapBottom: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  hole: { alignItems: 'flex-end' },
  smallLabel: { color: '#8A9992', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1 },
  group: { color: '#17352D', fontFamily: 'Inter_700Bold', fontSize: 14, marginTop: 5 },
  error: { backgroundColor: '#FCEDEA', borderRadius: 12, padding: 13 },
  errorText: { color: '#A94435', fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19 },
  setupHint: { alignItems: 'center', marginTop: -8 },
  setupHintText: { color: '#B36B3C', fontFamily: 'Inter_700Bold', fontSize: 13, textAlign: 'center' },
  statusCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E1EAE5', borderRadius: 15, borderWidth: 1, flexDirection: 'row', gap: 12, padding: 14 },
  statusIcon: { alignItems: 'center', backgroundColor: '#EAF3EE', borderRadius: 11, height: 42, justifyContent: 'center', width: 42 },
  statusCopy: { flex: 1, gap: 3 },
  statusTitle: { color: '#17352D', fontFamily: 'Inter_700Bold', fontSize: 13 },
  statusText: { color: '#71807A', fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
});
