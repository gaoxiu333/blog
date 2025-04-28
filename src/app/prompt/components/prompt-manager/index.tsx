import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import CommonPrompts from '../common-prompts';
import PromptEditor from '../prompt-editor';
import PromptPreview from '../prompt-preview';

export default function PromptManage() {
  return (
    <>
      <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <CommonPrompts />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={55} minSize={50}>
            <PromptEditor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} minSize={20}>
            <PromptPreview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
