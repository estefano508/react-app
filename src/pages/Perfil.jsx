export default function Perfil({ addToast }) {
  return (
    <div className="fade-in max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-institucional-800 to-institucional-900" />
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6 flex items-end justify-between">
            <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
              <div className="w-full h-full bg-institucional-100 rounded-xl flex items-center justify-center text-3xl font-bold text-institucional-800">
                JR
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors focus-ring shadow-sm">
              <i className="fas fa-camera mr-2"></i>Cambiar foto
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Juan Ramírez</h2>
          <p className="text-slate-500 mb-6">Archivista Senior • Archivo Central</p>
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); addToast('Perfil actualizado correctamente', 'exito'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                <input type="text" defaultValue="Juan Ramírez" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Correo institucional</label>
                <input type="email" defaultValue="j.ramirez@gobierno.gob.mx" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Área</label>
                <input type="text" value="Archivo Central" disabled className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rol</label>
                <input type="text" value="Archivista Senior" disabled className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed" />
              </div>
            </div>
            <div className="border-t border-slate-100 pt-5">
              <h3 className="font-bold text-slate-800 mb-4">Cambiar contraseña</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña actual</label>
                  <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nueva contraseña</label>
                    <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar nueva</label>
                    <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-5">
              <h3 className="font-bold text-slate-800 mb-4">Preferencias</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Notificaciones por correo</p>
                    <p className="text-xs text-slate-500">Recibir alertas de validación pendiente</p>
                  </div>
                  <input type="checkbox" checked className="w-5 h-5 text-institucional-600 rounded focus:ring-institucional-500" readOnly />
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Modo compacto</p>
                    <p className="text-xs text-slate-500">Reducir espaciado en tablas y listas</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-institucional-600 rounded focus:ring-institucional-500" />
                </label>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="px-6 py-2.5 bg-institucional-700 hover:bg-institucional-800 text-white rounded-lg font-medium shadow-md transition-all focus-ring">
                <i className="fas fa-save mr-2"></i>Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
