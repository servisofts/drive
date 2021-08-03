import { StyleSheet, View, ColorPropType } from 'react-native';
export type propsTypeText = {
    colorPrimary: String,
    colorSecondary: Stirng,
}
export type propsType = {
    colorPrimary: ColorPropType,
    colorSecondary: ColorPropType,
    colorTextPrimary: ColorPropType,
    colorTextSecondary: ColorPropType,
    backgroundColor: ColorPropType,
    colorDanger: ColorPropType,
    colorOpaque: ColorPropType,

}
const Themas = {
    default: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff",
        backgroundColor: "#000000",
        colorTextPrimary: "#ffffff",
        colorDanger: "#C31C37",
        colorOpaque: "#aaaaaa"
    },
    dark: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff",
        colorTextPrimary: "#ffffff",
        backgroundColor: "#dddddd",
        colorDanger: "#C31C37",
        colorOpaque: "#884444"

    }
};

export default Themas;