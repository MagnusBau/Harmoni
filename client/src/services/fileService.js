import axios from 'axios';
//import { userService } from "../services/userService";

let ip = "localhost";

export class FileInfo {
    document_id: number;
    name: string;
}

class FileInfoService {
    getFileInfo(eventId: number) {
        return axios.get(`http://localhost:4000/api/file/info?event=${eventId}`).then(response => response.data);
    }

    postFileInfo(name: string) {
        return axios.post('http://' + ip +':4000/api/file', name).then(response => response.data);
    }

    updatePath(id: number) {
        return axios.put('http://' + ip +':4000/api/file/path', id).then(response => response.data);
    }
}

class FileService {

}

export let fileService = new FileService();
export let fileInfoService = new FileInfoService();