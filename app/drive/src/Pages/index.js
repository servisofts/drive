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
import CompartidosPage from './CompartidosPage'
import TestRNF from './TestRNF'



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
        CompartidosPage
    }
}