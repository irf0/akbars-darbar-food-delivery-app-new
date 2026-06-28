import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '@navigation/types'


type Props = NativeStackScreenProps<AppStackParamList, 'MenuDetail'>

const MenuDetailScreen = ({ route, navigation }: Props) => {

    const { item } = route.params
    return (
        <View>
            <Text>MenuDetailScreen</Text>
            <Text>{item.name}</Text>
        </View>
    )
}

export default MenuDetailScreen

const styles = StyleSheet.create({})