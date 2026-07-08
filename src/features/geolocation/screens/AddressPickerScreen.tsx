import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAddressStore } from '../store/useAddressStore';
import { requestLocation } from '@utils/permissions/expopermissions';

const AddressPickerScreen = () => {
    const { latitude, longitude, setLatitude, setLongitude, flatNum, setFlatNum, landmark, setLandMark, street, setStreet } = useAddressStore();

    const [isLoadingGPS, setIsLoadingGPS] = useState(true);

    //TODO: Task tomorrow
    //USE DEBOUNCE FOR PIN DRAG!
    //1.show permission modal (handle loading, error states)
    //2.if gps granted -> show pin centered on user location
    //3.if gps denied -> show pin centered on restaurant with a 5km blue visual circle.
    //4. show a bottom sheet (regardless of gps permission) with input fields - flat no, landmark and the street is collected by reversegeocode() and store in zustand using setStreet. 
    //5. after pin drag done, show full address together in the bottom sheet like, 
    //street, flatnum, landmark etc.
    //6.onPressing Confirm Address btn -> runs serviceability check function in the server 
    //7.if NOT serviceable -> warning modal (you're outside..) and prompt to either change adddress or choose takeaway.
    //8.onPressing change address btn -> lower the bottom sheet, show an alert modal saying you need to be inside this circle
    //9.if everything okay -> navigate to home



    useEffect(() => {

        requestLocation()
    }, [])


    return (
        <View>
            <Text>AddressPickerScreen</Text>
        </View>
    )
}

export default AddressPickerScreen

const styles = StyleSheet.create({})