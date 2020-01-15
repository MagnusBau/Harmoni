import axios from 'axios';
//import { userService } from "../services/userService";

let ip = "localhost";

export class FileInfo {
    document_id: number;
    name: string;
}

class FileInfoService {
    getFileInfo(eventId: number) {
        console.log(eventId);
        return axios.get(`http://localhost:4000/api/file/info/${eventId}`).then(response => response.data);
    }

    postFileInfo(name: string, eventId: number, encodedFile: FormData) {
        console.log(encodedFile);
        return axios.post(`http://` + ip +`:4000/api/file/upload/${eventId}`,
            {"name": name,
            "encodedFile": encodedFile});
    }

    updatePath(id: number) {
        return axios.put('http://' + ip +':4000/api/file/path', id).then(response => response.data);
    }
}

class FileService {

}

export let fileService = new FileService();
export let fileInfoService = new FileInfoService();