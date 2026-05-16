import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@hooks/useTheme'
import { ScreenProps } from './types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeStore } from '@store/themeStore'
import { StatusBar } from 'expo-status-bar'


const AppScreen = ({ children, scroll = false, padded = true, style }: ScreenProps) => {
    const { colors, spacing } = useTheme()
    const { resolved } = useThemeStore()

    const Content = scroll ? ScrollView : View

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
            <Content style={[{ flex: 1, padding: padded ? spacing.md : 0 }, style]}>
                {children}
            </Content>
        </SafeAreaView>
    )
}

export default AppScreen

const styles = StyleSheet.create({})