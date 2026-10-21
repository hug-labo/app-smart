import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandMark } from '@/components/BrandMark';
import { Field } from '@/components/Field';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useTracking } from '@/hooks/useTracking';

export default function SetupScreen() {
  const { config, configure } = useTracking();
  const [name, setName] = useState('');
  const [hole, setHole] = useState('1');
  const [time, setTime] = useState('08:30');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (config) { setName(config.name); setHole(String(config.startHole)); setTime(config.startTime); }
  }, [config]);

  const save = async () => {
    const startHole = Math.min(18, Math.max(1, Number.parseInt(hole, 10) || 1));
    await configure({ name: name.trim() || 'Mon groupe', startHole, startTime: time.trim() || '08:30' });
    setHole(String(startHole)); setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <BrandMark />
      <View style={styles.heading}><Text style={styles.eyebrow}>AVANT DE PARTIR</Text><Text style={styles.title}>Identifiez votre partie</Text><Text style={styles.subtitle}>Ces informations permettent à l’organisation de vous reconnaître sur la carte.</Text></View>
      <View style={styles.card}>
        <Field label="Nom du groupe" value={name} onChangeText={setName} placeholder="Ex. Groupe 7" />
        <Field label="Trou de départ" value={hole} onChangeText={setHole} placeholder="1 à 18" keyboardType="numeric" maxLength={2} />
        <Field label="Heure de départ" value={time} onChangeText={setTime} placeholder="HH:mm" maxLength={5} />
        <PrimaryButton label={saved ? 'Informations enregistrées' : 'Enregistrer mon groupe'} onPress={save} />
      </View>
      <View style={styles.note}><Text style={styles.noteTitle}>À savoir</Text><Text style={styles.noteText}>La position est envoyée uniquement pendant le suivi. Votre batterie est préservée avec un point toutes les 15 secondes environ.</Text></View>
    </ScrollView>
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F5F8F6', flex: 1 },
  content: { gap: 28, padding: 24, paddingBottom: 120, paddingTop: 30 },
  heading: { gap: 9, marginTop: 16 },
  eyebrow: { color: '#B36B3C', fontFamily: 'Inter_700Bold', fontSize: 11, letterSpacing: 1.8 },
  title: { color: '#17352D', fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -0.7, lineHeight: 36 },
  subtitle: { color: '#60736A', fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 23, maxWidth: 360 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#E1EAE5', borderRadius: 18, borderWidth: 1, gap: 20, padding: 20 },
  note: { backgroundColor: '#EAF3EE', borderRadius: 14, gap: 6, padding: 16 },
  noteTitle: { color: '#1D5C48', fontFamily: 'Inter_700Bold', fontSize: 13 },
  noteText: { color: '#4C665B', fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
});
