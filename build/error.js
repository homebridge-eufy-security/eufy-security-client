"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinNotVerifiedError = exports.UpdateUserPasscodeError = exports.UpdateUserScheduleError = exports.UpdateUserUsernameError = exports.DeleteUserError = exports.AddUserError = exports.StationConnectTimeoutError = exports.TalkbackError = exports.LivestreamError = exports.ReadOnlyPropertyError = exports.InvalidCommandValueError = exports.InvalidPropertyValueError = exports.RTSPPropertyNotEnabledError = exports.WrongStationError = exports.NotSupportedError = exports.DeviceNotFoundError = exports.StationNotFoundError = exports.InvalidLanguageCodeError = exports.InvalidCountryCodeError = void 0;
class InvalidCountryCodeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InvalidCountryCodeError.name;
    }
}
exports.InvalidCountryCodeError = InvalidCountryCodeError;
class InvalidLanguageCodeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InvalidLanguageCodeError.name;
    }
}
exports.InvalidLanguageCodeError = InvalidLanguageCodeError;
class StationNotFoundError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = StationNotFoundError.name;
    }
}
exports.StationNotFoundError = StationNotFoundError;
class DeviceNotFoundError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = DeviceNotFoundError.name;
    }
}
exports.DeviceNotFoundError = DeviceNotFoundError;
class NotSupportedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = NotSupportedError.name;
    }
}
exports.NotSupportedError = NotSupportedError;
class WrongStationError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = WrongStationError.name;
    }
}
exports.WrongStationError = WrongStationError;
class RTSPPropertyNotEnabledError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = RTSPPropertyNotEnabledError.name;
    }
}
exports.RTSPPropertyNotEnabledError = RTSPPropertyNotEnabledError;
class InvalidPropertyValueError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InvalidPropertyValueError.name;
    }
}
exports.InvalidPropertyValueError = InvalidPropertyValueError;
class InvalidCommandValueError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InvalidCommandValueError.name;
    }
}
exports.InvalidCommandValueError = InvalidCommandValueError;
class ReadOnlyPropertyError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ReadOnlyPropertyError.name;
    }
}
exports.ReadOnlyPropertyError = ReadOnlyPropertyError;
class LivestreamError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = LivestreamError.name;
    }
}
exports.LivestreamError = LivestreamError;
class TalkbackError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = TalkbackError.name;
    }
}
exports.TalkbackError = TalkbackError;
class StationConnectTimeoutError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = StationConnectTimeoutError.name;
    }
}
exports.StationConnectTimeoutError = StationConnectTimeoutError;
class AddUserError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = AddUserError.name;
    }
}
exports.AddUserError = AddUserError;
class DeleteUserError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = DeleteUserError.name;
    }
}
exports.DeleteUserError = DeleteUserError;
class UpdateUserUsernameError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UpdateUserUsernameError.name;
    }
}
exports.UpdateUserUsernameError = UpdateUserUsernameError;
class UpdateUserScheduleError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UpdateUserScheduleError.name;
    }
}
exports.UpdateUserScheduleError = UpdateUserScheduleError;
class UpdateUserPasscodeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UpdateUserPasscodeError.name;
    }
}
exports.UpdateUserPasscodeError = UpdateUserPasscodeError;
class PinNotVerifiedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = PinNotVerifiedError.name;
    }
}
exports.PinNotVerifiedError = PinNotVerifiedError;
//# sourceMappingURL=error.js.map