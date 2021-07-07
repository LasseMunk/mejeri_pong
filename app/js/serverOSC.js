
/****************
 * OSC Over UDP *
 ****************/

// Run npm install osc to use

// When sending OSC, use /your-osc-message to avoid errors
/*
var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }
    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    // socket server ip
    localAddress: "127.0.0.1",
    localPort: 57121,

    // MAX ip and port
    remoteAddress: "127.0.0.1",
    remotePort: 57120
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);

    if (oscMessage.address == '/all') {
        io.sockets.emit("message", oscMessage);   // send to all
    };

    if(oscMessage.address == '.user_1') {
        if(typeof userHashes.user_1 === "undefined" ) {
            console.log('user_1 is undefined');
        }
        else {
            if(userHashes.user_1 != 'hash_placeholder') {
                io.sockets.connected[userHashes.user_1].emit('message', oscMessage);  
            }
            else {
                console.log('user_1 is undefined');
            }
        }
    }
    if(oscMessage.address == '/user_2') {
        if(typeof userHashes.user_2 === "undefined" ) {
            console.log('user_2 is undefined');
        }
        else {
            if(userHashes.user_2 != 'hash_placeholder') {
                io.sockets.connected[userHashes.user_2].emit('message', oscMessage);  
            }
            else {
                console.log('user_2 is undefined');
            }
        }
    }  
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();
*/
/****************
 * OSC THE END  *
 ****************/