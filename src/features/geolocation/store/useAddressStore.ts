

//NEW USER 

import { create } from "zustand";


interface AddressState {
    //INITIAL VALUES
    street: string; //will get from reversegeocode result
    flatNum: string; //user enters manually
    landmark: string //user enters manually
    isDefault: boolean; //preselected
    label?: string; //user enters manually but optional
    latitude: number | null //from the user gps (or pin drag in denied case)
    longitude: number | null //from the user gps (or pin drag in denied case)
    isServiceable: boolean //comes after the user clicks confirm btn and server returns result


    //ACTIONS
    setStreet: (street: string) => void
    setFlatNum: (flatNum: string) => void
    setLandMark: (landmark: string) => void
    setIsDefault: (isDefault: boolean) => void
    setLabel: (label: string) => void
    setLatitude: (latitude: number | null) => void
    setLongitude: (langitude: number | null) => void
    setIsServiceable: (isServiceable: boolean) => void
}

export const useAddressStore = create<AddressState>((set) => ({
    //initial values
    flatNum: "",
    landmark: "",
    street: "",
    isDefault: false,
    label: "Home",
    latitude: null,
    longitude: null,
    isServiceable: true,
    setFlatNum: (passedFlatNum) => set({ flatNum: passedFlatNum }),
    setLandMark: (passedLandmark) => set({ landmark: passedLandmark }),
    setStreet: (passedVal) => set({ street: passedVal }),
    setIsDefault: (passedVal) => set({ isDefault: passedVal }),
    setLabel: (passedLabel) => set({ label: passedLabel }),
    setLatitude: (lat) => set({ latitude: lat }),
    setLongitude: (lng) => set({ longitude: lng }),
    setIsServiceable: (passedVal) => set({ isServiceable: passedVal })



}))