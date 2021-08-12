import { Platform } from 'react-native';
import { Log } from '../SSLog';
import * as Pages from '../Pages'

var store;
var curNavPage;
export const init = (_store) => {
    store = _store;
    Log("Navigation inicializado desde " + Platform.OS, "35");
    var SSNavigation  = require('./SSNavigation');
    return SSNavigation.init(Pages);
}
export const setProps = (props) => {
    curNavPage = props.navigation;
}
export const navigate = (page,dataSend) => {
    curNavPage.navigate(page);
}