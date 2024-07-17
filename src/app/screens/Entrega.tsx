import React, { useState, useEffect} from "react"
import { Alert, View, Text, StyleSheet, Button, Dimensions} from "react-native"
import { useLocalSearchParams } from "expo-router";

import MapView, {Marker} from "react-native-maps"
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location"

export default function Entrega(){
    const [errorMsg , setErrorMsg] = useState('');
    const local = useLocalSearchParams();

    const [location, setLocation] = useState<LocationObject | null>(null);

    async function requestForegroundPermissions() {
        const { granted }: any = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
        console.log(location)
    }

    useEffect(() => {
        let idUsr = local.id;
        console.log(idUsr);
        requestForegroundPermissions();

    }, []);

    return (
        <View style={styles.container}>
            <View className="flex w-full h-20 bg-violet-900 items-center justify-center ">
                <Text className="text-white font-semibold text-md ">Localização Atual</Text>
            </View>
            {
                location &&
                <MapView 
                    style={styles.map} 
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005 
                    }}
                    showsMyLocationButton
                    showsUserLocation
                >
                    <Marker 
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                    />
                </MapView>
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },    
    map: {
        width: '100%',
        height: '100%',
    },
})