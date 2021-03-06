import CargaPage from './CargaPage'
import InicioPage from './InicioPage'
import LoginPage from './LoginPage'

import CarpetasPage from './CarpetasPage'
import FilePerfil from './FilePerfil'

import LobyPage from './LobyPage'
import LobyTecnologiasPage from './LobyTecnologiasPage'
import LobySobreNosotrosPage from './LobySobreNosotrosPage'
import DescargaPage from './DescargaPage'


import UsuarioPage from './UsuarioPage'
import UsuarioPerfilPage from './UsuarioPerfilPage'
import UsuarioRegistroPage from './UsuarioRegistroPage'
import UsuarioRegistroPageUpdate from './UsuarioRegistroPageUpdate'
import CompartidosPage from './CompartidosPage'
import TestRNF from './TestRNF'
import NotificacionPage from './NotificacionPage'
import AjustesPage from './AjustesPage'
import FileUsuariosPage from './FileUsuariosPage'
import SComponent from '../SComponent/Pages';
import RecuperarPass from './RecuperarPass'
export const getPages = () => {
    return {
        // TestRNF,
        CargaPage,
        LobyPage,
        LobyTecnologiasPage,
        LobySobreNosotrosPage,
        LoginPage,
        InicioPage,
        UsuarioPage,
        UsuarioPerfilPage,
        UsuarioRegistroPage,
        CarpetasPage,
        FilePerfil,
        DescargaPage,
        CompartidosPage,
        NotificacionPage,
        AjustesPage,
        FileUsuariosPage,
        ...RecuperarPass,
        ...SComponent,
        UsuarioRegistroPageUpdate,

    }
}