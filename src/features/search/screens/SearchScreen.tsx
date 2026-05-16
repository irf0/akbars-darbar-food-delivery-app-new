import React from 'react'
import AppScreen from 'src/layout/AppScreen'
import { AppText } from '@components/ui/Text'
import { AppHeader } from '@components/ui/Header'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'


const SearchScreen = () => {
    const theme = useTheme()
    return (
        <AppScreen>
            <AppText>SearchScreen</AppText>

            {/* Test Header */}
            <AppHeader
                title='Profile'
                backgroundColor={theme.colors.primary}
                leftAction={{
                    icon: <Ionicons name='arrow-back' size={22} color={theme.colors.text} />,
                    onPress: () => navigation.back(),
                }}
            />
        </AppScreen>
    )
}

export default SearchScreen