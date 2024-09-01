"use client";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import MembersModal from "@/components/modals/members-modal";
import CreateChanelModal from "@/components/modals/create-channel-modal";
import DeleteChannelModal from "@/components/modals/delete-channel-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";
import LeaveServerModal from "../modals/leave-server-modal";
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
      <DeleteChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
    </>
  );
};

export default ModalProvider;
