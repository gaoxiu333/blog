import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import { Playground } from './playground';

export const Warp = () => {
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        {/* 左侧目录面板 */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full flex-col gap-4 p-4">
            <h2 className="text-lg font-semibold">提示词目录</h2>
            <div className="space-y-2">
              <div className="p-2 rounded cursor-pointer">🎨 基础提示</div>
              <div className="p-2 rounded cursor-pointer">💻 代码开发</div>
              <div className="p-2 rounded cursor-pointer">📊 数据分析</div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* 中间内容面板 */}
        <ResizablePanel defaultSize={55}>
          <div className="h-full p-6">
            <h1 className="text-2xl font-bold mb-4">提示词详情</h1>
            <div className="prose">
              <p>在这里显示选中提示词的详细内容...</p>
              <Playground />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* 右侧预览面板 */}
        <ResizablePanel defaultSize={25}>
          <div className="h-full p-4 ">
            <h3 className="text-lg font-semibold mb-4">预览窗口</h3>
            <div className="p-4 rounded-lg shadow">
              <p>预览效果将显示在这里...</p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
