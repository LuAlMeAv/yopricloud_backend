# **yopricloud** backend

This project provides the server for **yopricloud**.

You can use this backend to build your own frontend.


## Configuration

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
CLOUD_FOLDER=/cloud 
```
- **PORT**: The port on which the server will run.
- **CLOUD_FOLDER**: The name of the root folder. Feel free to change it if desired, ensuring the folder exists in src.

> **Note**: To use a different folder name, modify the `CLOUD_FOLDER` variable and create the folder accordingly in `src`.

## How to Run the Server
### Production Mode

```
npm start
```
### Development Mode (with auto-reload using nodemon)
```
npm run dev
```

## API Endpoints

### **Get All Files in a Directory**

Retrieves all files within a specified directory. If the directory is empty, it returns files from the root folder.

> Replace `<<hostname>>` with your server's URL.

**GET request**:

```
<<hostname>>/api/files/all?directory=/example
```