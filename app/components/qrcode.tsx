import { Jimp, JimpInstance, JimpMime } from 'jimp';
import jsQR from 'jsqr';
import { Component, HTMLAttributes, MouseEventHandler } from 'react';
import { toast } from 'sonner';
import QRCodeCanvas, { ErrorCorrectionLevel } from 'styled-qr-code';

import { fromStorage, getEnv, getImageInput, saveToStorage, Serializable } from './utils';
import { deepEqual } from 'fast-equals';
import Image from 'next/image';

function parseBigImage(image: JimpInstance, scale: number): JimpInstance {
    const w = image.width * scale;
    const h = image.height * scale;
    const x = image.width - w;
    const y = image.height - h;
    console.log(image.width, scale, x, y, w, h);
    image.scan(x, y, w, h, (x, y) => {
        image.setPixelColor(0x00000000, x, y);
    });
    return image;
}

interface QRCodeProps extends HTMLAttributes<HTMLImageElement> {
    url: string;
    editmode?: string;
    childratio?: string;
}

interface QRCodeState {
    qrData: {
        [key: string]: string;
    };
    data: {
        [key: string]: string;
    };
    editMode?: boolean;
    childRatio?: number;
}

class DynamicQRCode extends Component<QRCodeProps> {
    state: QRCodeState;
    qr: QRCodeCanvas;
    defaultVal?: Serializable;

    constructor(props: QRCodeProps) {
        super(props);

        this.defaultVal = getEnv('qrCodeContent', {
            main: 'Hello React World awa',
            child: "Wow that's awesome"
        });

        this.state = {
            editMode: this.props.editmode === 'true',
            childRatio: parseFloat(this.props.childratio ?? '0'),
            qrData: {},
            data: fromStorage('qrCodeContent', this.defaultVal)
        };

        this.handleQRCodeClick = this.handleQRCodeClick.bind(this);

        this.qr = new QRCodeCanvas({
            data: this.state.data.main,
            width: 235,
            height: 235,
            margin: 0,
            qrOptions: {
                errorCorrectionLevel: 'H'
            },
            dotsOptions: {
                type: 'extra-rounded'
            },
            cornersSquareOptions: {
                type: 'extra-rounded'
            },
            cornersDotOptions: {
                type: 'dot'
            },
            backgroundOptions: {
                color: '#00000000'
            }
        });
    }

    // Lifecycle method similar to the `useEffect` hook
    async componentDidMount() {
        await this.generateQRCode();
    }

    componentDidUpdate(prevProps: QRCodeProps, prevState: QRCodeState) {
        if (!deepEqual(this.state.data, prevState.data) || !deepEqual(this.props, prevProps)) {
            console.log('data changed');
            this.setState(
                {
                    editMode: this.props.editmode === 'true',
                    childRatio: parseFloat(this.props.childratio ?? '0')
                },
                async () => {
                    await this.generateQRCode();
                }
            );
            if (!deepEqual(this.state.data, this.defaultVal)) {
                saveToStorage(this.state.data, 'qrCodeContent');
            }
        }
    }

    async getQRCode(
        data: string,
        level?: ErrorCorrectionLevel,
        parse?: number,
        rotate?: number
    ): Promise<string> {
        this.qr.update({
            qrOptions: {
                errorCorrectionLevel: level ?? 'H'
            },
            data: data
        });
        const url = await this.qr.toDataUrl('jpg');
        const image = await Jimp.read(url);
        image.autocrop();
        image.rotate(rotate ?? 0);
        if (parse) {
            parseBigImage(image as unknown as JimpInstance, parse);
        }
        return await image.getBase64(JimpMime.png);
    }

    async generateQRCode() {
        console.log(this.state.editMode, this.state.childRatio);

        const main = await this.getQRCode(
            this.state.data.main,
            'H',
            this.state.childRatio ?? undefined
        );
        const child = this.state.childRatio
            ? await this.getQRCode(this.state.data.child, 'L', undefined, 180)
            : undefined;

        this.setState({
            qrData: {
                main: main,
                child: child
            }
        });
    }

    handleQRCodeClick: MouseEventHandler<HTMLImageElement> = async e => {
        e.preventDefault();
        const name = e.currentTarget.getAttribute('data-name') ?? '';
        const current = this.state.data[name];

        if (!this.state.editMode) return;

        if (e.type === 'contextmenu') {
            const result = prompt('请输入二维码内容', current);
            if (result === null) return;
            if (result && result !== current) {
                this.setState({ data: { ...this.state.data, [name]: result } });
                toast.success('二维码内容已更新');
            } else {
                toast.info('二维码内容无变化');
            }
            return;
        }

        try {
            const file = await getImageInput(); // Assume this function gets an image file from user input.
            if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    if (reader.result) {
                        const img = await Jimp.read(reader.result);
                        const decoded = jsQR(
                            img.bitmap.data as unknown as Uint8ClampedArray,
                            img.bitmap.width,
                            img.bitmap.height
                        );
                        if (decoded) {
                            if (decoded.data !== current) {
                                this.setState({
                                    data: {
                                        ...this.state.data,
                                        [name]: decoded.data
                                    }
                                });
                                // this.setState({data: {main: decoded.data, child: this.state.data.child}});
                                toast.success('二维码已更换');
                            } else {
                                toast.info('二维码内容无变化');
                            }
                        } else {
                            toast.error('无法解析二维码');
                        }
                    }
                };
                reader.readAsDataURL(file); // Read image as Data URL (base64).
            }
        } catch (error) {
            console.error('Error selecting file:', error);
        }
    };

    render() {
        const { qrData, data } = this.state;
        const { ...props } = this.props;

        return (
            <div className="m-5 relative">
                <Image
                    width={250}
                    height={250}
                    draggable={false}
                    onClick={this.handleQRCodeClick}
                    onContextMenu={this.handleQRCodeClick}
                    data-name="main"
                    src={qrData.main || '/blank.gif'}
                    alt={data.url || 'Loading QR code'}
                    {...props}
                />
                <Image
                    width={32}
                    height={32}
                    draggable={false}
                    onClick={this.handleQRCodeClick}
                    onContextMenu={this.handleQRCodeClick}
                    data-name="child"
                    src={qrData.child || '/blank.gif'}
                    alt={data.url || 'Loading QR code'}
                    className={'absolute bottom-0 right-0'}
                    style={{
                        width: (this.state.childRatio ?? 0) * 100 + '%',
                        height: (this.state.childRatio ?? 0) * 100 + '%',
                        display: this.state.childRatio !== 0 ? undefined : 'none'
                    }}
                />
            </div>
        );
    }
}

export default DynamicQRCode;
