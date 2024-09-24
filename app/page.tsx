'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import {
    decodeAvatarSrc,
    encodeAvatarSrc,
    getImageInput,
    isOffline,
    saveStorageAsFile,
    Serializable,
    useStorage
} from '@/app/components/utils';
import { toast } from 'sonner';
import { GithubIcon, Spinner } from '@/app/components/icons';
import FileSaver from 'file-saver';
import DomToImage from 'dom-to-image-more';
import Image from 'next/image';

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

export default function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [options, setOptions] = useStorage<Options>('options', {}, { hideButton: true });
    const [contents, setContents] = useStorage<Serializable>('contents', {});
    const [mounted, setMounted] = useState<boolean>(false);
    const mainContainer = useRef<HTMLDivElement>(null);
    const loadingScreen = useRef<HTMLDivElement>(null);
    const buttonGroup = useRef<HTMLDivElement>(null);
    const offlineAlert = useRef<HTMLButtonElement>(null);

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
        }
    }, [mounted]);

    return (
        <>
            <div
                ref={mainContainer}
                className="select-none flex justify-center items-center
            h-screen bg-gray-300 bg-cover bg-local bg-center bg-no-repeat"
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
            >
                <div
                    id="loading-screen"
                    ref={loadingScreen}
                    className="w-full h-full fixed flex top-0 left-0 bg-white
                 opacity-95 z-50 items-center justify-center"
                    style={{
                        display: 'none'
                    }}
                >
                    <Spinner />
                </div>
                <div className="bg-white items-center flex flex-col opacity-85 rounded-[1.2rem] py-12 mx-10 my-12 max-w-80 break-all">
                    <div className="flex justify-center">
                        <Image
                            width={320}
                            height={320}
                            draggable={false}
                            priority={true}
                            className="w-32 h-32 rounded-full border-gray-300 border-[1px] object-cover"
                            onClick={async e => {
                                if (!options.editMode) return;
                                const target = e.currentTarget;
                                const file = await getImageInput();
                                if (file) {
                                    target.src = URL.createObjectURL(file);
                                    toast.warning('临时头像已更新（不保存）');
                                }
                            }}
                            onContextMenu={e => {
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
                    </div>

                    <div className="text-center mt-4">
                        <ContentEditable
                            id="name"
                            onChange={handleEditable}
                            tagName="h2"
                            className="text-black text-2xl font-semibold mb-1 mx-6"
                            disabled={!options.editMode}
                            html={getContent('name', '文本示例')}
                        />
                        <ContentEditable
                            id="desc"
                            onChange={handleEditable}
                            tagName="p"
                            className="text-gray-600 text-md mx-4"
                            disabled={!options.editMode}
                            html={getContent('desc', '文本示例')}
                        />
                    </div>

                    <div className="flex justify-center rounded-[1.2rem] w-60 h-60 mt-6 mx-12 bg-gray-200">
                        <Suspense>
                            <DynamicQRCode
                                editmode={`${options.editMode}`}
                                childratio={`${options.dualCode ? options.childRatio || 0.45 : '0'}`}
                                className="w-full h-full"
                                url="wxp://f2f06wryKYAVFtjHpM6k0TI7SsS-XpvwEf2zwAUj-WhdHVikJJizAyHJ1XWWllfH9p9c"
                            />
                        </Suspense>
                    </div>
                    <div className="text-center w-full p-4">
                        <ContentEditable
                            id="tip"
                            onChange={handleEditable}
                            className="text-gray-600"
                            tagName="p"
                            disabled={!options.editMode}
                            html={getContent('tip', '支付宝 / 微信 扫码付款')}
                        />
                    </div>

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
                                className="bg-gray-700 text-white ml-3 px-4 py-2 rounded-full shadow-md"
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

                    {/* Modal */}
                    {isModalOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex
                    justify-center items-center z-50"
                        >
                            <div className="bg-white rounded-lg p-6 max-w-sm w-full max-h-screen md:max-h-[90%] overflow-auto">
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
                                        focus:outline-0 p-1.5 rounded-lg appearance-none"
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

                                <p className="text-gray-500 text-md mb-4">
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

                                <p className="text-gray-500 text-md my-1">
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
                                        focus:outline-0 p-1.5 rounded-lg appearance-none"
                                        />
                                    </label>

                                    <p className="text-gray-500 text-md mt-1 mb-4">
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
                                        (options.hideButton ? 'text-red-500' : 'text-gray-500') +
                                        ' text-md mb-1'
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
                                    onClick={async () => {
                                        setIsModalOpen(false);
                                        toast.dismiss();

                                        if (
                                            !mainContainer.current ||
                                            !loadingScreen.current ||
                                            loadingScreen.current.style.display !== 'none'
                                        )
                                            return;

                                        const reset = () => {
                                            if (loadingScreen.current && mainContainer.current) {
                                                loadingScreen.current.style.display = 'none';
                                                if (buttonGroup.current)
                                                    buttonGroup.current.style.display = '';
                                                mainContainer.current.style.width = '';
                                                mainContainer.current.style.height = '';
                                                mainContainer.current.style.borderRadius = '';
                                            }
                                        };
                                        const timeout = setTimeout(reset, 15000);
                                        loadingScreen.current.style.display = '';
                                        if (buttonGroup.current)
                                            buttonGroup.current.style.display = 'none';
                                        mainContainer.current.style.width = 'fit-content';
                                        mainContainer.current.style.height = 'fit-content';
                                        mainContainer.current.style.borderRadius = '1.2rem';
                                        try {
                                            const image = await DomToImage.toBlob(
                                                mainContainer.current,
                                                {
                                                    scale: 1.5,
                                                    copyDefaultStyles: false,
                                                    filter: (node: Element) => {
                                                        return node.id !== 'loading-screen';
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
                                    }}
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
                                <button
                                    className="w-full bg-gray-300 py-2 rounded-lg mt-4 hover:bg-gray-400"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                    }}
                                >
                                    关闭
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
