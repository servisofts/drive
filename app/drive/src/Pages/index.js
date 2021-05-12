import CargaPage from './CargaPage'
import InicioPage from './InicioPage'
import LoginPage from './LoginPage'

import CarpetasPage from './CarpetasPage'

import LobyPage from './LobyPage'
import LobyTecnologiasPage from './LobyTecnologiasPage'
import LobySobreNosotrosPage from './LobySobreNosotrosPage'


import UsuarioPage from './UsuarioPage'
import UsuarioRegistroPage from './UsuarioRegistroPage'



export const getPages =() => {
    return {
        CargaPage,
        LobyPage,
        LobyTecnologiasPage,
        LobySobreNosotrosPage,
        LoginPage,
        InicioPage,
        UsuarioPage,
        UsuarioRegistroPage,
        CarpetasPage
    }
}