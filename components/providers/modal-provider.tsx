"use client";

import {CardModal} from "@/components/modals/card-modal";
import {useState, useEffect} from "react";


export const ModalProvider = () => {
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

  return (
   <>
   <CardModal />
   </>
  )
}

export default ModalProvider