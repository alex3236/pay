import { saveStorageAsFile, Serializable } from "./utils";
import Link from "next/link";

interface SettingsModalProps {
  contents: Serializable;
  setContents: (arg0: { title?: string; meta?: string; }) => void;
  setIsModalOpen: (arg0: boolean) => void;
  options: Serializable;
  setOptions: (arg0: { childRatio: number; }) => void;
  toggleOption: (arg0: string) => void;
  saveScreenshot: () => Promise<void>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ contents, setContents, setIsModalOpen, options, setOptions, toggleOption, saveScreenshot }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex
          justify-center items-center z-50"
  >
    <div className="bg-white dark:bg-slate-600 rounded-lg p-6 max-w-sm w-full max-h-screen md:max-h-[90%] overflow-auto">
      <h3 className="text-lg font-semibold mb-2">设置</h3>

      <label className="w-full mb-4 inline-flex items-center">
        <span>标题</span>
        <input
          type="text"
          defaultValue={document.title}
          onChange={e => {
            if (e.currentTarget.value.length > 0) {
              document.title = e.currentTarget.value;
              setContents({
                ...contents,
                title: e.currentTarget.value
              });
            }
          }}
          required
          className="h-6 w-72 text-center ml-2 border-[1px] border-black
                              focus:outline-0 p-1.5 rounded-lg appearance-none dark:bg-slate-800"
        />
      </label>

      <label className="w-full mb-4 inline-flex items-center">
        <span>简介</span>
        <input
          type="text"
          defaultValue={
            document.head
              .querySelector('[name~=description][content]')
              ?.getAttribute('content') ?? 'unknown'
          }
          onChange={e => {
            if (e.currentTarget.value.length > 0) {
              setContents({
                ...contents,
                meta: e.currentTarget.value
              });
            }
          }}
          required
          className="h-6 w-72 text-center ml-2 border-[1px] border-black
                              focus:outline-0 p-1.5 rounded-lg appearance-none dark:bg-slate-800"
        />
      </label>

      <label className="w-full my-1 inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="h-5 w-5 mr-2"
          checked={options.editMode === true}
          onChange={() => toggleOption('editMode')}
        />
        <span>编辑模式</span>
      </label>

      <p className="text-gray-500 dark:text-slate-300 text-md mb-4">
        编辑模式下，你可以自由编辑页面内容。
        <br />
        数据储存在浏览器本地，清除网站数据后页面恢复为默认状态。
      </p>

      <label className="w-full my-1 inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="h-5 w-5 mr-2"
          checked={options.dualCode === true}
          onChange={() => toggleOption('dualCode')}
        />
        <span>子母模式</span>
      </label>

      <p className="text-gray-500 dark:text-slate-300 text-md my-1">
        子母模式下，可以将两个二维码合并展示。
        <br />
        一般用于合并微信、支付宝收款码。
      </p>

      <div
        style={{
          display: options.dualCode ? undefined : 'none'
        }}
      >
        <label className="w-full my-1 inline-flex items-center cursor-pointer">
          <span>子码比例</span>
          <input
            type="number"
            step={0.01}
            defaultValue={(options.childRatio as number) || 0.45}
            onChange={e => {
              if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4);
              }
              const value = parseFloat(e.target.value);
              if (0 < value && value < 0.5) {
                e.target.style.borderColor = '';
                setOptions({
                  ...options,
                  childRatio: value
                });
              } else {
                e.target.style.borderColor = 'red';
              }
            }}
            required
            className="h-6 w-14 text-center ml-2 border-[1px] border-black
                              focus:outline-0 p-1.5 rounded-lg appearance-none dark:bg-slate-800"
          />
        </label>

        <p className="text-gray-500 dark:text-slate-300 text-md mt-1 mb-4">
          子码比例为子码相对于主码的尺寸。
          <br />
          您可根据识别成功率自由调整。
        </p>
      </div>

      <label className="w-full my-1 inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 mr-2"
          checked={options.hideButton === true}
          onChange={() => toggleOption('hideButton')}
        />
        <span>隐藏设置按钮</span>
      </label>

      <p
        className={
          (options.hideButton
            ? 'text-red-500 dark:text-red-300'
            : 'text-gray-500 dark:text-slate-300') + ' text-md mb-1'
        }
      >
        隐藏设置按钮后，您需要手动修改浏览器本地存储空间或重置网站数据，以再次打开设置面板。
      </p>

      {/* Download JSON Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg my-2 hover:bg-blue-600"
        onClick={saveStorageAsFile}
      >
        下载配置文件
      </button>

      {/* Download Image Button */}
      <button
        className="w-full bg-green-700 text-white py-2 rounded-lg my-2 hover:bg-green-800"
        onClick={
          async () => {
            setIsModalOpen(false);
            await saveScreenshot();
          }
        }
      >
        下载二维码图片
      </button>

      <button
        className="w-full bg-red-700 text-white py-2 rounded-lg my-2 hover:bg-red-800"
        onClick={e => {
          const confirmMessage = '确认清除';
          const target = e.currentTarget;
          if (target.innerText === confirmMessage) {
            localStorage.clear();
            window.location.reload();
          } else {
            target.innerText = confirmMessage;
            setTimeout(() => {
              target.innerText = '清除本地存储';
            }, 5000);
          }
        }}
      >
        清除本地存储
      </button>

      {/* Close Button */}
      <Link href="/env-gen" passHref>
        <button
          className="w-full 0 py-2 rounded-lg mt-4 bg-gray-300 hover:bg-gray-40 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          前往更多设置
        </button>
      </Link>

      <button
        className="w-full 0 py-2 rounded-lg mt-4 bg-gray-300 hover:bg-gray-40 dark:bg-slate-800 dark:hover:bg-slate-700"
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        关闭
      </button>
    </div>
  </div>
)

export default SettingsModal;
