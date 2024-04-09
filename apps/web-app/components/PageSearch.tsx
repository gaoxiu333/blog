"use client";

import { useCmdKListener } from "@/client/hooks/eventsHooks";
import {
  Button,
  Input,
  Kbd,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { IfyIcon } from "@/client/components/IfyIcon";

const PageSearch: React.FC = () => {
  // const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  useCmdKListener(onOpen);

  return (
    <>
      <Button
        onPress={onOpen}
        radius="full"
        className="bg-default-400/20 dark:bg-default-500/20 "
      >
        <IfyIcon icon="search" />
        搜索...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Kbd keys={["command"]}>+ K</Kbd>
      </Button>
      <Modal
        size="lg"
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        placement="top-center"
        closeButton={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                // ref={inputRef}
                autoFocus
                startContent={<IfyIcon icon="search" />}
                endContent={
                  <Button onPress={onClose} isIconOnly size="sm" radius="sm">
                    ESC
                  </Button>
                }
                size="lg"
                placeholder="搜索..."
              />
              {/* <ModalBody></ModalBody> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export { PageSearch };
