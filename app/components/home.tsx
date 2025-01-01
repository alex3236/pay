'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import {
  isOffline,
  Serializable,
  useStorage
} from '@/app/components/utils';
import { toast } from 'sonner';
import FileSaver from 'file-saver';
import DomToImage from 'dom-to-image-more';
import { Background, LoadingScreen } from './background';
import { Avartar, Description } from './infomation';
import SettingsModal from './modal';
import { ButtonGroup, ICPButton } from './buttons';

const DynamicQRCode = dynamic(() => import('@/app/components/qrcode'), {
  ssr: false
});

interface Options {
  loaded?: boolean;
  editMode?: boolean;
  dualCode?: boolean;
  hideButton?: boolean;

  [key: string]: boolean | number | undefined;
}

export default function Home(props: { url?: string; tip?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useStorage<Options>(
    'options',
    {
      hideButton: props.url !== undefined
    },
    { hideButton: true }
  );
  const [contents, setContents] = useStorage<Serializable>('contents', {});
  const [mounted, setMounted] = useState<boolean>(false);

  const mainContainer = useRef<HTMLDivElement>(null);
  const loadingScreen = useRef<HTMLDivElement>(null);
  const buttonGroup = useRef<HTMLDivElement>(null);
  const offlineAlert = useRef<HTMLButtonElement>(null);
  const avatarImage = useRef<HTMLImageElement>(null);

  const toggleOption = (opt: string) => {
    setOptions({ ...options, [opt]: !(options[opt] === true) });
  };

  const handleEditable = (e: ContentEditableEvent) => {
    const id = e.currentTarget?.id;
    if (id) {
      setContents({ ...contents, [id]: e.target.value });
    }
  };

  const getContent = (id: string, fallback: string) => {
    return contents[id] ?? fallback;
  };

  const saveScreenShot = async () => {

    toast.dismiss();

    const bg = document.getElementById('background');

    if (
      !mainContainer.current ||
      !loadingScreen.current ||
      !bg ||
      loadingScreen.current.style.display !== 'none'
    )
      return;

    const reset = () => {
      if (
        loadingScreen.current &&
        mainContainer.current &&
        bg
      ) {
        loadingScreen.current.style.display = 'none';
        if (buttonGroup.current)
          buttonGroup.current.style.display = '';
        mainContainer.current.style.width = '';
        mainContainer.current.style.height = '';
        bg.style.borderRadius = '';
      }
    };
    const timeout = setTimeout(reset, 15000);
    loadingScreen.current.style.display = '';
    if (buttonGroup.current)
      buttonGroup.current.style.display = 'none';
    mainContainer.current.style.width = 'fit-content';
    mainContainer.current.style.height = 'fit-content';
    bg.style.borderRadius = '1.2rem';
    document
      .querySelectorAll('[srcset], [imagesrcset]')
      .forEach(e => {
        e.removeAttribute('srcset');
        e.removeAttribute('imagesrcset');
      });
    try {
      const image = await DomToImage.toBlob(
        mainContainer.current,
        {
          scale: 1.5,
          copyDefaultStyles: false,
          filter: (node: Element) => {
            return !['loading-screen', 'icp'].includes(
              node.id
            );
          }
        }
      );
      FileSaver.saveAs(image, 'qrcode.png');
    } catch (e) {
      toast.error('保存失败');
      console.error(e);
    }
    reset();
    clearTimeout(timeout);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isOffline()) {
        if (offlineAlert.current) offlineAlert.current.style.display = '';
      }
      if (contents.title) {
        document.title = contents.title;
      }
      console.log(
        atob(
          'CiAgICBfX18KICAgIC8gXyBcX19fIF9fXyBfXwogICAvIF9fXy8gXyBgLyAvLyAvCiAgL18vICAgXF8sXy9cXywgLwogICAgICAgICAgICAvX19fLwoK'
        ),
        'https://github.com/alex3236/pay'
      );
    }
  }, [contents.title, mounted]);

  return (
    <>
      <div
        ref={mainContainer}
        className="select-none flex justify-center items-center h-screen"
      >
        <Background contents={contents} options={options} setContents={setContents} />
        <LoadingScreen />
        <div className="bg-white dark:bg-slate-800 items-center flex flex-col opacity-85 rounded-[1.2rem] pt-12 pb-5 mx-10 my-12 max-w-80 break-all">
          <div className="flex justify-center">
            <Avartar
              avatarImage={avatarImage}
              options={options}
              contents={contents}
              setContents={setContents}
            />
          </div>

          <div className="text-center mt-4 w-full">
            <Description
              handleEditable={handleEditable}
              options={options}
              getContent={getContent}
            />
          </div>

          <div className="flex justify-center rounded-[1.2rem] w-60 h-60 mt-6 mx-12 bg-gray-200 dark:bg-slate-900">
            <Suspense>
              <DynamicQRCode
                editmode={`${options.editMode}`}
                childratio={`${options.dualCode ? options.childRatio || 0.45 : '0'}`}
                className="w-full h-full"
                url={
                  props.url == '/' && typeof window !== 'undefined'
                    ? window.location.href
                    : props.url
                }
              />
            </Suspense>
          </div>
          <div className="text-center w-full p-4">
            <ContentEditable
              id="tip"
              onChange={handleEditable}
              className="text-gray-600 dark:text-slate-300"
              tagName="p"
              disabled={!options.editMode}
              html={props.tip ?? getContent('tip', '支付宝 / 微信 扫码付款')}
            />
          </div>

          <ButtonGroup
            buttonGroup={buttonGroup}
            offlineAlert={offlineAlert}
            options={options}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          {contents.icp?.url !== undefined && <ICPButton contents={contents} />}

          {/* Modal */}
          {isModalOpen && (
            <SettingsModal
              contents={contents}
              setContents={setContents}
              setIsModalOpen={setIsModalOpen}
              options={options}
              setOptions={setOptions}
              toggleOption={toggleOption}
              saveScreenshot={saveScreenShot}
            />
          )}
        </div>
      </div>
    </>
  );
}
