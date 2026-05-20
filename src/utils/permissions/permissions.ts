import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { Alert, Linking } from 'react-native'
import { PermissionResult, PermissionType } from './types'

const openSettings = () => {
    Alert.alert(
        'Permission Required',
        'Please enable this permission in your device settings to continue.',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
    )
}

const requestGallery = async (): Promise<PermissionResult> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') return { status: 'granted', granted: true }
    if (status === 'denied') {
        openSettings()
        return { status: 'blocked', granted: false }
    }
    return { status: 'denied', granted: false }
}

const requestLocation = async (): Promise<PermissionResult> => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') return { status: 'granted', granted: true }
    if (status === 'denied') {
        openSettings()
        return { status: 'blocked', granted: false }
    }
    return { status: 'denied', granted: false }
}

export const requestPermission = async (type: PermissionType): Promise<PermissionResult> => {
    switch (type) {
        case 'gallery': return requestGallery()
        case 'location': return requestLocation()
    }
}

export const checkPermission = async (type: PermissionType): Promise<PermissionResult> => {
    switch (type) {
        case 'gallery': {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync()
            return { status: status === 'granted' ? 'granted' : 'denied', granted: status === 'granted' }
        }
        case 'location': {
            const { status } = await Location.getForegroundPermissionsAsync()
            return { status: status === 'granted' ? 'granted' : 'denied', granted: status === 'granted' }
        }
    }
}