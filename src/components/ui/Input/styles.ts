import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 6,
    },
    label: {
        marginBottom: 4,
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        padding: 0,   // resets default Android padding
    },
    errorText: {
        marginTop: 4,
        fontSize: 12,
    },
});