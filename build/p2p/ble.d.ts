/// <reference types="node" />
export declare enum BleCommandFactorySeparator {
    a = -96,
    b = -95,
    c = -94,
    d = -93,
    e = -92,
    f = -91,
    g = -90,
    h = -89,
    i = -88,
    j = -87,
    k = -86
}
export declare class BleCommandFactory {
    private static readonly HEADER;
    private data?;
    private commandCode?;
    private versionCode?;
    private dataType?;
    private packageFlag?;
    private unknown?;
    private additionalDataSeparatorByte?;
    private additionalData?;
    private responseCode?;
    constructor(data?: string | Buffer);
    toString: () => string;
    getResponseCode(): number | undefined;
    setVersionCode(version: number): BleCommandFactory;
    getVersionCode(): number | undefined;
    setCommandCode(command: number): BleCommandFactory;
    getCommandCode(): number | undefined;
    setDataType(type: number): BleCommandFactory;
    getDataType(): number | undefined;
    setPackageFlag(flag: number): BleCommandFactory;
    getPackageFlag(): number | undefined;
    setAdditionalDataSeparator(separator: number): BleCommandFactory;
    getAdditionalDataSeparator(): Buffer | undefined;
    setAdditionalData(data: Buffer): BleCommandFactory;
    getAdditionalData(): Buffer | undefined;
    setData(data: Buffer): BleCommandFactory;
    getData(): Buffer | undefined;
    setUnknown(data: Buffer): BleCommandFactory;
    static generateHash(data: Buffer): number;
    getLockV12Command(): Buffer;
    getSmartSafeCommand(): Buffer;
}
