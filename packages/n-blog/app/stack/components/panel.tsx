"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StackList } from "./stackCard";

async function getTag(tag: string) {
  const response = await fetch(`/api/stack?tag=${tag || ""}`);
  return await response.json();
}

export function Panel({ name, tag }: { name: string; tag: any }) {
  const [stacks, setStacks] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    getTag(tag).then((res) => {
      console.log("res", res);
      setStacks(res);
    });
    console.log("path", pathname);
  }, []);

  return (
    <section>
      <Card
        className="h-full w-full"
        isPressable
        isBlurred
        onClick={() => onOpen()}
      >
        <CardHeader>
          <h3>{name}</h3>
        </CardHeader>
        <CardBody className="flex flex-col gap-1">
          {stacks.map((item: any, idx: number) => {
            return (
              <div key={idx} className="flex items-center gap-2 text-small">
                <Image
                  width={16}
                  height={16}
                  src={item.organizationAvatar}
                  alt={item.name}
                />
                <span>
                  {item.name} · v{item.version}
                </span>
              </div>
            );
          })}
        </CardBody>
      </Card>
      <Modal
        size="full"
        // placement="top-center"
        // scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col">{name}</ModalHeader>
          <ModalBody className="overflow-auto">
            <section className="flex justify-center  border-solid border-cyan-200">
              <div className="w-[600px]">
                <StackList data={stacks} />
              </div>
            </section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
