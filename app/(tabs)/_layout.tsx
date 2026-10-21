import { Tabs } from 'expo-router';
import { CircleHelp, Radio, Settings2 } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1D5C48', tabBarInactiveTintColor: '#8A9992', tabBarLabelStyle: styles.label, tabBarStyle: styles.bar, tabBarHideOnKeyboard: true }}>
    <Tabs.Screen name="index" options={{ title: 'Suivi', tabBarIcon: ({ color, size }) => <Radio color={color} size={size} /> }} />
    <Tabs.Screen name="setup" options={{ title: 'Mon groupe', tabBarIcon: ({ color, size }) => <Settings2 color={color} size={size} /> }} />
    <Tabs.Screen name="info" options={{ title: 'Aide', tabBarIcon: ({ color, size }) => <CircleHelp color={color} size={size} /> }} />
  </Tabs>;
}

const styles = StyleSheet.create({
  bar: { backgroundColor: '#FFFFFF', borderTopColor: '#E4ECE8', height: 78, paddingBottom: 10, paddingTop: 8 },
  label: { fontFamily: 'Inter_700Bold', fontSize: 11 },
});
