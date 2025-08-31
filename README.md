# **yopricloud** backend

This project provides the server for **yopricloud**.

You can use this backend to build your own frontend.


## Configuration

Create directories `cloud`, `certs` and `scanning` inside of `src`.

```sh
cd src
mkdir cloud certs scanning
```

Put `cert.pem` and `key.pem` SSL certificates on the `certs` directory just created.

You can create a self-signed SSL certificate for development using:

```sh
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes -keyout key.pem -out cert.pem
```
> **Note:** For development mode, you can use a self-signed SSL certificate. For production, use a valid certificate issued by a trusted certificate authority like `Let's Encrypt`.

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
CLOUD_FOLDER=/cloud 
```
- **PORT**: The port on which the server will run.
- **CLOUD_FOLDER**: The name of the root folder. Feel free to change it if desired, ensuring the folder exists in src.

## How to Run the Server
### Production Mode

```sh
npm start
```
### Development Mode (with auto-reload using nodemon)
```sh
npm run dev
```