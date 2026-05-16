import { ViewStyle } from "react-native"

export interface ScreenProps {
    children: React.ReactNode
    scroll?: boolean
    padded?: boolean
    style?: ViewStyle
}