import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';

export const LOCATION_TASK = 'golf-track-location';
const CONFIG_KEY = '@golf-track/config';
const API_URL = 'https://golfbourges-suivi.onrender.com/api/position';

export type GroupConfig = {
  name: string;
  startHole: number;
  startTime: string;
};

export type TrackingStatus = 'idle' | 'starting' | 'tracking' | 'error';

export async function saveGroupConfig(config: GroupConfig): Promise<void> {
  await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export async function getGroupConfig(): Promise<GroupConfig | null> {
  const value = await AsyncStorage.getItem(CONFIG_KEY);
  return value ? (JSON.parse(value) as GroupConfig) : null;
}

export async function sendPosition(latitude: number, longitude: number): Promise<void> {
  const config = await getGroupConfig();
  if (!config) throw new Error('Configuration du groupe introuvable.');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...config,
      lat: latitude,
      lng: longitude,
    }),
  });

  if (!response.ok) throw new Error('Le serveur n’a pas accepté la position.');
}

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
  if (error) return;
  const locations = (data as { locations?: Location.LocationObject[] } | null)?.locations;
  const latest = locations?.[locations.length - 1];
  if (latest) {
    try {
      await sendPosition(latest.coords.latitude, latest.coords.longitude);
    } catch {
      // A later location update retries automatically.
    }
  }
});

export async function startTracking(): Promise<void> {
  const foreground = await Location.requestForegroundPermissionsAsync();
  if (foreground.status !== Location.PermissionStatus.GRANTED) {
    throw new Error('Autorisez la localisation pour démarrer le suivi.');
  }

  if (Platform.OS !== 'web') {
    const background = await Location.requestBackgroundPermissionsAsync();
    if (background.status !== Location.PermissionStatus.GRANTED) {
      throw new Error('Autorisez la localisation en arrière-plan pour continuer le suivi.');
    }
  }

  const alreadyRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
  if (!alreadyRunning) {
    await Location.startLocationUpdatesAsync(LOCATION_TASK, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 15000,
      distanceInterval: 15,
      pausesUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Golf Track actif',
        notificationBody: 'Votre position est envoyée à l’organisation.',
        notificationColor: '#1D5C48',
      },
    });
  }

  const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  await sendPosition(current.coords.latitude, current.coords.longitude);
}

export async function stopTracking(): Promise<void> {
  if (await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK)) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK);
  }
}

export async function isTracking(): Promise<boolean> {
  return Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
}
