'use client';

import { useState } from 'react';
import FileSaver from 'file-saver';

const saveAsFile = (str: string) => {
  FileSaver.saveAs(new Blob([str], { type: 'text/plain' }), 'saved.env');
};

const EnvGenPage = () => {
  const [platforms, setPlatforms] = useState([
    { name: '', match: '', redirect: '', url: '', tip: '', option: 'redirect' }
  ]);
  const [icpCode, setIcpCode] = useState('');
  const [icpUrl, setIcpUrl] = useState('');
  const [envContent, setEnvContent] = useState('');

  const addPlatform = () => {
    setPlatforms([
      ...platforms,
      { name: '', match: '', redirect: '', url: '', tip: '', option: 'redirect' }
    ]);
  };

  const removePlatform = (index: number) => {
    const newPlatforms = platforms.filter((_, i) => i !== index);
    setPlatforms(newPlatforms);
  };

  const handlePlatformChange = (index: number, field: string, value: string) => {
    const newPlatforms = platforms.map((platform, i) =>
      i === index ? { ...platform, [field]: value } : platform
    );
    setPlatforms(newPlatforms);
  };

  const isValidName = (name: string) => /^[A-Za-z0-9_]+$/.test(name);

  const generateEnv = () => {
    const invalidPlatforms = platforms.filter(
      platform =>
        !isValidName(platform.name) ||
        !platform.match ||
        (!platform.redirect && !platform.url)
    );

    if (invalidPlatforms.length > 0) {
      alert('请确保所有平台都有有效的名称、匹配正则和重定向或URL。');
      return;
    }

    const appPlatforms = platforms.reduce((acc: { [key: string]: any }, platform) => { // eslint-disable-line
      acc[platform.name] = {
        match: platform.match,
        ...(platform.redirect ? { redirect: platform.redirect } : {}),
        ...(platform.url ? { url: platform.url } : {}),
        ...(platform.tip ? { tip: platform.tip } : {})
      };
      return acc;
    }, {});

    const appContents = {
      icp: {
        code: icpCode,
        url: icpUrl
      }
    };

    const envContent = `app_platforms=${JSON.stringify(appPlatforms)}\napp_contents=${JSON.stringify(appContents)}`;
    setEnvContent(envContent);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">.env 生成器</h1>
      <p className="mb-4 text-center text-gray-600">
        如需在已部署站点使用编辑模式，请先将此页面生成的 .env 导入
        <br />
        避免编辑模式生成内容覆盖下述字段
      </p>
      {platforms.map((platform, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
          <input
            type="text"
            placeholder="名称"
            value={platform.name}
            onChange={e => handlePlatformChange(index, 'name', e.target.value)}
            className="block w-full mb-2 p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="User-Agent 匹配正则"
            value={platform.match}
            onChange={e => handlePlatformChange(index, 'match', e.target.value)}
            className="block w-full mb-2 p-2 border rounded-md"
          />
          <div className="mb-2 flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={`option-${index}`}
                value="redirect"
                checked={platform.option === 'redirect'}
                onChange={e =>
                  handlePlatformChange(index, 'option', e.target.value)
                }
                className="mr-2"
              />
              重定向
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={`option-${index}`}
                value="showCode"
                checked={platform.option === 'showCode'}
                onChange={e =>
                  handlePlatformChange(index, 'option', e.target.value)
                }
                className="mr-2"
              />
              展示二维码
            </label>
          </div>
          {platform.option === 'redirect' && (
            <input
              type="text"
              placeholder="重定向"
              value={platform.redirect}
              onChange={e => handlePlatformChange(index, 'redirect', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
          )}
          {platform.option === 'showCode' && (
            <>
              <input
                type="text"
                placeholder="URL"
                value={platform.url}
                onChange={e => handlePlatformChange(index, 'url', e.target.value)}
                className="block w-full mb-2 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="提示"
                value={platform.tip}
                onChange={e => handlePlatformChange(index, 'tip', e.target.value)}
                className="block w-full mb-2 p-2 border rounded-md"
              />
            </>
          )}
          <button
            onClick={() => removePlatform(index)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            移除
          </button>
        </div>
      ))}
      <button
        onClick={addPlatform}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
      >
        添加平台
      </button>
      <div className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
        <input
          type="text"
          placeholder="ICP 编号"
          value={icpCode}
          onChange={e => setIcpCode(e.target.value)}
          className="block w-full mb-2 p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="跳转 URL"
          value={icpUrl}
          onChange={e => setIcpUrl(e.target.value)}
          className="block w-full mb-2 p-2 border rounded-md"
        />
      </div>
      <button
        onClick={generateEnv}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        生成 .env
      </button>
      {envContent && (
        <>
          <pre className="mt-4 p-4 border rounded-lg bg-gray-100">{envContent}</pre>
          <button
            onClick={() => saveAsFile(envContent)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-yellow-600"
          >
            下载 .env
          </button>
        </>
      )}
    </div>
  );
};

export default EnvGenPage;
