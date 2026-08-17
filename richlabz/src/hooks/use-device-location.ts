import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const FALLBACK_LOCATION = 'Madhapur, Hyderabad';

function formatAddress(address: Location.LocationGeocodedAddress): string {
  const area = address.district ?? address.subregion ?? address.name;
  const city = address.city ?? address.region;

  const parts = [area, city].filter((part): part is string => !!part);
  // Avoids "Hyderabad, Hyderabad" when the area and the city resolve to the same name.
  const unique = parts.filter((part, index) => parts.indexOf(part) === index);

  return unique.join(', ') || FALLBACK_LOCATION;
}

/**
 * Asks for foreground location permission on mount and resolves the device's
 * area into a display name. Falls back to the default label if the user denies
 * the prompt or geocoding is unavailable.
 */
export function useDeviceLocation() {
  const [displayName, setDisplayName] = useState(FALLBACK_LOCATION);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log('[location] permission status:', status);
        if (status !== 'granted' || cancelled) return;

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (cancelled) return;
        console.log('[location] coords:', position.coords.latitude, position.coords.longitude);

        const [address] = await Location.reverseGeocodeAsync(position.coords);
        if (cancelled || !address) return;
        console.log('[location] address:', address);

        const resolved = formatAddress(address);
        console.log('[location] display name:', resolved);
        setDisplayName(resolved);
      } catch (error) {
        // Prompt dismissed, location services off, or reverse geocoding
        // unsupported (web) - keep the fallback label.
        console.log('[location] failed, using fallback:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { displayName };
}
