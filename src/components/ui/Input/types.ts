import { TextInputProps as RNTextInputProps } from "react-native"

export interface InputProps extends RNTextInputProps {
    label?: string
    error?: string
    disabled?: boolean
}

export type KeyboardType = "default" | "email-address" | "phone-pad" | "numeric"