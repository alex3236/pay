import { toast } from "sonner";
import { decodeAvatarSrc, encodeAvatarSrc, getImageInput, Serializable } from "./utils";
import Image from "next/image";
import { Ref } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";


const Avartar: React.FC<{
  avatarImage: Ref<HTMLImageElement>;
  options: Serializable;
  contents: Serializable;
  setContents: (arg0: { avatar: string }) => void;
}> = ({ avatarImage, options, contents, setContents }) => (
  <Image
    ref={avatarImage}
    width={320}
    height={320}
    draggable={false}
    priority={true}
    className="w-32 h-32 rounded-full border-gray-300 border-[1px] object-cover dark:brightness-90"
    onClick={async (e: { currentTarget: HTMLImageElement; }) => {
      if (!options.editMode) return;
      const target = e.currentTarget;
      const file = await getImageInput();
      if (file) {
        target.srcset = '';
        target.src = URL.createObjectURL(file);
        toast.warning('临时头像已更新（不保存）');
      }
    }}
    onContextMenu={(e: { preventDefault: () => void; currentTarget: { src: string; }; }) => {
      e.preventDefault();
      if (!options.editMode) return;
      const src = decodeAvatarSrc(e.currentTarget.src);

      let result = prompt(
        '请输入头像地址\n支持：/*, qq/[qq_number], github/[username]',
        src
      );
      result = encodeAvatarSrc(result);
      if (result && result !== e.currentTarget.src) {
        e.currentTarget.src = result;
        setContents({
          ...contents,
          avatar: result
        });
        toast.success('头像已更新');
      }
    }}
    src={contents.avatar || '/blank.gif'}
    alt="Profile Image"
  />
)

const Description: React.FC<{
  handleEditable: (event: ContentEditableEvent) => void;
  options: Serializable;
  getContent: (arg0: string, arg1: string) => string;
}> = ({ handleEditable, options, getContent }) => (
  <>
    <ContentEditable
      id="name"
      onChange={handleEditable}
      tagName="h2"
      className="text-black dark:text-white text-2xl font-semibold pb-1 px-6"
      disabled={!options.editMode}
      html={getContent('name', '文本示例')}
    />
    <ContentEditable
      id="desc"
      onChange={handleEditable}
      tagName="p"
      className="text-gray-600 dark:text-slate-300 text-md px-4"
      disabled={!options.editMode}
      html={getContent('desc', '文本示例')}
    />
  </>
);

export { Avartar, Description };
