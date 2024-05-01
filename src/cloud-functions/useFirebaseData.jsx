import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";

export default function useFirebaseData(uid) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Fetch Applications");
    const collectionRef = collection(firestore, uid);
    const getData = async () => {
      const db = await getDocs(collectionRef);
      setData(db.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("Set Applications");
    };
    getData();
  }, [uid]);

  return data;
}
