import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { Button } from "../ui/button";

interface AlertModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModel = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: AlertModelProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Are you sure?"
      discription="This action is done."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end space-x-5 pt-2 w-full">
        <Button variant="outline" disabled={loading} onClick={onClose}>Cencel</Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>Done</Button>
      </div>
    </Modal>
  );
};

export default AlertModel;
