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