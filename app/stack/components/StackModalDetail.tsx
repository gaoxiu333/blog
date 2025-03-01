import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useEffect, useState } from "react";
import { StackList } from "./stackCard";
import { FRONTEND_TAP_MAP } from "@/lib/constant";

export default function StackModalDetail({ isOpen, onOpenChange, stack }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState<any[]>([]);

  const filterData = (data: any[], tag: string) => {
    return data.filter((item) => item.tag.indexOf(tag) > -1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`stacks.json`)
      .then((res) => res.json())
      .then((res: any) => {
        const _tags = stack?.split(",") || [];
        const result = res.filter((item: any) =>
          _tags.length > 0
            ? _tags.every((tag: any) => ~item.tag.indexOf(tag))
            : true
        );
        const tags = [
          ...new Set(result.map((item: any) => item.tag.split(",")[0])),
        ].map((item) => {
          const current = FRONTEND_TAP_MAP.find((i) => i.key === item);
          return current || { name: item, key: item };
        });
        setTags([...tags]);
        setData(result);
        setIsLoading(false);
      });
  }, [stack]);
  return (
    <Modal
      size="3xl"
      backdrop={"blur"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 capitalize">
              {stack}
            </ModalHeader>
            <ModalBody>
              {tags.length < 5 ? (
                <StackList data={data} />
              ) : (
                tags.map((item) => {
                  return (
                    <div key={item.key}>
                      <h4 className="font-black text-default-500">
                        {item.name}
                      </h4>
                      <StackList
                        data={filterData(data, item.key)}
                        tag={item.key}
                      />
                    </div>
                  );
                })
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
