import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// var RNFS = require("react-native-fs");
export default class TestRNF extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{
                    width: 100,
                    height: 50,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                }} onPress={() => {
                    // var path = RNFS.DocumentDirectoryPath + '/test.txt';
                    // write the file
                    // console.log("RNFS.CachesDirectoryPath: " + RNFS.CachesDirectoryPath);
                    // console.log("RNFS.DocumentDirectoryPath: " + RNFS.DocumentDirectoryPath);
                    // console.log("RNFS.DownloadDirectoryPath: " + RNFS.DownloadDirectoryPath);
                    // console.log("RNFS.ExternalDirectoryPath: " + RNFS.ExternalDirectoryPath);
                    // var path = RNFS.ExternalDirectoryPath + "/archivos";
                    // RNFS.mkdir(path, {}).then(() => {
                    //     // console.log('FILE WRITTEN! ' + path);
                    //     // RNFS.writeFile(path+"/test.txt", 'Lorem ipsum dolor sit amet', 'utf8')
                    //     //     .then((success) => {
                    //     //         console.log('FILE WRITTEN! ' + path);
                    //     //     })
                    //     //     .catch((err) => {
                    //     //         console.log(err.message);
                    //     //     });
                    //     RNFS.downloadFile({
                    //         fromUrl: "https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg",
                    //         toFile: path + "/img.jpg",
                    //         progress: (evt) => {
                    //             console.log(evt);
                    //         }
                    //     })
                    // }).catch((err) => {
                    //     console.log(err)
                    // })


                    // return;

                }}>
                    <Text>Crear</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
