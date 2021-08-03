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
        colorOpaque: "#444444"
    },
    dark: {
        colorPrimary: "#ffffff",
        colorSecondary: "#000000",
        colorTextPrimary: "#ffffff",
        backgroundColor: "#ffffff",
        colorDanger: "#C31C37",
        colorOpaque: "#444444"

    }
};

export default Themas;