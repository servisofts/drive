import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppParams from '../../Params';

const delay = ms => new Promise(res => setTimeout(res, ms));
var isLoad = false;
export const uploadHttp = async ({ props, imput }, callback) => {
    var form = document.createElement("FORM");
    form.setAttribute("method", "POST");
    // form.setAttribute("accept", "*/*");
    form.setAttribute("enctype", "multipart/form-data");
    form.appendChild(imput);
    var body = new FormData(form);
    var data = JSON.stringify(props);
    body.append('data', data);

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    // xhr.onprogress = (event) => {
    //     // event.loaded returns how many bytes are downloaded
    //     // event.total returns the total number of bytes
    //     // event.total is only available if server sends `Content-Length` header
    //     console.log(`Downloaded ${event.loaded} of ${event.total} bytes`);
    // }
    xhr.open('POST', AppParams.urlImages + "multipart", true);
    // var sBoundary = "12345";
    // xhr.setRequestHeader("Content-Type", "multipart\/form-data;");
    // if (xhr.upload) {
    //     xhr.upload.onprogress = (event) => {
    //         // event.loaded returns how many bytes are downloaded
    //         // event.total returns the total number of bytes
    //         // event.total is only available if server sends `Content-Length` header
    //         console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
    //     };
    // }
    // xhr.upload.onprogress = function (e) {
    //     if (e.lengthComputable) {
    //         var progress = (e.loaded / e.total) * 100;
    //         console.log(progress);
    //     }
    // }
    // xhr.upload.addEventListener("progress", function (e) {
    //     if (e.lengthComputable) {
    //         var progress = (e.loaded / e.total) * 100;
    //         console.log(progress);
    //     }
    // });

    xhr.onreadystatechange = function () { // Call a function when the state changes.

        if (this.readyState === XMLHttpRequest.DONE) {
            var objJson = xhr.responseText;
            callback({
                estado: "exito",
                data: objJson
            })
        }
    }

    // xhr.setRequestHeader("Content-Type", "multipart/form-data");
    // xhr.setRequestHeader("Accept", "*/*");
    // if (xhr.upload) {
    //     xhr.upload.onprogress = function (e) {
    //         var percentComplete = Math.ceil((e.loaded / e.total) * 100);
    //         console.log(percentComplete);
    //     };
    // }
    xhr.send(body);

}
export const uploadHttpFetch = async ({ props, imput }, callback) => {
    var form = document.createElement("FORM");
    form.setAttribute("method", "POST");
    form.setAttribute("enctype", "multipart/form-data");
    form.appendChild(imput);
    var body = new FormData(form);
    var data = JSON.stringify(props);
    body.append('data', data);
    var myInit = {
        method: 'POST',
        body: body,
        mode: 'no-cors',
    };
    var myRequest = new Request(AppParams.urlImages + "multipart", myInit);
    var response = await fetch(myRequest);
    const total = Number(response.headers.get('content-length'));

    const reader = response.body.getReader();
    let bytesReceived = 0;
    while (true) {
        const result = await reader.read();
        if (result.done) {
            console.log('Fetch complete');
            break;
        }
        bytesReceived += result.value.length;
        console.log('Received', bytesReceived, 'bytes of data so far');
    }
    // fetch(myRequest)
    //     .then(function (response) {
    //         if (callback) {
    //             callback({
    //                 estado: "exito",
    //                 data: response.data
    //             });
    //         }
    //     }).catch(error => {
    //         callback({
    //             estado: "error",
    //             error: error
    //         });
    //     })
}

export default class DropFileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onLoad: false
        };
        this.onUpload = this.props.onUpload;
        // this.esperar();
    }
    componentDidMount() {
        this.esperar();
    }
    esperar = async () => {
        await delay(300)
        if (this.isLoad) {
            return;
        }
        this.isLoad = true;

        console.log("Asdasdasadas----")
        document.querySelectorAll(".drop-zone__inputa").forEach(inputElement => {
            console.log("Asdasdasad")
            const dropZoneElement = inputElement.closest(".dropZonea");
            dropZoneElement.addEventListener("click", (e) => {
                // inputElement.click();
                // e.stopPropagation();
            });

            inputElement.addEventListener("change", (e) => {
                if (inputElement.files.length) {
                    alert("change" + inputElement.files.length)
                    // updateThumbnail(dropZoneElement, inputElement.files[0]);
                }
            });

            dropZoneElement.addEventListener("dragover", (e) => {
                e.preventDefault();
                // dropZoneElement.classList.add("drop-zone--over");
            });

            ["dragleave", "dragend"].forEach((type) => {
                dropZoneElement.addEventListener(type, (e) => {
                    // dropZoneElement.classList.remove("drop-zone--over");
                });
            });

            dropZoneElement.addEventListener("drop", (e) => {
                e.preventDefault();
                var Load = 0;
                if (e.dataTransfer.files.length) {
                    console.log(e)
                    inputElement.files = e.dataTransfer.files;
                }
                // if (this.state.onLoad) {
                this.onUpload(inputElement, {
                    x: e.offsetX,
                    y: e.offsetY,
                })
                // instance.state.onLoad = true;
                // }
            });
        });
    }
    render() {


        return (
            <View style={{
                width: "100%",
                height: "100%",
                // backgroundColor: "#fff",
                overflow: "hidden",
            }}>
                <div id={"dropFilea"} style={{
                    // display:"flex",
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#f00",
                }} className={"dropZonea"} onClick={() => {
                    if (this.props.onPress) this.props.onPress();
                }}>
                    <input type='file' name='file' className='drop-zone__inputa' accept="*" style={{
                        display: "none"
                    }} />
                    {this.props.children}
                </div>
            </View>
        );
    }
}
