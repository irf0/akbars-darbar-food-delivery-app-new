// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const NotificationScreen = () => {
//     return (
//         <View>
//             <Text>NotificationScreen</Text>
//         </View>
//     )
// }

// export default NotificationScreen

// const styles = StyleSheet.create({})

import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'

// Fallback center — swap with your restaurant's actual lat/lng later
const FALLBACK_REGION: Region = {
    latitude: 27.4768,
    longitude: 95.3353,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
}

export default function PinDragTest() {
    const [pinCoords, setPinCoords] = useState({
        latitude: FALLBACK_REGION.latitude,
        longitude: FALLBACK_REGION.longitude,
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.infoBar}>
                <Text>Lat: {pinCoords.latitude.toFixed(6)}</Text>
                <Text>Lng: {pinCoords.longitude.toFixed(6)}</Text>
            </View>

            <MapView
                style={{ flex: 1 }}
                initialRegion={FALLBACK_REGION}
            >
                <Marker
                    coordinate={pinCoords}
                    draggable
                    onDragEnd={(e) => {
                        const { latitude, longitude } = e.nativeEvent.coordinate
                        setPinCoords({ latitude, longitude })
                    }}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    infoBar: {
        padding: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
})