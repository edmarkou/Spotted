import RNLocation from 'react-native-location';

export async function initLocationServices() {
    RNLocation.configure({
        distanceFilter: 5.0
    });

    const permission = await RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
            detail: 'coarse' // or 'fine'
        }
    });

    if (!permission) {
        const granted = await RNLocation.requestPermission({
            ios: 'whenInUse',
            android: {
                detail: 'coarse', // or 'fine'
                rationale: {
                    title: "We need to access your location",
                    message: "We use your location to show where you are on the map",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        });
        return granted;
    }

    return true;
};

export async function getLocation() {
    const permission = await RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
            detail: 'coarse' // or 'fine'
        }
    });

    if (permission) {
        const location = await RNLocation.getLatestLocation();
        return location;
    }

    return new Error('Permission not granted');
}

const degreesToRadians = (degrees) => degrees * Math.PI / 180;

export function getDistanceBetween(lat1, lng1, lat2, lng2) {
    // The radius of the planet earth in meters
    const R = 6378137;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLong = degreesToRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2)
        *
        Math.sin(dLat / 2)
        +
        Math.cos(degreesToRadians(lat1))
        *
        Math.cos(degreesToRadians(lat1))
        *
        Math.sin(dLong / 2)
        *
        Math.sin(dLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}