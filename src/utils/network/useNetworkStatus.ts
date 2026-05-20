import { useState, useEffect } from 'react'
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'

export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null)

    useEffect(() => {
        // fetch current state immediately on mount
        NetInfo.fetch().then((state: NetInfoState) => {
            setIsConnected(state.isConnected ?? true)
        })

        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            setIsConnected(state.isConnected ?? true)
        })

        return () => unsubscribe()
    }, [])

    return { isConnected }
}