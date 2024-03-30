"use client";

import { useCmdKListener } from "@/hooks/eventsHooks";
import {
  Button,
  Input,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
        <Search size={18} />
        搜索...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Kbd keys={["command"]}>+ K</Kbd>
      </Button>
      <Modal
        size="lg"
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        placement='top-center'
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
                startContent={<Search />}
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
