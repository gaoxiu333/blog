export default function CommonPrompts() {
  return (
    <div className="flex flex-col gap-4 px-4 text-xs">
      <h2 className="text-lg font-semibold">常用提示词</h2>
      <div className="space-y-2">
        <div className="p-2 rounded cursor-pointer">🎨 基础提示</div>
        <div className="p-2 rounded cursor-pointer">💻 代码开发</div>
        <div className="p-2 rounded cursor-pointer">📊 数据分析</div>
      </div>
    </div>
  );
}
