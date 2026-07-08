import * as Location from 'expo-location'
import { PermissionResult } from './types'



export const requestLocation = async (): Promise<PermissionResult> => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status === 'granted') return { status: 'granted', granted: true }
    if (status === 'undetermined') return { status: 'undetermined', granted: false }
    return { status: 'denied', granted: false }
}

export const checkLocationPermission = async (): Promise<PermissionResult> => {
    const { status } = await Location.getForegroundPermissionsAsync()

    if (status === 'granted') return { status: 'granted', granted: true }
    if (status === 'undetermined') return { status: 'undetermined', granted: false }
    return { status: 'denied', granted: false }
}