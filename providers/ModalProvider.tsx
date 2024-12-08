"use client"

import { useEffect, useState } from "react";

import StoreModal from "@/components/modals/StoreModal";

const ModalProvider = () => {
  //Avoiding hydration error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  //Avoiding hydration error

  return <StoreModal />
};

export default ModalProvider;
