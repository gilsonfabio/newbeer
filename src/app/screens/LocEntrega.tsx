import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy} from 'expo-location';

type UserProps = {
    idUsr: number;
    nome: string;
    email: string;
    status: string;
}

const LocEntrega = () => {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const navigation = useNavigation();
    const route = useRoute();

    const mapRef = useRef<MapView>(null);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();
    
        if (granted) {
          const currentPosition = await getCurrentPositionAsync();
          setLocation(currentPosition);
        }
      }
    
      useEffect(() => {
        requestLocationPermissions();
      },[])

      useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest, 
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response) 
            mapRef.current?.animateCamera({
                pitch: 70,
                center: response.coords
            })    
        })
      },[])
    
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Localização para Entrega</Text>
            {
                location &&
                <MapView 
                    ref={mapRef}
                    style={styles.map} 
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker 
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
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
        backgroundColor: '#FF7826',
    },    
    texto: {
        fontSize: 20,
        color: '#fff',
    },
    
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

export default LocEntrega;