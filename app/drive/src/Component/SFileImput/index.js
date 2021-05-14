import React from 'react';
import ReactDOM from 'react-dom';
import { View, Text } from 'react-native';

import AppParams from '../../Params';
export const choseFile = (props, callback) => {
    var form = document.createElement("FORM");
    form.setAttribute("method", "POST");
    form.setAttribute("enctype", "multipart/form-data");

    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("name", "file");
    x.setAttribute("accept", "*");

    form.appendChild(x);

    x.addEventListener('change', () => {
        var body = new FormData(form);
        var data = JSON.stringify(props);
        body.append('data', data);
        var myInit = {
            method: 'POST',
            body: body,
            mode: 'no-cors',
        };
        var myRequest = new Request(AppParams.urlImages + "multipart", myInit);
        fetch(myRequest)
            .then(function (response) {
                if (callback) {
                    callback({
                        estado: "exito",
                        data: response.data
                    });
                }
            }).catch(error => {
                callback({
                    estado: "error",
                    error: error
                });
            })
    })
    // x.click()
    var Popup = document.createElement("div");
    Popup.id = "dropFile"
    Popup.style.width = "100%";
    Popup.style.height = "100vh";
    Popup.style.background = "#000000aa";
    Popup.style.position = "fixed";
    Popup.style.display = "flex";
    Popup.style.top = 0;
    Popup.style.left = 0;
    Popup.style.zIndex = 999;
    Popup.style.justifyContent = "center";
    Popup.style.alignItems = "center";
    Popup.addEventListener('click', () => {
        document.getElementById("dropFile").remove();
    })
    Popup.innerHTML = (`
            <div id="dropFile-area" class="dropZone" style="width:90%; height:90vh; max-width:500px; max-height:500px; background:#fff; display:'inline-block'; border-radius: 8px; justify-content:center; align-items:center; display:flex;">
                <input type='file' name='myFile' class='drop-zone__input' style="display:none;"/>
                <span style="color:#999; font-weight:bold">Drop file or click to upload!!!</span>
            </div>
    `)
    document.body.appendChild(Popup);

    var dropFileArea = document.getElementById("dropFile-area");

    document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
        const dropZoneElement = inputElement.closest(".dropZone");
        dropZoneElement.addEventListener("click", (e) => {
            inputElement.click();
            e.stopPropagation();
        });

        inputElement.addEventListener("change", (e) => {
            if (inputElement.files.length) {
                alert("change" + inputElement.files.length)
                // updateThumbnail(dropZoneElement, inputElement.files[0]);
            }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("drop-zone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
                dropZoneElement.classList.remove("drop-zone--over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();

            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                // updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            }
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

}
