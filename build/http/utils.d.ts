/// <reference types="node" />
import { Device } from "./device";
import { Schedule } from "./interfaces";
import { NotificationSwitchMode, SignalLevel, HB3DetectionTypes } from "./types";
export declare const isGreaterEqualMinVersion: (minimal_version: string, current_version: string) => boolean;
export declare const pad: (num: number) => string;
export declare const getTimezoneGMTString: () => string;
export declare const getAbsoluteFilePath: (device_type: number, channel: number, filename: string) => string;
export declare const isNotificationSwitchMode: (value: number, mode: NotificationSwitchMode) => boolean;
export declare const switchNotificationMode: (currentValue: number, mode: NotificationSwitchMode, enable: boolean) => number;
export declare const calculateWifiSignalLevel: (device: Device, rssi: number) => SignalLevel;
export declare const calculateCellularSignalLevel: (rssi: number) => SignalLevel;
export declare const encryptAPIData: (data: string, key: Buffer) => string;
export declare const decryptAPIData: (data: string, key: Buffer) => Buffer;
export declare const getBlocklist: (directions: Array<number>) => Array<number>;
export declare const getDistances: (blocklist: Array<number>) => Array<number>;
export declare const isHB3DetectionModeEnabled: (value: number, type: HB3DetectionTypes) => boolean;
export declare const getHB3DetectionMode: (value: number, type: HB3DetectionTypes, enable: boolean) => number;
export interface EufyTimezone {
    timeZoneName: string;
    timeId: string;
    timeSn: string;
    timeZoneGMT: string;
}
export declare const getEufyTimezone: () => EufyTimezone | undefined;
export declare const getAdvancedLockTimezone: (stationSN: string) => string;
export declare class SmartSafeByteWriter {
    private split_byte;
    private data;
    write(bytes: Buffer): void;
    getData(): Buffer;
}
export declare const encodePasscode: (pass: string) => string;
export declare const hexDate: (date: Date) => string;
export declare const hexTime: (date: Date) => string;
export declare const hexWeek: (schedule: Schedule) => string;
export declare const randomNumber: (min: number, max: number) => number;
