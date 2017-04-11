import "cesium/Source/Widgets/widgets.css"
import buildModuleUrl from "cesium/Source/Core/buildModuleUrl"
buildModuleUrl.setBaseUrl('assets/cesium')

import Globe3d from './Globe3d'

const globe = new Globe3d()
