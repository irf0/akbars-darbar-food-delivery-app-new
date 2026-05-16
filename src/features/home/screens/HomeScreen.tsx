import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@hooks/useTheme'
import { StatusBar } from 'expo-status-bar'
import { useThemeStore } from '@store/themeStore'
import Screen from 'src/layout/AppScreen'
import AppScreen from 'src/layout/AppScreen'
import { AppBadge } from '@components/ui/Badge'
import { AppAvatar } from '@components/ui/Avatar'
import AppLoader from '@components/ui/Loader'
import { AppButton } from '@components/ui/Button/AppButton'
import { toast } from '@components/ui/Toast'
import AppModal from '@components/ui/Modal'
import { AppListItem } from '@components/ui/ListItem'
import { Ionicons } from '@expo/vector-icons'
import { AppText } from '@components/ui/Text'


const HomeScreen = () => {
    const theme = useTheme()
    const { resolved } = useThemeStore()
    const [visible, setVisible] = useState(false)

    return (

        <AppScreen scroll >
            <Text style={{ color: theme.colors.text }}>HomeScreen</Text>
            <AppBadge label="Delivered" color='neutral' variant="filled" />
            <AppAvatar
                source={{ uri: "https://picsum.photos/200/300" }}
                size="md"
                presence="online"
            />
            <AppLoader variant='dots' size="md" color='primary' />

            {/* toast testing */}
            <AppButton
                style={{ marginVertical: 25 }}
                label="Test Toast"
                onPress={() => toast.success('Order placed!', 'Your order is on its way.')}
            />

            <AppButton label="Test Modal" onPress={() => setVisible(true)} />
            <AppModal
                visible={visible}
                onClose={() => setVisible(false)}
                title="Confirm order"
                subtitle="Are you sure you want to place this order?"
                primaryAction={{ label: 'Confirm', onPress: () => { setVisible(false); toast.success('Order placed!') } }}
                secondaryAction={{ label: 'Cancel', onPress: () => setVisible(false) }}
            />

            <AppText>List Item Test</AppText>
            <AppListItem
                title='Notifications'
                leftElement={<Ionicons name='notifications' size={22} color={theme.colors.primary} />}
                showChevron
                onPress={() => { }}
            />


        </AppScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})