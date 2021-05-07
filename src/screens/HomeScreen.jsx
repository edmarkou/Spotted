import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { makeAuthRequest } from '../helpers/fetch';
import style from '../styles/global';
import { updateAuthorization } from '../actions/userActions';
import MapView, { Marker, Callout, Circle, PROVIDER_GOOGLE } from 'react-native-maps'; // add PROVIDER_GOOGLE import if using Google Maps
import { getLocation, getDistanceBetween } from '../helpers/locationHelper';
import SpotCallout from '../components/SpotCallout';
import BottomHalfModal from '../components/BottomHalfModal';
import useMapSocket from '../context/useMapSocket';
import pointerSmallIcon from '../assets/images/pointer_small.png';
import pointerMediumIcon from '../assets/images/pointer_medium.png';
import pointerLargeIcon from '../assets/images/pointer_large.png';
import { PRIMARY_COLOR } from '../styles/constants';

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
});

const HomeScreen = ({
    navigation,
    user
}) => {
    const [currLocation, setLocation] = useState(null);
    const [spots, setSpots] = useState([]);
    const [coordinates, setCoords] = useState([]);

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

    useMapSocket({ user, refreshMap: getSpots });

    useEffect(() => {
        getLocation().then(location => {
            console.log(location)
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

    const openSpotCreation = (e) => {
        setCoords([e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude]);
    };

    const navigateToSpot = (spot) => {
        navigation.navigate('Spot', { _id: spot._id });
    }

    const createSpot = (data) => {
        const spot = { ...data, location: { type: 'Point', coordinates } };
        makeAuthRequest(`http://192.168.1.234:5000/spots/create`, spot, 'POST')
            .then(res => {
                if (res.success) {
                    console.log('created new spot');
                } else {
                    console.warn(res.message);
                }
            });
        setCoords([]);
    }

    const onUserLocationChange = (e) => {
        if (getDistanceBetween(
            e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude,
            currLocation.latitude, currLocation.longitude
        ) > 500) {
            getLocation().then(location => {
                setLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                });
            });
        }
    }

    const getRadius = size => {
        const radius = { MEDIUM: 100, SMALL: 50, LARGE: 250 };
        return radius[size];
    }

    return (
        <View style={style.home_container}>
            {currLocation &&
                <MapView
                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={currLocation}
                    showsUserLocation
                    onUserLocationChange={onUserLocationChange}
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
                    {spots.map((spot, i) => (
                        <Circle
                            zIndex={-1}
                            strokeColor={PRIMARY_COLOR}
                            fillColor={PRIMARY_COLOR}
                            key={i}
                            radius={getRadius(spot.size)}
                            center={{
                                longitude: spot.location.coordinates[0],
                                latitude: spot.location.coordinates[1]
                            }}
                        />
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

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);