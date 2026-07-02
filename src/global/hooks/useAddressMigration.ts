import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { userDoc as getUserDocRef } from '@config/firebase';

export const useAddressMigration = () => {
    const migrateLegacyAddress = async () => {
        try {
            const currentUser = auth().currentUser;
            if (!currentUser) return;

            const userDocRef = getUserDocRef(currentUser.uid)
            const userDoc = await userDocRef.get();

            if (!userDoc.exists) return;

            const userData = userDoc.data();
            if (userData?.addresses && Array.isArray(userData.addresses)) {
                return;
            }

            //finding usng typeof op and update the schema
            if (userData?.address && typeof userData.address === 'object') {
                const oldAddress = userData.address;
                const migratedAddresses = [
                    {
                        id: Date.now().toString(),
                        label: 'Home',
                        area: oldAddress.area || '',
                        building: oldAddress.building || '',
                        street: oldAddress.street || '',
                        city: oldAddress.city || 'Tinsukia',
                        isDefault: true,
                    }
                ];
                //Cleanup the old filed 
                await userDocRef.update({
                    addresses: migratedAddresses,
                    address: firestore.FieldValue.delete()
                });

                console.log(`Successfully migrated address schema for user: ${currentUser.uid}`);
            }
        } catch (error) {
            console.error('Error migrating user address:', error);
        }
    };

    return { migrateLegacyAddress };
};
