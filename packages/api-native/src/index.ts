import { Linking, Platform } from 'react-native';

export async function openExternalUrl(url: string) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  await Linking.openURL(url);
}

export async function copyToClipboard(value: string) {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  // TODO: Replace with expo-clipboard or @react-native-clipboard/clipboard.
  console.warn('Clipboard API not configured for native. Value:', value);
}
