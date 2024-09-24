import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { deepEqual } from 'fast-equals';
import FileSaver from 'file-saver';

export const env = process.env.exposed ? JSON.parse(process.env.exposed) : {};

export interface Serializable {
    [key: string]: any; // eslint-disable-line
}

const prefix = process.env.prefix || '';

export const getEnv = (key: string, fallback?: Serializable): Serializable | undefined => {
    if (env[key]) {
        return JSON.parse(env[key]);
    }
    return fallback;
};

export const fromStorage = (key: string, defaultVal: Serializable = {}): Serializable => {
    const val = localStorage.getItem(prefix + key);
    try {
        return val ? JSON.parse(val) : defaultVal;
    } catch (e) {
        console.warn(`Failed to load ${key} from storage:`, e);
        return defaultVal;
    }
};

export function useStorage<S extends Serializable>(
    key: string,
    defaultVal?: Serializable,
    initVal: Serializable = {}
): [S, Dispatch<SetStateAction<S>>] {
    defaultVal = getEnv(key) || defaultVal;
    const [value, setter] = useState<S>({
        ...initVal,
        loaded: false
    } as unknown as S);
    useEffect(() => {
        setter(fromStorage(key, defaultVal) as unknown as S);
    }, [key]);
    useEffect(() => {
        if (value.loaded === false) return;
        if (!deepEqual(value, defaultVal)) {
            saveToStorage(value, key);
        } else {
            removeStorage(key);
        }
    }, [value]);
    return [value, setter];
}

export const removeStorage = (key: string) => {
    localStorage.removeItem(prefix + key);
};

export const saveToStorage = (val: Serializable, key: string) => {
    if (val.loaded !== false) {
        const filteredVal = Object.entries(val).reduce(
            (acc: { [key: string]: string }, [key, value]) => {
                if (value !== '') {
                    // prevent empty strings from being saved
                    acc[key] = value;
                }
                return acc;
            },
            {}
        );
        localStorage.setItem(prefix + key, JSON.stringify(filteredVal));
    }
};

export const isOffline = () => {
    try {
        const envVariables = Object.keys(localStorage).filter(key => key.startsWith(prefix));
        return envVariables.length > 0;
    } catch {
        return false;
    }
};

export const saveStorageAsFile = () => {
    const envVariables = Object.keys(localStorage)
        .filter(key => key.startsWith(prefix))
        .reduce((acc: string[], key) => {
            acc.push(`${key}=${localStorage[key]}`);
            return acc;
        }, []);
    const envContent = envVariables.join('\n');
    FileSaver.saveAs(new Blob([envContent], { type: 'text/plain' }), '_env.txt');
};

export const getImageInput = (): Promise<File | null> => {
    return new Promise((resolve, reject) => {
        // 创建 input 元素
        const i = document.createElement('input');
        i.type = 'file';
        i.accept = 'image/*';

        // 监听文件选择事件
        i.onchange = e => {
            const input = e.target as HTMLInputElement;
            if (input.files && input.files.length > 0) {
                resolve(input.files[0]); // 如果有文件，返回第一个文件
            } else {
                resolve(null); // 没有选择文件，返回 null
            }
        };

        i.onerror = () => reject(new Error('File selection failed')); // 如果发生错误，返回 reject

        // 模拟点击 input，打开文件选择对话框
        i.click();
    });
};

export const decodeAvatarSrc = (src: string) => {
    if (src.startsWith('blob:') || src.startsWith('data:')) {
        return '';
    }
    if (src.indexOf('_next/image?url=') !== -1) {
        src = decodeURIComponent(src.slice(src.indexOf('image?url=') + 10));
    }
    const qqMatch = src.match(
        /^https:\/\/q1.qlogo.cn\/g\?b=qq&nk=([0-9]+)&s=640(&w=[0-9]+&q=[0-9]+)?$/
    );
    if (qqMatch) {
        src = `qq/${qqMatch[1]}`;
    }
    const githubMatch = src.match(
        /^https:\/\/avatars.githubusercontent.com\/(\w+)(&w=[0-9]+&q=[0-9]+)?$/
    );
    if (githubMatch) {
        src = `github/${githubMatch[1]}`;
    }
    return src;
};

export const encodeAvatarSrc = (src: string | null) => {
    const qqMatch = src?.match(/^qq\/([0-9]+)$/);
    if (qqMatch) {
        src = `https://q1.qlogo.cn/g?b=qq&nk=${qqMatch[1]}&s=640`;
    }
    const githubMatch = src?.match(/^github\/(\w+)$/);
    if (githubMatch) {
        src = `https://avatars.githubusercontent.com/${githubMatch[1]}`;
    }
    return src;
};
