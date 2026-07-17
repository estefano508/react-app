import { mockData } from '../data.js';

export default function Dashboard({ navigate, addToast }) {
  return (
    <div className="fade-in space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <i className="fas fa-file-alt text-lg"></i>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">1,248</p>
          <p className="text-sm text-slate-500">Documentos Digitalizados</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <i className="fas fa-folder-open text-lg"></i>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+5%</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">342</p>
          <p className="text-sm text-slate-500">Expedientes Activos</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <i className="fas fa-clock text-lg"></i>
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">Urgente</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">18</p>
          <p className="text-sm text-slate-500">Pendientes de Validación</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <i className="fas fa-stopwatch text-lg"></i>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">4.2 min</p>
          <p className="text-sm text-slate-500">Tiempo Promedio por Doc.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 order-first lg:order-none">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-bolt text-acento-500"></i>
              Accesos Rápidos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'fa-camera', label: 'Digitalizar', route: 'digitalizacion' },
                { icon: 'fa-search', label: 'Buscar', route: 'busqueda' },
                { icon: 'fa-check-double', label: 'Validar', route: 'validacion' },
                { icon: 'fa-folder-plus', label: 'Expedientes', route: 'expedientes' }
              ].map((item) => (
                <button key={item.route} onClick={() => navigate(item.route)} className="p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg text-center transition-all group focus-ring">
                  <i className={`fas ${item.icon} text-2xl text-slate-400 group-hover:text-blue-500 mb-2 block`}></i>
                  <span className="text-xs font-medium text-slate-600 group-hover:text-blue-700">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4 text-sm">Digitalización Semanal</h3>
            <div className="flex items-end justify-between h-32 gap-2">
              {[45, 62, 38, 75, 55, 80, 48].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full bg-institucional-100 rounded-t relative overflow-hidden" style={{ height: `${value}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-institucional-600 rounded-t transition-all group-hover:bg-institucional-500" style={{ height: '100%' }} />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-clock-rotate-left text-institucional-600"></i>
              Documentos Recientes
            </h3>
            <button onClick={() => navigate('digitalizacion')} className="text-sm text-institucional-600 hover:text-institucional-800 font-medium focus-ring rounded px-2 py-1">
              + Nuevo
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-5 py-3">Documento</th>
                  <th className="px-5 py-3">Expediente</th>
                  <th className="px-5 py-3">Fecha</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockData.documentosRecientes.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-600">
                          <i className="fas fa-file-pdf"></i>
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{doc.nombre}</p>
                          <p className="text-xs text-slate-400">{doc.tamano}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{doc.expediente}</td>
                    <td className="px-5 py-3 text-slate-500">{doc.fecha}</td>
                    <td className="px-5 py-3">
                      {doc.estado === 'validado' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <i className="fas fa-check"></i> Validado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                          <i className="fas fa-clock"></i> Pendiente
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-slate-400 hover:text-institucional-600 p-1 focus-ring rounded" title="Ver detalle">
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
