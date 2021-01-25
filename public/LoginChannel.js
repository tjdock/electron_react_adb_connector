"use strict";
exports.__esModule = true;
exports.LoginChannel = void 0;
var child_process_1 = require("child_process");
var LoginChannel = /** @class */ (function () {
    function LoginChannel() {
    }
    LoginChannel.prototype.getName = function () {
        return 'login';
    };
    LoginChannel.prototype.handle = function (event, request) {
        if (!request.responseChannel) {
            request.responseChannel = this.getName() + "_response";
        }
        //event.sender.send(request.responseChannel, { kernel: execSync('node -v').toString() });
        var result = {
            success: true,
            data: child_process_1.execSync('node -v').toString()
        };
        console.log(result);
        event.sender.send(request.responseChannel, result);
    };
    return LoginChannel;
}());
exports.LoginChannel = LoginChannel;
