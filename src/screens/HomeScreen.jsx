import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { makeAuthRequest } from '../helpers/fetch';
import style from '../styles/global';
import { updateAuthorization } from '../actions/userActions';
import MapView, { Marker, Callout } from 'react-native-maps'; // add PROVIDER_GOOGLE import if using Google Maps
import { getLocation } from '../helpers/locationHelper';
import SpotCallout from '../components/SpotCallout';
import Modal from 'react-native-modal';
import BottomHalfModal from '../components/BottomHalfModal';

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
});

const HomeScreen = ({
    updateAuthorization,
    navigation
}) => {
    const [currLocation, setLocation] = useState(null);
    const [spots, setSpots] = useState([]);
    const [coordinates, setCoords] = useState([]);

    useEffect(() => {
        getLocation().then(location => {
            setLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            });
        });
    }, []);

    useEffect(() => {
        getSpots();
    }, [currLocation]);

    const getSpots = () => {
        makeAuthRequest(`http://192.168.1.234:5000/spots/get`)
            .then(res => {
                if (res.success) {
                    setSpots(res.spots);
                } else {
                    console.warn(res.message);
                }
            });
    }

    const openSpotCreation = (e) => {
        setCoords([e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude]);
    };

    const navigateToSpot = (spot) => {
        navigation.navigate('Spot', { spot });
    }

    const createSpot = (data) => {
        const spot = { ...data, location: { type: 'Point', coordinates } };
        makeAuthRequest(`http://192.168.1.234:5000/spots/create`, spot, 'POST')
            .then(res => {
                if (res.success) {
                    setSpots([...spots, res.spot]);
                } else {
                    console.warn(res.message);
                }
            });
        setCoords([]);
    }

    return (
        <View style={style.home_container}>
            {currLocation &&
                <MapView
                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={currLocation}
                    showsUserLocation
                    onPress={openSpotCreation}
                >
                    {spots.map((spot, i) => (
                        <Marker
                            key={i}
                            title={spot.title}
                            description={spot.description}
                            coordinate={{
                                longitude: spot.location.coordinates[0],
                                latitude: spot.location.coordinates[1]
                            }}
                            onPress={e => e.stopPropagation()}
                            identifier={spot._id}
                            tracksViewChanges={false}
                            onCalloutPress={() => navigateToSpot(spot)}
                        >
                            <Callout>
                                <SpotCallout spot={spot} />
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            }
            <BottomHalfModal
                onSubmit={createSpot}
                isVisible={!!coordinates.length}
                onClose={() => setCoords([])}
            />
        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(null, mapDispatchToProps)(HomeScreen);