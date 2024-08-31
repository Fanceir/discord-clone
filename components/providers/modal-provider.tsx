"use client";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import MembersModal from "@/components/modals/members-modal";
import CreateChanelModal from "../modals/create-channel-modal";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      {" "}
      <CreateServerModal /> <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChanelModal />
    </>
  );
};

export default ModalProvider;
