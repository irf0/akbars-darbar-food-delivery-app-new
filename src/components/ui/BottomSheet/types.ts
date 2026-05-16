import { ReactNode } from 'react'

export interface AppBottomSheetProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    snapPoints?: (string | number)[]
    title?: string
    showHandle?: boolean
    showBackdrop?: boolean
    enablePanDownToClose?: boolean
}