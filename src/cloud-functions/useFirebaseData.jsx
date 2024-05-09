import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';

export default function useFirebaseData(currentUser) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!currentUser) return;
        
        const collectionRef = collection(firestore, currentUser.uid);

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const updatedData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setData(updatedData);
        }, (error) => {
            console.error("Error fetching data: ", error);
        });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();

    }, [currentUser]);  // Dependency on currentUser to reset if it changes

    return data;
}
