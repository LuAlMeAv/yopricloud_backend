const os = require('os');
const interfaces = os.networkInterfaces();

const wifi = ["wi-fi", "wlan", "wlp"];
const ethernet = ["ethernet", "eth", "enp"];

function getIpv4(PORT) {
    console.clear();
    console.log("App is running visit on:")
    console.log(`       Local:         http://localhost:${PORT}`)
    for (const iface in interfaces) {
        // Filtra interfaces externas y con IPs IPv4
        for (const alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                // Revisa el nombre de la interfaz para determinar el tipo
                const name = iface.toLowerCase();

                if (wifi.includes(name)) {
                    console.log(`       Your network:  http://${alias.address}:${PORT}`);
                } else if (ethernet.includes(name)) {
                    console.log(`       Your network:  http://${alias.address}:${PORT}`);
                }               
            }
        }
    }
}

module.exports = getIpv4;