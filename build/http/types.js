"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceCellularSignalProperty = exports.DeviceCellularSignalLevelProperty = exports.DeviceCellularRSSIProperty = exports.DeviceWifiSignalLevelProperty = exports.DeviceWifiRSSIProperty = exports.DeviceNightvisionProperty = exports.DeviceAutoNightvisionWiredDoorbellProperty = exports.DeviceAutoNightvisionProperty = exports.DeviceAntitheftDetectionProperty = exports.DeviceBatteryIsChargingKeypadProperty = exports.DeviceBatteryTempProperty = exports.DeviceBatteryLowSensorProperty = exports.DeviceBatteryLowKeypadProperty = exports.DeviceBatteryLowMotionSensorProperty = exports.DeviceBatteryLockProperty = exports.DeviceBatteryProperty = exports.GenericDeviceProperties = exports.BaseDeviceProperties = exports.GenericTypeProperty = exports.GenericSWVersionProperty = exports.GenericHWVersionProperty = exports.DeviceSerialNumberProperty = exports.DeviceModelProperty = exports.DeviceNameProperty = exports.PropertyName = exports.DeviceEvent = exports.IndoorMiniDetectionTypes = exports.IndoorDetectionTypes = exports.HB3DetectionTypes = exports.UserPasswordType = exports.UserType = exports.DualCamStreamMode = exports.VideoTypeStoreToNAS = exports.MotionDetectionMode = exports.SignalLevel = exports.TimeFormat = exports.GuardModeSecuritySettingsAction = exports.NotificationSwitchMode = exports.AlarmTone = exports.NotificationType = exports.FloodlightMotionTriggeredDistance = exports.PublicKeyType = exports.PowerSource = exports.StorageType = exports.VerfyCodeTypes = exports.ResponseErrorCode = exports.GuardMode = exports.AlarmMode = exports.ParamType = exports.DeviceType = void 0;
exports.DeviceMotionHB3DetectionTypePetProperty = exports.DeviceMotionHB3DetectionTypeHumanRecognitionProperty = exports.DeviceMotionHB3DetectionTypeHumanProperty = exports.DevicePictureUrlProperty = exports.DeviceAdvancedLockStatusProperty = exports.DeviceBasicLockStatusProperty = exports.DeviceMotionSensorPIREventProperty = exports.DeviceSensorChangeTimeProperty = exports.DeviceSensorOpenProperty = exports.DeviceRingingProperty = exports.DeviceCryingDetectedProperty = exports.DeviceSoundDetectedProperty = exports.DevicePetDetectedProperty = exports.DevicePersonDetectedProperty = exports.DeviceMotionDetectedProperty = exports.DeviceLockedSmartSafeProperty = exports.DeviceLockedProperty = exports.DeviceBatteryUsageLastWeekProperty = exports.DeviceLastChargingFalseEventsProperty = exports.DeviceLastChargingRecordedEventsProperty = exports.DeviceLastChargingTotalEventsProperty = exports.DeviceLastChargingDaysProperty = exports.DeviceStateLockProperty = exports.DeviceStateProperty = exports.DeviceWatermarkBatteryDoorbellCamera1Property = exports.DeviceWatermarkSoloWiredDoorbellProperty = exports.DeviceWatermarkIndoorFloodProperty = exports.DeviceWatermarkProperty = exports.DeviceRTSPStreamUrlProperty = exports.DeviceRTSPStreamProperty = exports.DevicePetDetectionProperty = exports.DeviceSoundDetectionProperty = exports.DeviceMotionDetectionDoorbellProperty = exports.DeviceMotionDetectionIndoorSoloFloodProperty = exports.DeviceMotionDetectionProperty = exports.DeviceStatusLedT8200XProperty = exports.DeviceStatusLedDoorbellProperty = exports.DeviceStatusLedBatteryDoorbellProperty = exports.DeviceStatusLedIndoorFloodProperty = exports.DeviceStatusLedProperty = exports.DeviceEnabledSoloProperty = exports.DeviceEnabledStandaloneProperty = exports.DeviceEnabledProperty = exports.DeviceWifiRSSISmartSafeProperty = exports.DeviceWifiRSSIKeypadProperty = exports.DeviceWifiRSSIEntrySensorProperty = exports.DeviceWifiRSSILockProperty = exports.DeviceCellularICCIDProperty = exports.DeviceCellularIMEIProperty = exports.DeviceCellularBandProperty = void 0;
exports.DeviceChargingStatusProperty = exports.DevicePowerWorkingModeBatteryDoorbellProperty = exports.DevicePowerWorkingModeProperty = exports.DevicePowerSourceProperty = exports.DeviceRingtoneVolumeT8200XProperty = exports.DeviceRingtoneVolumeWiredDoorbellProperty = exports.DeviceRingtoneVolumeBatteryDoorbellProperty = exports.DeviceSpeakerVolumeFloodlightT8420Property = exports.DeviceSpeakerVolumeWiredDoorbellProperty = exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty = exports.DeviceSpeakerVolumeCamera3Property = exports.DeviceSpeakerVolumeSoloProperty = exports.DeviceSpeakerVolumeProperty = exports.DeviceMotionTrackingProperty = exports.DeviceAudioRecordingFloodlightT8420Property = exports.DeviceAudioRecordingWiredDoorbellProperty = exports.DeviceAudioRecordingStarlight4gLTEProperty = exports.DeviceAudioRecordingIndoorSoloFloodlightProperty = exports.DeviceAudioRecordingProperty = exports.DeviceSpeakerProperty = exports.DeviceMicrophoneProperty = exports.DeviceFloodlightLightSettingsMotionTriggeredTimerProperty = exports.DeviceFloodlightLightSettingsMotionTriggeredDistanceProperty = exports.DeviceFloodlightLightSettingsMotionTriggeredProperty = exports.DeviceFloodlightLightSettingsBrightnessScheduleProperty = exports.DeviceFloodlightLightSettingsBrightnessMotionProperty = exports.DeviceCameraLightSettingsBrightnessManualProperty = exports.DeviceLightSettingsBrightnessManualCamera3Property = exports.DeviceFloodlightLightSettingsBrightnessManualProperty = exports.DeviceFloodlightLightSettingsEnableProperty = exports.DeviceFloodlightLightProperty = exports.DeviceMotionZoneProperty = exports.DeviceHiddenMotionDetectionModeWiredDoorbellProperty = exports.DeviceHiddenMotionDetectionSensitivityWiredDoorbellProperty = exports.DeviceMotionDetectionSensitivityFloodlightT8420Property = exports.DeviceMotionDetectionSensitivitySoloProperty = exports.DeviceMotionDetectionSensitivityWiredDoorbellProperty = exports.DeviceMotionDetectionSensitivityBatteryDoorbellProperty = exports.DeviceMotionDetectionSensitivityIndoorProperty = exports.DeviceMotionDetectionSensitivityCamera1Property = exports.DeviceMotionDetectionSensitivityCamera2Property = exports.DeviceMotionDetectionTypeIndoorMiniProperty = exports.DeviceMotionDetectionTypeIndoorProperty = exports.DeviceMotionDetectionTypeFloodlightProperty = exports.DeviceMotionDetectionTypeFloodlightT8423Property = exports.DeviceMotionDetectionCamera1Property = exports.DeviceMotionDetectionTypeT8200XProperty = exports.DeviceMotionDetectionTypeProperty = exports.DeviceMotionHB3DetectionTypeAllOhterMotionsProperty = exports.DeviceMotionHB3DetectionTypeVehicleProperty = void 0;
exports.DeviceMotionDetectionRangeStandardSensitivityProperty = exports.DeviceMotionDetectionRangeProperty = exports.DeviceVideoRingRecordWiredDoorbellProperty = exports.DeviceVideoDistortionCorrectionWiredDoorbellProperty = exports.DeviceVideoHDRWiredDoorbellProperty = exports.DeviceChirpToneEntrySensorProperty = exports.DeviceChirpVolumeEntrySensorProperty = exports.DeviceNotificationMotionWiredDoorbellProperty = exports.DeviceNotificationRadarDetectorProperty = exports.DeviceNotificationMotionProperty = exports.DeviceNotificationRingWiredDoorbellProperty = exports.DeviceNotificationRingProperty = exports.DeviceNotificationCryingProperty = exports.DeviceNotificationAllSoundProperty = exports.DeviceNotificationAllOtherMotionProperty = exports.DeviceNotificationPetProperty = exports.DeviceNotificationPersonProperty = exports.DeviceSoundDetectionSensitivityProperty = exports.DeviceSoundDetectionTypeProperty = exports.DeviceImageMirroredProperty = exports.DeviceRotationSpeedProperty = exports.DeviceNotificationTypeWiredDoorbellProperty = exports.DeviceNotificationTypeBatteryDoorbellProperty = exports.DeviceNotificationTypeIndoorFloodlightProperty = exports.DeviceNotificationTypeProperty = exports.DeviceChimeHomebaseRingtoneTypeBatteryDoorbellProperty = exports.DeviceChimeHomebaseRingtoneVolumeBatteryDoorbellProperty = exports.DeviceChimeHomebaseBatteryDoorbellProperty = exports.DeviceChimeIndoorT8200XProperty = exports.DeviceChimeIndoorWiredDoorbellProperty = exports.DeviceChimeIndoorBatteryDoorbellProperty = exports.DeviceWDRProperty = exports.DeviceVideoRecordingQualityCamera3Property = exports.DeviceVideoRecordingQualityCamera2CProProperty = exports.DeviceVideoRecordingQualityT8200XProperty = exports.DeviceVideoRecordingQualityProperty = exports.DeviceVideoRecordingQualityWiredDoorbellProperty = exports.DeviceVideoRecordingQualityIndoorProperty = exports.DeviceVideoStreamingQualityCamera3Property = exports.DeviceVideoStreamingQualitySoloProperty = exports.DeviceVideoStreamingQualityCameraProperty = exports.DeviceVideoStreamingQualityBatteryDoorbellProperty = exports.DeviceVideoStreamingQualityProperty = exports.DeviceRecordingEndClipMotionStopsProperty = exports.DeviceRecordingRetriggerIntervalFloodlightProperty = exports.DeviceRecordingRetriggerIntervalBatteryDoorbellProperty = exports.DeviceRecordingRetriggerIntervalProperty = exports.DeviceRecordingClipLengthFloodlightProperty = exports.DeviceRecordingClipLengthProperty = exports.DeviceChargingStatusCamera3cProperty = void 0;
exports.DeviceLoiteringCustomResponseHomeBaseNotificationProperty = exports.DeviceLoiteringCustomResponseAutoVoiceResponseVoiceProperty = exports.DeviceLoiteringCustomResponseAutoVoiceResponseProperty = exports.DeviceLoiteringCustomResponsePhoneNotificationProperty = exports.DeviceMotionDetectionSensitivityAdvancedHProperty = exports.DeviceMotionDetectionSensitivityAdvancedGProperty = exports.DeviceMotionDetectionSensitivityAdvancedFProperty = exports.DeviceMotionDetectionSensitivityAdvancedEProperty = exports.DeviceMotionDetectionSensitivityAdvancedDProperty = exports.DeviceMotionDetectionSensitivityAdvancedCProperty = exports.DeviceMotionDetectionSensitivityAdvancedBProperty = exports.DeviceMotionDetectionSensitivityAdvancedAProperty = exports.DeviceMotionDetectionSensitivityStandardProperty = exports.DeviceMotionDetectionSensitivityModeProperty = exports.DeviceLoiteringDetectionLengthProperty = exports.DeviceLoiteringDetectionRangeProperty = exports.DeviceLoiteringDetectionProperty = exports.DeviceNotificationLockedProperty = exports.DeviceNotificationUnlockedProperty = exports.DeviceNotificationProperty = exports.DeviceSoundSimpleProperty = exports.DeviceSoundProperty = exports.DeviceScramblePasscodeSmartSafeProperty = exports.DeviceScramblePasscodeProperty = exports.DeviceWrongTryAttemptsSmartSafeProperty = exports.DeviceWrongTryAttemptsProperty = exports.DeviceWrongTryLockdownTimeSmartSafeProperty = exports.DeviceWrongTryLockdownTimeProperty = exports.DeviceWrongTryProtectionSmartSafeProperty = exports.DeviceWrongTryProtectionProperty = exports.DeviceOneTouchLockingProperty = exports.DeviceAutoLockScheduleEndTimeProperty = exports.DeviceAutoLockScheduleStartTimeProperty = exports.DeviceAutoLockScheduleProperty = exports.DeviceAutoLockTimerProperty = exports.DeviceAutoLockProperty = exports.DeviceAutoCalibrationProperty = exports.DeviceVideoColorNightvisionProperty = exports.DeviceVideoNightvisionImageAdjustmentProperty = exports.DeviceLightSettingsMotionActivationModeProperty = exports.DeviceLightSettingsColorTemperatureScheduleProperty = exports.DeviceLightSettingsColorTemperatureMotionProperty = exports.DeviceLightSettingsColorTemperatureManualProperty = exports.DeviceMotionOutOfViewDetectionProperty = exports.DeviceMotionAutoCruiseProperty = exports.DeviceMotionTrackingSensitivityProperty = exports.DeviceMotionDetectionTestModeProperty = exports.DeviceMotionDetectionRangeAdvancedRightSensitivityProperty = exports.DeviceMotionDetectionRangeAdvancedMiddleSensitivityProperty = exports.DeviceMotionDetectionRangeAdvancedLeftSensitivityProperty = void 0;
exports.DeviceNotificationDualLockProperty = exports.DeviceNotificationDualUnlockProperty = exports.DeviceNotificationUnlockByAppProperty = exports.DeviceNotificationUnlockByFingerprintProperty = exports.DeviceNotificationUnlockByPINProperty = exports.DeviceNotificationUnlockByKeyProperty = exports.DeviceAlarmVolumeProperty = exports.DevicePromptVolumeProperty = exports.DeviceRemoteUnlockMasterPINProperty = exports.DeviceRemoteUnlockProperty = exports.DeviceTamperAlarmProperty = exports.DeviceInteriorBrightnessDurationProperty = exports.DeviceInteriorBrightnessProperty = exports.DevicePowerSaveProperty = exports.DeviceDualUnlockProperty = exports.DeviceLeftOpenAlarmDurationProperty = exports.DeviceLeftOpenAlarmProperty = exports.DeviceRadarMotionDetectedProperty = exports.DeviceSomeoneLoiteringProperty = exports.DevicePackageTakenProperty = exports.DevicePackageStrandedProperty = exports.DevicePackageDeliveredProperty = exports.StationOffSecuritySettings = exports.StationCustom3SecuritySettings = exports.StationCustom2SecuritySettings = exports.StationCustom1SecuritySettings = exports.StationAwaySecuritySettings = exports.StationHomeSecuritySettings = exports.DeviceSoundDetectionRoundLookProperty = exports.DeviceNotificationIntervalTimeProperty = exports.DeviceDefaultAngleIdleTimeProperty = exports.DeviceDefaultAngleProperty = exports.DeviceContinuousRecordingTypeProperty = exports.DeviceContinuousRecordingProperty = exports.DeviceRingAutoResponseTimeToProperty = exports.DeviceRingAutoResponseTimeFromProperty = exports.DeviceRingAutoResponseVoiceResponseVoiceProperty = exports.DeviceRingAutoResponseVoiceResponseProperty = exports.DeviceRingAutoResponseProperty = exports.DeviceDualCamWatchViewModeProperty = exports.DeviceDeliveryGuardPackageLiveCheckAssistanceProperty = exports.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheckProperty = exports.DeviceDeliveryGuardUncollectedPackageAlertProperty = exports.DeviceDeliveryGuardPackageGuardingActivatedTimeToProperty = exports.DeviceDeliveryGuardPackageGuardingActivatedTimeFromProperty = exports.DeviceDeliveryGuardPackageGuardingVoiceResponseVoiceProperty = exports.DeviceDeliveryGuardPackageGuardingProperty = exports.DeviceDeliveryGuardProperty = exports.DeviceLoiteringCustomResponseTimeToProperty = exports.DeviceLoiteringCustomResponseTimeFromProperty = void 0;
exports.StationNotificationStartAlarmDelayProperty = exports.StationNotificationSwitchModeKeypadProperty = exports.StationNotificationSwitchModeAppProperty = exports.StationNotificationSwitchModeGeofenceProperty = exports.StationNotificationSwitchModeScheduleProperty = exports.StationAlarmToneProperty = exports.StationPromptVolumeProperty = exports.StationAlarmVolumeProperty = exports.StationMacAddressProperty = exports.StationLanIpAddressStandaloneProperty = exports.StationLanIpAddressProperty = exports.StationCurrentModeKeyPadProperty = exports.StationCurrentModeProperty = exports.StationGuardModeKeyPadProperty = exports.StationGuardModeProperty = exports.BaseStationProperties = exports.StationSerialNumberProperty = exports.StationModelProperty = exports.StationNameProperty = exports.DeviceProperties = exports.WiredDoorbellT8200XDeviceProperties = exports.FloodlightT8420XDeviceProperties = exports.DeviceDetectionStatisticsRecordedEventsProperty = exports.DeviceDetectionStatisticsDetectedEventsProperty = exports.DeviceDetectionStatisticsWorkingDaysProperty = exports.DeviceDogPoopDetectedProperty = exports.DeviceDogLickDetectedProperty = exports.DeviceDogDetectedProperty = exports.DeviceVehicleDetectedProperty = exports.DeviceStrangerPersonDetectedProperty = exports.DeviceIdentityPersonDetectedProperty = exports.DevicePersonNameProperty = exports.DeviceSnoozeChimeProperty = exports.DeviceSnoozeMotionProperty = exports.DeviceSnoozeHomebaseProperty = exports.DeviceSnoozeStartTimeWiredDoorbellProperty = exports.DeviceSnoozeStartTimeProperty = exports.DeviceSnoozeTimeProperty = exports.DeviceSnoozeProperty = exports.DeviceVideoTypeStoreToNASProperty = exports.DeviceWrongTryProtectAlertProperty = exports.DeviceLongTimeNotCloseAlertProperty = exports.DeviceLowBatteryAlertProperty = exports.DeviceShakeAlertEventProperty = exports.DeviceShakeAlertProperty = exports.Device911AlertEventProperty = exports.Device911AlertProperty = exports.DeviceJammedAlertProperty = exports.DeviceNotificationJammedProperty = exports.DeviceNotificationWrongTryProtectProperty = void 0;
exports.StationCommands = exports.DeviceCommands = exports.CommandName = exports.StationProperties = exports.StationAlarmDelayTypeProperty = exports.StationAlarmDelayProperty = exports.StationAlarmArmDelayProperty = exports.StationAlarmArmedProperty = exports.StationAlarmTypeProperty = exports.StationAlarmProperty = exports.StationTurnOffAlarmWithButtonProperty = exports.StationAutoEndAlarmProperty = exports.StationSwitchModeWithAccessCodeProperty = exports.StationTimeFormatProperty = void 0;
const types_1 = require("../p2p/types");
var DeviceType;
(function (DeviceType) {
    //List retrieved from com.oceanwing.battery.cam.binder.model.QueryDeviceData
    DeviceType[DeviceType["STATION"] = 0] = "STATION";
    DeviceType[DeviceType["CAMERA"] = 1] = "CAMERA";
    DeviceType[DeviceType["SENSOR"] = 2] = "SENSOR";
    DeviceType[DeviceType["FLOODLIGHT"] = 3] = "FLOODLIGHT";
    DeviceType[DeviceType["CAMERA_E"] = 4] = "CAMERA_E";
    DeviceType[DeviceType["DOORBELL"] = 5] = "DOORBELL";
    DeviceType[DeviceType["BATTERY_DOORBELL"] = 7] = "BATTERY_DOORBELL";
    DeviceType[DeviceType["CAMERA2C"] = 8] = "CAMERA2C";
    DeviceType[DeviceType["CAMERA2"] = 9] = "CAMERA2";
    DeviceType[DeviceType["MOTION_SENSOR"] = 10] = "MOTION_SENSOR";
    DeviceType[DeviceType["KEYPAD"] = 11] = "KEYPAD";
    DeviceType[DeviceType["CAMERA2_PRO"] = 14] = "CAMERA2_PRO";
    DeviceType[DeviceType["CAMERA2C_PRO"] = 15] = "CAMERA2C_PRO";
    DeviceType[DeviceType["BATTERY_DOORBELL_2"] = 16] = "BATTERY_DOORBELL_2";
    DeviceType[DeviceType["HB3"] = 18] = "HB3";
    DeviceType[DeviceType["CAMERA3"] = 19] = "CAMERA3";
    DeviceType[DeviceType["CAMERA3C"] = 23] = "CAMERA3C";
    DeviceType[DeviceType["INDOOR_CAMERA"] = 30] = "INDOOR_CAMERA";
    DeviceType[DeviceType["INDOOR_PT_CAMERA"] = 31] = "INDOOR_PT_CAMERA";
    DeviceType[DeviceType["SOLO_CAMERA"] = 32] = "SOLO_CAMERA";
    DeviceType[DeviceType["SOLO_CAMERA_PRO"] = 33] = "SOLO_CAMERA_PRO";
    DeviceType[DeviceType["INDOOR_CAMERA_1080"] = 34] = "INDOOR_CAMERA_1080";
    DeviceType[DeviceType["INDOOR_PT_CAMERA_1080"] = 35] = "INDOOR_PT_CAMERA_1080";
    DeviceType[DeviceType["FLOODLIGHT_CAMERA_8422"] = 37] = "FLOODLIGHT_CAMERA_8422";
    DeviceType[DeviceType["FLOODLIGHT_CAMERA_8423"] = 38] = "FLOODLIGHT_CAMERA_8423";
    DeviceType[DeviceType["FLOODLIGHT_CAMERA_8424"] = 39] = "FLOODLIGHT_CAMERA_8424";
    DeviceType[DeviceType["INDOOR_OUTDOOR_CAMERA_1080P_NO_LIGHT"] = 44] = "INDOOR_OUTDOOR_CAMERA_1080P_NO_LIGHT";
    DeviceType[DeviceType["INDOOR_OUTDOOR_CAMERA_2K"] = 45] = "INDOOR_OUTDOOR_CAMERA_2K";
    DeviceType[DeviceType["INDOOR_OUTDOOR_CAMERA_1080P"] = 46] = "INDOOR_OUTDOOR_CAMERA_1080P";
    DeviceType[DeviceType["LOCK_BLE"] = 50] = "LOCK_BLE";
    DeviceType[DeviceType["LOCK_WIFI"] = 51] = "LOCK_WIFI";
    DeviceType[DeviceType["LOCK_BLE_NO_FINGER"] = 52] = "LOCK_BLE_NO_FINGER";
    DeviceType[DeviceType["LOCK_WIFI_NO_FINGER"] = 53] = "LOCK_WIFI_NO_FINGER";
    DeviceType[DeviceType["LOCK_8503"] = 54] = "LOCK_8503";
    DeviceType[DeviceType["LOCK_8530"] = 55] = "LOCK_8530";
    DeviceType[DeviceType["LOCK_85A3"] = 56] = "LOCK_85A3";
    DeviceType[DeviceType["LOCK_8592"] = 57] = "LOCK_8592";
    DeviceType[DeviceType["LOCK_8504"] = 58] = "LOCK_8504";
    DeviceType[DeviceType["SOLO_CAMERA_SPOTLIGHT_1080"] = 60] = "SOLO_CAMERA_SPOTLIGHT_1080";
    DeviceType[DeviceType["SOLO_CAMERA_SPOTLIGHT_2K"] = 61] = "SOLO_CAMERA_SPOTLIGHT_2K";
    DeviceType[DeviceType["SOLO_CAMERA_SPOTLIGHT_SOLAR"] = 62] = "SOLO_CAMERA_SPOTLIGHT_SOLAR";
    DeviceType[DeviceType["SMART_DROP"] = 90] = "SMART_DROP";
    DeviceType[DeviceType["BATTERY_DOORBELL_PLUS"] = 91] = "BATTERY_DOORBELL_PLUS";
    DeviceType[DeviceType["DOORBELL_SOLO"] = 93] = "DOORBELL_SOLO";
    DeviceType[DeviceType["INDOOR_COST_DOWN_CAMERA"] = 100] = "INDOOR_COST_DOWN_CAMERA";
    DeviceType[DeviceType["CAMERA_GUN"] = 101] = "CAMERA_GUN";
    DeviceType[DeviceType["CAMERA_SNAIL"] = 102] = "CAMERA_SNAIL";
    DeviceType[DeviceType["CAMERA_FG"] = 110] = "CAMERA_FG";
    DeviceType[DeviceType["SMART_SAFE_7400"] = 140] = "SMART_SAFE_7400";
    DeviceType[DeviceType["SMART_SAFE_7401"] = 141] = "SMART_SAFE_7401";
    DeviceType[DeviceType["SMART_SAFE_7402"] = 142] = "SMART_SAFE_7402";
    DeviceType[DeviceType["SMART_SAFE_7403"] = 143] = "SMART_SAFE_7403";
})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
var ParamType;
(function (ParamType) {
    //List retrieved from com.oceanwing.battery.cam.binder.model.CameraParams
    ParamType[ParamType["CHIME_STATE"] = 2015] = "CHIME_STATE";
    ParamType[ParamType["DETECT_EXPOSURE"] = 2023] = "DETECT_EXPOSURE";
    ParamType[ParamType["DETECT_MODE"] = 2004] = "DETECT_MODE";
    ParamType[ParamType["DETECT_MOTION_SENSITIVE"] = 2005] = "DETECT_MOTION_SENSITIVE";
    ParamType[ParamType["DETECT_SCENARIO"] = 2028] = "DETECT_SCENARIO";
    ParamType[ParamType["DETECT_SWITCH"] = 2027] = "DETECT_SWITCH";
    ParamType[ParamType["DETECT_ZONE"] = 2006] = "DETECT_ZONE";
    ParamType[ParamType["DOORBELL_AUDIO_RECODE"] = 2042] = "DOORBELL_AUDIO_RECODE";
    ParamType[ParamType["DOORBELL_BRIGHTNESS"] = 2032] = "DOORBELL_BRIGHTNESS";
    ParamType[ParamType["DOORBELL_DISTORTION"] = 2033] = "DOORBELL_DISTORTION";
    ParamType[ParamType["DOORBELL_HDR"] = 2029] = "DOORBELL_HDR";
    ParamType[ParamType["DOORBELL_IR_MODE"] = 2030] = "DOORBELL_IR_MODE";
    ParamType[ParamType["DOORBELL_LED_NIGHT_MODE"] = 2039] = "DOORBELL_LED_NIGHT_MODE";
    ParamType[ParamType["DOORBELL_MOTION_ADVANCE_OPTION"] = 2041] = "DOORBELL_MOTION_ADVANCE_OPTION";
    ParamType[ParamType["DOORBELL_MOTION_NOTIFICATION"] = 2035] = "DOORBELL_MOTION_NOTIFICATION";
    ParamType[ParamType["DOORBELL_NOTIFICATION_JUMP_MODE"] = 2038] = "DOORBELL_NOTIFICATION_JUMP_MODE";
    ParamType[ParamType["DOORBELL_NOTIFICATION_OPEN"] = 2036] = "DOORBELL_NOTIFICATION_OPEN";
    ParamType[ParamType["DOORBELL_RECORD_QUALITY"] = 2034] = "DOORBELL_RECORD_QUALITY";
    ParamType[ParamType["DOORBELL_RING_RECORD"] = 2040] = "DOORBELL_RING_RECORD";
    ParamType[ParamType["DOORBELL_SNOOZE_START_TIME"] = 2037] = "DOORBELL_SNOOZE_START_TIME";
    ParamType[ParamType["DOORBELL_VIDEO_QUALITY"] = 2031] = "DOORBELL_VIDEO_QUALITY";
    ParamType[ParamType["NIGHT_VISUAL"] = 2002] = "NIGHT_VISUAL";
    ParamType[ParamType["OPEN_DEVICE"] = 2001] = "OPEN_DEVICE";
    ParamType[ParamType["RINGING_VOLUME"] = 2022] = "RINGING_VOLUME";
    ParamType[ParamType["SDCARD"] = 2010] = "SDCARD";
    ParamType[ParamType["UN_DETECT_ZONE"] = 2007] = "UN_DETECT_ZONE";
    ParamType[ParamType["VOLUME"] = 2003] = "VOLUME";
    ParamType[ParamType["COMMAND_LED_NIGHT_OPEN"] = 1026] = "COMMAND_LED_NIGHT_OPEN";
    ParamType[ParamType["COMMAND_MOTION_DETECTION_PACKAGE"] = 1016] = "COMMAND_MOTION_DETECTION_PACKAGE";
    ParamType[ParamType["COMMAND_HDR"] = 1019] = "COMMAND_HDR";
    ParamType[ParamType["COMMAND_DISTORTION_CORRECTION"] = 1022] = "COMMAND_DISTORTION_CORRECTION";
    ParamType[ParamType["COMMAND_VIDEO_QUALITY"] = 1020] = "COMMAND_VIDEO_QUALITY";
    ParamType[ParamType["COMMAND_VIDEO_RECORDING_QUALITY"] = 1023] = "COMMAND_VIDEO_RECORDING_QUALITY";
    ParamType[ParamType["COMMAND_VIDEO_RING_RECORD"] = 1027] = "COMMAND_VIDEO_RING_RECORD";
    ParamType[ParamType["COMMAND_AUDIO_RECORDING"] = 1029] = "COMMAND_AUDIO_RECORDING";
    ParamType[ParamType["COMMAND_INDOOR_CHIME"] = 1006] = "COMMAND_INDOOR_CHIME";
    ParamType[ParamType["COMMAND_RINGTONE_VOLUME"] = 1012] = "COMMAND_RINGTONE_VOLUME";
    ParamType[ParamType["COMMAND_NOTIFICATION_RING"] = 1031] = "COMMAND_NOTIFICATION_RING";
    ParamType[ParamType["COMMAND_NOTIFICATION_TYPE"] = 1030] = "COMMAND_NOTIFICATION_TYPE";
    ParamType[ParamType["COMMAND_QUICK_RESPONSE"] = 1004] = "COMMAND_QUICK_RESPONSE";
    ParamType[ParamType["COMMAND_START_LIVESTREAM"] = 1000] = "COMMAND_START_LIVESTREAM";
    ParamType[ParamType["COMMAND_STREAM_INFO"] = 1005] = "COMMAND_STREAM_INFO";
    ParamType[ParamType["COMMAND_VOLTAGE_INFO"] = 1015] = "COMMAND_VOLTAGE_INFO";
    // Inferred from source
    ParamType[ParamType["SNOOZE_MODE"] = 1271] = "SNOOZE_MODE";
    ParamType[ParamType["WATERMARK_MODE"] = 1214] = "WATERMARK_MODE";
    ParamType[ParamType["DEVICE_UPGRADE_NOW"] = 1134] = "DEVICE_UPGRADE_NOW";
    ParamType[ParamType["CAMERA_UPGRADE_NOW"] = 1133] = "CAMERA_UPGRADE_NOW";
    ParamType[ParamType["DEFAULT_SCHEDULE_MODE"] = 1257] = "DEFAULT_SCHEDULE_MODE";
    ParamType[ParamType["GUARD_MODE"] = 1224] = "GUARD_MODE";
    ParamType[ParamType["FLOODLIGHT_MANUAL_SWITCH"] = 1400] = "FLOODLIGHT_MANUAL_SWITCH";
    ParamType[ParamType["FLOODLIGHT_MANUAL_BRIGHTNESS"] = 1401] = "FLOODLIGHT_MANUAL_BRIGHTNESS";
    ParamType[ParamType["FLOODLIGHT_MOTION_BRIGHTNESS"] = 1412] = "FLOODLIGHT_MOTION_BRIGHTNESS";
    ParamType[ParamType["FLOODLIGHT_SCHEDULE_BRIGHTNESS"] = 1413] = "FLOODLIGHT_SCHEDULE_BRIGHTNESS";
    ParamType[ParamType["FLOODLIGHT_MOTION_SENSITIVTY"] = 1272] = "FLOODLIGHT_MOTION_SENSITIVTY";
    ParamType[ParamType["CAMERA_SPEAKER_VOLUME"] = 1230] = "CAMERA_SPEAKER_VOLUME";
    ParamType[ParamType["CAMERA_RECORD_ENABLE_AUDIO"] = 1366] = "CAMERA_RECORD_ENABLE_AUDIO";
    ParamType[ParamType["CAMERA_RECORD_RETRIGGER_INTERVAL"] = 1250] = "CAMERA_RECORD_RETRIGGER_INTERVAL";
    ParamType[ParamType["CAMERA_RECORD_CLIP_LENGTH"] = 1249] = "CAMERA_RECORD_CLIP_LENGTH";
    ParamType[ParamType["CAMERA_IR_CUT"] = 1013] = "CAMERA_IR_CUT";
    ParamType[ParamType["CAMERA_PIR"] = 1011] = "CAMERA_PIR";
    ParamType[ParamType["CAMERA_WIFI_RSSI"] = 1142] = "CAMERA_WIFI_RSSI";
    ParamType[ParamType["CAMERA_MOTION_ZONES"] = 1204] = "CAMERA_MOTION_ZONES";
    // Set only params?
    ParamType[ParamType["PUSH_MSG_MODE"] = 1252] = "PUSH_MSG_MODE";
    ParamType[ParamType["PRIVATE_MODE"] = 99904] = "PRIVATE_MODE";
    ParamType[ParamType["CUSTOM_RTSP_URL"] = 999991] = "CUSTOM_RTSP_URL";
})(ParamType = exports.ParamType || (exports.ParamType = {}));
var AlarmMode;
(function (AlarmMode) {
    AlarmMode[AlarmMode["AWAY"] = 0] = "AWAY";
    AlarmMode[AlarmMode["HOME"] = 1] = "HOME";
    AlarmMode[AlarmMode["CUSTOM1"] = 3] = "CUSTOM1";
    AlarmMode[AlarmMode["CUSTOM2"] = 4] = "CUSTOM2";
    AlarmMode[AlarmMode["CUSTOM3"] = 5] = "CUSTOM3";
    AlarmMode[AlarmMode["DISARMED"] = 63] = "DISARMED";
})(AlarmMode = exports.AlarmMode || (exports.AlarmMode = {}));
var GuardMode;
(function (GuardMode) {
    GuardMode[GuardMode["UNKNOWN"] = -1] = "UNKNOWN";
    GuardMode[GuardMode["AWAY"] = 0] = "AWAY";
    GuardMode[GuardMode["HOME"] = 1] = "HOME";
    GuardMode[GuardMode["DISARMED"] = 63] = "DISARMED";
    GuardMode[GuardMode["SCHEDULE"] = 2] = "SCHEDULE";
    GuardMode[GuardMode["GEO"] = 47] = "GEO";
    GuardMode[GuardMode["CUSTOM1"] = 3] = "CUSTOM1";
    GuardMode[GuardMode["CUSTOM2"] = 4] = "CUSTOM2";
    GuardMode[GuardMode["CUSTOM3"] = 5] = "CUSTOM3";
    GuardMode[GuardMode["OFF"] = 6] = "OFF";
})(GuardMode = exports.GuardMode || (exports.GuardMode = {}));
var ResponseErrorCode;
(function (ResponseErrorCode) {
    ResponseErrorCode[ResponseErrorCode["CODE_CONNECT_ERROR"] = 997] = "CODE_CONNECT_ERROR";
    ResponseErrorCode[ResponseErrorCode["CODE_ERROR_PIN"] = 36006] = "CODE_ERROR_PIN";
    ResponseErrorCode[ResponseErrorCode["CODE_IS_OPEN"] = 25074] = "CODE_IS_OPEN";
    ResponseErrorCode[ResponseErrorCode["CODE_IS_OPEN_OTHERS"] = 25080] = "CODE_IS_OPEN_OTHERS";
    ResponseErrorCode[ResponseErrorCode["CODE_MULTI_ALARM"] = 36002] = "CODE_MULTI_ALARM";
    ResponseErrorCode[ResponseErrorCode["CODE_NEED_VERIFY_CODE"] = 26052] = "CODE_NEED_VERIFY_CODE";
    ResponseErrorCode[ResponseErrorCode["CODE_NETWORK_ERROR"] = 998] = "CODE_NETWORK_ERROR";
    ResponseErrorCode[ResponseErrorCode["CODE_PHONE_NONE_SUPPORT"] = 26058] = "CODE_PHONE_NONE_SUPPORT";
    ResponseErrorCode[ResponseErrorCode["CODE_SERVER_ERROR"] = 999] = "CODE_SERVER_ERROR";
    ResponseErrorCode[ResponseErrorCode["CODE_SERVER_UNDER_MAINTENANCE"] = 424] = "CODE_SERVER_UNDER_MAINTENANCE";
    ResponseErrorCode[ResponseErrorCode["CODE_VERIFY_CODE_ERROR"] = 26050] = "CODE_VERIFY_CODE_ERROR";
    ResponseErrorCode[ResponseErrorCode["CODE_VERIFY_CODE_EXPIRED"] = 26051] = "CODE_VERIFY_CODE_EXPIRED";
    ResponseErrorCode[ResponseErrorCode["CODE_VERIFY_CODE_MAX"] = 26053] = "CODE_VERIFY_CODE_MAX";
    ResponseErrorCode[ResponseErrorCode["CODE_VERIFY_CODE_NONE_MATCH"] = 26054] = "CODE_VERIFY_CODE_NONE_MATCH";
    ResponseErrorCode[ResponseErrorCode["CODE_VERIFY_PASSWORD_ERROR"] = 26055] = "CODE_VERIFY_PASSWORD_ERROR";
    ResponseErrorCode[ResponseErrorCode["CODE_WHATEVER_ERROR"] = 0] = "CODE_WHATEVER_ERROR";
    ResponseErrorCode[ResponseErrorCode["CODE_EMAIL_LIMIT_EXCEED"] = 25077] = "CODE_EMAIL_LIMIT_EXCEED";
    ResponseErrorCode[ResponseErrorCode["CODE_GIVE_AWAY_EXPIRED"] = 25075] = "CODE_GIVE_AWAY_EXPIRED";
    ResponseErrorCode[ResponseErrorCode["CODE_GIVE_AWAY_INVALID"] = 25076] = "CODE_GIVE_AWAY_INVALID";
    ResponseErrorCode[ResponseErrorCode["CODE_GIVE_AWAY_NOT_EXIST"] = 25079] = "CODE_GIVE_AWAY_NOT_EXIST";
    ResponseErrorCode[ResponseErrorCode["CODE_GIVE_AWAY_PACKAGE_NOT_MATCH"] = 25078] = "CODE_GIVE_AWAY_PACKAGE_NOT_MATCH";
    ResponseErrorCode[ResponseErrorCode["CODE_GIVE_AWAY_PACKAGE_TYPE_NOT_MATCH"] = 25080] = "CODE_GIVE_AWAY_PACKAGE_TYPE_NOT_MATCH";
    ResponseErrorCode[ResponseErrorCode["CODE_GIVE_AWAY_RECORD_EXIST"] = 25074] = "CODE_GIVE_AWAY_RECORD_EXIST";
    ResponseErrorCode[ResponseErrorCode["CODE_INPUT_PARAM_INVALID"] = 10000] = "CODE_INPUT_PARAM_INVALID";
    ResponseErrorCode[ResponseErrorCode["CODE_MAX_FORGET_PASSWORD_ERROR"] = 100035] = "CODE_MAX_FORGET_PASSWORD_ERROR";
    ResponseErrorCode[ResponseErrorCode["CODE_MAX_LOGIN_LIMIT"] = 100028] = "CODE_MAX_LOGIN_LIMIT";
    ResponseErrorCode[ResponseErrorCode["CODE_MAX_REGISTER_ERROR"] = 100034] = "CODE_MAX_REGISTER_ERROR";
    ResponseErrorCode[ResponseErrorCode["EMAIL_NOT_REGISTERED_ERROR"] = 22008] = "EMAIL_NOT_REGISTERED_ERROR";
    ResponseErrorCode[ResponseErrorCode["LOGIN_CAPTCHA_ERROR"] = 100033] = "LOGIN_CAPTCHA_ERROR";
    ResponseErrorCode[ResponseErrorCode["LOGIN_DECRYPTION_FAIL"] = 100030] = "LOGIN_DECRYPTION_FAIL";
    ResponseErrorCode[ResponseErrorCode["LOGIN_ENCRYPTION_FAIL"] = 100029] = "LOGIN_ENCRYPTION_FAIL";
    ResponseErrorCode[ResponseErrorCode["LOGIN_INVALID_TOUCH_ID"] = 26047] = "LOGIN_INVALID_TOUCH_ID";
    ResponseErrorCode[ResponseErrorCode["LOGIN_NEED_CAPTCHA"] = 100032] = "LOGIN_NEED_CAPTCHA";
    ResponseErrorCode[ResponseErrorCode["MULTIPLE_EMAIL_PASSWORD_ERROR"] = 26006] = "MULTIPLE_EMAIL_PASSWORD_ERROR";
    ResponseErrorCode[ResponseErrorCode["MULTIPLE_INACTIVATED_ERROR"] = 26015] = "MULTIPLE_INACTIVATED_ERROR";
    ResponseErrorCode[ResponseErrorCode["MULTIPLE_REGISTRATION_ERROR"] = 26000] = "MULTIPLE_REGISTRATION_ERROR";
    ResponseErrorCode[ResponseErrorCode["RESP_ERROR_CODE_SESSION_TIMEOUT"] = 401] = "RESP_ERROR_CODE_SESSION_TIMEOUT";
    ResponseErrorCode[ResponseErrorCode["CODE_REQUEST_TOO_FAST"] = 250999] = "CODE_REQUEST_TOO_FAST";
})(ResponseErrorCode = exports.ResponseErrorCode || (exports.ResponseErrorCode = {}));
var VerfyCodeTypes;
(function (VerfyCodeTypes) {
    VerfyCodeTypes[VerfyCodeTypes["TYPE_SMS"] = 0] = "TYPE_SMS";
    VerfyCodeTypes[VerfyCodeTypes["TYPE_PUSH"] = 1] = "TYPE_PUSH";
    VerfyCodeTypes[VerfyCodeTypes["TYPE_EMAIL"] = 2] = "TYPE_EMAIL";
})(VerfyCodeTypes = exports.VerfyCodeTypes || (exports.VerfyCodeTypes = {}));
var StorageType;
(function (StorageType) {
    StorageType[StorageType["NONE"] = 0] = "NONE";
    StorageType[StorageType["LOCAL"] = 1] = "LOCAL";
    StorageType[StorageType["CLOUD"] = 2] = "CLOUD";
    StorageType[StorageType["LOCAL_AND_CLOUD"] = 3] = "LOCAL_AND_CLOUD";
})(StorageType = exports.StorageType || (exports.StorageType = {}));
var PowerSource;
(function (PowerSource) {
    PowerSource[PowerSource["BATTERY"] = 0] = "BATTERY";
    PowerSource[PowerSource["SOLAR_PANEL"] = 1] = "SOLAR_PANEL";
})(PowerSource = exports.PowerSource || (exports.PowerSource = {}));
var PublicKeyType;
(function (PublicKeyType) {
    PublicKeyType[PublicKeyType["SERVER"] = 1] = "SERVER";
    PublicKeyType[PublicKeyType["LOCK"] = 2] = "LOCK";
})(PublicKeyType = exports.PublicKeyType || (exports.PublicKeyType = {}));
var FloodlightMotionTriggeredDistance;
(function (FloodlightMotionTriggeredDistance) {
    FloodlightMotionTriggeredDistance[FloodlightMotionTriggeredDistance["MIN"] = 66] = "MIN";
    FloodlightMotionTriggeredDistance[FloodlightMotionTriggeredDistance["LOW"] = 76] = "LOW";
    FloodlightMotionTriggeredDistance[FloodlightMotionTriggeredDistance["MEDIUM"] = 86] = "MEDIUM";
    FloodlightMotionTriggeredDistance[FloodlightMotionTriggeredDistance["HIGH"] = 91] = "HIGH";
    FloodlightMotionTriggeredDistance[FloodlightMotionTriggeredDistance["MAX"] = 96] = "MAX";
})(FloodlightMotionTriggeredDistance = exports.FloodlightMotionTriggeredDistance || (exports.FloodlightMotionTriggeredDistance = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["MOST_EFFICIENT"] = 1] = "MOST_EFFICIENT";
    NotificationType[NotificationType["INCLUDE_THUMBNAIL"] = 2] = "INCLUDE_THUMBNAIL";
    NotificationType[NotificationType["FULL_EFFECT"] = 3] = "FULL_EFFECT";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var AlarmTone;
(function (AlarmTone) {
    AlarmTone[AlarmTone["ALARM_TONE1"] = 1] = "ALARM_TONE1";
    AlarmTone[AlarmTone["ALARM_TONE2"] = 2] = "ALARM_TONE2";
})(AlarmTone = exports.AlarmTone || (exports.AlarmTone = {}));
var NotificationSwitchMode;
(function (NotificationSwitchMode) {
    NotificationSwitchMode[NotificationSwitchMode["APP"] = 16] = "APP";
    NotificationSwitchMode[NotificationSwitchMode["GEOFENCE"] = 32] = "GEOFENCE";
    NotificationSwitchMode[NotificationSwitchMode["SCHEDULE"] = 64] = "SCHEDULE";
    NotificationSwitchMode[NotificationSwitchMode["KEYPAD"] = 128] = "KEYPAD";
})(NotificationSwitchMode = exports.NotificationSwitchMode || (exports.NotificationSwitchMode = {}));
var GuardModeSecuritySettingsAction;
(function (GuardModeSecuritySettingsAction) {
    GuardModeSecuritySettingsAction[GuardModeSecuritySettingsAction["VIDEO_RECORDING"] = 1] = "VIDEO_RECORDING";
    GuardModeSecuritySettingsAction[GuardModeSecuritySettingsAction["CAMERA_ALARM"] = 2] = "CAMERA_ALARM";
    GuardModeSecuritySettingsAction[GuardModeSecuritySettingsAction["HOMEBASE_ALARM"] = 4] = "HOMEBASE_ALARM";
    GuardModeSecuritySettingsAction[GuardModeSecuritySettingsAction["NOTIFICATON"] = 8] = "NOTIFICATON";
    GuardModeSecuritySettingsAction[GuardModeSecuritySettingsAction["PRIVACY"] = 16] = "PRIVACY";
    GuardModeSecuritySettingsAction[GuardModeSecuritySettingsAction["LIGHT_ALARM"] = 32] = "LIGHT_ALARM";
    GuardModeSecuritySettingsAction[GuardModeSecuritySettingsAction["PROFESSIONAL_SECURITY"] = 64] = "PROFESSIONAL_SECURITY";
})(GuardModeSecuritySettingsAction = exports.GuardModeSecuritySettingsAction || (exports.GuardModeSecuritySettingsAction = {}));
var TimeFormat;
(function (TimeFormat) {
    TimeFormat[TimeFormat["FORMAT_12H"] = 0] = "FORMAT_12H";
    TimeFormat[TimeFormat["FORMAT_24H"] = 1] = "FORMAT_24H";
})(TimeFormat = exports.TimeFormat || (exports.TimeFormat = {}));
var SignalLevel;
(function (SignalLevel) {
    SignalLevel[SignalLevel["NO_SIGNAL"] = 0] = "NO_SIGNAL";
    SignalLevel[SignalLevel["WEAK"] = 1] = "WEAK";
    SignalLevel[SignalLevel["NORMAL"] = 2] = "NORMAL";
    SignalLevel[SignalLevel["STRONG"] = 3] = "STRONG";
    SignalLevel[SignalLevel["FULL"] = 4] = "FULL";
})(SignalLevel = exports.SignalLevel || (exports.SignalLevel = {}));
var MotionDetectionMode;
(function (MotionDetectionMode) {
    MotionDetectionMode[MotionDetectionMode["STANDARD"] = 0] = "STANDARD";
    MotionDetectionMode[MotionDetectionMode["ADVANCED"] = 1] = "ADVANCED";
})(MotionDetectionMode = exports.MotionDetectionMode || (exports.MotionDetectionMode = {}));
var VideoTypeStoreToNAS;
(function (VideoTypeStoreToNAS) {
    VideoTypeStoreToNAS[VideoTypeStoreToNAS["Events"] = 0] = "Events";
    VideoTypeStoreToNAS[VideoTypeStoreToNAS["ContinuousRecording"] = 1] = "ContinuousRecording";
})(VideoTypeStoreToNAS = exports.VideoTypeStoreToNAS || (exports.VideoTypeStoreToNAS = {}));
var DualCamStreamMode;
(function (DualCamStreamMode) {
    DualCamStreamMode[DualCamStreamMode["SINGLE_MAIN"] = 0] = "SINGLE_MAIN";
    DualCamStreamMode[DualCamStreamMode["SINGLE_SECOND"] = 1] = "SINGLE_SECOND";
    DualCamStreamMode[DualCamStreamMode["PIP_MAIN_UPPER_LEFT"] = 2] = "PIP_MAIN_UPPER_LEFT";
    DualCamStreamMode[DualCamStreamMode["PIP_MAIN_UPPER_RIGHT"] = 3] = "PIP_MAIN_UPPER_RIGHT";
    DualCamStreamMode[DualCamStreamMode["PIP_MAIN_LOWER_LEFT"] = 4] = "PIP_MAIN_LOWER_LEFT";
    DualCamStreamMode[DualCamStreamMode["PIP_MAIN_LOWER_RIGHT"] = 5] = "PIP_MAIN_LOWER_RIGHT";
    DualCamStreamMode[DualCamStreamMode["PIP_SECOND_UPPER_LEFT"] = 6] = "PIP_SECOND_UPPER_LEFT";
    DualCamStreamMode[DualCamStreamMode["PIP_SECOND_UPPER_RIGHT"] = 7] = "PIP_SECOND_UPPER_RIGHT";
    DualCamStreamMode[DualCamStreamMode["PIP_SECOND_LOWER_LEFT"] = 8] = "PIP_SECOND_LOWER_LEFT";
    DualCamStreamMode[DualCamStreamMode["PIP_SECOND_LOWER_RIGHT"] = 9] = "PIP_SECOND_LOWER_RIGHT";
    DualCamStreamMode[DualCamStreamMode["SPLICE_LEFT"] = 10] = "SPLICE_LEFT";
    DualCamStreamMode[DualCamStreamMode["SPLICE_RIGHT"] = 11] = "SPLICE_RIGHT";
    DualCamStreamMode[DualCamStreamMode["SPLICE_ABOVE"] = 12] = "SPLICE_ABOVE";
    DualCamStreamMode[DualCamStreamMode["SPLICE_UNDER"] = 13] = "SPLICE_UNDER";
    DualCamStreamMode[DualCamStreamMode["SPLICE_MIRROR"] = 14] = "SPLICE_MIRROR";
})(DualCamStreamMode = exports.DualCamStreamMode || (exports.DualCamStreamMode = {}));
var UserType;
(function (UserType) {
    UserType[UserType["NORMAL"] = 0] = "NORMAL";
    UserType[UserType["ADMIN"] = 1] = "ADMIN";
    UserType[UserType["SUPER_ADMIN"] = 2] = "SUPER_ADMIN";
    UserType[UserType["ENTRY_ONLY"] = 4] = "ENTRY_ONLY";
})(UserType = exports.UserType || (exports.UserType = {}));
var UserPasswordType;
(function (UserPasswordType) {
    UserPasswordType[UserPasswordType["PIN"] = 1] = "PIN";
    UserPasswordType[UserPasswordType["FINGERPRINT"] = 2] = "FINGERPRINT";
})(UserPasswordType = exports.UserPasswordType || (exports.UserPasswordType = {}));
var HB3DetectionTypes;
(function (HB3DetectionTypes) {
    HB3DetectionTypes[HB3DetectionTypes["HUMAN_DETECTION"] = 2] = "HUMAN_DETECTION";
    HB3DetectionTypes[HB3DetectionTypes["VEHICLE_DETECTION"] = 4] = "VEHICLE_DETECTION";
    HB3DetectionTypes[HB3DetectionTypes["PET_DETECTION"] = 8] = "PET_DETECTION";
    HB3DetectionTypes[HB3DetectionTypes["ALL_OTHER_MOTION"] = 32768] = "ALL_OTHER_MOTION";
    HB3DetectionTypes[HB3DetectionTypes["HUMAN_RECOGNITION"] = 131072] = "HUMAN_RECOGNITION";
})(HB3DetectionTypes = exports.HB3DetectionTypes || (exports.HB3DetectionTypes = {}));
var IndoorDetectionTypes;
(function (IndoorDetectionTypes) {
    IndoorDetectionTypes[IndoorDetectionTypes["PERSON_DETECTION"] = 1] = "PERSON_DETECTION";
    IndoorDetectionTypes[IndoorDetectionTypes["PET_DETECTION"] = 2] = "PET_DETECTION";
    IndoorDetectionTypes[IndoorDetectionTypes["ALL_MOTION"] = 4] = "ALL_MOTION";
})(IndoorDetectionTypes = exports.IndoorDetectionTypes || (exports.IndoorDetectionTypes = {}));
var IndoorMiniDetectionTypes;
(function (IndoorMiniDetectionTypes) {
    IndoorMiniDetectionTypes[IndoorMiniDetectionTypes["PERSON_DETECTION"] = 1] = "PERSON_DETECTION";
    IndoorMiniDetectionTypes[IndoorMiniDetectionTypes["ALL_MOTION"] = 4] = "ALL_MOTION";
})(IndoorMiniDetectionTypes = exports.IndoorMiniDetectionTypes || (exports.IndoorMiniDetectionTypes = {}));
var DeviceEvent;
(function (DeviceEvent) {
    DeviceEvent[DeviceEvent["MotionDetected"] = 0] = "MotionDetected";
    DeviceEvent[DeviceEvent["PersonDetected"] = 1] = "PersonDetected";
    DeviceEvent[DeviceEvent["PetDetected"] = 2] = "PetDetected";
    DeviceEvent[DeviceEvent["SoundDetected"] = 3] = "SoundDetected";
    DeviceEvent[DeviceEvent["CryingDetected"] = 4] = "CryingDetected";
    DeviceEvent[DeviceEvent["Ringing"] = 5] = "Ringing";
    DeviceEvent[DeviceEvent["PackageDelivered"] = 6] = "PackageDelivered";
    DeviceEvent[DeviceEvent["PackageTaken"] = 7] = "PackageTaken";
    DeviceEvent[DeviceEvent["PackageStranded"] = 8] = "PackageStranded";
    DeviceEvent[DeviceEvent["SomeoneLoitering"] = 9] = "SomeoneLoitering";
    DeviceEvent[DeviceEvent["RadarMotionDetected"] = 10] = "RadarMotionDetected";
    DeviceEvent[DeviceEvent["Jammed"] = 11] = "Jammed";
    DeviceEvent[DeviceEvent["Alarm911"] = 12] = "Alarm911";
    DeviceEvent[DeviceEvent["LowBattery"] = 13] = "LowBattery";
    DeviceEvent[DeviceEvent["LongTimeNotClose"] = 14] = "LongTimeNotClose";
    DeviceEvent[DeviceEvent["ShakeAlarm"] = 15] = "ShakeAlarm";
    DeviceEvent[DeviceEvent["WrontTryProtectAlarm"] = 16] = "WrontTryProtectAlarm";
    DeviceEvent[DeviceEvent["IdentityPersonDetected"] = 17] = "IdentityPersonDetected";
    DeviceEvent[DeviceEvent["StrangerPersonDetected"] = 18] = "StrangerPersonDetected";
    DeviceEvent[DeviceEvent["VehicleDetected"] = 19] = "VehicleDetected";
    DeviceEvent[DeviceEvent["DogDetected"] = 20] = "DogDetected";
    DeviceEvent[DeviceEvent["DogLickDetected"] = 21] = "DogLickDetected";
    DeviceEvent[DeviceEvent["DogPoopDetected"] = 22] = "DogPoopDetected";
})(DeviceEvent = exports.DeviceEvent || (exports.DeviceEvent = {}));
var PropertyName;
(function (PropertyName) {
    PropertyName["Name"] = "name";
    PropertyName["Model"] = "model";
    PropertyName["SerialNumber"] = "serialNumber";
    PropertyName["HardwareVersion"] = "hardwareVersion";
    PropertyName["SoftwareVersion"] = "softwareVersion";
    PropertyName["Type"] = "type";
    PropertyName["DeviceStationSN"] = "stationSerialNumber";
    PropertyName["DeviceBattery"] = "battery";
    PropertyName["DeviceBatteryTemp"] = "batteryTemperature";
    PropertyName["DeviceBatteryLow"] = "batteryLow";
    PropertyName["DeviceBatteryIsCharging"] = "batteryIsCharging";
    PropertyName["DeviceLastChargingDays"] = "lastChargingDays";
    PropertyName["DeviceLastChargingTotalEvents"] = "lastChargingTotalEvents";
    PropertyName["DeviceLastChargingRecordedEvents"] = "lastChargingRecordedEvents";
    PropertyName["DeviceLastChargingFalseEvents"] = "lastChargingFalseEvents";
    PropertyName["DeviceBatteryUsageLastWeek"] = "batteryUsageLastWeek";
    PropertyName["DeviceWifiRSSI"] = "wifiRssi";
    PropertyName["DeviceWifiSignalLevel"] = "wifiSignalLevel";
    PropertyName["DeviceEnabled"] = "enabled";
    PropertyName["DeviceAntitheftDetection"] = "antitheftDetection";
    PropertyName["DeviceAutoNightvision"] = "autoNightvision";
    PropertyName["DeviceNightvision"] = "nightvision";
    PropertyName["DeviceStatusLed"] = "statusLed";
    PropertyName["DeviceMotionDetection"] = "motionDetection";
    PropertyName["DeviceMotionDetectionType"] = "motionDetectionType";
    PropertyName["DeviceMotionDetectionSensitivity"] = "motionDetectionSensitivity";
    PropertyName["DeviceMotionZone"] = "motionZone";
    PropertyName["DeviceMotionDetectionRange"] = "motionDetectionRange";
    PropertyName["DeviceMotionDetectionRangeStandardSensitivity"] = "motionDetectionRangeStandardSensitivity";
    PropertyName["DeviceMotionDetectionRangeAdvancedLeftSensitivity"] = "motionDetectionRangeAdvancedLeftSensitivity";
    PropertyName["DeviceMotionDetectionRangeAdvancedMiddleSensitivity"] = "motionDetectionRangeAdvancedMiddleSensitivity";
    PropertyName["DeviceMotionDetectionRangeAdvancedRightSensitivity"] = "motionDetectionRangeAdvancedRightSensitivity";
    PropertyName["DeviceMotionDetectionTestMode"] = "motionDetectionTestMode";
    PropertyName["DeviceMotionDetectionTypeHuman"] = "motionDetectionTypeHuman";
    PropertyName["DeviceMotionDetectionTypeHumanRecognition"] = "motionDetectionTypeHumanRecognition";
    PropertyName["DeviceMotionDetectionTypePet"] = "motionDetectionTypePet";
    PropertyName["DeviceMotionDetectionTypeVehicle"] = "motionDetectionTypeVehicle";
    PropertyName["DeviceMotionDetectionTypeAllOtherMotions"] = "motionDetectionTypeAllOtherMotions";
    PropertyName["DeviceMotionDetected"] = "motionDetected";
    PropertyName["DeviceMotionTracking"] = "motionTracking";
    PropertyName["DeviceMotionTrackingSensitivity"] = "motionTrackingSensitivity";
    PropertyName["DeviceMotionAutoCruise"] = "motionAutoCruise";
    PropertyName["DeviceMotionOutOfViewDetection"] = "motionOutOfViewDetection";
    PropertyName["DevicePersonDetected"] = "personDetected";
    PropertyName["DevicePersonName"] = "personName";
    PropertyName["DeviceRTSPStream"] = "rtspStream";
    PropertyName["DeviceRTSPStreamUrl"] = "rtspStreamUrl";
    PropertyName["DeviceWatermark"] = "watermark";
    PropertyName["DevicePictureUrl"] = "pictureUrl";
    PropertyName["DeviceState"] = "state";
    PropertyName["DevicePetDetection"] = "petDetection";
    PropertyName["DevicePetDetected"] = "petDetected";
    PropertyName["DeviceSoundDetection"] = "soundDetection";
    PropertyName["DeviceSoundDetectionType"] = "soundDetectionType";
    PropertyName["DeviceSoundDetectionSensitivity"] = "soundDetectionSensitivity";
    PropertyName["DeviceSoundDetected"] = "soundDetected";
    PropertyName["DeviceCryingDetected"] = "cryingDetected";
    PropertyName["DeviceSensorOpen"] = "sensorOpen";
    PropertyName["DeviceSensorChangeTime"] = "sensorChangeTime";
    PropertyName["DeviceMotionSensorPIREvent"] = "motionSensorPirEvent";
    PropertyName["DeviceLocked"] = "locked";
    PropertyName["DeviceRinging"] = "ringing";
    PropertyName["DeviceLockStatus"] = "lockStatus";
    PropertyName["DeviceLight"] = "light";
    PropertyName["DeviceMicrophone"] = "microphone";
    PropertyName["DeviceSpeaker"] = "speaker";
    PropertyName["DeviceSpeakerVolume"] = "speakerVolume";
    PropertyName["DeviceRingtoneVolume"] = "ringtoneVolume";
    PropertyName["DeviceAudioRecording"] = "audioRecording";
    PropertyName["DevicePowerSource"] = "powerSource";
    PropertyName["DevicePowerWorkingMode"] = "powerWorkingMode";
    PropertyName["DeviceChargingStatus"] = "chargingStatus";
    PropertyName["DeviceRecordingEndClipMotionStops"] = "recordingEndClipMotionStops";
    PropertyName["DeviceRecordingClipLength"] = "recordingClipLength";
    PropertyName["DeviceRecordingRetriggerInterval"] = "recordingRetriggerInterval";
    PropertyName["DeviceVideoStreamingQuality"] = "videoStreamingQuality";
    PropertyName["DeviceVideoRecordingQuality"] = "videoRecordingQuality";
    PropertyName["DeviceVideoWDR"] = "videoWdr";
    PropertyName["DeviceLightSettingsEnable"] = "lightSettingsEnable";
    PropertyName["DeviceLightSettingsBrightnessManual"] = "lightSettingsBrightnessManual";
    PropertyName["DeviceLightSettingsColorTemperatureManual"] = "lightSettingsColorTemperatureManual";
    PropertyName["DeviceLightSettingsBrightnessMotion"] = "lightSettingsBrightnessMotion";
    PropertyName["DeviceLightSettingsColorTemperatureMotion"] = "lightSettingsColorTemperatureMotion";
    PropertyName["DeviceLightSettingsBrightnessSchedule"] = "lightSettingsBrightnessSchedule";
    PropertyName["DeviceLightSettingsColorTemperatureSchedule"] = "lightSettingsColorTemperatureSchedule";
    PropertyName["DeviceLightSettingsMotionTriggered"] = "lightSettingsMotionTriggered";
    PropertyName["DeviceLightSettingsMotionActivationMode"] = "lightSettingsMotionActivationMode";
    PropertyName["DeviceLightSettingsMotionTriggeredDistance"] = "lightSettingsMotionTriggeredDistance";
    PropertyName["DeviceLightSettingsMotionTriggeredTimer"] = "lightSettingsMotionTriggeredTimer";
    //DeviceLightSettingsSunsetToSunrise = "lightSettingsSunsetToSunrise",
    PropertyName["DeviceChimeIndoor"] = "chimeIndoor";
    PropertyName["DeviceChimeHomebase"] = "chimeHomebase";
    PropertyName["DeviceChimeHomebaseRingtoneVolume"] = "chimeHomebaseRingtoneVolume";
    PropertyName["DeviceChimeHomebaseRingtoneType"] = "chimeHomebaseRingtoneType";
    PropertyName["DeviceNotificationType"] = "notificationType";
    PropertyName["DeviceRotationSpeed"] = "rotationSpeed";
    PropertyName["DeviceImageMirrored"] = "imageMirrored";
    PropertyName["DeviceNotificationPerson"] = "notificationPerson";
    PropertyName["DeviceNotificationPet"] = "notificationPet";
    PropertyName["DeviceNotificationAllOtherMotion"] = "notificationAllOtherMotion";
    PropertyName["DeviceNotificationCrying"] = "notificationCrying";
    PropertyName["DeviceNotificationAllSound"] = "notificationAllSound";
    PropertyName["DeviceNotificationIntervalTime"] = "notificationIntervalTime";
    PropertyName["DeviceNotificationRing"] = "notificationRing";
    PropertyName["DeviceNotificationMotion"] = "notificationMotion";
    PropertyName["DeviceNotificationRadarDetector"] = "notificationRadarDetector";
    PropertyName["DeviceContinuousRecording"] = "continuousRecording";
    PropertyName["DeviceContinuousRecordingType"] = "continuousRecordingType";
    PropertyName["DeviceChirpVolume"] = "chirpVolume";
    PropertyName["DeviceChirpTone"] = "chirpTone";
    PropertyName["DeviceVideoHDR"] = "videoHdr";
    PropertyName["DeviceVideoDistortionCorrection"] = "videoDistortionCorrection";
    PropertyName["DeviceVideoRingRecord"] = "videoRingRecord";
    PropertyName["DeviceVideoNightvisionImageAdjustment"] = "videoNightvisionImageAdjustment";
    PropertyName["DeviceVideoColorNightvision"] = "videoColorNightvision";
    PropertyName["DeviceAutoCalibration"] = "autoCalibration";
    PropertyName["DeviceAutoLock"] = "autoLock";
    PropertyName["DeviceAutoLockTimer"] = "autoLockTimer";
    PropertyName["DeviceAutoLockSchedule"] = "autoLockSchedule";
    PropertyName["DeviceAutoLockScheduleStartTime"] = "autoLockScheduleStartTime";
    PropertyName["DeviceAutoLockScheduleEndTime"] = "autoLockScheduleEndTime";
    PropertyName["DeviceOneTouchLocking"] = "oneTouchLocking";
    PropertyName["DeviceWrongTryProtection"] = "wrongTryProtection";
    PropertyName["DeviceWrongTryAttempts"] = "wrongTryAttempts";
    PropertyName["DeviceWrongTryLockdownTime"] = "wrongTryLockdownTime";
    PropertyName["DeviceScramblePasscode"] = "scramblePasscode";
    PropertyName["DeviceSound"] = "sound";
    PropertyName["DeviceNotification"] = "notification";
    PropertyName["DeviceNotificationUnlocked"] = "notificationUnlocked";
    PropertyName["DeviceNotificationLocked"] = "notificationLocked";
    PropertyName["DeviceLoiteringDetection"] = "loiteringDetection";
    PropertyName["DeviceLoiteringDetectionRange"] = "loiteringDetectionRange";
    PropertyName["DeviceLoiteringDetectionLength"] = "loiteringDetectionLength";
    PropertyName["DeviceMotionDetectionSensitivityMode"] = "motionDetectionSensitivityMode";
    PropertyName["DeviceMotionDetectionSensitivityStandard"] = "motionDetectionSensitivityStandard";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedA"] = "motionDetectionSensitivityAdvancedA";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedB"] = "motionDetectionSensitivityAdvancedB";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedC"] = "motionDetectionSensitivityAdvancedC";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedD"] = "motionDetectionSensitivityAdvancedD";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedE"] = "motionDetectionSensitivityAdvancedE";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedF"] = "motionDetectionSensitivityAdvancedF";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedG"] = "motionDetectionSensitivityAdvancedG";
    PropertyName["DeviceMotionDetectionSensitivityAdvancedH"] = "motionDetectionSensitivityAdvancedH";
    PropertyName["DeviceLoiteringCustomResponsePhoneNotification"] = "loiteringCustomResponsePhoneNotification";
    PropertyName["DeviceLoiteringCustomResponseAutoVoiceResponse"] = "loiteringCustomResponseAutoVoiceResponse";
    PropertyName["DeviceLoiteringCustomResponseAutoVoiceResponseVoice"] = "loiteringCustomResponseAutoVoiceResponseVoice";
    PropertyName["DeviceLoiteringCustomResponseHomeBaseNotification"] = "loiteringCustomResponseHomeBaseNotification";
    PropertyName["DeviceLoiteringCustomResponseTimeFrom"] = "loiteringCustomResponseTimeFrom";
    PropertyName["DeviceLoiteringCustomResponseTimeTo"] = "loiteringCustomResponseTimeTo";
    PropertyName["DeviceDeliveryGuard"] = "deliveryGuard";
    PropertyName["DeviceDeliveryGuardPackageGuarding"] = "deliveryGuardPackageGuarding";
    PropertyName["DeviceDeliveryGuardPackageGuardingVoiceResponseVoice"] = "deliveryGuardPackageGuardingVoiceResponseVoice";
    PropertyName["DeviceDeliveryGuardPackageGuardingActivatedTimeFrom"] = "deliveryGuardPackageGuardingActivatedTimeFrom";
    PropertyName["DeviceDeliveryGuardPackageGuardingActivatedTimeTo"] = "deliveryGuardPackageGuardingActivatedTimeTo";
    PropertyName["DeviceDeliveryGuardUncollectedPackageAlert"] = "deliveryGuardUncollectedPackageAlert";
    PropertyName["DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck"] = "deliveryGuardUncollectedPackageAlertTimeToCheck";
    PropertyName["DeviceDeliveryGuardPackageLiveCheckAssistance"] = "deliveryGuardPackageLiveCheckAssistance";
    PropertyName["DeviceDualCamWatchViewMode"] = "dualCamWatchViewMode";
    PropertyName["DeviceRingAutoResponse"] = "ringAutoResponse";
    PropertyName["DeviceRingAutoResponseVoiceResponse"] = "ringAutoResponseVoiceResponse";
    PropertyName["DeviceRingAutoResponseVoiceResponseVoice"] = "ringAutoResponseVoiceResponseVoice";
    PropertyName["DeviceRingAutoResponseTimeFrom"] = "ringAutoResponseTimeFrom";
    PropertyName["DeviceRingAutoResponseTimeTo"] = "ringAutoResponseTimeTo";
    PropertyName["DeviceDefaultAngle"] = "defaultAngle";
    PropertyName["DeviceDefaultAngleIdleTime"] = "defaultAngleIdleTime";
    PropertyName["DeviceSoundDetectionRoundLook"] = "soundDetectionRoundLook";
    PropertyName["DevicePackageDelivered"] = "packageDelivered";
    PropertyName["DevicePackageStranded"] = "packageStranded";
    PropertyName["DevicePackageTaken"] = "packageTaken";
    PropertyName["DeviceSomeoneLoitering"] = "someoneLoitering";
    PropertyName["DeviceRadarMotionDetected"] = "radarMotionDetected";
    PropertyName["DeviceLeftOpenAlarm"] = "leftOpenAlarm";
    PropertyName["DeviceLeftOpenAlarmDuration"] = "leftOpenAlarmDuration";
    PropertyName["DeviceDualUnlock"] = "dualUnlock";
    PropertyName["DevicePowerSave"] = "powerSave";
    PropertyName["DeviceInteriorBrightness"] = "interiorBrightness";
    PropertyName["DeviceInteriorBrightnessDuration"] = "interiorBrightnessDuration";
    PropertyName["DeviceTamperAlarm"] = "tamperAlarm";
    PropertyName["DeviceRemoteUnlock"] = "remoteUnlock";
    PropertyName["DeviceRemoteUnlockMasterPIN"] = "remoteUnlockMasterPIN";
    PropertyName["DeviceAlarmVolume"] = "alarmVolume";
    PropertyName["DevicePromptVolume"] = "promptVolume";
    PropertyName["DeviceNotificationUnlockByKey"] = "notificationUnlockByKey";
    PropertyName["DeviceNotificationUnlockByPIN"] = "notificationUnlockByPIN";
    PropertyName["DeviceNotificationUnlockByFingerprint"] = "notificationUnlockByFingerprint";
    PropertyName["DeviceNotificationUnlockByApp"] = "notificationUnlockByApp";
    PropertyName["DeviceNotificationDualUnlock"] = "notificationDualUnlock";
    PropertyName["DeviceNotificationDualLock"] = "notificationDualLock";
    PropertyName["DeviceNotificationWrongTryProtect"] = "notificationWrongTryProtect";
    PropertyName["DeviceNotificationJammed"] = "notificationJammed";
    PropertyName["DeviceJammedAlert"] = "jammedAlert";
    PropertyName["Device911Alert"] = "911Alert";
    PropertyName["Device911AlertEvent"] = "911AlertEvent";
    PropertyName["DeviceShakeAlert"] = "shakeAlert";
    PropertyName["DeviceShakeAlertEvent"] = "shakeAlertEvent";
    PropertyName["DeviceLowBatteryAlert"] = "lowBatteryAlert";
    PropertyName["DeviceLongTimeNotCloseAlert"] = "longTimeNotCloseAlert";
    PropertyName["DeviceWrongTryProtectAlert"] = "wrongTryProtectAlert";
    PropertyName["DeviceVideoTypeStoreToNAS"] = "videoTypeStoreToNAS";
    PropertyName["DeviceSnooze"] = "snooze";
    PropertyName["DeviceSnoozeTime"] = "snoozeTime";
    PropertyName["DeviceSnoozeStartTime"] = "snoozeStartTime";
    PropertyName["DeviceSnoozeHomebase"] = "snoozeHomebase";
    PropertyName["DeviceSnoozeMotion"] = "snoozeMotion";
    PropertyName["DeviceSnoozeChime"] = "snoozeStartChime";
    PropertyName["DeviceIdentityPersonDetected"] = "identityPersonDetected";
    PropertyName["DeviceStrangerPersonDetected"] = "strangerPersonDetected";
    PropertyName["DeviceVehicleDetected"] = "vehicleDetected";
    PropertyName["DeviceDogDetected"] = "dogDetected";
    PropertyName["DeviceDogLickDetected"] = "dogLickDetected";
    PropertyName["DeviceDogPoopDetected"] = "dogPoopDetected";
    PropertyName["DeviceDetectionStatisticsWorkingDays"] = "detectionStatisticsWorkingDays";
    PropertyName["DeviceDetectionStatisticsDetectedEvents"] = "detectionStatisticsDetectedEvents";
    PropertyName["DeviceDetectionStatisticsRecordedEvents"] = "detectionStatisticsRecordedEvents";
    PropertyName["DeviceCellularRSSI"] = "cellularRSSI";
    PropertyName["DeviceCellularSignalLevel"] = "cellularSignalLevel";
    PropertyName["DeviceCellularSignal"] = "cellularSignal";
    PropertyName["DeviceCellularBand"] = "cellularBand";
    PropertyName["DeviceCellularIMEI"] = "cellularIMEI";
    PropertyName["DeviceCellularICCID"] = "cellularICCID";
    PropertyName["DeviceHiddenMotionDetectionSensitivity"] = "hidden-motionDetectionSensitivity";
    PropertyName["DeviceHiddenMotionDetectionMode"] = "hidden-motionDetectionMode";
    PropertyName["StationLANIpAddress"] = "lanIpAddress";
    PropertyName["StationMacAddress"] = "macAddress";
    PropertyName["StationGuardMode"] = "guardMode";
    PropertyName["StationCurrentMode"] = "currentMode";
    PropertyName["StationTimeFormat"] = "timeFormat";
    //StationTimezone = "timezone", //Supported also by T8520
    PropertyName["StationAlarmVolume"] = "alarmVolume";
    PropertyName["StationAlarmTone"] = "alarmTone";
    PropertyName["StationPromptVolume"] = "promptVolume";
    PropertyName["StationNotificationSwitchModeSchedule"] = "notificationSwitchModeSchedule";
    PropertyName["StationNotificationSwitchModeGeofence"] = "notificationSwitchModeGeofence";
    PropertyName["StationNotificationSwitchModeApp"] = "notificationSwitchModeApp";
    PropertyName["StationNotificationSwitchModeKeypad"] = "notificationSwitchModeKeypad";
    PropertyName["StationNotificationStartAlarmDelay"] = "notificationStartAlarmDelay";
    PropertyName["StationSwitchModeWithAccessCode"] = "switchModeWithAccessCode";
    PropertyName["StationAutoEndAlarm"] = "autoEndAlarm";
    PropertyName["StationTurnOffAlarmWithButton"] = "turnOffAlarmWithButton";
    PropertyName["StationHomeSecuritySettings"] = "stationHomeSecuritySettings";
    PropertyName["StationAwaySecuritySettings"] = "stationAwaySecuritySettings";
    PropertyName["StationCustom1SecuritySettings"] = "stationCustom1SecuritySettings";
    PropertyName["StationCustom2SecuritySettings"] = "stationCustom2SecuritySettings";
    PropertyName["StationCustom3SecuritySettings"] = "stationCustom3SecuritySettings";
    PropertyName["StationOffSecuritySettings"] = "stationOffSecuritySettings";
    PropertyName["StationAlarm"] = "alarm";
    PropertyName["StationAlarmType"] = "alarmType";
    PropertyName["StationAlarmArmed"] = "alarmArmed";
    PropertyName["StationAlarmArmDelay"] = "alarmArmDelay";
    PropertyName["StationAlarmDelay"] = "alarmDelay";
    PropertyName["StationAlarmDelayType"] = "alarmDelayType";
})(PropertyName = exports.PropertyName || (exports.PropertyName = {}));
exports.DeviceNameProperty = {
    key: "device_name",
    name: PropertyName.Name,
    label: "Name",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DeviceModelProperty = {
    key: "device_model",
    name: PropertyName.Model,
    label: "Model",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DeviceSerialNumberProperty = {
    key: "device_sn",
    name: PropertyName.SerialNumber,
    label: "Serial number",
    readable: true,
    writeable: false,
    type: "string",
};
exports.GenericHWVersionProperty = {
    key: "main_hw_version",
    name: PropertyName.HardwareVersion,
    label: "Hardware version",
    readable: true,
    writeable: false,
    type: "string",
};
exports.GenericSWVersionProperty = {
    key: "main_sw_version",
    name: PropertyName.SoftwareVersion,
    label: "Software version",
    readable: true,
    writeable: false,
    type: "string",
};
exports.GenericTypeProperty = {
    key: "device_type",
    name: PropertyName.Type,
    label: "Type",
    readable: true,
    writeable: false,
    type: "number",
    states: {
        0: "Station",
        1: "Camera",
        2: "Sensor",
        3: "Floodlight",
        4: "Camera E",
        5: "Doorbell",
        7: "Battery Doorbell",
        8: "Camera 2",
        9: "Camera 2c",
        10: "Motion Sensor",
        11: "Keypad",
        14: "Camera 2 Pro",
        15: "Camera 2c Pro",
        16: "Battery Doorbell 2",
        30: "Indoor Camera",
        31: "Indoor Camera PT",
        32: "Solo Camera",
        33: "Solo Camera Pro",
        34: "Indoor Camera 1080",
        35: "Indoor Camera PT 1080",
        37: "Floodlight 8422",
        38: "Floodlight 8423",
        39: "Floodlight 2",
        44: "Outdoor Camera 1080P No Light",
        45: "Outdoor Camera 2k",
        46: "Outdoor Camera 1080P",
        50: "Lock Basic",
        51: "Lock Advanced",
        52: "Lock Basic No Finger",
        53: "Lock Basic Advanced No Finger",
        54: "Lock 8503",
        55: "Lock 8530",
        56: "Lock 85A3",
        57: "Lock 8592",
        58: "Lock 8504",
        60: "Solo Camera Spotlight 1080p",
        61: "Solo Camera Spotlight 2k",
        62: "Solo Camera Spotlight Solar",
        90: "SmartDrop, Smart Delivery Box",
        91: "Video Doorbell Dual",
        93: "Video Doorbell Dual (Wired)",
    },
};
exports.BaseDeviceProperties = {
    [exports.DeviceNameProperty.name]: exports.DeviceNameProperty,
    [exports.DeviceModelProperty.name]: exports.DeviceModelProperty,
    [exports.DeviceSerialNumberProperty.name]: exports.DeviceSerialNumberProperty,
    [exports.GenericTypeProperty.name]: exports.GenericTypeProperty,
    [exports.GenericHWVersionProperty.name]: exports.GenericHWVersionProperty,
    [exports.GenericSWVersionProperty.name]: exports.GenericSWVersionProperty,
};
exports.GenericDeviceProperties = {
    ...exports.BaseDeviceProperties,
    [PropertyName.DeviceStationSN]: {
        key: "station_sn",
        name: PropertyName.DeviceStationSN,
        label: "Station serial number",
        readable: true,
        writeable: false,
        type: "string",
    },
};
exports.DeviceBatteryProperty = {
    key: types_1.CommandType.CMD_GET_BATTERY,
    name: PropertyName.DeviceBattery,
    label: "Battery percentage",
    readable: true,
    writeable: false,
    type: "number",
    unit: "%",
    min: 0,
    max: 100,
};
exports.DeviceBatteryLockProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_QUERY_BATTERY_LEVEL,
    name: PropertyName.DeviceBattery,
    label: "Battery percentage",
    readable: true,
    writeable: false,
    type: "number",
    unit: "%",
    min: 0,
    max: 100,
};
exports.DeviceBatteryLowMotionSensorProperty = {
    key: types_1.CommandType.CMD_MOTION_SENSOR_BAT_STATE,
    name: PropertyName.DeviceBatteryLow,
    label: "Battery low",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceBatteryLowKeypadProperty = {
    ...exports.DeviceBatteryLowMotionSensorProperty,
    key: types_1.CommandType.CMD_KEYPAD_BATTERY_CAP_STATE,
};
exports.DeviceBatteryLowSensorProperty = {
    ...exports.DeviceBatteryLowMotionSensorProperty,
    key: types_1.CommandType.CMD_ENTRY_SENSOR_BAT_STATE,
};
exports.DeviceBatteryTempProperty = {
    key: types_1.CommandType.CMD_GET_BATTERY_TEMP,
    name: PropertyName.DeviceBatteryTemp,
    label: "Battery Temperature",
    readable: true,
    writeable: false,
    type: "number",
    unit: "°C",
};
exports.DeviceBatteryIsChargingKeypadProperty = {
    key: types_1.CommandType.CMD_KEYPAD_BATTERY_CHARGER_STATE,
    name: PropertyName.DeviceBatteryIsCharging,
    label: "Battery is charging",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceAntitheftDetectionProperty = {
    key: types_1.CommandType.CMD_EAS_SWITCH,
    name: PropertyName.DeviceAntitheftDetection,
    label: "Antitheft Detection",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAutoNightvisionProperty = {
    key: types_1.CommandType.CMD_IRCUT_SWITCH,
    name: PropertyName.DeviceAutoNightvision,
    label: "Auto Nightvision",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAutoNightvisionWiredDoorbellProperty = {
    ...exports.DeviceAutoNightvisionProperty,
    key: ParamType.NIGHT_VISUAL,
};
exports.DeviceNightvisionProperty = {
    key: types_1.CommandType.CMD_SET_NIGHT_VISION_TYPE,
    name: PropertyName.DeviceNightvision,
    label: "Nightvision",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Off",
        1: "B&W Night Vision",
        2: "Color Night Vision",
    },
};
exports.DeviceWifiRSSIProperty = {
    key: types_1.CommandType.CMD_GET_WIFI_RSSI,
    name: PropertyName.DeviceWifiRSSI,
    label: "Wifi RSSI",
    readable: true,
    writeable: false,
    type: "number",
    unit: "dBm",
};
exports.DeviceWifiSignalLevelProperty = {
    key: "custom_wifiSignalLevel",
    name: PropertyName.DeviceWifiSignalLevel,
    label: "Wifi Signal Level",
    readable: true,
    writeable: false,
    type: "number",
    min: 0,
    max: 4,
    states: {
        0: "No signal",
        1: "Weak",
        2: "Normal",
        3: "Strong",
        4: "Full",
    },
};
exports.DeviceCellularRSSIProperty = {
    key: types_1.CommandType.CELLULAR_SIGNAL_STRENGTH,
    name: PropertyName.DeviceCellularRSSI,
    label: "Cellular RSSI",
    readable: true,
    writeable: false,
    type: "number",
    unit: "dBm",
};
exports.DeviceCellularSignalLevelProperty = {
    key: "custom_cellularSignalLevel",
    name: PropertyName.DeviceCellularSignalLevel,
    label: "Cellular Signal Level",
    readable: true,
    writeable: false,
    type: "number",
    min: 1,
    max: 4,
    states: {
        1: "Weak",
        2: "Normal",
        3: "Strong",
        4: "Full",
    },
};
exports.DeviceCellularSignalProperty = {
    key: types_1.CommandType.CELLULAR_INFO,
    name: PropertyName.DeviceCellularSignal,
    label: "Cellular Signal",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DeviceCellularBandProperty = {
    key: types_1.CommandType.CELLULAR_INFO,
    name: PropertyName.DeviceCellularBand,
    label: "Cellular Band",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DeviceCellularIMEIProperty = {
    key: types_1.CommandType.CELLULAR_INFO,
    name: PropertyName.DeviceCellularIMEI,
    label: "Cellular IMEI",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DeviceCellularICCIDProperty = {
    key: types_1.CommandType.CELLULAR_INFO,
    name: PropertyName.DeviceCellularICCID,
    label: "Cellular ICCID",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DeviceWifiRSSILockProperty = {
    ...exports.DeviceWifiRSSIProperty,
    key: types_1.CommandType.CMD_GET_SUB1G_RSSI,
};
exports.DeviceWifiRSSIEntrySensorProperty = {
    ...exports.DeviceWifiRSSIProperty,
    key: types_1.CommandType.CMD_GET_SUB1G_RSSI,
};
exports.DeviceWifiRSSIKeypadProperty = {
    ...exports.DeviceWifiRSSIProperty,
    key: types_1.CommandType.CMD_GET_SUB1G_RSSI,
};
exports.DeviceWifiRSSISmartSafeProperty = {
    ...exports.DeviceWifiRSSIProperty,
    key: types_1.CommandType.CMD_SMARTSAFE_RSSI,
};
exports.DeviceEnabledProperty = {
    key: ParamType.PRIVATE_MODE,
    name: PropertyName.DeviceEnabled,
    label: "Camera enabled",
    readable: true,
    writeable: true,
    type: "boolean",
    commandId: types_1.CommandType.CMD_DEVS_SWITCH,
};
exports.DeviceEnabledStandaloneProperty = {
    ...exports.DeviceEnabledProperty,
    key: ParamType.OPEN_DEVICE,
    commandId: types_1.CommandType.CMD_DEVS_SWITCH,
};
exports.DeviceEnabledSoloProperty = {
    ...exports.DeviceEnabledProperty,
    key: types_1.CommandType.CMD_DEVS_SWITCH,
};
exports.DeviceStatusLedProperty = {
    key: types_1.CommandType.CMD_DEV_LED_SWITCH,
    name: PropertyName.DeviceStatusLed,
    label: "Status LED",
    readable: true,
    writeable: true,
    type: "boolean",
    commandId: types_1.CommandType.CMD_INDOOR_LED_SWITCH,
};
exports.DeviceStatusLedIndoorFloodProperty = {
    ...exports.DeviceStatusLedProperty,
    key: types_1.CommandType.CMD_INDOOR_LED_SWITCH,
};
exports.DeviceStatusLedBatteryDoorbellProperty = {
    ...exports.DeviceStatusLedProperty,
    key: types_1.CommandType.CMD_BAT_DOORBELL_SET_LED_ENABLE,
};
exports.DeviceStatusLedDoorbellProperty = {
    ...exports.DeviceStatusLedProperty,
    key: ParamType.DOORBELL_LED_NIGHT_MODE,
    commandId: ParamType.COMMAND_LED_NIGHT_OPEN,
};
exports.DeviceStatusLedT8200XProperty = {
    ...exports.DeviceStatusLedProperty,
    key: ParamType.COMMAND_LED_NIGHT_OPEN,
    commandId: ParamType.COMMAND_LED_NIGHT_OPEN,
};
exports.DeviceMotionDetectionProperty = {
    key: types_1.CommandType.CMD_PIR_SWITCH,
    name: PropertyName.DeviceMotionDetection,
    label: "Motion Detection",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionDetectionIndoorSoloFloodProperty = {
    ...exports.DeviceMotionDetectionProperty,
    key: types_1.CommandType.CMD_INDOOR_DET_SET_MOTION_DETECT_ENABLE,
};
exports.DeviceMotionDetectionDoorbellProperty = {
    ...exports.DeviceMotionDetectionProperty,
    key: ParamType.DETECT_SWITCH,
    commandId: ParamType.COMMAND_MOTION_DETECTION_PACKAGE,
};
exports.DeviceSoundDetectionProperty = {
    key: types_1.CommandType.CMD_INDOOR_DET_SET_SOUND_DETECT_ENABLE,
    name: PropertyName.DeviceSoundDetection,
    label: "Sound Detection",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DevicePetDetectionProperty = {
    key: types_1.CommandType.CMD_INDOOR_DET_SET_PET_ENABLE,
    name: PropertyName.DevicePetDetection,
    label: "Pet Detection",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceRTSPStreamProperty = {
    key: types_1.CommandType.CMD_NAS_SWITCH,
    name: PropertyName.DeviceRTSPStream,
    label: "RTSP Stream",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceRTSPStreamUrlProperty = {
    key: "custom_rtspStreamUrl",
    name: PropertyName.DeviceRTSPStreamUrl,
    label: "RTSP Stream URL",
    readable: true,
    writeable: false,
    type: "string",
    default: "",
};
exports.DeviceWatermarkProperty = {
    key: types_1.CommandType.CMD_SET_DEVS_OSD,
    name: PropertyName.DeviceWatermark,
    label: "Watermark",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Off",
        1: "Timestamp",
        2: "Timestamp and Logo",
    },
};
exports.DeviceWatermarkIndoorFloodProperty = {
    ...exports.DeviceWatermarkProperty,
    states: {
        0: "Timestamp",
        1: "Timestamp and Logo",
        2: "Off",
    },
};
exports.DeviceWatermarkSoloWiredDoorbellProperty = {
    ...exports.DeviceWatermarkProperty,
    states: {
        0: "Off",
        1: "On",
    },
};
exports.DeviceWatermarkBatteryDoorbellCamera1Property = {
    ...exports.DeviceWatermarkProperty,
    states: {
        1: "Off",
        2: "On",
    },
};
exports.DeviceStateProperty = {
    key: types_1.CommandType.CMD_GET_DEV_STATUS,
    name: PropertyName.DeviceState,
    label: "State",
    readable: true,
    writeable: false,
    type: "number",
    states: {
        0: "Offline",
        1: "Online",
        2: "Manually disabled",
        3: "Offline low battery",
        4: "Remove and readd",
        5: "Reset and readd",
    }
};
exports.DeviceStateLockProperty = {
    ...exports.DeviceStateProperty,
    key: types_1.CommandType.CMD_GET_DEV_STATUS,
};
exports.DeviceLastChargingDaysProperty = {
    key: "charging_days",
    name: PropertyName.DeviceLastChargingDays,
    label: "Days since last charging",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.DeviceLastChargingTotalEventsProperty = {
    key: "charing_total",
    name: PropertyName.DeviceLastChargingTotalEvents,
    label: "Total Events since last charging",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.DeviceLastChargingRecordedEventsProperty = {
    key: "charging_reserve",
    name: PropertyName.DeviceLastChargingRecordedEvents,
    label: "Total Recorded Events since last charging",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.DeviceLastChargingFalseEventsProperty = {
    key: "charging_missing",
    name: PropertyName.DeviceLastChargingFalseEvents,
    label: "False Events since last charging",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.DeviceBatteryUsageLastWeekProperty = {
    key: "battery_usage_last_week",
    name: PropertyName.DeviceBatteryUsageLastWeek,
    label: "Battery usage last week",
    readable: true,
    writeable: false,
    type: "number",
    unit: "%",
    min: 0,
    max: 100,
    default: 0,
};
exports.DeviceLockedProperty = {
    key: "custom_locked",
    name: PropertyName.DeviceLocked,
    label: "locked",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceLockedSmartSafeProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_LOCK_STATUS,
    name: PropertyName.DeviceLocked,
    label: "locked",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceMotionDetectedProperty = {
    key: "custom_motionDetected",
    name: PropertyName.DeviceMotionDetected,
    label: "Motion detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DevicePersonDetectedProperty = {
    key: "custom_personDetected",
    name: PropertyName.DevicePersonDetected,
    label: "Person detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DevicePetDetectedProperty = {
    key: "custom_petDetected",
    name: PropertyName.DevicePetDetected,
    label: "Pet detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceSoundDetectedProperty = {
    key: "custom_soundDetected",
    name: PropertyName.DeviceSoundDetected,
    label: "Sound detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceCryingDetectedProperty = {
    key: "custom_cryingDetected",
    name: PropertyName.DeviceCryingDetected,
    label: "Crying detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceRingingProperty = {
    key: "custom_ringing",
    name: PropertyName.DeviceRinging,
    label: "Ringing",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceSensorOpenProperty = {
    key: types_1.CommandType.CMD_ENTRY_SENSOR_STATUS,
    name: PropertyName.DeviceSensorOpen,
    label: "Sensor open",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceSensorChangeTimeProperty = {
    key: types_1.CommandType.CMD_ENTRY_SENSOR_CHANGE_TIME,
    name: PropertyName.DeviceSensorChangeTime,
    label: "Sensor change time",
    readable: true,
    writeable: false,
    type: "number",
};
exports.DeviceMotionSensorPIREventProperty = {
    key: types_1.CommandType.CMD_MOTION_SENSOR_PIR_EVT,
    name: PropertyName.DeviceMotionSensorPIREvent,
    label: "Motion sensor PIR event",
    readable: true,
    writeable: false,
    type: "number",
    //TODO: Define states
};
exports.DeviceBasicLockStatusProperty = {
    key: types_1.CommandType.CMD_DOORLOCK_GET_STATE,
    name: PropertyName.DeviceLockStatus,
    label: "Lock status",
    readable: true,
    writeable: false,
    type: "number",
    states: {
        1: "1",
        2: "2",
        3: "Unlocked",
        4: "Locked",
        5: "Mechanical anomaly",
        6: "6",
        7: "7",
    }
};
exports.DeviceAdvancedLockStatusProperty = {
    ...exports.DeviceBasicLockStatusProperty,
    key: types_1.CommandType.CMD_SMARTLOCK_QUERY_STATUS,
};
exports.DevicePictureUrlProperty = {
    key: "cover_path",
    name: PropertyName.DevicePictureUrl,
    label: "Last Camera Picture URL",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DeviceMotionHB3DetectionTypeHumanProperty = {
    key: types_1.CommandType.CMD_SET_MOTION_DETECTION_TYPE_HB3,
    name: PropertyName.DeviceMotionDetectionTypeHuman,
    label: "Motion Detection Type Human",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionHB3DetectionTypeHumanRecognitionProperty = {
    key: types_1.CommandType.CMD_SET_MOTION_DETECTION_TYPE_HB3,
    name: PropertyName.DeviceMotionDetectionTypeHumanRecognition,
    label: "Motion Detection Type Human Recognition",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionHB3DetectionTypePetProperty = {
    key: types_1.CommandType.CMD_SET_MOTION_DETECTION_TYPE_HB3,
    name: PropertyName.DeviceMotionDetectionTypePet,
    label: "Motion Detection Type Pet",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionHB3DetectionTypeVehicleProperty = {
    key: types_1.CommandType.CMD_SET_MOTION_DETECTION_TYPE_HB3,
    name: PropertyName.DeviceMotionDetectionTypeVehicle,
    label: "Motion Detection Type Vehicle",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionHB3DetectionTypeAllOhterMotionsProperty = {
    key: types_1.CommandType.CMD_SET_MOTION_DETECTION_TYPE_HB3,
    name: PropertyName.DeviceMotionDetectionTypeAllOtherMotions,
    label: "Motion Detection Type All Other Motions",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionDetectionTypeProperty = {
    key: types_1.CommandType.CMD_DEV_PUSHMSG_MODE,
    name: PropertyName.DeviceMotionDetectionType,
    label: "Motion Detection Type",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Humans only",
        2: "All motions",
    },
};
exports.DeviceMotionDetectionTypeT8200XProperty = {
    ...exports.DeviceMotionDetectionTypeProperty,
    key: types_1.CommandType.CMD_SET_DETECT_TYPE,
};
exports.DeviceMotionDetectionCamera1Property = {
    ...exports.DeviceMotionDetectionTypeProperty,
    states: {
        0: "Person Alerts",
        1: "Facial Alerts",
        2: "All Alerts",
    },
};
exports.DeviceMotionDetectionTypeFloodlightT8423Property = {
    ...exports.DeviceMotionDetectionTypeProperty,
    states: {
        2: "All motions",
        6: "Humans only",
    },
};
exports.DeviceMotionDetectionTypeFloodlightProperty = {
    ...exports.DeviceMotionDetectionTypeProperty,
    key: types_1.CommandType.CMD_INDOOR_DET_SET_MOTION_DETECT_TYPE,
    states: {
        1: "Humans only",
        5: "All motions",
    },
};
exports.DeviceMotionDetectionTypeIndoorProperty = {
    ...exports.DeviceMotionDetectionTypeProperty,
    key: types_1.CommandType.CMD_INDOOR_DET_SET_MOTION_DETECT_TYPE,
    states: {
        1: "Person",
        2: "Pet",
        3: "Person and Pet",
        4: "All other motions",
        5: "Person and all other motions",
        6: "Pet and all other motions",
        7: "Person, Pet and all other motions",
    },
};
exports.DeviceMotionDetectionTypeIndoorMiniProperty = {
    ...exports.DeviceMotionDetectionTypeIndoorProperty,
    states: {
        1: "Person",
        4: "All other motions",
        5: "Person and all other motions",
    },
};
exports.DeviceMotionDetectionSensitivityCamera2Property = {
    key: types_1.CommandType.CMD_SET_PIRSENSITIVITY,
    name: PropertyName.DeviceMotionDetectionSensitivity,
    label: "Motion Detection Sensitivity",
    readable: true,
    writeable: true,
    type: "number",
    min: 1,
    max: 7,
};
exports.DeviceMotionDetectionSensitivityCamera1Property = {
    ...exports.DeviceMotionDetectionSensitivityCamera2Property,
    min: 1,
    max: 100,
    steps: 1,
};
exports.DeviceMotionDetectionSensitivityIndoorProperty = {
    ...exports.DeviceMotionDetectionSensitivityCamera2Property,
    key: types_1.CommandType.CMD_INDOOR_DET_SET_MOTION_SENSITIVITY_IDX,
    min: 1,
    max: 5,
};
exports.DeviceMotionDetectionSensitivityBatteryDoorbellProperty = {
    ...exports.DeviceMotionDetectionSensitivityCamera2Property,
    key: types_1.CommandType.CMD_SET_MOTION_SENSITIVITY,
    min: 1,
    max: 5,
};
exports.DeviceMotionDetectionSensitivityWiredDoorbellProperty = {
    ...exports.DeviceMotionDetectionSensitivityCamera2Property,
    key: "custom_motionDetectionSensitivity",
    min: 1,
    max: 5,
};
exports.DeviceMotionDetectionSensitivitySoloProperty = {
    ...exports.DeviceMotionDetectionSensitivityCamera2Property,
    key: types_1.CommandType.CMD_SET_PIR_SENSITIVITY,
};
exports.DeviceMotionDetectionSensitivityFloodlightT8420Property = {
    ...exports.DeviceMotionDetectionSensitivityCamera2Property,
    key: types_1.CommandType.CMD_SET_MDSENSITIVITY,
    min: 1,
    max: 5,
};
exports.DeviceHiddenMotionDetectionSensitivityWiredDoorbellProperty = {
    key: ParamType.DETECT_MOTION_SENSITIVE,
    name: PropertyName.DeviceHiddenMotionDetectionSensitivity,
    label: "HIDDEN Motion Detection Sensitivity",
    readable: true,
    writeable: false,
    type: "number",
    min: 1,
    max: 3,
};
exports.DeviceHiddenMotionDetectionModeWiredDoorbellProperty = {
    key: ParamType.DETECT_MODE,
    name: PropertyName.DeviceHiddenMotionDetectionMode,
    label: "HIDDEN Motion Detection Mode",
    readable: true,
    writeable: false,
    type: "number",
    min: 1,
    max: 3,
};
exports.DeviceMotionZoneProperty = {
    key: types_1.CommandType.CMD_INDOOR_DET_SET_ACTIVE_ZONE,
    name: PropertyName.DeviceMotionZone,
    label: "Motion Detection Zone",
    readable: true,
    writeable: true,
    type: "string",
};
exports.DeviceFloodlightLightProperty = {
    key: types_1.CommandType.CMD_SET_FLOODLIGHT_MANUAL_SWITCH,
    name: PropertyName.DeviceLight,
    label: "Light",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceFloodlightLightSettingsEnableProperty = {
    key: types_1.CommandType.CMD_SET_FLOODLIGHT_TOTAL_SWITCH,
    name: PropertyName.DeviceLightSettingsEnable,
    label: "Light Enable",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceFloodlightLightSettingsBrightnessManualProperty = {
    key: types_1.CommandType.CMD_SET_FLOODLIGHT_BRIGHT_VALUE,
    name: PropertyName.DeviceLightSettingsBrightnessManual,
    label: "Light Brightness Manual",
    readable: true,
    writeable: true,
    type: "number",
    min: 0,
    max: 100,
};
exports.DeviceLightSettingsBrightnessManualCamera3Property = {
    ...exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
    states: {
        40: "Low",
        70: "Medium",
        100: "High",
    },
};
exports.DeviceCameraLightSettingsBrightnessManualProperty = {
    ...exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
    min: 40,
    default: 100,
};
exports.DeviceFloodlightLightSettingsBrightnessMotionProperty = {
    key: types_1.CommandType.CMD_SET_LIGHT_CTRL_BRIGHT_PIR,
    name: PropertyName.DeviceLightSettingsBrightnessMotion,
    label: "Light Brightness Motion",
    readable: true,
    writeable: true,
    type: "number",
    min: 0,
    max: 100,
};
exports.DeviceFloodlightLightSettingsBrightnessScheduleProperty = {
    key: types_1.CommandType.CMD_SET_LIGHT_CTRL_BRIGHT_SCH,
    name: PropertyName.DeviceLightSettingsBrightnessSchedule,
    label: "Light Brightness Schedule",
    readable: true,
    writeable: true,
    type: "number",
    min: 0,
    max: 100,
};
exports.DeviceFloodlightLightSettingsMotionTriggeredProperty = {
    key: types_1.CommandType.CMD_SET_LIGHT_CTRL_PIR_SWITCH,
    name: PropertyName.DeviceLightSettingsMotionTriggered,
    label: "Light Motion Triggered Enable",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceFloodlightLightSettingsMotionTriggeredDistanceProperty = {
    key: types_1.CommandType.CMD_SET_PIRSENSITIVITY,
    name: PropertyName.DeviceLightSettingsMotionTriggeredDistance,
    label: "Light Motion Triggered Distance",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "Min",
        2: "Low",
        3: "Medium",
        4: "High",
        5: "Max",
    },
};
exports.DeviceFloodlightLightSettingsMotionTriggeredTimerProperty = {
    key: types_1.CommandType.CMD_SET_LIGHT_CTRL_PIR_TIME,
    name: PropertyName.DeviceLightSettingsMotionTriggeredTimer,
    label: "Light Motion Triggered Timer",
    readable: true,
    writeable: true,
    type: "number",
    unit: "sec",
    states: {
        30: "30 sec.",
        60: "1 min.",
        180: "3 min.",
        300: "5 min.",
        900: "15 min.",
    },
};
exports.DeviceMicrophoneProperty = {
    key: types_1.CommandType.CMD_SET_DEV_MIC_MUTE,
    name: PropertyName.DeviceMicrophone,
    label: "Microphone",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceSpeakerProperty = {
    key: types_1.CommandType.CMD_SET_DEV_SPEAKER_MUTE,
    name: PropertyName.DeviceSpeaker,
    label: "Speaker",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAudioRecordingProperty = {
    key: types_1.CommandType.CMD_SET_AUDIO_MUTE_RECORD,
    name: PropertyName.DeviceAudioRecording,
    label: "Audio Recording",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAudioRecordingIndoorSoloFloodlightProperty = {
    ...exports.DeviceAudioRecordingProperty,
    key: types_1.CommandType.CMD_INDOOR_SET_RECORD_AUDIO_ENABLE,
};
exports.DeviceAudioRecordingStarlight4gLTEProperty = {
    ...exports.DeviceAudioRecordingProperty,
    commandId: types_1.CommandType.CMD_INDOOR_SET_RECORD_AUDIO_ENABLE,
};
exports.DeviceAudioRecordingWiredDoorbellProperty = {
    ...exports.DeviceAudioRecordingProperty,
    key: ParamType.DOORBELL_AUDIO_RECODE,
    commandId: ParamType.COMMAND_AUDIO_RECORDING,
};
exports.DeviceAudioRecordingFloodlightT8420Property = {
    ...exports.DeviceAudioRecordingProperty,
    key: types_1.CommandType.CMD_RECORD_AUDIO_SWITCH,
};
exports.DeviceMotionTrackingProperty = {
    key: types_1.CommandType.CMD_INDOOR_PAN_MOTION_TRACK,
    name: PropertyName.DeviceMotionTracking,
    label: "Motion Tracking",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceSpeakerVolumeProperty = {
    key: types_1.CommandType.CMD_SET_DEV_SPEAKER_VOLUME,
    name: PropertyName.DeviceSpeakerVolume,
    label: "Speaker Volume",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        90: "Low",
        92: "Medium",
        93: "High"
    },
};
exports.DeviceSpeakerVolumeSoloProperty = {
    ...exports.DeviceSpeakerVolumeProperty,
    states: {
        70: "Low",
        80: "Medium",
        100: "High"
    },
};
exports.DeviceSpeakerVolumeCamera3Property = {
    ...exports.DeviceSpeakerVolumeProperty,
    states: {
        90: "Low",
        95: "Medium",
        100: "High"
    },
};
exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty = {
    key: types_1.CommandType.CMD_SET_DEV_SPEAKER_VOLUME,
    name: PropertyName.DeviceSpeakerVolume,
    label: "Speaker Volume",
    readable: true,
    writeable: true,
    type: "number",
    min: 0,
    max: 100,
};
exports.DeviceSpeakerVolumeWiredDoorbellProperty = {
    ...exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
    key: ParamType.VOLUME,
    max: 169,
};
exports.DeviceSpeakerVolumeFloodlightT8420Property = {
    ...exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
    min: 1,
    max: 63,
};
exports.DeviceRingtoneVolumeBatteryDoorbellProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_SET_RINGTONE_VOLUME,
    name: PropertyName.DeviceRingtoneVolume,
    label: "Ringtone Volume",
    readable: true,
    writeable: true,
    type: "number",
    min: 0,
    max: 100,
};
exports.DeviceRingtoneVolumeWiredDoorbellProperty = {
    ...exports.DeviceRingtoneVolumeBatteryDoorbellProperty,
    key: ParamType.RINGING_VOLUME,
    commandId: ParamType.COMMAND_RINGTONE_VOLUME,
};
exports.DeviceRingtoneVolumeT8200XProperty = {
    ...exports.DeviceRingtoneVolumeBatteryDoorbellProperty,
    key: types_1.CommandType.CMD_T8200X_SET_RINGTONE_VOLUME,
};
exports.DevicePowerSourceProperty = {
    key: types_1.CommandType.CMD_SET_POWER_CHARGE,
    name: PropertyName.DevicePowerSource,
    label: "Power Source",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Battery",
        1: "Solar Panel",
    },
};
exports.DevicePowerWorkingModeProperty = {
    key: types_1.CommandType.CMD_SET_PIR_POWERMODE,
    name: PropertyName.DevicePowerWorkingMode,
    label: "Power Working Mode",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Optimal Battery Life",
        1: "Optimal Surveillance",
        2: "Custom Recording",
    },
};
exports.DevicePowerWorkingModeBatteryDoorbellProperty = {
    ...exports.DevicePowerWorkingModeProperty,
    states: {
        0: "Balance Surveillance",
        1: "Optimal Surveillance",
        2: "Custom Recording",
        3: "Optimal Battery Life",
    },
};
exports.DeviceChargingStatusProperty = {
    key: types_1.CommandType.SUB1G_REP_UNPLUG_POWER_LINE,
    name: PropertyName.DeviceChargingStatus,
    label: "Charging Status",
    readable: true,
    writeable: false,
    type: "number",
    states: {
        1: "Charging",
        2: "Unplugged",
        3: "Plugged",
        4: "Solar charging"
    },
};
exports.DeviceChargingStatusCamera3cProperty = {
    ...exports.DeviceChargingStatusProperty,
    states: {
        0: "Unplugged",
        1: "Charging",
        3: "Plugged",
        4: "Solar charging"
    },
};
exports.DeviceRecordingClipLengthProperty = {
    key: types_1.CommandType.CMD_DEV_RECORD_TIMEOUT,
    name: PropertyName.DeviceRecordingClipLength,
    label: "Recording Clip Length",
    readable: true,
    writeable: true,
    type: "number",
    min: 5,
    max: 120,
    default: 60,
    unit: "sec"
};
exports.DeviceRecordingClipLengthFloodlightProperty = {
    ...exports.DeviceRecordingClipLengthProperty,
    min: 30,
    max: 120,
    default: 100,
};
exports.DeviceRecordingRetriggerIntervalProperty = {
    key: types_1.CommandType.CMD_DEV_RECORD_INTERVAL,
    name: PropertyName.DeviceRecordingRetriggerInterval,
    label: "Recording Retrigger Interval",
    readable: true,
    writeable: true,
    type: "number",
    unit: "sec",
    min: 5,
    max: 60,
    default: 5,
};
exports.DeviceRecordingRetriggerIntervalBatteryDoorbellProperty = {
    ...exports.DeviceRecordingRetriggerIntervalProperty,
    min: 2,
    max: 60,
    default: 2,
};
exports.DeviceRecordingRetriggerIntervalFloodlightProperty = {
    ...exports.DeviceRecordingRetriggerIntervalProperty,
    min: 0,
    max: 30,
    default: 0,
};
exports.DeviceRecordingEndClipMotionStopsProperty = {
    key: types_1.CommandType.CMD_DEV_RECORD_AUTOSTOP,
    name: PropertyName.DeviceRecordingEndClipMotionStops,
    label: "Recording end clip early if motion stops",
    readable: true,
    writeable: true,
    type: "boolean",
    default: true,
};
exports.DeviceVideoStreamingQualityProperty = {
    key: ParamType.DOORBELL_VIDEO_QUALITY,
    name: PropertyName.DeviceVideoStreamingQuality,
    label: "Video Streaming Quality",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Auto",
        1: "Low",
        2: "Medium",
        3: "High",
    },
    commandId: ParamType.COMMAND_VIDEO_QUALITY,
};
exports.DeviceVideoStreamingQualityBatteryDoorbellProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_VIDEO_QUALITY,
    name: PropertyName.DeviceVideoStreamingQuality,
    label: "Video Streaming Quality",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Auto / Low Encoding",
        1: "Low / Low Encoding",
        2: "Medium / Low Encoding",
        3: "High / Low Encoding",
        5: "Auto / High Encoding",
        6: "Low / High Encoding",
        7: "Medium / High Encoding",
        8: "High / High Encoding",
    },
};
exports.DeviceVideoStreamingQualityCameraProperty = {
    ...exports.DeviceVideoStreamingQualityProperty,
    key: types_1.CommandType.CMD_BAT_DOORBELL_VIDEO_QUALITY,
};
exports.DeviceVideoStreamingQualitySoloProperty = {
    ...exports.DeviceVideoStreamingQualityProperty,
    key: types_1.CommandType.CMD_SET_RESOLUTION,
    commandId: ParamType.COMMAND_VIDEO_QUALITY,
};
exports.DeviceVideoStreamingQualityCamera3Property = {
    ...exports.DeviceVideoStreamingQualityBatteryDoorbellProperty,
    states: {
        5: "Auto",
        6: "Low",
        7: "Medium",
        8: "High",
        10: "Ultra 4K"
    },
};
exports.DeviceVideoRecordingQualityIndoorProperty = {
    key: ParamType.DOORBELL_RECORD_QUALITY,
    name: PropertyName.DeviceVideoRecordingQuality,
    label: "Video Recording Quality",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        2: "Full HD (1080P)",
        3: "2K HD",
    },
    commandId: ParamType.COMMAND_VIDEO_RECORDING_QUALITY,
};
exports.DeviceVideoRecordingQualityWiredDoorbellProperty = {
    ...exports.DeviceVideoRecordingQualityIndoorProperty,
    key: ParamType.DOORBELL_RECORD_QUALITY,
    states: {
        1: "Storage Saver (1600 * 1200)",
        2: "Full HD (1600 * 1200)",
        3: "2K HD (2560 * 1920)",
    },
    commandId: ParamType.COMMAND_VIDEO_RECORDING_QUALITY,
};
exports.DeviceVideoRecordingQualityProperty = {
    ...exports.DeviceVideoRecordingQualityIndoorProperty,
    key: types_1.CommandType.CMD_SET_RECORD_QUALITY,
    states: {
        2: "Full HD (1080P)",
        3: "2K HD",
    },
    commandId: ParamType.COMMAND_VIDEO_RECORDING_QUALITY,
};
exports.DeviceVideoRecordingQualityT8200XProperty = {
    ...exports.DeviceVideoRecordingQualityIndoorProperty,
    key: types_1.CommandType.CMD_SET_RECORD_QUALITY,
    states: {
        2: "Full HD (1600 * 1200)",
        3: "2K HD (2048 * 1536)",
    },
    commandId: ParamType.COMMAND_VIDEO_RECORDING_QUALITY,
};
exports.DeviceVideoRecordingQualityCamera2CProProperty = {
    ...exports.DeviceVideoRecordingQualityProperty,
    states: {
        1: "2K HD",
        2: "Full HD (1080P)",
    },
};
exports.DeviceVideoRecordingQualityCamera3Property = {
    ...exports.DeviceVideoRecordingQualityProperty,
    states: {
        1: "2K HD",
        2: "Full HD (1080P)",
        3: "Ultra 4K",
    },
};
exports.DeviceWDRProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_WDR_SWITCH,
    name: PropertyName.DeviceVideoWDR,
    label: "WDR",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceChimeIndoorBatteryDoorbellProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_MECHANICAL_CHIME_SWITCH,
    name: PropertyName.DeviceChimeIndoor,
    label: "Indoor Chime Enabled",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceChimeIndoorWiredDoorbellProperty = {
    ...exports.DeviceChimeIndoorBatteryDoorbellProperty,
    key: ParamType.CHIME_STATE,
    commandId: ParamType.COMMAND_INDOOR_CHIME,
};
exports.DeviceChimeIndoorT8200XProperty = {
    ...exports.DeviceChimeIndoorBatteryDoorbellProperty,
    key: ParamType.COMMAND_INDOOR_CHIME,
    commandId: ParamType.COMMAND_INDOOR_CHIME,
};
exports.DeviceChimeHomebaseBatteryDoorbellProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_CHIME_SWITCH,
    name: PropertyName.DeviceChimeHomebase,
    label: "Homebase Chime Enabled",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceChimeHomebaseRingtoneVolumeBatteryDoorbellProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_DINGDONG_V,
    name: PropertyName.DeviceChimeHomebaseRingtoneVolume,
    label: "Homebase Chime Ringtone Volume",
    readable: true,
    writeable: true,
    type: "number",
    min: 1,
    max: 26,
};
exports.DeviceChimeHomebaseRingtoneTypeBatteryDoorbellProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_DINGDONG_R,
    name: PropertyName.DeviceChimeHomebaseRingtoneType,
    label: "Homebase Chime Ringtone Type",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Default",
        1: "Silent",
        2: "Beacon",
        3: "Chord",
        4: "Christmas",
        5: "Circuit",
        6: "Clock",
        7: "Ding",
        8: "Hillside",
        9: "Presto",
    },
};
exports.DeviceNotificationTypeProperty = {
    key: types_1.CommandType.CMD_SET_PUSH_EFFECT,
    name: PropertyName.DeviceNotificationType,
    label: "Notification Type",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "Most Efficient",
        2: "Include Thumbnail",
        3: "Full Effect",
    },
    commandId: types_1.CommandType.CMD_INDOOR_PUSH_NOTIFY_TYPE,
};
exports.DeviceNotificationTypeIndoorFloodlightProperty = {
    ...exports.DeviceNotificationTypeProperty,
    key: types_1.CommandType.CMD_INDOOR_PUSH_NOTIFY_TYPE,
};
exports.DeviceNotificationTypeBatteryDoorbellProperty = {
    ...exports.DeviceNotificationTypeProperty,
    key: types_1.CommandType.CMD_BAT_DOORBELL_SET_NOTIFICATION_MODE,
};
exports.DeviceNotificationTypeWiredDoorbellProperty = {
    ...exports.DeviceNotificationTypeProperty,
    key: ParamType.DOORBELL_MOTION_NOTIFICATION,
    commandId: ParamType.COMMAND_NOTIFICATION_TYPE,
};
exports.DeviceRotationSpeedProperty = {
    key: types_1.CommandType.CMD_INDOOR_PAN_SPEED,
    name: PropertyName.DeviceRotationSpeed,
    label: "Rotation Speed",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "Min",
        2: "Low",
        3: "Medium",
        4: "High",
        5: "Max",
    },
    default: 3
};
exports.DeviceImageMirroredProperty = {
    key: types_1.CommandType.CMD_SET_MIRRORMODE,
    name: PropertyName.DeviceImageMirrored,
    label: "Image vertically mirrored",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceSoundDetectionTypeProperty = {
    key: types_1.CommandType.CMD_INDOOR_DET_SET_SOUND_DETECT_TYPE,
    name: PropertyName.DeviceSoundDetectionType,
    label: "Sound Detection Type",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "Crying",
        2: "All Sounds",
    },
};
exports.DeviceSoundDetectionSensitivityProperty = {
    key: types_1.CommandType.CMD_INDOOR_DET_SET_SOUND_SENSITIVITY_IDX,
    name: PropertyName.DeviceSoundDetectionSensitivity,
    label: "Sound Detection Sensitivity",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "Min",
        2: "Low",
        3: "Medium",
        4: "High",
        5: "Max",
    },
};
exports.DeviceNotificationPersonProperty = {
    key: types_1.CommandType.CMD_INDOOR_AI_PERSON_ENABLE,
    name: PropertyName.DeviceNotificationPerson,
    label: "Notification Person detected",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationPetProperty = {
    key: types_1.CommandType.CMD_INDOOR_AI_PET_ENABLE,
    name: PropertyName.DeviceNotificationPet,
    label: "Notification Pet detected",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationAllOtherMotionProperty = {
    key: types_1.CommandType.CMD_INDOOR_AI_MOTION_ENABLE,
    name: PropertyName.DeviceNotificationAllOtherMotion,
    label: "Notification All Other Motion",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationAllSoundProperty = {
    key: types_1.CommandType.CMD_INDOOR_AI_SOUND_ENABLE,
    name: PropertyName.DeviceNotificationAllSound,
    label: "Notification Sound detected",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationCryingProperty = {
    key: types_1.CommandType.CMD_INDOOR_AI_CRYING_ENABLE,
    name: PropertyName.DeviceNotificationCrying,
    label: "Notification Crying detected",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationRingProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_SET_NOTIFICATION_MODE,
    name: PropertyName.DeviceNotificationRing,
    label: "Notification Ring detected",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationRingWiredDoorbellProperty = {
    ...exports.DeviceNotificationRingProperty,
    key: ParamType.DOORBELL_NOTIFICATION_OPEN,
    commandId: ParamType.COMMAND_NOTIFICATION_RING,
};
exports.DeviceNotificationMotionProperty = {
    key: types_1.CommandType.CMD_BAT_DOORBELL_SET_NOTIFICATION_MODE,
    name: PropertyName.DeviceNotificationMotion,
    label: "Notification Motion detected",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationRadarDetectorProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_NOTIFICATION_HUMAN_DETECT,
    name: PropertyName.DeviceNotificationRadarDetector,
    label: "Notification Radar Detector Motion detected",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationMotionWiredDoorbellProperty = {
    ...exports.DeviceNotificationMotionProperty,
    key: ParamType.DOORBELL_NOTIFICATION_OPEN,
    commandId: ParamType.COMMAND_NOTIFICATION_RING,
};
exports.DeviceChirpVolumeEntrySensorProperty = {
    key: types_1.CommandType.CMD_SENSOR_SET_CHIRP_VOLUME,
    name: PropertyName.DeviceChirpVolume,
    label: "Chirp Volume",
    readable: true,
    writeable: true,
    type: "number",
    min: 1,
    max: 26,
    steps: 1,
};
exports.DeviceChirpToneEntrySensorProperty = {
    key: types_1.CommandType.CMD_SENSOR_SET_CHIRP_TONE,
    name: PropertyName.DeviceChirpTone,
    label: "Chirp Tone",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "None",
        1: "Water",
        2: "Classic",
        3: "Light",
        4: "Ding",
    }
};
exports.DeviceVideoHDRWiredDoorbellProperty = {
    key: ParamType.DOORBELL_HDR,
    name: PropertyName.DeviceVideoHDR,
    label: "HDR",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceVideoDistortionCorrectionWiredDoorbellProperty = {
    key: ParamType.DOORBELL_DISTORTION,
    name: PropertyName.DeviceVideoDistortionCorrection,
    label: "Distortion Correction",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceVideoRingRecordWiredDoorbellProperty = {
    key: ParamType.DOORBELL_RING_RECORD,
    name: PropertyName.DeviceVideoRingRecord,
    label: "Record while live viewing after opening notification",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Disabled",
        1: "Enabled - Recording Quality Preferred",
        2: "Enabled - Streaming Quality Preferred",
    }
};
exports.DeviceMotionDetectionRangeProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE,
    name: PropertyName.DeviceMotionDetectionRange,
    label: "Motion Detection Range",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Standard",
        1: "Advanced",
        2: "Automatic",
    },
};
exports.DeviceMotionDetectionRangeStandardSensitivityProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_STD_SENSITIVITY,
    name: PropertyName.DeviceMotionDetectionRangeStandardSensitivity,
    label: "Motion Detection Range Standard Sensitivity",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Off",
        1: "Min",
        2: "Low",
        3: "Medium",
        4: "High",
        5: "Max",
    },
};
exports.DeviceMotionDetectionRangeAdvancedLeftSensitivityProperty = {
    ...exports.DeviceMotionDetectionRangeStandardSensitivityProperty,
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_ADV_LEFT_SENSITIVITY,
    name: PropertyName.DeviceMotionDetectionRangeAdvancedLeftSensitivity,
    label: "Motion Detection Range Advanced Left Sensitivity",
};
exports.DeviceMotionDetectionRangeAdvancedMiddleSensitivityProperty = {
    ...exports.DeviceMotionDetectionRangeStandardSensitivityProperty,
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_ADV_MIDDLE_SENSITIVITY,
    name: PropertyName.DeviceMotionDetectionRangeAdvancedMiddleSensitivity,
    label: "Motion Detection Range Advanced Middle Sensitivity",
};
exports.DeviceMotionDetectionRangeAdvancedRightSensitivityProperty = {
    ...exports.DeviceMotionDetectionRangeStandardSensitivityProperty,
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_ADV_RIGHT_SENSITIVITY,
    name: PropertyName.DeviceMotionDetectionRangeAdvancedRightSensitivity,
    label: "Motion Detection Range Advanced Right Sensitivity",
};
exports.DeviceMotionDetectionTestModeProperty = {
    key: types_1.CommandType.CMD_SET_PIR_TEST_MODE,
    name: PropertyName.DeviceMotionDetectionTestMode,
    label: "Motion Detection Test Mode",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionTrackingSensitivityProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_MOTION_TRACKING_SENSITIVITY,
    name: PropertyName.DeviceMotionTrackingSensitivity,
    label: "Motion Tracking Sensitivity",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "Level 1",
        2: "Level 2",
        3: "Level 3",
    },
    default: 3,
};
exports.DeviceMotionAutoCruiseProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_MOTION_AUTO_CRUISE,
    name: PropertyName.DeviceMotionAutoCruise,
    label: "Motion Auto-Cruise",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceMotionOutOfViewDetectionProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_MOTION_OUT_OF_VIEW_DETECTION,
    name: PropertyName.DeviceMotionOutOfViewDetection,
    label: "Motion Out-of-View Detection",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceLightSettingsColorTemperatureManualProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_LIGHT_COLOR_TEMP_MANUAL,
    name: PropertyName.DeviceLightSettingsColorTemperatureManual,
    label: "Light Setting Color Temperature Manual",
    readable: true,
    writeable: true,
    type: "number",
    min: 1,
    max: 100,
    default: 50,
};
exports.DeviceLightSettingsColorTemperatureMotionProperty = {
    ...exports.DeviceLightSettingsColorTemperatureManualProperty,
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_LIGHT_COLOR_TEMP_MOTION,
    name: PropertyName.DeviceLightSettingsColorTemperatureMotion,
    label: "Light Setting Color Temperature Motion",
};
exports.DeviceLightSettingsColorTemperatureScheduleProperty = {
    ...exports.DeviceLightSettingsColorTemperatureManualProperty,
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_LIGHT_COLOR_TEMP_SCHEDULE,
    name: PropertyName.DeviceLightSettingsColorTemperatureSchedule,
    label: "Light Setting Color Temperature Schedule",
};
exports.DeviceLightSettingsMotionActivationModeProperty = {
    key: types_1.CommandType.CMD_SET_FLOODLIGHT_STREET_LAMP,
    name: PropertyName.DeviceLightSettingsMotionActivationMode,
    label: "Light Settings Motion Activation Mode",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Smart",
        1: "Fast",
    },
};
exports.DeviceVideoNightvisionImageAdjustmentProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_VIDEO_NIGHTVISION_IMAGE_ADJUSTMENT,
    name: PropertyName.DeviceVideoNightvisionImageAdjustment,
    label: "Video Nightvision Image Adjustment",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceVideoColorNightvisionProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_VIDEO_COLOR_NIGHTVISION,
    name: PropertyName.DeviceVideoColorNightvision,
    label: "Video Color Nightvision",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAutoCalibrationProperty = {
    key: types_1.CommandType.CMD_FLOODLIGHT_SET_AUTO_CALIBRATION,
    name: PropertyName.DeviceAutoCalibration,
    label: "Auto Calibration",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAutoLockProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_AUTO_LOCK,
    name: PropertyName.DeviceAutoLock,
    label: "Auto Lock",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAutoLockTimerProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_AUTO_LOCK_TIMER,
    name: PropertyName.DeviceAutoLockTimer,
    label: "Auto Lock Timer",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "1 sec.",
        30: "30 sec.",
        60: "1 min.",
        90: "1,5 min.",
        120: "2 min.",
        150: "2,5 min.",
        180: "3 min.",
    },
    default: 60,
    unit: "sec",
};
exports.DeviceAutoLockScheduleProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_AUTO_LOCK_SCHEDULE,
    name: PropertyName.DeviceAutoLockSchedule,
    label: "Auto Lock Schedule",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceAutoLockScheduleStartTimeProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_AUTO_LOCK_SCHEDULE_STARTTIME,
    name: PropertyName.DeviceAutoLockScheduleStartTime,
    label: "Auto Lock Schedule Starttime (24-hour clock)",
    readable: true,
    writeable: true,
    type: "string",
    default: "23:00",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceAutoLockScheduleEndTimeProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_AUTO_LOCK_SCHEDULE_ENDTIME,
    name: PropertyName.DeviceAutoLockScheduleEndTime,
    label: "Auto Lock Schedule Endtime (24-hour clock)",
    readable: true,
    writeable: true,
    type: "string",
    default: "6:00",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceOneTouchLockingProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_ONE_TOUCH_LOCK,
    name: PropertyName.DeviceOneTouchLocking,
    label: "One-Touch Locking",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceWrongTryProtectionProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_WRONG_TRY_PROTECT,
    name: PropertyName.DeviceWrongTryProtection,
    label: "Wrong Try Protection",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceWrongTryProtectionSmartSafeProperty = {
    ...exports.DeviceWrongTryProtectionProperty,
    key: types_1.CommandType.CMD_SMARTSAFE_IS_ENABLE_CRACK_PROTECT,
};
exports.DeviceWrongTryLockdownTimeProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_WRONG_TRY_LOCKDOWN,
    name: PropertyName.DeviceWrongTryLockdownTime,
    label: "Wrong Try Lockdown Time",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        60: "1 min.",
        120: "2 min.",
        180: "3 min.",
        240: "4 min.",
        300: "5 min.",
    },
    default: 300,
    unit: "sec",
};
exports.DeviceWrongTryLockdownTimeSmartSafeProperty = {
    ...exports.DeviceWrongTryLockdownTimeProperty,
    key: types_1.CommandType.CMD_SMARTSAFE_PROTECT_COOLDOWN_SECONDS,
    default: 60,
};
exports.DeviceWrongTryAttemptsProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_WRONG_TRY_ATTEMPTS,
    name: PropertyName.DeviceWrongTryAttempts,
    label: "Wrong Try Attempts",
    readable: true,
    writeable: true,
    type: "number",
    min: 3,
    max: 10,
    default: 6,
};
exports.DeviceWrongTryAttemptsSmartSafeProperty = {
    ...exports.DeviceWrongTryAttemptsProperty,
    key: types_1.CommandType.CMD_SMARTSAFE_MAX_WRONG_PIN_TIMES,
    min: 5,
    max: 10,
    default: 5,
};
exports.DeviceScramblePasscodeProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_SCRAMBLE_PASSCODE,
    name: PropertyName.DeviceScramblePasscode,
    label: "Scramble Passcode",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceScramblePasscodeSmartSafeProperty = {
    ...exports.DeviceScramblePasscodeProperty,
    key: types_1.CommandType.CMD_SMARTSAFE_IS_SET_PREFIX_PWD,
    label: "Scramble PIN",
};
exports.DeviceSoundProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_LOCK_SOUND,
    name: PropertyName.DeviceSound,
    label: "Sound",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Off",
        1: "Low",
        2: "Medium",
        3: "High",
    },
    default: 2,
};
exports.DeviceSoundSimpleProperty = {
    ...exports.DeviceSoundProperty,
    states: {
        0: "Off",
        2: "On",
    },
    default: 2,
};
exports.DeviceNotificationProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_NOTIFICATION,
    name: PropertyName.DeviceNotification,
    label: "Notification",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationUnlockedProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_NOTIFICATION_UNLOCKED,
    name: PropertyName.DeviceNotificationUnlocked,
    label: "Notification Unlocked",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationLockedProperty = {
    key: types_1.CommandType.CMD_SMARTLOCK_NOTIFICATION_LOCKED,
    name: PropertyName.DeviceNotificationLocked,
    label: "Notification Locked",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceLoiteringDetectionProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_SWITCH,
    name: PropertyName.DeviceLoiteringDetection,
    label: "Loitering Detection",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceLoiteringDetectionRangeProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DISTANCE,
    name: PropertyName.DeviceLoiteringDetectionRange,
    label: "Loitering Detection Range",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "within 2ft",
        2: "within 4ft",
        3: "within 6ft",
        4: "within 8ft",
        5: "within 10ft",
    },
    default: 3,
};
exports.DeviceLoiteringDetectionLengthProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_TIME,
    name: PropertyName.DeviceLoiteringDetectionLength,
    label: "Loitering Detection Length",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "15s",
        2: "20s",
        3: "25s",
        4: "30s",
        5: "45s",
        6: "60s",
    },
    default: 1,
};
exports.DeviceMotionDetectionSensitivityModeProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DETECTION_SENSITIVITY,
    name: PropertyName.DeviceMotionDetectionSensitivityMode,
    label: "Motion Detection Sensitivity Mode",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Standard",
        1: "Advanced",
    },
};
exports.DeviceMotionDetectionSensitivityStandardProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DETECTION_SENSITIVITY,
    name: PropertyName.DeviceMotionDetectionSensitivityStandard,
    label: "Motion Detection Standard Sensitivity",
    readable: true,
    writeable: true,
    type: "number",
    min: 1,
    max: 5,
    default: 3,
};
exports.DeviceMotionDetectionSensitivityAdvancedAProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DETECTION_SENSITIVITY,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedA,
    label: "Motion Detection Advanced Sensitivity A",
    readable: true,
    writeable: true,
    type: "number",
    min: 1,
    max: 5,
    default: 3,
};
exports.DeviceMotionDetectionSensitivityAdvancedBProperty = {
    ...exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedB,
    label: "Motion Detection Advanced Sensitivity B",
};
exports.DeviceMotionDetectionSensitivityAdvancedCProperty = {
    ...exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedC,
    label: "Motion Detection Advanced Sensitivity C",
};
exports.DeviceMotionDetectionSensitivityAdvancedDProperty = {
    ...exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedD,
    label: "Motion Detection Advanced Sensitivity D",
};
exports.DeviceMotionDetectionSensitivityAdvancedEProperty = {
    ...exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedE,
    label: "Motion Detection Advanced Sensitivity E",
};
exports.DeviceMotionDetectionSensitivityAdvancedFProperty = {
    ...exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedF,
    label: "Motion Detection Advanced Sensitivity F",
};
exports.DeviceMotionDetectionSensitivityAdvancedGProperty = {
    ...exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedG,
    label: "Motion Detection Advanced Sensitivity G",
};
exports.DeviceMotionDetectionSensitivityAdvancedHProperty = {
    ...exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
    name: PropertyName.DeviceMotionDetectionSensitivityAdvancedH,
    label: "Motion Detection Advanced Sensitivity H",
};
exports.DeviceLoiteringCustomResponsePhoneNotificationProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_AUTO_RESPONSE,
    name: PropertyName.DeviceLoiteringCustomResponsePhoneNotification,
    label: "Loitering Custom Response Phone Notification",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceLoiteringCustomResponseAutoVoiceResponseProperty = {
    ...exports.DeviceLoiteringCustomResponsePhoneNotificationProperty,
    name: PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse,
    label: "Loitering Custom Response Auto Voice Response",
};
exports.DeviceLoiteringCustomResponseAutoVoiceResponseVoiceProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_AUTO_RESPONSE,
    name: PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice,
    label: "Loitering Custom Response Auto Voice Response Voice",
    readable: true,
    writeable: true,
    type: "number",
    default: 1,
    // states loaded dynamically
};
exports.DeviceLoiteringCustomResponseHomeBaseNotificationProperty = {
    ...exports.DeviceLoiteringCustomResponsePhoneNotificationProperty,
    name: PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification,
    label: "Loitering Custom Response HomeBase Notification",
};
exports.DeviceLoiteringCustomResponseTimeFromProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_AUTO_RESPONSE,
    name: PropertyName.DeviceLoiteringCustomResponseTimeFrom,
    label: "Loitering Custom Response Time From (24-hour clock)",
    readable: true,
    writeable: true,
    type: "string",
    default: "00:00",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceLoiteringCustomResponseTimeToProperty = {
    ...exports.DeviceLoiteringCustomResponseTimeFromProperty,
    name: PropertyName.DeviceLoiteringCustomResponseTimeTo,
    label: "Loitering Custom Response Time To (24-hour clock)",
    default: "23:59",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceDeliveryGuardProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_DELIVERY_GUARD_SWITCH,
    name: PropertyName.DeviceDeliveryGuard,
    label: "Delivery Guard",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceDeliveryGuardPackageGuardingProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_SWITCH,
    name: PropertyName.DeviceDeliveryGuardPackageGuarding,
    label: "Delivery Guard Package Guarding",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceDeliveryGuardPackageGuardingVoiceResponseVoiceProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_VOICE,
    name: PropertyName.DeviceDeliveryGuardPackageGuardingVoiceResponseVoice,
    label: "Delivery Guard Package Guarding Voice Response Voice",
    readable: true,
    writeable: true,
    type: "number",
    default: 2,
    // states loaded dynamically
};
exports.DeviceDeliveryGuardPackageGuardingActivatedTimeFromProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_TIME,
    name: PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom,
    label: "Delivery Guard Package Guarding Activated Time From (24-hour clock)",
    readable: true,
    writeable: true,
    type: "string",
    default: "00:00",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceDeliveryGuardPackageGuardingActivatedTimeToProperty = {
    ...exports.DeviceDeliveryGuardPackageGuardingActivatedTimeFromProperty,
    name: PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo,
    label: "Delivery Guard Package Guarding Activated Time To (24-hour clock)",
    default: "23:59",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceDeliveryGuardUncollectedPackageAlertProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_STRAND_SWITCH,
    name: PropertyName.DeviceDeliveryGuardUncollectedPackageAlert,
    label: "Delivery Guard Uncollected Package Alert",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheckProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_STRAND_TIME,
    name: PropertyName.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck,
    label: "Delivery Guard Uncollected Package Alert Time To Check (24-hour clock)",
    readable: true,
    writeable: true,
    type: "string",
    default: "20:00",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceDeliveryGuardPackageLiveCheckAssistanceProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_ASSISTANT_SWITCH,
    name: PropertyName.DeviceDeliveryGuardPackageLiveCheckAssistance,
    label: "Delivery Guard Package Live Check Assistance",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceDualCamWatchViewModeProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_VIEW_MODE,
    name: PropertyName.DeviceDualCamWatchViewMode,
    label: "Dual Cam Watch View Mode",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        2: "Top-Left Picture-in-Picture",
        3: "Top-Right Picture-in-Picture",
        4: "Bottom-Left Picture-in-Picture",
        5: "Bottom-Left Picture-in-Picture",
        12: "Split-view",
    },
    default: 12,
};
exports.DeviceRingAutoResponseProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RING_AUTO_RESPONSE,
    name: PropertyName.DeviceRingAutoResponse,
    label: "Ring Auto-Response",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceRingAutoResponseVoiceResponseProperty = {
    ...exports.DeviceRingAutoResponseProperty,
    name: PropertyName.DeviceRingAutoResponseVoiceResponse,
    label: "Ring Auto-Response Voice Response",
};
exports.DeviceRingAutoResponseVoiceResponseVoiceProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RING_AUTO_RESPONSE,
    name: PropertyName.DeviceRingAutoResponseVoiceResponseVoice,
    label: "Ring Auto-Response Voice Response Voice",
    readable: true,
    writeable: true,
    type: "number",
    default: 2,
    // states loaded dynamically
};
exports.DeviceRingAutoResponseTimeFromProperty = {
    key: types_1.CommandType.CMD_DOORBELL_DUAL_RING_AUTO_RESPONSE,
    name: PropertyName.DeviceRingAutoResponseTimeFrom,
    label: "Ring Auto-Response Time From (24-hour clock)",
    readable: true,
    writeable: true,
    type: "string",
    default: "00:00",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceRingAutoResponseTimeToProperty = {
    ...exports.DeviceRingAutoResponseTimeFromProperty,
    name: PropertyName.DeviceRingAutoResponseTimeTo,
    label: "Ring Auto-Response Time To (24-hour clock)",
    default: "23:59",
    format: /^[0-9]{1,2}:[0-9]{1,2}$/,
};
exports.DeviceContinuousRecordingProperty = {
    key: types_1.CommandType.CMD_INDOOR_SET_CONTINUE_ENABLE,
    name: PropertyName.DeviceContinuousRecording,
    label: "Continuos Recording",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceContinuousRecordingTypeProperty = {
    key: types_1.CommandType.CMD_INDOOR_SET_CONTINUE_TYPE,
    name: PropertyName.DeviceContinuousRecordingType,
    label: "Continuos Recording Mode",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Always",
        1: "Schedule"
    }
};
exports.DeviceDefaultAngleProperty = {
    key: types_1.CommandType.CMD_INDOOR_DEFAULT_ANGLE_ENABLE,
    name: PropertyName.DeviceDefaultAngle,
    label: "Default Angle",
    readable: true,
    writeable: true,
    type: "boolean",
    default: false,
};
exports.DeviceDefaultAngleIdleTimeProperty = {
    key: types_1.CommandType.CMD_INDOOR_DEFAULT_ANGLE_IDLE_TIME,
    name: PropertyName.DeviceDefaultAngleIdleTime,
    label: "Default Angle Idle Time",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        10: "10s",
        20: "20s",
        40: "40s",
        60: "1 min",
        120: "2 mins",
        300: "5 mins",
    },
    default: 60,
};
exports.DeviceNotificationIntervalTimeProperty = {
    key: types_1.CommandType.CMD_DEV_RECORD_INTERVAL,
    name: PropertyName.DeviceNotificationIntervalTime,
    label: "Notification Interval Time",
    readable: true,
    writeable: true,
    type: "number",
    unit: "min",
    default: 180,
    states: {
        0: "0",
        60: "1",
        120: "2",
        180: "3",
        240: "4",
        300: "5",
    }
};
exports.DeviceSoundDetectionRoundLookProperty = {
    key: types_1.CommandType.CMD_INDOOR_SET_SOUND_DETECT_ROUND_LOOK,
    name: PropertyName.DeviceSoundDetectionRoundLook,
    label: "Sound Detection Round-Look",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationHomeSecuritySettings = {
    key: types_1.CommandType.ARM_DELAY_HOME,
    name: PropertyName.StationHomeSecuritySettings,
    label: "Security Settings Home",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationAwaySecuritySettings = {
    key: types_1.CommandType.ARM_DELAY_AWAY,
    name: PropertyName.StationAwaySecuritySettings,
    label: "Security Settings Away",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationCustom1SecuritySettings = {
    key: types_1.CommandType.ARM_DELAY_CUS1,
    name: PropertyName.StationCustom1SecuritySettings,
    label: "Security Settings Custom1",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationCustom2SecuritySettings = {
    key: types_1.CommandType.ARM_DELAY_CUS2,
    name: PropertyName.StationCustom2SecuritySettings,
    label: "Security Settings Custom2",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationCustom3SecuritySettings = {
    key: types_1.CommandType.ARM_DELAY_CUS3,
    name: PropertyName.StationCustom3SecuritySettings,
    label: "Security Settings Custom3",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationOffSecuritySettings = {
    key: types_1.CommandType.ARM_DELAY_OFF,
    name: PropertyName.StationOffSecuritySettings,
    label: "Security Settings Off",
    readable: true,
    writeable: false,
    type: "string",
};
exports.DevicePackageDeliveredProperty = {
    key: "custom_packageDelivered",
    name: PropertyName.DevicePackageDelivered,
    label: "Package Delivered",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DevicePackageStrandedProperty = {
    key: "custom_packageStranded",
    name: PropertyName.DevicePackageStranded,
    label: "Package Stranded",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DevicePackageTakenProperty = {
    key: "custom_packageTaken",
    name: PropertyName.DevicePackageTaken,
    label: "Package Taken",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceSomeoneLoiteringProperty = {
    key: "custom_someoneLoitering",
    name: PropertyName.DeviceSomeoneLoitering,
    label: "Someone Loitering",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceRadarMotionDetectedProperty = {
    key: "custom_radarMotionDetected",
    name: PropertyName.DeviceRadarMotionDetected,
    label: "Radar Motion Detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceLeftOpenAlarmProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_IS_ENABLE_LEFT_OPEN,
    name: PropertyName.DeviceLeftOpenAlarm,
    label: "Left Open Alarm",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceLeftOpenAlarmDurationProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_LEFT_OPEN_SECONDS,
    name: PropertyName.DeviceLeftOpenAlarmDuration,
    label: "Left Open Alarm Duration",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        30: "30 sec.",
        60: "60 sec.",
        90: "90 sec.",
        120: "120 sec.",
    },
    default: 120,
    unit: "sec",
};
exports.DeviceDualUnlockProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_IS_ENABLE_TOW_FACTOR_CHK,
    name: PropertyName.DeviceDualUnlock,
    label: "Dual Unlock",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DevicePowerSaveProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_POWER_SAVE_ON,
    name: PropertyName.DevicePowerSave,
    label: "Power Save",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceInteriorBrightnessProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_LED_BRIGHTNESS_LEVEL,
    name: PropertyName.DeviceInteriorBrightness,
    label: "Interior Brightness Level",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Off",
        25: "Low",
        60: "Mid",
        100: "High",
    },
    default: 60,
};
exports.DeviceInteriorBrightnessDurationProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_LED_BRIGHTNESS_SECOND,
    name: PropertyName.DeviceInteriorBrightnessDuration,
    label: "Interior Brightness Duration",
    readable: true,
    writeable: true,
    type: "number",
    default: 10,
    min: 5,
    max: 60,
    steps: 1,
    unit: "sec",
};
exports.DeviceTamperAlarmProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_IS_ENABLE_SHAKE_ALARM,
    name: PropertyName.DeviceTamperAlarm,
    label: "Tamper Alarm",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Off",
        2: "Tamper Alarm",
        3: "Move Alarm",
    },
    default: 2,
};
exports.DeviceRemoteUnlockProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_REMOTE_OPEN_TYPE,
    name: PropertyName.DeviceRemoteUnlock,
    label: "Remote Unlock",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceRemoteUnlockMasterPINProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_REMOTE_OPEN_TYPE,
    name: PropertyName.DeviceRemoteUnlockMasterPIN,
    label: "Remote Unlock Master PIN",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DevicePromptVolumeProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_VOLUME,
    name: PropertyName.DevicePromptVolume,
    label: "Prompt Volume",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Mute",
        1: "Soft",
        2: "Max",
    },
    default: 1,
};
exports.DeviceAlarmVolumeProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_ALERT_VOLUME,
    name: PropertyName.DeviceAlarmVolume,
    label: "Alarm Volume",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Low",
        1: "Medium",
        2: "High",
    },
    default: 2,
};
exports.DeviceNotificationUnlockByKeyProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationUnlockByKey,
    label: "Notification Unlock By Key",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationUnlockByPINProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationUnlockByPIN,
    label: "Notification Unlock By PIN",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationUnlockByFingerprintProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationUnlockByFingerprint,
    label: "Notification Unlock By Fingerprint",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationUnlockByAppProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationUnlockByApp,
    label: "Notification Unlock By App",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationDualUnlockProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationDualUnlock,
    label: "Notification Dual Unlock",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationDualLockProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationDualLock,
    label: "Notification Dual Lock",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationWrongTryProtectProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationWrongTryProtect,
    label: "Notification Wrong-Try Protect",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.DeviceNotificationJammedProperty = {
    key: types_1.CommandType.CMD_SMARTSAFE_NOTIF,
    name: PropertyName.DeviceNotificationJammed,
    label: "Notification Jammed",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceJammedAlertProperty = {
    key: "custom_jammedAlert",
    name: PropertyName.DeviceJammedAlert,
    label: "Jammed Alert",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.Device911AlertProperty = {
    key: "custom_911Alert",
    name: PropertyName.Device911Alert,
    label: "911 Alert",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.Device911AlertEventProperty = {
    key: "custom_911AlertEvent",
    name: PropertyName.Device911AlertEvent,
    label: "911 Alert Event",
    readable: true,
    writeable: false,
    type: "number",
    states: {
        0: "Cancel Alarm",
        1: "Alarm",
        2: "Alarm Success",
        3: "Alarm Not Open",
        4: "Alarm Open Failed",
    },
};
exports.DeviceShakeAlertProperty = {
    key: "custom_shakeAlert",
    name: PropertyName.DeviceShakeAlert,
    label: "Shake Alert",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceShakeAlertEventProperty = {
    key: "custom_shakeAlertEvent",
    name: PropertyName.DeviceShakeAlertEvent,
    label: "Shake Alert Event",
    readable: true,
    writeable: false,
    type: "number",
    states: {
        0: "Cancel Alarm",
        1: "Alarm",
    },
};
exports.DeviceLowBatteryAlertProperty = {
    key: "custom_lowBatteryAlert",
    name: PropertyName.DeviceLowBatteryAlert,
    label: "Low Battery Alert",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceLongTimeNotCloseAlertProperty = {
    key: "custom_longTimeNotCloseAlert",
    name: PropertyName.DeviceLongTimeNotCloseAlert,
    label: "Long Time Not Close Alert",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceWrongTryProtectAlertProperty = {
    key: "custom_wrongTryProtectAlert",
    name: PropertyName.DeviceWrongTryProtectAlert,
    label: "Wrong Try-Protect Alert",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceVideoTypeStoreToNASProperty = {
    key: types_1.CommandType.CMD_INDOOR_NAS_STORAGE_TYPE,
    name: PropertyName.DeviceVideoTypeStoreToNAS,
    label: "Video Type Store To NAS",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Events",
        1: "Continuous Recording",
    },
};
exports.DeviceSnoozeProperty = {
    key: types_1.CommandType.CMD_SET_SNOOZE_MODE,
    name: PropertyName.DeviceSnooze,
    label: "Snooze",
    readable: true,
    writeable: false,
    type: "boolean",
};
exports.DeviceSnoozeTimeProperty = {
    key: types_1.CommandType.CMD_SET_SNOOZE_MODE,
    name: PropertyName.DeviceSnoozeTime,
    label: "Snooze Time",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
    unit: "sec",
};
exports.DeviceSnoozeStartTimeProperty = {
    key: types_1.CommandType.CMD_SET_SNOOZE_MODE,
    name: PropertyName.DeviceSnoozeStartTime,
    label: "Snooze Start Time",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.DeviceSnoozeStartTimeWiredDoorbellProperty = {
    ...exports.DeviceSnoozeStartTimeProperty,
    key: ParamType.DOORBELL_SNOOZE_START_TIME,
};
exports.DeviceSnoozeHomebaseProperty = {
    key: types_1.CommandType.CMD_SET_SNOOZE_MODE,
    name: PropertyName.DeviceSnoozeHomebase,
    label: "Snooze Homebase",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceSnoozeMotionProperty = {
    key: types_1.CommandType.CMD_SET_SNOOZE_MODE,
    name: PropertyName.DeviceSnoozeMotion,
    label: "Snooze Motion",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceSnoozeChimeProperty = {
    key: types_1.CommandType.CMD_SET_SNOOZE_MODE,
    name: PropertyName.DeviceSnoozeChime,
    label: "Snooze Chime",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DevicePersonNameProperty = {
    key: "custom_personName",
    name: PropertyName.DevicePersonName,
    label: "Person Name",
    readable: true,
    writeable: false,
    type: "string",
    default: "",
};
exports.DeviceIdentityPersonDetectedProperty = {
    key: "custom_identityPersonDetected",
    name: PropertyName.DeviceIdentityPersonDetected,
    label: "Identity Person detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceStrangerPersonDetectedProperty = {
    key: "custom_strangerPersonDetected",
    name: PropertyName.DeviceStrangerPersonDetected,
    label: "Stranger Person detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceVehicleDetectedProperty = {
    key: "custom_vehicleDetected",
    name: PropertyName.DeviceVehicleDetected,
    label: "Vehicle detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceDogDetectedProperty = {
    key: "custom_dogDetected",
    name: PropertyName.DeviceDogDetected,
    label: "Dog detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceDogLickDetectedProperty = {
    key: "custom_dogLickDetected",
    name: PropertyName.DeviceDogLickDetected,
    label: "Dog Lick detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceDogPoopDetectedProperty = {
    key: "custom_dogPoopDetected",
    name: PropertyName.DeviceDogPoopDetected,
    label: "Dog Poop detected",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.DeviceDetectionStatisticsWorkingDaysProperty = {
    key: types_1.CommandType.CMD_GET_WORKING_DAYS_HB3,
    name: PropertyName.DeviceDetectionStatisticsWorkingDays,
    label: "Detection Statistics - Working Days",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.DeviceDetectionStatisticsDetectedEventsProperty = {
    key: types_1.CommandType.CMD_GET_DETECTED_EVENTS_HB3,
    name: PropertyName.DeviceDetectionStatisticsDetectedEvents,
    label: "Detection Statistics - Detected Events",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.DeviceDetectionStatisticsRecordedEventsProperty = {
    key: types_1.CommandType.CMD_GET_RECORDED_EVENTS_HB3,
    name: PropertyName.DeviceDetectionStatisticsRecordedEvents,
    label: "Detection Statistics - Recorded Events",
    readable: true,
    writeable: false,
    type: "number",
    default: 0,
};
exports.FloodlightT8420XDeviceProperties = {
    ...exports.GenericDeviceProperties,
    [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
    [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
    [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
    [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
    [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
    [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
    [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
    [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
    [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
    [PropertyName.DeviceLightSettingsEnable]: exports.DeviceFloodlightLightSettingsEnableProperty,
    [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
    [PropertyName.DeviceLightSettingsBrightnessMotion]: exports.DeviceFloodlightLightSettingsBrightnessMotionProperty,
    [PropertyName.DeviceLightSettingsBrightnessSchedule]: exports.DeviceFloodlightLightSettingsBrightnessScheduleProperty,
    [PropertyName.DeviceLightSettingsMotionTriggered]: exports.DeviceFloodlightLightSettingsMotionTriggeredProperty,
    [PropertyName.DeviceLightSettingsMotionTriggeredDistance]: exports.DeviceFloodlightLightSettingsMotionTriggeredDistanceProperty,
    [PropertyName.DeviceLightSettingsMotionTriggeredTimer]: exports.DeviceFloodlightLightSettingsMotionTriggeredTimerProperty,
    [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
    [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
    [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
    [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
    [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
    [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeFloodlightProperty,
    [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthFloodlightProperty,
    [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalFloodlightProperty,
    [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
    [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
    [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
    [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
    [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
    [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
    [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
};
exports.WiredDoorbellT8200XDeviceProperties = {
    ...exports.GenericDeviceProperties,
    [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
    [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
    [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
    [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
    [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedT8200XProperty,
    [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
    [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
    [PropertyName.DeviceState]: exports.DeviceStateProperty,
    [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
    [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
    [PropertyName.DeviceRinging]: exports.DeviceRingingProperty,
    [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
    [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
    [PropertyName.DeviceRingtoneVolume]: exports.DeviceRingtoneVolumeT8200XProperty,
    [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
    [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeT8200XProperty,
    [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityBatteryDoorbellProperty,
    [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
    [PropertyName.DeviceVideoHDR]: exports.DeviceVideoHDRWiredDoorbellProperty,
    [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
    [PropertyName.DeviceNotificationRing]: exports.DeviceNotificationRingWiredDoorbellProperty,
    [PropertyName.DeviceNotificationMotion]: exports.DeviceNotificationMotionWiredDoorbellProperty,
    [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
    [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
    [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
    //[PropertyName.DeviceSnoozeHomebase]: DeviceSnoozeHomebaseProperty,
    [PropertyName.DeviceSnoozeChime]: exports.DeviceSnoozeChimeProperty,
    [PropertyName.DeviceSnoozeMotion]: exports.DeviceSnoozeMotionProperty,
    [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityT8200XProperty,
    [PropertyName.DeviceChimeIndoor]: exports.DeviceChimeIndoorT8200XProperty,
};
exports.DeviceProperties = {
    [DeviceType.CAMERA2]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera2Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.CAMERA2C]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera2Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceCameraLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.CAMERA2C_PRO]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera2Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityCameraProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityCamera2CProProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceCameraLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.CAMERA2_PRO]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera2Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.CAMERA3]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeCamera3Property,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera2Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityCamera3Property,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityCamera3Property,
        [PropertyName.DeviceLightSettingsEnable]: exports.DeviceFloodlightLightSettingsEnableProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceLightSettingsBrightnessManualCamera3Property,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
    },
    [DeviceType.CAMERA3C]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeCamera3Property,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera2Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusCamera3cProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityCamera3Property,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityCamera3Property,
        [PropertyName.DeviceLightSettingsEnable]: exports.DeviceFloodlightLightSettingsEnableProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceLightSettingsBrightnessManualCamera3Property,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
    },
    [DeviceType.CAMERA]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkBatteryDoorbellCamera1Property,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera1Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionCamera1Property,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.CAMERA_E]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkBatteryDoorbellCamera1Property,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityCamera1Property,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionCamera1Property,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.DOORBELL]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionDoorbellProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceRinging]: exports.DeviceRingingProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedDoorbellProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceHiddenMotionDetectionSensitivity]: exports.DeviceHiddenMotionDetectionSensitivityWiredDoorbellProperty,
        [PropertyName.DeviceHiddenMotionDetectionMode]: exports.DeviceHiddenMotionDetectionModeWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityWiredDoorbellProperty,
        [PropertyName.DeviceVideoHDR]: exports.DeviceVideoHDRWiredDoorbellProperty,
        [PropertyName.DeviceVideoDistortionCorrection]: exports.DeviceVideoDistortionCorrectionWiredDoorbellProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityWiredDoorbellProperty,
        [PropertyName.DeviceVideoRingRecord]: exports.DeviceVideoRingRecordWiredDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingWiredDoorbellProperty,
        [PropertyName.DeviceChimeIndoor]: exports.DeviceChimeIndoorWiredDoorbellProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeWiredDoorbellProperty,
        [PropertyName.DeviceRingtoneVolume]: exports.DeviceRingtoneVolumeWiredDoorbellProperty,
        [PropertyName.DeviceNotificationRing]: exports.DeviceNotificationRingWiredDoorbellProperty,
        [PropertyName.DeviceNotificationMotion]: exports.DeviceNotificationMotionWiredDoorbellProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeWiredDoorbellProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeWiredDoorbellProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.BATTERY_DOORBELL]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedBatteryDoorbellProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkBatteryDoorbellCamera1Property,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceRinging]: exports.DeviceRingingProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceRingtoneVolume]: exports.DeviceRingtoneVolumeBatteryDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityBatteryDoorbellProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeBatteryDoorbellProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalBatteryDoorbellProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityBatteryDoorbellProperty,
        [PropertyName.DeviceVideoWDR]: exports.DeviceWDRProperty,
        [PropertyName.DeviceChimeIndoor]: exports.DeviceChimeIndoorBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebase]: exports.DeviceChimeHomebaseBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebaseRingtoneVolume]: exports.DeviceChimeHomebaseRingtoneVolumeBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebaseRingtoneType]: exports.DeviceChimeHomebaseRingtoneTypeBatteryDoorbellProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeBatteryDoorbellProperty,
        [PropertyName.DeviceNotificationRing]: exports.DeviceNotificationRingProperty,
        [PropertyName.DeviceNotificationMotion]: exports.DeviceNotificationMotionProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DeviceSnoozeHomebase]: exports.DeviceSnoozeHomebaseProperty,
        [PropertyName.DeviceSnoozeChime]: exports.DeviceSnoozeChimeProperty,
        [PropertyName.DeviceSnoozeMotion]: exports.DeviceSnoozeMotionProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.BATTERY_DOORBELL_2]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedBatteryDoorbellProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkBatteryDoorbellCamera1Property,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceRinging]: exports.DeviceRingingProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceRingtoneVolume]: exports.DeviceRingtoneVolumeBatteryDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityBatteryDoorbellProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeBatteryDoorbellProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalBatteryDoorbellProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityBatteryDoorbellProperty,
        [PropertyName.DeviceVideoWDR]: exports.DeviceWDRProperty,
        [PropertyName.DeviceChimeIndoor]: exports.DeviceChimeIndoorBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebase]: exports.DeviceChimeHomebaseBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebaseRingtoneVolume]: exports.DeviceChimeHomebaseRingtoneVolumeBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebaseRingtoneType]: exports.DeviceChimeHomebaseRingtoneTypeBatteryDoorbellProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeBatteryDoorbellProperty,
        [PropertyName.DeviceNotificationRing]: exports.DeviceNotificationRingProperty,
        [PropertyName.DeviceNotificationMotion]: exports.DeviceNotificationMotionProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeHomebase]: exports.DeviceSnoozeHomebaseProperty,
        [PropertyName.DeviceSnoozeChime]: exports.DeviceSnoozeChimeProperty,
        [PropertyName.DeviceSnoozeMotion]: exports.DeviceSnoozeMotionProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.BATTERY_DOORBELL_PLUS]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedBatteryDoorbellProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkBatteryDoorbellCamera1Property,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingFalseEvents]: exports.DeviceLastChargingFalseEventsProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceRinging]: exports.DeviceRingingProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceRingtoneVolume]: exports.DeviceRingtoneVolumeBatteryDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeBatteryDoorbellProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalBatteryDoorbellProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityBatteryDoorbellProperty,
        [PropertyName.DeviceVideoWDR]: exports.DeviceWDRProperty,
        [PropertyName.DeviceChimeIndoor]: exports.DeviceChimeIndoorBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebase]: exports.DeviceChimeHomebaseBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebaseRingtoneVolume]: exports.DeviceChimeHomebaseRingtoneVolumeBatteryDoorbellProperty,
        [PropertyName.DeviceChimeHomebaseRingtoneType]: exports.DeviceChimeHomebaseRingtoneTypeBatteryDoorbellProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeBatteryDoorbellProperty,
        [PropertyName.DeviceNotificationRing]: exports.DeviceNotificationRingProperty,
        [PropertyName.DeviceNotificationMotion]: exports.DeviceNotificationMotionProperty,
        [PropertyName.DeviceNotificationRadarDetector]: exports.DeviceNotificationRadarDetectorProperty,
        [PropertyName.DeviceMotionDetectionSensitivityMode]: exports.DeviceMotionDetectionSensitivityModeProperty,
        [PropertyName.DeviceMotionDetectionSensitivityStandard]: exports.DeviceMotionDetectionSensitivityStandardProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedA]: exports.DeviceMotionDetectionSensitivityAdvancedAProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedB]: exports.DeviceMotionDetectionSensitivityAdvancedBProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedC]: exports.DeviceMotionDetectionSensitivityAdvancedCProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedD]: exports.DeviceMotionDetectionSensitivityAdvancedDProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedE]: exports.DeviceMotionDetectionSensitivityAdvancedEProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedF]: exports.DeviceMotionDetectionSensitivityAdvancedFProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedG]: exports.DeviceMotionDetectionSensitivityAdvancedGProperty,
        [PropertyName.DeviceMotionDetectionSensitivityAdvancedH]: exports.DeviceMotionDetectionSensitivityAdvancedHProperty,
        [PropertyName.DeviceLoiteringDetection]: exports.DeviceLoiteringDetectionProperty,
        [PropertyName.DeviceLoiteringDetectionLength]: exports.DeviceLoiteringDetectionLengthProperty,
        [PropertyName.DeviceLoiteringDetectionRange]: exports.DeviceLoiteringDetectionRangeProperty,
        [PropertyName.DeviceLoiteringCustomResponsePhoneNotification]: exports.DeviceLoiteringCustomResponsePhoneNotificationProperty,
        [PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse]: exports.DeviceLoiteringCustomResponseAutoVoiceResponseProperty,
        [PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice]: exports.DeviceLoiteringCustomResponseAutoVoiceResponseVoiceProperty,
        [PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification]: exports.DeviceLoiteringCustomResponseHomeBaseNotificationProperty,
        [PropertyName.DeviceLoiteringCustomResponseTimeFrom]: exports.DeviceLoiteringCustomResponseTimeFromProperty,
        [PropertyName.DeviceLoiteringCustomResponseTimeTo]: exports.DeviceLoiteringCustomResponseTimeToProperty,
        [PropertyName.DeviceDeliveryGuard]: exports.DeviceDeliveryGuardProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuarding]: exports.DeviceDeliveryGuardPackageGuardingProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom]: exports.DeviceDeliveryGuardPackageGuardingActivatedTimeFromProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo]: exports.DeviceDeliveryGuardPackageGuardingActivatedTimeToProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuardingVoiceResponseVoice]: exports.DeviceDeliveryGuardPackageGuardingVoiceResponseVoiceProperty,
        [PropertyName.DeviceDeliveryGuardPackageLiveCheckAssistance]: exports.DeviceDeliveryGuardPackageLiveCheckAssistanceProperty,
        [PropertyName.DeviceDeliveryGuardUncollectedPackageAlert]: exports.DeviceDeliveryGuardUncollectedPackageAlertProperty,
        [PropertyName.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck]: exports.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheckProperty,
        [PropertyName.DeviceDualCamWatchViewMode]: exports.DeviceDualCamWatchViewModeProperty,
        [PropertyName.DeviceRingAutoResponse]: exports.DeviceRingAutoResponseProperty,
        [PropertyName.DeviceRingAutoResponseVoiceResponse]: exports.DeviceRingAutoResponseVoiceResponseProperty,
        [PropertyName.DeviceRingAutoResponseVoiceResponseVoice]: exports.DeviceRingAutoResponseVoiceResponseVoiceProperty,
        [PropertyName.DeviceRingAutoResponseTimeFrom]: exports.DeviceRingAutoResponseTimeFromProperty,
        [PropertyName.DeviceRingAutoResponseTimeTo]: exports.DeviceRingAutoResponseTimeToProperty,
        [PropertyName.DevicePackageDelivered]: exports.DevicePackageDeliveredProperty,
        [PropertyName.DevicePackageStranded]: exports.DevicePackageStrandedProperty,
        [PropertyName.DevicePackageTaken]: exports.DevicePackageTakenProperty,
        [PropertyName.DeviceSomeoneLoitering]: exports.DeviceSomeoneLoiteringProperty,
        [PropertyName.DeviceRadarMotionDetected]: exports.DeviceRadarMotionDetectedProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DeviceSnoozeHomebase]: exports.DeviceSnoozeHomebaseProperty,
        [PropertyName.DeviceSnoozeChime]: exports.DeviceSnoozeChimeProperty,
        [PropertyName.DeviceSnoozeMotion]: exports.DeviceSnoozeMotionProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.DOORBELL_SOLO]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedBatteryDoorbellProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkBatteryDoorbellCamera1Property,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceRinging]: exports.DeviceRingingProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceRingtoneVolume]: exports.DeviceRingtoneVolumeBatteryDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityBatteryDoorbellProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityBatteryDoorbellProperty,
        [PropertyName.DeviceVideoWDR]: exports.DeviceWDRProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeBatteryDoorbellProperty,
        [PropertyName.DeviceNotificationRing]: exports.DeviceNotificationRingProperty,
        [PropertyName.DeviceNotificationMotion]: exports.DeviceNotificationMotionProperty,
        [PropertyName.DeviceDeliveryGuard]: exports.DeviceDeliveryGuardProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuarding]: exports.DeviceDeliveryGuardPackageGuardingProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom]: exports.DeviceDeliveryGuardPackageGuardingActivatedTimeFromProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo]: exports.DeviceDeliveryGuardPackageGuardingActivatedTimeToProperty,
        [PropertyName.DeviceDeliveryGuardPackageGuardingVoiceResponseVoice]: exports.DeviceDeliveryGuardPackageGuardingVoiceResponseVoiceProperty,
        [PropertyName.DeviceDeliveryGuardPackageLiveCheckAssistance]: exports.DeviceDeliveryGuardPackageLiveCheckAssistanceProperty,
        [PropertyName.DeviceDeliveryGuardUncollectedPackageAlert]: exports.DeviceDeliveryGuardUncollectedPackageAlertProperty,
        [PropertyName.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck]: exports.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheckProperty,
        [PropertyName.DeviceDualCamWatchViewMode]: exports.DeviceDualCamWatchViewModeProperty,
        [PropertyName.DeviceRingAutoResponse]: exports.DeviceRingAutoResponseProperty,
        [PropertyName.DeviceRingAutoResponseVoiceResponse]: exports.DeviceRingAutoResponseVoiceResponseProperty,
        [PropertyName.DeviceRingAutoResponseVoiceResponseVoice]: exports.DeviceRingAutoResponseVoiceResponseVoiceProperty,
        [PropertyName.DeviceRingAutoResponseTimeFrom]: exports.DeviceRingAutoResponseTimeFromProperty,
        [PropertyName.DeviceRingAutoResponseTimeTo]: exports.DeviceRingAutoResponseTimeToProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DeviceSnoozeHomebase]: exports.DeviceSnoozeHomebaseProperty,
        [PropertyName.DeviceSnoozeChime]: exports.DeviceSnoozeChimeProperty,
        [PropertyName.DeviceSnoozeMotion]: exports.DeviceSnoozeMotionProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.FLOODLIGHT]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkBatteryDoorbellCamera1Property,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsEnable]: exports.DeviceFloodlightLightSettingsEnableProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceLightSettingsBrightnessMotion]: exports.DeviceFloodlightLightSettingsBrightnessMotionProperty,
        [PropertyName.DeviceLightSettingsBrightnessSchedule]: exports.DeviceFloodlightLightSettingsBrightnessScheduleProperty,
        [PropertyName.DeviceLightSettingsMotionTriggered]: exports.DeviceFloodlightLightSettingsMotionTriggeredProperty,
        [PropertyName.DeviceLightSettingsMotionTriggeredDistance]: exports.DeviceFloodlightLightSettingsMotionTriggeredDistanceProperty,
        [PropertyName.DeviceLightSettingsMotionTriggeredTimer]: exports.DeviceFloodlightLightSettingsMotionTriggeredTimerProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityFloodlightT8420Property,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeFloodlightT8420Property,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingFloodlightT8420Property,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthFloodlightProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalFloodlightProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceMotionDetectionTestMode]: exports.DeviceMotionDetectionTestModeProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.FLOODLIGHT_CAMERA_8422]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsEnable]: exports.DeviceFloodlightLightSettingsEnableProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceLightSettingsBrightnessMotion]: exports.DeviceFloodlightLightSettingsBrightnessMotionProperty,
        [PropertyName.DeviceLightSettingsBrightnessSchedule]: exports.DeviceFloodlightLightSettingsBrightnessScheduleProperty,
        [PropertyName.DeviceLightSettingsMotionTriggered]: exports.DeviceFloodlightLightSettingsMotionTriggeredProperty,
        [PropertyName.DeviceLightSettingsMotionTriggeredTimer]: exports.DeviceFloodlightLightSettingsMotionTriggeredTimerProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeFloodlightProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthFloodlightProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalFloodlightProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.FLOODLIGHT_CAMERA_8423]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsEnable]: exports.DeviceFloodlightLightSettingsEnableProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceLightSettingsBrightnessMotion]: exports.DeviceFloodlightLightSettingsBrightnessMotionProperty,
        [PropertyName.DeviceLightSettingsBrightnessSchedule]: exports.DeviceFloodlightLightSettingsBrightnessScheduleProperty,
        [PropertyName.DeviceLightSettingsMotionTriggered]: exports.DeviceFloodlightLightSettingsMotionTriggeredProperty,
        [PropertyName.DeviceLightSettingsMotionTriggeredTimer]: exports.DeviceFloodlightLightSettingsMotionTriggeredTimerProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeFloodlightT8423Property,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthFloodlightProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityProperty,
        [PropertyName.DeviceMotionTracking]: exports.DeviceMotionTrackingProperty,
        [PropertyName.DeviceMotionDetectionRange]: exports.DeviceMotionDetectionRangeProperty,
        [PropertyName.DeviceMotionDetectionRangeStandardSensitivity]: exports.DeviceMotionDetectionRangeStandardSensitivityProperty,
        [PropertyName.DeviceMotionDetectionRangeAdvancedLeftSensitivity]: exports.DeviceMotionDetectionRangeAdvancedLeftSensitivityProperty,
        [PropertyName.DeviceMotionDetectionRangeAdvancedMiddleSensitivity]: exports.DeviceMotionDetectionRangeAdvancedMiddleSensitivityProperty,
        [PropertyName.DeviceMotionDetectionRangeAdvancedRightSensitivity]: exports.DeviceMotionDetectionRangeAdvancedRightSensitivityProperty,
        [PropertyName.DeviceMotionDetectionTestMode]: exports.DeviceMotionDetectionTestModeProperty,
        [PropertyName.DeviceMotionTrackingSensitivity]: exports.DeviceMotionTrackingSensitivityProperty,
        [PropertyName.DeviceMotionAutoCruise]: exports.DeviceMotionAutoCruiseProperty,
        [PropertyName.DeviceMotionOutOfViewDetection]: exports.DeviceMotionOutOfViewDetectionProperty,
        [PropertyName.DeviceLightSettingsColorTemperatureManual]: exports.DeviceLightSettingsColorTemperatureManualProperty,
        [PropertyName.DeviceLightSettingsColorTemperatureMotion]: exports.DeviceLightSettingsColorTemperatureMotionProperty,
        [PropertyName.DeviceLightSettingsColorTemperatureSchedule]: exports.DeviceLightSettingsColorTemperatureScheduleProperty,
        [PropertyName.DeviceLightSettingsMotionActivationMode]: exports.DeviceLightSettingsMotionActivationModeProperty,
        [PropertyName.DeviceVideoNightvisionImageAdjustment]: exports.DeviceVideoNightvisionImageAdjustmentProperty,
        [PropertyName.DeviceVideoColorNightvision]: exports.DeviceVideoColorNightvisionProperty,
        [PropertyName.DeviceAutoCalibration]: exports.DeviceAutoCalibrationProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.FLOODLIGHT_CAMERA_8424]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsEnable]: exports.DeviceFloodlightLightSettingsEnableProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceLightSettingsBrightnessMotion]: exports.DeviceFloodlightLightSettingsBrightnessMotionProperty,
        [PropertyName.DeviceLightSettingsBrightnessSchedule]: exports.DeviceFloodlightLightSettingsBrightnessScheduleProperty,
        [PropertyName.DeviceLightSettingsMotionTriggered]: exports.DeviceFloodlightLightSettingsMotionTriggeredProperty,
        [PropertyName.DeviceLightSettingsMotionTriggeredTimer]: exports.DeviceFloodlightLightSettingsMotionTriggeredTimerProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeFloodlightProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthFloodlightProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalFloodlightProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_CAMERA]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DevicePetDetection]: exports.DevicePetDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePetDetected]: exports.DevicePetDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionType]: exports.DeviceSoundDetectionTypeProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceCryingDetected]: exports.DeviceCryingDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationPet]: exports.DeviceNotificationPetProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceNotificationCrying]: exports.DeviceNotificationCryingProperty,
        [PropertyName.DeviceContinuousRecording]: exports.DeviceContinuousRecordingProperty,
        [PropertyName.DeviceContinuousRecordingType]: exports.DeviceContinuousRecordingTypeProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_CAMERA_1080]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DevicePetDetection]: exports.DevicePetDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePetDetected]: exports.DevicePetDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionType]: exports.DeviceSoundDetectionTypeProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceCryingDetected]: exports.DeviceCryingDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationPet]: exports.DeviceNotificationPetProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceNotificationCrying]: exports.DeviceNotificationCryingProperty,
        [PropertyName.DeviceContinuousRecording]: exports.DeviceContinuousRecordingProperty,
        [PropertyName.DeviceContinuousRecordingType]: exports.DeviceContinuousRecordingTypeProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_COST_DOWN_CAMERA]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorMiniProperty,
        [PropertyName.DeviceMotionTracking]: exports.DeviceMotionTrackingProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceRotationSpeed]: exports.DeviceRotationSpeedProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceContinuousRecording]: exports.DeviceContinuousRecordingProperty,
        [PropertyName.DeviceContinuousRecordingType]: exports.DeviceContinuousRecordingTypeProperty,
        [PropertyName.DeviceDefaultAngle]: exports.DeviceDefaultAngleProperty,
        [PropertyName.DeviceDefaultAngleIdleTime]: exports.DeviceDefaultAngleIdleTimeProperty,
        [PropertyName.DeviceNotificationIntervalTime]: exports.DeviceNotificationIntervalTimeProperty,
        [PropertyName.DeviceSoundDetectionRoundLook]: exports.DeviceSoundDetectionRoundLookProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_PT_CAMERA]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DevicePetDetection]: exports.DevicePetDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePetDetected]: exports.DevicePetDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionType]: exports.DeviceSoundDetectionTypeProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceCryingDetected]: exports.DeviceCryingDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorProperty,
        [PropertyName.DeviceMotionTracking]: exports.DeviceMotionTrackingProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceRotationSpeed]: exports.DeviceRotationSpeedProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationPet]: exports.DeviceNotificationPetProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceNotificationCrying]: exports.DeviceNotificationCryingProperty,
        [PropertyName.DeviceContinuousRecording]: exports.DeviceContinuousRecordingProperty,
        [PropertyName.DeviceContinuousRecordingType]: exports.DeviceContinuousRecordingTypeProperty,
        [PropertyName.DeviceMotionZone]: exports.DeviceMotionZoneProperty,
        [PropertyName.DeviceImageMirrored]: exports.DeviceImageMirroredProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_PT_CAMERA_1080]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DevicePetDetection]: exports.DevicePetDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePetDetected]: exports.DevicePetDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionType]: exports.DeviceSoundDetectionTypeProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceCryingDetected]: exports.DeviceCryingDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorProperty,
        [PropertyName.DeviceMotionTracking]: exports.DeviceMotionTrackingProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceRotationSpeed]: exports.DeviceRotationSpeedProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationPet]: exports.DeviceNotificationPetProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceNotificationCrying]: exports.DeviceNotificationCryingProperty,
        [PropertyName.DeviceContinuousRecording]: exports.DeviceContinuousRecordingProperty,
        [PropertyName.DeviceContinuousRecordingType]: exports.DeviceContinuousRecordingTypeProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DevicePetDetection]: exports.DevicePetDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePetDetected]: exports.DevicePetDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionType]: exports.DeviceSoundDetectionTypeProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceCryingDetected]: exports.DeviceCryingDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationPet]: exports.DeviceNotificationPetProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceNotificationCrying]: exports.DeviceNotificationCryingProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P_NO_LIGHT]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DevicePetDetection]: exports.DevicePetDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePetDetected]: exports.DevicePetDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionType]: exports.DeviceSoundDetectionTypeProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceCryingDetected]: exports.DeviceCryingDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationPet]: exports.DeviceNotificationPetProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceNotificationCrying]: exports.DeviceNotificationCryingProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.INDOOR_OUTDOOR_CAMERA_2K]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledStandaloneProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceSoundDetection]: exports.DeviceSoundDetectionProperty,
        [PropertyName.DevicePetDetection]: exports.DevicePetDetectionProperty,
        [PropertyName.DeviceRTSPStream]: exports.DeviceRTSPStreamProperty,
        [PropertyName.DeviceRTSPStreamUrl]: exports.DeviceRTSPStreamUrlProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkIndoorFloodProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DevicePetDetected]: exports.DevicePetDetectedProperty,
        [PropertyName.DeviceSoundDetected]: exports.DeviceSoundDetectedProperty,
        [PropertyName.DeviceSoundDetectionType]: exports.DeviceSoundDetectionTypeProperty,
        [PropertyName.DeviceSoundDetectionSensitivity]: exports.DeviceSoundDetectionSensitivityProperty,
        [PropertyName.DeviceCryingDetected]: exports.DeviceCryingDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedIndoorFloodProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeIndoorFloodDoorbellProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeIndoorProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualityProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityIndoorProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceNotificationPerson]: exports.DeviceNotificationPersonProperty,
        [PropertyName.DeviceNotificationPet]: exports.DeviceNotificationPetProperty,
        [PropertyName.DeviceNotificationAllOtherMotion]: exports.DeviceNotificationAllOtherMotionProperty,
        [PropertyName.DeviceNotificationAllSound]: exports.DeviceNotificationAllSoundProperty,
        [PropertyName.DeviceNotificationCrying]: exports.DeviceNotificationCryingProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceVideoTypeStoreToNAS]: exports.DeviceVideoTypeStoreToNASProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.CAMERA_FG]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeSoloProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingStarlight4gLTEProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        //[PropertyName.DeviceWifiRSSI]: DeviceWifiRSSIProperty,
        //[PropertyName.DeviceWifiSignalLevel]: DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivitySoloProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
        [PropertyName.DeviceAntitheftDetection]: exports.DeviceAntitheftDetectionProperty,
        [PropertyName.DevicePowerSource]: exports.DevicePowerSourceProperty,
        [PropertyName.DeviceCellularRSSI]: exports.DeviceCellularRSSIProperty,
        [PropertyName.DeviceCellularSignalLevel]: exports.DeviceCellularSignalLevelProperty,
        [PropertyName.DeviceCellularSignal]: exports.DeviceCellularSignalProperty,
        [PropertyName.DeviceCellularBand]: exports.DeviceCellularBandProperty,
        [PropertyName.DeviceCellularIMEI]: exports.DeviceCellularIMEIProperty,
        [PropertyName.DeviceCellularICCID]: exports.DeviceCellularICCIDProperty,
    },
    [DeviceType.SOLO_CAMERA]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeSoloProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivitySoloProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.SOLO_CAMERA_PRO]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceAutoNightvision]: exports.DeviceAutoNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeSoloProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivityIndoorProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivitySoloProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_1080]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeSoloProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivitySoloProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_2K]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeSoloProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingIndoorSoloFloodlightProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivitySoloProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_SOLAR]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceEnabled]: exports.DeviceEnabledSoloProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceBatteryTemp]: exports.DeviceBatteryTempProperty,
        [PropertyName.DeviceNightvision]: exports.DeviceNightvisionProperty,
        [PropertyName.DeviceMotionDetection]: exports.DeviceMotionDetectionIndoorSoloFloodProperty,
        [PropertyName.DeviceWatermark]: exports.DeviceWatermarkSoloWiredDoorbellProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DevicePersonDetected]: exports.DevicePersonDetectedProperty,
        [PropertyName.DeviceStatusLed]: exports.DeviceStatusLedProperty,
        [PropertyName.DevicePictureUrl]: exports.DevicePictureUrlProperty,
        [PropertyName.DeviceMicrophone]: exports.DeviceMicrophoneProperty,
        [PropertyName.DeviceSpeaker]: exports.DeviceSpeakerProperty,
        [PropertyName.DeviceSpeakerVolume]: exports.DeviceSpeakerVolumeSoloProperty,
        [PropertyName.DeviceAudioRecording]: exports.DeviceAudioRecordingProperty,
        [PropertyName.DeviceMotionDetectionType]: exports.DeviceMotionDetectionTypeProperty,
        [PropertyName.DevicePowerWorkingMode]: exports.DevicePowerWorkingModeProperty,
        [PropertyName.DeviceRecordingClipLength]: exports.DeviceRecordingClipLengthProperty,
        [PropertyName.DeviceRecordingRetriggerInterval]: exports.DeviceRecordingRetriggerIntervalProperty,
        [PropertyName.DeviceRecordingEndClipMotionStops]: exports.DeviceRecordingEndClipMotionStopsProperty,
        [PropertyName.DeviceVideoStreamingQuality]: exports.DeviceVideoStreamingQualitySoloProperty,
        [PropertyName.DeviceVideoRecordingQuality]: exports.DeviceVideoRecordingQualityProperty,
        [PropertyName.DeviceNotificationType]: exports.DeviceNotificationTypeIndoorFloodlightProperty,
        [PropertyName.DeviceLight]: exports.DeviceFloodlightLightProperty,
        [PropertyName.DeviceLightSettingsBrightnessManual]: exports.DeviceFloodlightLightSettingsBrightnessManualProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceMotionDetectionSensitivity]: exports.DeviceMotionDetectionSensitivitySoloProperty,
        [PropertyName.DeviceLastChargingDays]: exports.DeviceLastChargingDaysProperty,
        [PropertyName.DeviceLastChargingRecordedEvents]: exports.DeviceLastChargingRecordedEventsProperty,
        [PropertyName.DeviceLastChargingTotalEvents]: exports.DeviceLastChargingTotalEventsProperty,
        [PropertyName.DeviceBatteryUsageLastWeek]: exports.DeviceBatteryUsageLastWeekProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceChargingStatus]: exports.DeviceChargingStatusProperty,
        [PropertyName.DeviceSnooze]: exports.DeviceSnoozeProperty,
        [PropertyName.DeviceSnoozeTime]: exports.DeviceSnoozeTimeProperty,
        [PropertyName.DeviceSnoozeStartTime]: exports.DeviceSnoozeStartTimeProperty,
        [PropertyName.DevicePersonName]: exports.DevicePersonNameProperty,
    },
    [DeviceType.KEYPAD]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBatteryLow]: exports.DeviceBatteryLowKeypadProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIKeypadProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceBatteryIsCharging]: exports.DeviceBatteryIsChargingKeypadProperty,
    },
    [DeviceType.LOCK_WIFI]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryLockProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedProperty,
        [PropertyName.DeviceLockStatus]: exports.DeviceAdvancedLockStatusProperty,
        [PropertyName.DeviceAutoLock]: exports.DeviceAutoLockProperty,
        [PropertyName.DeviceAutoLockTimer]: exports.DeviceAutoLockTimerProperty,
        [PropertyName.DeviceAutoLockSchedule]: exports.DeviceAutoLockScheduleProperty,
        [PropertyName.DeviceAutoLockScheduleStartTime]: exports.DeviceAutoLockScheduleStartTimeProperty,
        [PropertyName.DeviceAutoLockScheduleEndTime]: exports.DeviceAutoLockScheduleEndTimeProperty,
        [PropertyName.DeviceOneTouchLocking]: exports.DeviceOneTouchLockingProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeProperty,
        [PropertyName.DeviceSound]: exports.DeviceSoundProperty,
        [PropertyName.DeviceNotification]: exports.DeviceNotificationProperty,
        [PropertyName.DeviceNotificationUnlocked]: exports.DeviceNotificationUnlockedProperty,
        [PropertyName.DeviceNotificationLocked]: exports.DeviceNotificationLockedProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
    },
    [DeviceType.LOCK_WIFI_NO_FINGER]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryLockProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedProperty,
        [PropertyName.DeviceLockStatus]: exports.DeviceAdvancedLockStatusProperty,
        [PropertyName.DeviceAutoLock]: exports.DeviceAutoLockProperty,
        [PropertyName.DeviceAutoLockTimer]: exports.DeviceAutoLockTimerProperty,
        [PropertyName.DeviceAutoLockSchedule]: exports.DeviceAutoLockScheduleProperty,
        [PropertyName.DeviceAutoLockScheduleStartTime]: exports.DeviceAutoLockScheduleStartTimeProperty,
        [PropertyName.DeviceAutoLockScheduleEndTime]: exports.DeviceAutoLockScheduleEndTimeProperty,
        [PropertyName.DeviceOneTouchLocking]: exports.DeviceOneTouchLockingProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeProperty,
        [PropertyName.DeviceSound]: exports.DeviceSoundProperty,
        [PropertyName.DeviceNotification]: exports.DeviceNotificationProperty,
        [PropertyName.DeviceNotificationUnlocked]: exports.DeviceNotificationUnlockedProperty,
        [PropertyName.DeviceNotificationLocked]: exports.DeviceNotificationLockedProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
    },
    [DeviceType.LOCK_8503]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryLockProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedProperty,
        [PropertyName.DeviceLockStatus]: exports.DeviceAdvancedLockStatusProperty,
        [PropertyName.DeviceAutoLock]: exports.DeviceAutoLockProperty,
        [PropertyName.DeviceAutoLockTimer]: exports.DeviceAutoLockTimerProperty,
        [PropertyName.DeviceAutoLockSchedule]: exports.DeviceAutoLockScheduleProperty,
        [PropertyName.DeviceAutoLockScheduleStartTime]: exports.DeviceAutoLockScheduleStartTimeProperty,
        [PropertyName.DeviceAutoLockScheduleEndTime]: exports.DeviceAutoLockScheduleEndTimeProperty,
        [PropertyName.DeviceOneTouchLocking]: exports.DeviceOneTouchLockingProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeProperty,
        [PropertyName.DeviceSound]: exports.DeviceSoundSimpleProperty,
        [PropertyName.DeviceNotification]: exports.DeviceNotificationProperty,
        [PropertyName.DeviceNotificationUnlocked]: exports.DeviceNotificationUnlockedProperty,
        [PropertyName.DeviceNotificationLocked]: exports.DeviceNotificationLockedProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
    },
    [DeviceType.LOCK_85A3]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
    },
    [DeviceType.LOCK_8504]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryLockProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedProperty,
        [PropertyName.DeviceLockStatus]: exports.DeviceAdvancedLockStatusProperty,
        [PropertyName.DeviceAutoLock]: exports.DeviceAutoLockProperty,
        [PropertyName.DeviceAutoLockTimer]: exports.DeviceAutoLockTimerProperty,
        [PropertyName.DeviceAutoLockSchedule]: exports.DeviceAutoLockScheduleProperty,
        [PropertyName.DeviceAutoLockScheduleStartTime]: exports.DeviceAutoLockScheduleStartTimeProperty,
        [PropertyName.DeviceAutoLockScheduleEndTime]: exports.DeviceAutoLockScheduleEndTimeProperty,
        [PropertyName.DeviceOneTouchLocking]: exports.DeviceOneTouchLockingProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeProperty,
        [PropertyName.DeviceSound]: exports.DeviceSoundSimpleProperty,
        [PropertyName.DeviceNotification]: exports.DeviceNotificationProperty,
        [PropertyName.DeviceNotificationUnlocked]: exports.DeviceNotificationUnlockedProperty,
        [PropertyName.DeviceNotificationLocked]: exports.DeviceNotificationLockedProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
    },
    [DeviceType.LOCK_BLE]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceState]: exports.DeviceStateLockProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryLockProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSILockProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedProperty,
        [PropertyName.DeviceLockStatus]: exports.DeviceBasicLockStatusProperty,
    },
    [DeviceType.LOCK_BLE_NO_FINGER]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceState]: exports.DeviceStateLockProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryLockProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSILockProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedProperty,
        [PropertyName.DeviceLockStatus]: exports.DeviceBasicLockStatusProperty,
    },
    [DeviceType.MOTION_SENSOR]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceBatteryLow]: exports.DeviceBatteryLowMotionSensorProperty,
        [PropertyName.DeviceMotionDetected]: exports.DeviceMotionDetectedProperty,
        [PropertyName.DeviceMotionSensorPIREvent]: exports.DeviceMotionSensorPIREventProperty,
    },
    [DeviceType.SENSOR]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceSensorOpen]: exports.DeviceSensorOpenProperty,
        [PropertyName.DeviceBatteryLow]: exports.DeviceBatteryLowSensorProperty,
        [PropertyName.DeviceSensorChangeTime]: exports.DeviceSensorChangeTimeProperty,
        [PropertyName.DeviceChirpVolume]: exports.DeviceChirpVolumeEntrySensorProperty,
        [PropertyName.DeviceChirpTone]: exports.DeviceChirpToneEntrySensorProperty,
        [PropertyName.DeviceState]: exports.DeviceStateProperty,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSIEntrySensorProperty,
    },
    [DeviceType.SMART_SAFE_7400]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSISmartSafeProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionSmartSafeProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsSmartSafeProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeSmartSafeProperty,
        [PropertyName.DeviceLeftOpenAlarm]: exports.DeviceLeftOpenAlarmProperty,
        [PropertyName.DeviceLeftOpenAlarmDuration]: exports.DeviceLeftOpenAlarmDurationProperty,
        [PropertyName.DeviceDualUnlock]: exports.DeviceDualUnlockProperty,
        [PropertyName.DevicePowerSave]: exports.DevicePowerSaveProperty,
        [PropertyName.DeviceInteriorBrightness]: exports.DeviceInteriorBrightnessProperty,
        [PropertyName.DeviceInteriorBrightnessDuration]: exports.DeviceInteriorBrightnessDurationProperty,
        [PropertyName.DeviceTamperAlarm]: exports.DeviceTamperAlarmProperty,
        [PropertyName.DeviceRemoteUnlock]: exports.DeviceRemoteUnlockProperty,
        [PropertyName.DeviceRemoteUnlockMasterPIN]: exports.DeviceRemoteUnlockMasterPINProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeSmartSafeProperty,
        [PropertyName.DeviceAlarmVolume]: exports.DeviceAlarmVolumeProperty,
        [PropertyName.DevicePromptVolume]: exports.DevicePromptVolumeProperty,
        [PropertyName.DeviceNotificationUnlockByKey]: exports.DeviceNotificationUnlockByKeyProperty,
        [PropertyName.DeviceNotificationUnlockByPIN]: exports.DeviceNotificationUnlockByPINProperty,
        [PropertyName.DeviceNotificationUnlockByFingerprint]: exports.DeviceNotificationUnlockByFingerprintProperty,
        [PropertyName.DeviceNotificationUnlockByApp]: exports.DeviceNotificationUnlockByAppProperty,
        [PropertyName.DeviceNotificationDualLock]: exports.DeviceNotificationDualLockProperty,
        [PropertyName.DeviceNotificationDualUnlock]: exports.DeviceNotificationDualUnlockProperty,
        [PropertyName.DeviceNotificationWrongTryProtect]: exports.DeviceNotificationWrongTryProtectProperty,
        [PropertyName.DeviceNotificationJammed]: exports.DeviceNotificationJammedProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedSmartSafeProperty,
        [PropertyName.DeviceJammedAlert]: exports.DeviceJammedAlertProperty,
        [PropertyName.Device911Alert]: exports.Device911AlertProperty,
        [PropertyName.Device911AlertEvent]: exports.Device911AlertEventProperty,
        [PropertyName.DeviceShakeAlert]: exports.DeviceShakeAlertProperty,
        [PropertyName.DeviceShakeAlertEvent]: exports.DeviceShakeAlertEventProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
        [PropertyName.DeviceLongTimeNotCloseAlert]: exports.DeviceLongTimeNotCloseAlertProperty,
        [PropertyName.DeviceWrongTryProtectAlert]: exports.DeviceWrongTryProtectAlertProperty,
    },
    [DeviceType.SMART_SAFE_7401]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSISmartSafeProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionSmartSafeProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsSmartSafeProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeSmartSafeProperty,
        [PropertyName.DeviceLeftOpenAlarm]: exports.DeviceLeftOpenAlarmProperty,
        [PropertyName.DeviceLeftOpenAlarmDuration]: exports.DeviceLeftOpenAlarmDurationProperty,
        [PropertyName.DeviceDualUnlock]: exports.DeviceDualUnlockProperty,
        [PropertyName.DevicePowerSave]: exports.DevicePowerSaveProperty,
        [PropertyName.DeviceInteriorBrightness]: exports.DeviceInteriorBrightnessProperty,
        [PropertyName.DeviceInteriorBrightnessDuration]: exports.DeviceInteriorBrightnessDurationProperty,
        [PropertyName.DeviceTamperAlarm]: exports.DeviceTamperAlarmProperty,
        [PropertyName.DeviceRemoteUnlock]: exports.DeviceRemoteUnlockProperty,
        [PropertyName.DeviceRemoteUnlockMasterPIN]: exports.DeviceRemoteUnlockMasterPINProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeSmartSafeProperty,
        [PropertyName.DeviceAlarmVolume]: exports.DeviceAlarmVolumeProperty,
        [PropertyName.DevicePromptVolume]: exports.DevicePromptVolumeProperty,
        [PropertyName.DeviceNotificationUnlockByKey]: exports.DeviceNotificationUnlockByKeyProperty,
        [PropertyName.DeviceNotificationUnlockByPIN]: exports.DeviceNotificationUnlockByPINProperty,
        [PropertyName.DeviceNotificationUnlockByFingerprint]: exports.DeviceNotificationUnlockByFingerprintProperty,
        [PropertyName.DeviceNotificationUnlockByApp]: exports.DeviceNotificationUnlockByAppProperty,
        [PropertyName.DeviceNotificationDualLock]: exports.DeviceNotificationDualLockProperty,
        [PropertyName.DeviceNotificationDualUnlock]: exports.DeviceNotificationDualUnlockProperty,
        [PropertyName.DeviceNotificationWrongTryProtect]: exports.DeviceNotificationWrongTryProtectProperty,
        [PropertyName.DeviceNotificationJammed]: exports.DeviceNotificationJammedProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedSmartSafeProperty,
        [PropertyName.DeviceJammedAlert]: exports.DeviceJammedAlertProperty,
        [PropertyName.Device911Alert]: exports.Device911AlertProperty,
        [PropertyName.Device911AlertEvent]: exports.Device911AlertEventProperty,
        [PropertyName.DeviceShakeAlert]: exports.DeviceShakeAlertProperty,
        [PropertyName.DeviceShakeAlertEvent]: exports.DeviceShakeAlertEventProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
        [PropertyName.DeviceLongTimeNotCloseAlert]: exports.DeviceLongTimeNotCloseAlertProperty,
        [PropertyName.DeviceWrongTryProtectAlert]: exports.DeviceWrongTryProtectAlertProperty,
    },
    [DeviceType.SMART_SAFE_7402]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSISmartSafeProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionSmartSafeProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsSmartSafeProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeSmartSafeProperty,
        [PropertyName.DeviceLeftOpenAlarm]: exports.DeviceLeftOpenAlarmProperty,
        [PropertyName.DeviceLeftOpenAlarmDuration]: exports.DeviceLeftOpenAlarmDurationProperty,
        [PropertyName.DeviceDualUnlock]: exports.DeviceDualUnlockProperty,
        [PropertyName.DevicePowerSave]: exports.DevicePowerSaveProperty,
        [PropertyName.DeviceInteriorBrightness]: exports.DeviceInteriorBrightnessProperty,
        [PropertyName.DeviceInteriorBrightnessDuration]: exports.DeviceInteriorBrightnessDurationProperty,
        [PropertyName.DeviceTamperAlarm]: exports.DeviceTamperAlarmProperty,
        [PropertyName.DeviceRemoteUnlock]: exports.DeviceRemoteUnlockProperty,
        [PropertyName.DeviceRemoteUnlockMasterPIN]: exports.DeviceRemoteUnlockMasterPINProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeSmartSafeProperty,
        [PropertyName.DeviceAlarmVolume]: exports.DeviceAlarmVolumeProperty,
        [PropertyName.DevicePromptVolume]: exports.DevicePromptVolumeProperty,
        [PropertyName.DeviceNotificationUnlockByKey]: exports.DeviceNotificationUnlockByKeyProperty,
        [PropertyName.DeviceNotificationUnlockByPIN]: exports.DeviceNotificationUnlockByPINProperty,
        [PropertyName.DeviceNotificationUnlockByFingerprint]: exports.DeviceNotificationUnlockByFingerprintProperty,
        [PropertyName.DeviceNotificationUnlockByApp]: exports.DeviceNotificationUnlockByAppProperty,
        [PropertyName.DeviceNotificationDualLock]: exports.DeviceNotificationDualLockProperty,
        [PropertyName.DeviceNotificationDualUnlock]: exports.DeviceNotificationDualUnlockProperty,
        [PropertyName.DeviceNotificationWrongTryProtect]: exports.DeviceNotificationWrongTryProtectProperty,
        [PropertyName.DeviceNotificationJammed]: exports.DeviceNotificationJammedProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedSmartSafeProperty,
        [PropertyName.DeviceJammedAlert]: exports.DeviceJammedAlertProperty,
        [PropertyName.Device911Alert]: exports.Device911AlertProperty,
        [PropertyName.Device911AlertEvent]: exports.Device911AlertEventProperty,
        [PropertyName.DeviceShakeAlert]: exports.DeviceShakeAlertProperty,
        [PropertyName.DeviceShakeAlertEvent]: exports.DeviceShakeAlertEventProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
        [PropertyName.DeviceLongTimeNotCloseAlert]: exports.DeviceLongTimeNotCloseAlertProperty,
        [PropertyName.DeviceWrongTryProtectAlert]: exports.DeviceWrongTryProtectAlertProperty,
    },
    [DeviceType.SMART_SAFE_7403]: {
        ...exports.GenericDeviceProperties,
        [PropertyName.DeviceWifiRSSI]: exports.DeviceWifiRSSISmartSafeProperty,
        [PropertyName.DeviceWifiSignalLevel]: exports.DeviceWifiSignalLevelProperty,
        [PropertyName.DeviceBattery]: exports.DeviceBatteryProperty,
        [PropertyName.DeviceWrongTryProtection]: exports.DeviceWrongTryProtectionSmartSafeProperty,
        [PropertyName.DeviceWrongTryAttempts]: exports.DeviceWrongTryAttemptsSmartSafeProperty,
        [PropertyName.DeviceWrongTryLockdownTime]: exports.DeviceWrongTryLockdownTimeSmartSafeProperty,
        [PropertyName.DeviceLeftOpenAlarm]: exports.DeviceLeftOpenAlarmProperty,
        [PropertyName.DeviceLeftOpenAlarmDuration]: exports.DeviceLeftOpenAlarmDurationProperty,
        [PropertyName.DeviceDualUnlock]: exports.DeviceDualUnlockProperty,
        [PropertyName.DevicePowerSave]: exports.DevicePowerSaveProperty,
        [PropertyName.DeviceInteriorBrightness]: exports.DeviceInteriorBrightnessProperty,
        [PropertyName.DeviceInteriorBrightnessDuration]: exports.DeviceInteriorBrightnessDurationProperty,
        [PropertyName.DeviceTamperAlarm]: exports.DeviceTamperAlarmProperty,
        [PropertyName.DeviceRemoteUnlock]: exports.DeviceRemoteUnlockProperty,
        [PropertyName.DeviceRemoteUnlockMasterPIN]: exports.DeviceRemoteUnlockMasterPINProperty,
        [PropertyName.DeviceScramblePasscode]: exports.DeviceScramblePasscodeSmartSafeProperty,
        [PropertyName.DeviceAlarmVolume]: exports.DeviceAlarmVolumeProperty,
        [PropertyName.DevicePromptVolume]: exports.DevicePromptVolumeProperty,
        [PropertyName.DeviceNotificationUnlockByKey]: exports.DeviceNotificationUnlockByKeyProperty,
        [PropertyName.DeviceNotificationUnlockByPIN]: exports.DeviceNotificationUnlockByPINProperty,
        [PropertyName.DeviceNotificationUnlockByFingerprint]: exports.DeviceNotificationUnlockByFingerprintProperty,
        [PropertyName.DeviceNotificationUnlockByApp]: exports.DeviceNotificationUnlockByAppProperty,
        [PropertyName.DeviceNotificationDualLock]: exports.DeviceNotificationDualLockProperty,
        [PropertyName.DeviceNotificationDualUnlock]: exports.DeviceNotificationDualUnlockProperty,
        [PropertyName.DeviceNotificationWrongTryProtect]: exports.DeviceNotificationWrongTryProtectProperty,
        [PropertyName.DeviceNotificationJammed]: exports.DeviceNotificationJammedProperty,
        [PropertyName.DeviceLocked]: exports.DeviceLockedSmartSafeProperty,
        [PropertyName.DeviceJammedAlert]: exports.DeviceJammedAlertProperty,
        [PropertyName.Device911Alert]: exports.Device911AlertProperty,
        [PropertyName.Device911AlertEvent]: exports.Device911AlertEventProperty,
        [PropertyName.DeviceShakeAlert]: exports.DeviceShakeAlertProperty,
        [PropertyName.DeviceShakeAlertEvent]: exports.DeviceShakeAlertEventProperty,
        [PropertyName.DeviceLowBatteryAlert]: exports.DeviceLowBatteryAlertProperty,
        [PropertyName.DeviceLongTimeNotCloseAlert]: exports.DeviceLongTimeNotCloseAlertProperty,
        [PropertyName.DeviceWrongTryProtectAlert]: exports.DeviceWrongTryProtectAlertProperty,
    },
};
exports.StationNameProperty = {
    key: "station_name",
    name: PropertyName.Name,
    label: "Name",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationModelProperty = {
    key: "station_model",
    name: PropertyName.Model,
    label: "Model",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationSerialNumberProperty = {
    key: "station_sn",
    name: PropertyName.SerialNumber,
    label: "Serial number",
    readable: true,
    writeable: false,
    type: "string",
};
exports.BaseStationProperties = {
    [exports.StationNameProperty.name]: exports.StationNameProperty,
    [exports.StationModelProperty.name]: exports.StationModelProperty,
    [exports.StationSerialNumberProperty.name]: exports.StationSerialNumberProperty,
    [exports.GenericTypeProperty.name]: exports.GenericTypeProperty,
    [exports.GenericHWVersionProperty.name]: exports.GenericHWVersionProperty,
    [exports.GenericSWVersionProperty.name]: exports.GenericSWVersionProperty,
};
exports.StationGuardModeProperty = {
    key: ParamType.GUARD_MODE,
    name: PropertyName.StationGuardMode,
    label: "Guard Mode",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "Away",
        1: "Home",
        2: "Schedule",
        3: "Custom 1",
        4: "Custom 2",
        5: "Custom 3",
        47: "Geofencing",
        63: "Disarmed",
    },
};
exports.StationGuardModeKeyPadProperty = {
    ...exports.StationGuardModeProperty,
    states: {
        0: "Away",
        1: "Home",
        2: "Schedule",
        3: "Custom 1",
        4: "Custom 2",
        5: "Custom 3",
        6: "Off",
        47: "Geofencing",
        63: "Disarmed",
    },
};
exports.StationCurrentModeProperty = {
    key: types_1.CommandType.CMD_GET_ALARM_MODE,
    name: PropertyName.StationCurrentMode,
    label: "Current Mode",
    readable: true,
    writeable: false,
    type: "number",
    states: {
        0: "Away",
        1: "Home",
        3: "Custom 1",
        4: "Custom 2",
        5: "Custom 3",
        63: "Disarmed",
    },
};
exports.StationCurrentModeKeyPadProperty = {
    ...exports.StationCurrentModeProperty,
    states: {
        0: "Away",
        1: "Home",
        3: "Custom 1",
        4: "Custom 2",
        5: "Custom 3",
        6: "Off",
        63: "Disarmed",
    },
};
exports.StationLanIpAddressProperty = {
    key: types_1.CommandType.CMD_GET_HUB_LAN_IP,
    name: PropertyName.StationLANIpAddress,
    label: "LAN IP Address",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationLanIpAddressStandaloneProperty = {
    ...exports.StationLanIpAddressProperty,
    key: "ip_addr",
};
exports.StationMacAddressProperty = {
    key: "wifi_mac",
    //key: "sub1g_mac", // are always the same
    name: PropertyName.StationMacAddress,
    label: "MAC Address",
    readable: true,
    writeable: false,
    type: "string",
};
exports.StationAlarmVolumeProperty = {
    key: types_1.CommandType.CMD_SET_HUB_SPK_VOLUME,
    name: PropertyName.StationAlarmVolume,
    label: "Alarm Volume",
    readable: true,
    writeable: true,
    type: "number",
    min: 1,
    max: 26,
    default: 26,
};
exports.StationPromptVolumeProperty = {
    key: types_1.CommandType.CMD_SET_PROMPT_VOLUME,
    name: PropertyName.StationPromptVolume,
    label: "Prompt Volume",
    readable: true,
    writeable: true,
    type: "number",
    min: 0,
    max: 26,
};
exports.StationAlarmToneProperty = {
    key: types_1.CommandType.CMD_HUB_ALARM_TONE,
    name: PropertyName.StationAlarmTone,
    label: "Alarm Tone",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        1: "Alarm sound 1",
        2: "Alarm sound 2",
    }
};
exports.StationNotificationSwitchModeScheduleProperty = {
    key: types_1.CommandType.CMD_HUB_NOTIFY_MODE,
    name: PropertyName.StationNotificationSwitchModeSchedule,
    label: "Notification Switch Mode Schedule",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationNotificationSwitchModeGeofenceProperty = {
    key: types_1.CommandType.CMD_HUB_NOTIFY_MODE,
    name: PropertyName.StationNotificationSwitchModeGeofence,
    label: "Notification Switch Mode Geofence",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationNotificationSwitchModeAppProperty = {
    key: types_1.CommandType.CMD_HUB_NOTIFY_MODE,
    name: PropertyName.StationNotificationSwitchModeApp,
    label: "Notification Switch Mode App",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationNotificationSwitchModeKeypadProperty = {
    key: types_1.CommandType.CMD_HUB_NOTIFY_MODE,
    name: PropertyName.StationNotificationSwitchModeKeypad,
    label: "Notification Switch Mode Keypad",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationNotificationStartAlarmDelayProperty = {
    key: types_1.CommandType.CMD_HUB_NOTIFY_ALARM,
    name: PropertyName.StationNotificationStartAlarmDelay,
    label: "Notification Start Alarm Delay",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationTimeFormatProperty = {
    key: types_1.CommandType.CMD_SET_HUB_OSD,
    name: PropertyName.StationTimeFormat,
    label: "Time Format",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "12h",
        1: "24h",
    },
    default: 0,
};
exports.StationSwitchModeWithAccessCodeProperty = {
    key: types_1.CommandType.CMD_KEYPAD_PSW_OPEN,
    name: PropertyName.StationSwitchModeWithAccessCode,
    label: "Switch mode with access code",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationAutoEndAlarmProperty = {
    key: types_1.CommandType.CMD_SET_HUB_ALARM_AUTO_END,
    name: PropertyName.StationAutoEndAlarm,
    label: "Auto End Alarm",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationTurnOffAlarmWithButtonProperty = {
    key: types_1.CommandType.CMD_SET_HUB_ALARM_CLOSE,
    name: PropertyName.StationTurnOffAlarmWithButton,
    label: "Turn off alarm with button",
    readable: true,
    writeable: true,
    type: "boolean",
};
exports.StationAlarmProperty = {
    key: "custom_alarm",
    name: PropertyName.StationAlarm,
    label: "Alarm",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.StationAlarmTypeProperty = {
    key: "custom_alarmType",
    name: PropertyName.StationAlarmType,
    label: "Alarm Type",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "None",
        2: "Theft",
        3: "Motion",
        4: "Manual",
        5: "Overheating",
        6: "Door",
        7: "Camera Motion",
        8: "Motion Sensor",
        9: "Camera Theft",
        10: "Camera Manual",
        11: "Camera Linkage",
        13: "Keypad",
        /*22: "App Light",
        23: "App Light Sound",
        24: "Motion App Light",
        25: "Motion App Light Alarm",*/
    },
    default: 0,
};
exports.StationAlarmArmedProperty = {
    key: "custom_alarmArmed",
    name: PropertyName.StationAlarmArmed,
    label: "Alarm Armed",
    readable: true,
    writeable: false,
    type: "boolean",
    default: false,
};
exports.StationAlarmArmDelayProperty = {
    key: "custom_alarmArmDelay",
    name: PropertyName.StationAlarmArmDelay,
    label: "Alarm Arm Delay",
    readable: true,
    writeable: true,
    type: "number",
    default: 0,
};
exports.StationAlarmDelayProperty = {
    key: "custom_alarmDelay",
    name: PropertyName.StationAlarmDelay,
    label: "Alarm Delay",
    readable: true,
    writeable: true,
    type: "number",
    default: 0,
};
exports.StationAlarmDelayTypeProperty = {
    key: "custom_alarmDelayType",
    name: PropertyName.StationAlarmDelayType,
    label: "Alarm Delay Type",
    readable: true,
    writeable: true,
    type: "number",
    states: {
        0: "None",
        2: "Theft",
        3: "Motion",
        4: "Manual",
        5: "Overheating",
        6: "Door",
        7: "Camera Motion",
        8: "Motion Sensor",
        9: "Camera Theft",
        10: "Camera Manual",
        11: "Camera Linkage",
        13: "Keypad",
        /*22: "App Light",
        23: "App Light Sound",
        24: "Motion App Light",
        25: "Motion App Light Alarm",*/
    },
    default: 0,
};
exports.StationProperties = {
    [DeviceType.STATION]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationPromptVolume]: exports.StationPromptVolumeProperty,
        [PropertyName.StationAlarmVolume]: exports.StationAlarmVolumeProperty,
        [PropertyName.StationAlarmTone]: exports.StationAlarmToneProperty,
        [PropertyName.StationNotificationSwitchModeSchedule]: exports.StationNotificationSwitchModeScheduleProperty,
        [PropertyName.StationNotificationSwitchModeGeofence]: exports.StationNotificationSwitchModeGeofenceProperty,
        [PropertyName.StationNotificationSwitchModeApp]: exports.StationNotificationSwitchModeAppProperty,
        [PropertyName.StationNotificationSwitchModeKeypad]: exports.StationNotificationSwitchModeKeypadProperty,
        [PropertyName.StationNotificationStartAlarmDelay]: exports.StationNotificationStartAlarmDelayProperty,
        [PropertyName.StationHomeSecuritySettings]: exports.StationHomeSecuritySettings,
        [PropertyName.StationAwaySecuritySettings]: exports.StationAwaySecuritySettings,
        [PropertyName.StationCustom1SecuritySettings]: exports.StationCustom1SecuritySettings,
        [PropertyName.StationCustom2SecuritySettings]: exports.StationCustom2SecuritySettings,
        [PropertyName.StationCustom3SecuritySettings]: exports.StationCustom3SecuritySettings,
        [PropertyName.StationOffSecuritySettings]: exports.StationOffSecuritySettings,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
        [PropertyName.StationAlarmArmed]: exports.StationAlarmArmedProperty,
        [PropertyName.StationAlarmArmDelay]: exports.StationAlarmArmDelayProperty,
        [PropertyName.StationAlarmDelay]: exports.StationAlarmDelayProperty,
        [PropertyName.StationAlarmDelayType]: exports.StationAlarmDelayTypeProperty,
    },
    [DeviceType.HB3]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationPromptVolume]: exports.StationPromptVolumeProperty,
        [PropertyName.StationAlarmVolume]: exports.StationAlarmVolumeProperty,
        [PropertyName.StationAlarmTone]: exports.StationAlarmToneProperty,
        [PropertyName.StationNotificationSwitchModeSchedule]: exports.StationNotificationSwitchModeScheduleProperty,
        [PropertyName.StationNotificationSwitchModeGeofence]: exports.StationNotificationSwitchModeGeofenceProperty,
        [PropertyName.StationNotificationSwitchModeApp]: exports.StationNotificationSwitchModeAppProperty,
        [PropertyName.StationNotificationSwitchModeKeypad]: exports.StationNotificationSwitchModeKeypadProperty,
        [PropertyName.StationNotificationStartAlarmDelay]: exports.StationNotificationStartAlarmDelayProperty,
        [PropertyName.StationHomeSecuritySettings]: exports.StationHomeSecuritySettings,
        [PropertyName.StationAwaySecuritySettings]: exports.StationAwaySecuritySettings,
        [PropertyName.StationCustom1SecuritySettings]: exports.StationCustom1SecuritySettings,
        [PropertyName.StationCustom2SecuritySettings]: exports.StationCustom2SecuritySettings,
        [PropertyName.StationCustom3SecuritySettings]: exports.StationCustom3SecuritySettings,
        [PropertyName.StationOffSecuritySettings]: exports.StationOffSecuritySettings,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
        [PropertyName.StationAlarmArmed]: exports.StationAlarmArmedProperty,
        [PropertyName.StationAlarmArmDelay]: exports.StationAlarmArmDelayProperty,
        [PropertyName.StationAlarmDelay]: exports.StationAlarmDelayProperty,
        [PropertyName.StationAlarmDelayType]: exports.StationAlarmDelayTypeProperty,
    },
    [DeviceType.INDOOR_CAMERA]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.INDOOR_CAMERA_1080]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.INDOOR_PT_CAMERA]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.INDOOR_COST_DOWN_CAMERA]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.INDOOR_PT_CAMERA_1080]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P_NO_LIGHT]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.INDOOR_OUTDOOR_CAMERA_2K]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.DOORBELL]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
    },
    [DeviceType.DOORBELL_SOLO]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
    },
    [DeviceType.CAMERA_FG]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
        //[PropertyName.StationNotificationSwitchModeSchedule]: StationNotificationSwitchModeScheduleProperty,
        //[PropertyName.StationNotificationSwitchModeApp]: StationNotificationSwitchModeAppProperty,
    },
    [DeviceType.SOLO_CAMERA]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.SOLO_CAMERA_PRO]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_1080]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_2K]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_SOLAR]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.FLOODLIGHT]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.FLOODLIGHT_CAMERA_8422]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.FLOODLIGHT_CAMERA_8423]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.FLOODLIGHT_CAMERA_8424]: {
        ...exports.BaseStationProperties,
        [PropertyName.StationLANIpAddress]: exports.StationLanIpAddressStandaloneProperty,
        [PropertyName.StationMacAddress]: exports.StationMacAddressProperty,
        [PropertyName.StationGuardMode]: exports.StationGuardModeProperty,
        [PropertyName.StationCurrentMode]: exports.StationCurrentModeProperty,
        [PropertyName.StationTimeFormat]: exports.StationTimeFormatProperty,
        [PropertyName.StationAlarm]: exports.StationAlarmProperty,
        [PropertyName.StationAlarmType]: exports.StationAlarmTypeProperty,
    },
    [DeviceType.LOCK_WIFI]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.LOCK_WIFI_NO_FINGER]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.LOCK_8503]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.LOCK_8504]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.LOCK_8592]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.LOCK_BLE]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.LOCK_BLE_NO_FINGER]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.SMART_SAFE_7400]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.SMART_SAFE_7401]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.SMART_SAFE_7402]: {
        ...exports.BaseStationProperties,
    },
    [DeviceType.SMART_SAFE_7403]: {
        ...exports.BaseStationProperties,
    },
};
var CommandName;
(function (CommandName) {
    CommandName["DeviceStartLivestream"] = "deviceStartLivestream";
    CommandName["DeviceStopLivestream"] = "deviceStopLivestream";
    CommandName["DeviceQuickResponse"] = "deviceQuickResponse";
    CommandName["DevicePanAndTilt"] = "devicePanAndTilt";
    CommandName["DeviceTriggerAlarmSound"] = "deviceTriggerAlarmSound";
    CommandName["DeviceStartDownload"] = "deviceStartDownload";
    CommandName["DeviceCancelDownload"] = "deviceCancelDownload";
    CommandName["DeviceLockCalibration"] = "deviceLockCalibration";
    CommandName["DeviceCalibrate"] = "deviceCalibrate";
    CommandName["DeviceAddUser"] = "deviceAddUser";
    CommandName["DeviceDeleteUser"] = "deviceDeleteUser";
    CommandName["DeviceUpdateUserPasscode"] = "deviceUpdateUserPasscode";
    CommandName["DeviceUpdateUserSchedule"] = "deviceUpdateUserSchedule";
    CommandName["DeviceUpdateUsername"] = "deviceUpdateUsername";
    CommandName["DeviceSetDefaultAngle"] = "deviceSetDefaultAngle";
    CommandName["DeviceSetPrivacyAngle"] = "deviceSetPrivacyAngle";
    CommandName["DeviceStartTalkback"] = "deviceStartTalkback";
    CommandName["DeviceStopTalkback"] = "deviceStopTalkback";
    CommandName["DeviceUnlock"] = "deviceUnlock";
    CommandName["DeviceSnooze"] = "deviceSnooze";
    CommandName["DeviceVerifyPIN"] = "deviceVerifyPIN";
    CommandName["DeviceQueryAllUserId"] = "deviceQueryAllUserId";
    CommandName["StationReboot"] = "stationReboot";
    CommandName["StationTriggerAlarmSound"] = "stationTriggerAlarmSound";
    CommandName["StationChime"] = "stationChime";
})(CommandName = exports.CommandName || (exports.CommandName = {}));
exports.DeviceCommands = {
    [DeviceType.CAMERA]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA2]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA2C]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA3]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA3C]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA2C_PRO]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA2_PRO]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA_E]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceTriggerAlarmSound,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.DOORBELL]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceQuickResponse,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.BATTERY_DOORBELL]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceQuickResponse,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.BATTERY_DOORBELL_2]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceQuickResponse,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.BATTERY_DOORBELL_PLUS]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceQuickResponse,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.DOORBELL_SOLO]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceQuickResponse,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_CAMERA]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_CAMERA_1080]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P_NO_LIGHT]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_OUTDOOR_CAMERA_2K]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_PT_CAMERA]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DevicePanAndTilt,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceCalibrate,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_PT_CAMERA_1080]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DevicePanAndTilt,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceCalibrate,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.INDOOR_COST_DOWN_CAMERA]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DevicePanAndTilt,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceCalibrate,
        CommandName.DeviceSetDefaultAngle,
        CommandName.DeviceSetPrivacyAngle,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.CAMERA_FG]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.SOLO_CAMERA]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.SOLO_CAMERA_PRO]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_1080]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_2K]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_SOLAR]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.FLOODLIGHT]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.FLOODLIGHT_CAMERA_8422]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.FLOODLIGHT_CAMERA_8423]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DevicePanAndTilt,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceCalibrate,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.FLOODLIGHT_CAMERA_8424]: [
        CommandName.DeviceStartLivestream,
        CommandName.DeviceStopLivestream,
        CommandName.DeviceStartDownload,
        CommandName.DeviceCancelDownload,
        CommandName.DeviceStartTalkback,
        CommandName.DeviceStopTalkback,
        CommandName.DeviceSnooze,
    ],
    [DeviceType.KEYPAD]: [],
    [DeviceType.LOCK_BLE]: [],
    [DeviceType.LOCK_BLE_NO_FINGER]: [],
    [DeviceType.LOCK_WIFI]: [
        CommandName.DeviceLockCalibration,
        CommandName.DeviceAddUser,
        CommandName.DeviceDeleteUser,
        CommandName.DeviceUpdateUserPasscode,
        CommandName.DeviceUpdateUserSchedule,
        CommandName.DeviceUpdateUsername,
    ],
    [DeviceType.LOCK_8503]: [
        CommandName.DeviceLockCalibration,
        CommandName.DeviceAddUser,
        CommandName.DeviceDeleteUser,
        CommandName.DeviceUpdateUserPasscode,
        CommandName.DeviceUpdateUserSchedule,
        CommandName.DeviceUpdateUsername,
    ],
    [DeviceType.LOCK_8504]: [
        CommandName.DeviceLockCalibration,
        CommandName.DeviceAddUser,
        CommandName.DeviceDeleteUser,
        CommandName.DeviceUpdateUserPasscode,
        CommandName.DeviceUpdateUserSchedule,
        CommandName.DeviceUpdateUsername,
    ],
    [DeviceType.LOCK_WIFI_NO_FINGER]: [
        CommandName.DeviceLockCalibration,
        CommandName.DeviceAddUser,
        CommandName.DeviceDeleteUser,
        CommandName.DeviceUpdateUserPasscode,
        CommandName.DeviceUpdateUserSchedule,
        CommandName.DeviceUpdateUsername,
    ],
    [DeviceType.MOTION_SENSOR]: [],
    [DeviceType.SENSOR]: [],
    [DeviceType.SMART_SAFE_7400]: [
        CommandName.DeviceUnlock,
        CommandName.DeviceVerifyPIN,
    ],
    [DeviceType.SMART_SAFE_7401]: [
        CommandName.DeviceUnlock,
        CommandName.DeviceVerifyPIN,
    ],
    [DeviceType.SMART_SAFE_7402]: [
        CommandName.DeviceUnlock,
        CommandName.DeviceVerifyPIN,
    ],
    [DeviceType.SMART_SAFE_7403]: [
        CommandName.DeviceUnlock,
        CommandName.DeviceVerifyPIN,
    ],
};
exports.StationCommands = {
    [DeviceType.STATION]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
        CommandName.StationChime,
    ],
    [DeviceType.HB3]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_CAMERA]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_CAMERA_1080]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_COST_DOWN_CAMERA]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_OUTDOOR_CAMERA_1080P_NO_LIGHT]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_OUTDOOR_CAMERA_2K]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_PT_CAMERA]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.INDOOR_PT_CAMERA_1080]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.DOORBELL]: [
        CommandName.StationReboot,
    ],
    [DeviceType.DOORBELL_SOLO]: [
        CommandName.StationReboot,
    ],
    [DeviceType.SOLO_CAMERA]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.SOLO_CAMERA_PRO]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_1080]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_2K]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.SOLO_CAMERA_SPOTLIGHT_SOLAR]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.FLOODLIGHT]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.FLOODLIGHT_CAMERA_8422]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.FLOODLIGHT_CAMERA_8423]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.FLOODLIGHT_CAMERA_8424]: [
        CommandName.StationReboot,
        CommandName.StationTriggerAlarmSound,
    ],
    [DeviceType.KEYPAD]: [],
    [DeviceType.LOCK_BLE]: [],
    [DeviceType.LOCK_BLE_NO_FINGER]: [],
    [DeviceType.LOCK_WIFI]: [],
    [DeviceType.LOCK_WIFI_NO_FINGER]: [],
};
//# sourceMappingURL=types.js.map