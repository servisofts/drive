import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import AppParams from '../../Params';
import DocumentPicker from 'react-native-document-picker';

export const choseFile = (props, callback) => {
    var options = {
        title: 'Seleccionar una Foto',
        takePhotoButtonTitle: "Tomar Foto...",
        chooseFromLibraryButtonTitle: "Elegir de la Biblioteca...",
        allowEditing: true,
        mediaType: 'photo',
        cancelButtonTitle: "Cancelar",
        storageOptions: {
            skipBackup: true,
            // path: 'image',
            privateDirectory: true
        },
    };
    DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
    }).then((uri) => {
        UploadFile({
            data: uri,
            type: uri.type,
            name: uri.name,
            obj: props
        }, callback);
    });
    // ImagePicker.showImagePicker(options, response => {
    //     if (response.didCancel) {
    //         console.log("upload")
    //         return {}
    //     } else if (response.error) {
    //         console.log(response.error)
    //         return {}
    //     } else if (response.customButton) {
    //         console.log("upload")
    //         return {}
    //     } else {
    //         // alert("");
    //         // console.log(response)
    //         ImageResizer.createResizedImage("data:image/jpeg;base64," + response.data, 1024, 1024, 'PNG', 100).then((uri) => {
    //             var arr = uri.name.split(".");
    //             UploadFile({
    //                 data: uri,
    //                 type: "image/png",
    //                 name: uri.name,
    //                 obj: props
    //             }, callback);
    //         }).catch(err => {
    //             console.log("upload")
    //             callback({
    //                 estado: "error",
    //                 error: err
    //             })
    //         });

    //     }
    // });
    return {}
}

const UploadFile = (props, callback) => {
    console.log("ENTRO UPLOAD: ");
    var photo = {
        type: props.type,
        name: props.name,
        uri: Platform.OS === 'android'
            ? props.data.uri
            : props.data.uri.replace('file://', ''),
    };
    var body = new FormData();
    body.append('data', JSON.stringify(props.obj));
    body.append('file', photo);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', AppParams.urlImages + "multipart");
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE) {
            var objJson = xhr.responseText;
            callback({
                estado: "exito",
                data: objJson
            })
        }
    }
    xhr.send(body);
}