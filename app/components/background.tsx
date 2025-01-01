import { toast } from "sonner";
import { Spinner } from "./icons";
import { getImageInput, Serializable } from "./utils";
import React from "react";

const Background: React.FC<{
  contents: Serializable;
  options: Serializable;
  setContents: (arg0: { background: string }) => void;
}> = ({ contents, options, setContents }) => (
  <div
    id="background"
    className="absolute h-fill w-fill bg-gray-300 dark:bg-slate-600
bg-cover bg-local bg-center bg-no-repeat dark:brightness-75"
    style={{
      backgroundImage: contents.background || ''
    }}
    onClick={async e => {
      if (!options.editMode || e.target !== e.currentTarget) return;
      const target = e.currentTarget;
      const file = await getImageInput();
      if (file) {
        target.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        toast.warning('临时背景已更新（不保存）');
      }
    }}
    onContextMenu={e => {
      e.preventDefault();
      if (!options.editMode || e.target !== e.currentTarget) return;
      const src = e.currentTarget.style.backgroundImage.slice(5, -2);
      const result = prompt(
        '请输入背景地址',
        src.startsWith('blob:') || src.startsWith('data:') ? '' : src
      );
      const resultAttr = `url("${result}")`;
      if (result !== null && resultAttr !== e.currentTarget.style.backgroundImage) {
        e.currentTarget.style.backgroundImage = resultAttr;
        setContents({ ...contents, background: resultAttr });
        toast.success('背景已更新');
      }
    }}
  ></div>
);

const LoadingScreen = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div
    id="loading-screen"
    ref={ref}
    className="w-full h-full fixed flex top-0 left-0 bg-white
               opacity-95 z-50 items-center justify-center"
    style={{
      display: 'none'
    }}
  >
    <Spinner />
  </div>
));

LoadingScreen.displayName = 'LoadingScreen';

export { Background, LoadingScreen };
