import { Ref } from "react";
import { Serializable } from "./utils";
import { GithubIcon } from "./icons";

interface ButtonGroupProps {
  buttonGroup: Ref<HTMLDivElement> | undefined;
  offlineAlert: Ref<HTMLButtonElement> | undefined;
  options: Serializable;
  isModalOpen: boolean | undefined;
  setIsModalOpen: (arg0: boolean) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttonGroup, offlineAlert, options, isModalOpen, setIsModalOpen }) => <>
  <div
    ref={buttonGroup}
    className="fixed top-4 right-4 justify-center items-center flex"
  >
    <button
      ref={offlineAlert}
      role="alert"
      className={
        'bg-gray-500 text-white ml-3 px-4 py-2 rounded-full shadow-md'
      }
      style={{
        display: 'none'
      }}
    >
      正在使用本地存储
    </button>

    {!options.hideButton && (
      <button
        className="bg-gray-700 dark:bg-slate-900 text-white ml-3 px-4 py-2 rounded-full shadow-md"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        设置
      </button>
    )}

    <a
      role="button"
      className="bg-gray-900 text-white ml-3 p-2.5 rounded-full shadow-md"
      target="_blank"
      href="https://github.com/alex3236/pay"
      aria-label="Get more infomation on Github"
    >
      <GithubIcon className="w-5 h-5" />
    </a>
  </div>
</>

const ICPButton: React.FC<{
  contents: Serializable;
}> = ({ contents }) => (
  <div
    id="icp"
    className="fixed bottom-4 left-4 justify-center items-center flex text-white bg-gray-700 bg-opacity-55"
  >
    <a
      href={contents.icp.url ?? '#'}
      className="drop-shadow-sm deop-shadow-black mx-2 my-1"
    >
      {contents.icp.code ?? ''}
    </a>
  </div>
)

export { ICPButton, ButtonGroup };