import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { makeAuthRequest } from '../helpers/fetch';
import style from '../styles/global';
import { updateAuthorization } from '../actions/userActions';
import MapView, { Marker } from 'react-native-maps'; // add PROVIDER_GOOGLE import if using Google Maps
import { getLocation } from '../helpers/locationHelper';

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
        makeAuthRequest(`http://localhost:5000/spots/get`)
            .then(res => {
                if (res.success) {
                    setSpots(res.spots);
                } else {
                    console.warn(res.message);
                }
            });
    }

    const createSpot = (e) => {
        const spot = {
            title: 'test',
            description: 'test test test',
            location: {
                type: 'Point',
                coordinates: [e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude]
            },
            image: 'https://lh3.googleusercontent.com/proxy/KH2XaHU9C6kfFdkeEQfW9SDdnotvE8qs4Ygk7OFivMLMNyUbYbEaGBIWzN7vtfuGar2LsgmIY1A9G-GV53XQEsWkxN4PeJlfkkXElRpc_fzEsGuJUPZhi__zi2ye5neBjvcwJgN1fbvcbLIfrazrXY4FvVdCZhwCsQ00nVPos1uT6DJmNQ',
            size: 'SMALL',
            type: 'SKATEPARK',
        };
        makeAuthRequest(`http://localhost:5000/spots/create`, spot, 'POST')
            .then(res => {
                if (res.success) {
                    setSpots([...spots, res.spot]);
                } else {
                    console.warn(res.message);
                }
            });
    };

    const navigateToSpot = (spot) => {
        navigation.navigate('Spot', { spot });
    }

    return (
        <View style={style.home_container}>
            <View style={{ width: '100%', height: '80%' }}>
                {currLocation &&
                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={currLocation}
                        showsUserLocation
                        onPress={createSpot}
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
                                identifier={spot._id}
                                tracksViewChanges={false}
                                onCalloutPress={() => navigateToSpot(spot)}
                            />
                        ))}
                    </MapView>
                }
            </View>
        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(null, mapDispatchToProps)(HomeScreen);