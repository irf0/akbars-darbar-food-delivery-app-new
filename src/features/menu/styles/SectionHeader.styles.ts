// import { StyleSheet, Platform } from 'react-native'
// import { theme } from '@theme'

// export const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: theme.light.spacing.lg,
//         paddingVertical: theme.light.spacing.md,
//         backgroundColor: theme.light.colors.background,
//         // Thin bottom border as the only visual separator — keeps it flat like Zomato
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         borderBottomColor: theme.light.colors.border,
//         // Android needs explicit elevation to sit above list items when sticky
//         ...Platform.select({
//             android: { elevation: 2 },
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 1 },
//                 shadowOpacity: 0.06,
//                 shadowRadius: 2,
//                 // Rasterize since it's sticky and redraws constantly
//                 // Note: apply shouldRasterizeIOS on the View wrapping this if needed
//             },
//         }),
//     },
//     title: {
//         fontSize: theme.light.fontSize.md,
//         fontWeight: theme.light.fontWeight.bold,
//         color: theme.light.colors.text,
//         letterSpacing: 0.1,
//     },
//     right: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: theme.light.spacing.sm,
//     },
//     collapsedHint: {
//         fontSize: theme.light.fontSize.xs,
//         color: theme.light.colors.textSecondary,
//         fontStyle: 'italic',
//     },
//     chevron: {
//         fontSize: 18,
//         color: theme.light.colors.textSecondary,
//         lineHeight: 22,
//     },
// })