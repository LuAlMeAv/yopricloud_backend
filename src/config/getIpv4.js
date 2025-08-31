const os = require('os');

const interfaces = os.networkInterfaces();

function getIpv4(PORT) {
    console.clear();
    console.log(`App is runing, visit on:`);
    console.log(`          Local:         https://localhost:${PORT}`);

    for (const iface in interfaces) {
        for (const alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                const name = iface.toLowerCase();

                console.log(`          Your network:  https://${alias.address}:${PORT}`);
            }
        }
    }
}

module.exports = getIpv4;