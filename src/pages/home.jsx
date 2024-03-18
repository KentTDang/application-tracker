import React, { useRef } from 'react';
// import { firestore } from "../firebase";
// import { addDoc,collection } from "@firebase/firestore";

// export default function Home() {

//   const jobTitleRef = useRef();
//   const ref = collection(firestore,"job-applications");
//   const handleSave = async(e) => {

//     e.preventDefault();
//     console.log(jobTitleRef.current.value);

//     let data = {
//       jobTitle: jobTitleRef.current.value,
//     }

//     try {
//       addDoc(ref,data);
//     }catch(e){
//       console.log(e);
//     }

//   };

//   return <div>
//     <form onSubmit={ handleSave }>
//       <label>Job Title</label>
//         <input type="text" ref={jobTitleRef} />
//         <button type="submit">Save</button>
      
//     </form>
//   </div>;
// }
