export default function Reportes({ addToast }) {
  return (
    <div className="fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reportes y Estadísticas</h2>
          <p className="text-slate-500 text-sm mt-1">Analítica de productividad y calidad del archivo</p>
        </div>
        <button onClick={() => addToast('Generando reporte PDF...', 'info')} className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors focus-ring flex items-center gap-2">
          <i className="fas fa-download"></i>
          Exportar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{
          title: 'Digitalización', value: '847', trend: '+23%', color: 'emerald', width: '78%'
        }, {
          title: 'Precisión OCR', value: '94.2%', trend: '+2%', color: 'emerald', width: '94%'
        }, {
          title: 'Tiempo Resp.', value: '1.2 días', trend: '-12%', color: 'amber', width: '45%'
        }, {
          title: 'Errores', value: '23', trend: '-8%', color: 'red', width: '12%'
        }].map((item) => (
          <div key={item.title} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">{item.title}</span>
              <span className={`text-${item.color}-600 text-xs font-bold`}><i className="fas fa-arrow-up mr-1"></i>{item.trend}</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{item.value}</p>
            <p className="text-xs text-slate-500 mt-1">{item.title === 'Errores' ? 'Inconsistencias detectadas' : item.title === 'Tiempo Resp.' ? 'Promedio de validación' : item.title === 'Digitalización' ? 'Documentos este mes' : 'Promedio de confianza'}</p>
            <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${item.color === 'emerald' ? 'bg-emerald-500' : item.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: item.width }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-6">Productividad del Personal</h3>
          <div className="space-y-4">
            {[
              { name: 'Ana López', docs: 145, color: 'bg-institucional-600' },
              { name: 'Carlos Ruiz', docs: 132, color: 'bg-blue-500' },
              { name: 'Ernesto Vega', docs: 128, color: 'bg-indigo-500' },
              { name: 'Diana Flores', docs: 98, color: 'bg-slate-400' },
              { name: 'Juan Ramírez', docs: 87, color: 'bg-slate-300' }
            ].map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{item.name}</span>
                  <span className="text-slate-500 font-semibold">{item.docs} docs</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all`} style={{ width: `${(item.docs / 150) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-6">Tendencia de Digitalización</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {[
              { m: 'Ene', v: 420 },
              { m: 'Feb', v: 580 },
              { m: 'Mar', v: 490 },
              { m: 'Abr', v: 720 },
              { m: 'May', v: 650 },
              { m: 'Jun', v: 840 }
            ].map((item) => (
              <div key={item.m} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full bg-slate-100 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-institucional-500 rounded-t transition-all group-hover:bg-institucional-400" style={{ height: `${(item.v / 900) * 100}%` }} />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.v} docs
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Registro de Actividad Reciente</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Usuario</th>
              <th className="px-5 py-3 text-left font-medium">Acción</th>
              <th className="px-5 py-3 text-left font-medium">Documento/Expediente</th>
              <th className="px-5 py-3 text-left font-medium">Fecha</th>
              <th className="px-5 py-3 text-left font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { user: 'Ana López', action: 'Digitalización', item: 'Acta de Nacimiento #1923', time: 'Hace 15 min', status: 'Completado', tone: 'emerald' },
              { user: 'Carlos Ruiz', action: 'Validación', item: 'INE - Credencial', time: 'Hace 42 min', status: 'Pendiente', tone: 'amber' },
              { user: 'Sistema', action: 'Respaldo Automático', item: 'Base de datos completa', time: 'Hace 2 horas', status: 'Exitoso', tone: 'emerald' }
            ].map((item) => (
              <tr key={item.user + item.time} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-700">{item.user}</td>
                <td className="px-5 py-3 text-slate-600">{item.action}</td>
                <td className="px-5 py-3 text-slate-600">{item.item}</td>
                <td className="px-5 py-3 text-slate-500">{item.time}</td>
                <td className="px-5 py-3"><span className={`text-${item.tone}-600 bg-${item.tone}-50 px-2 py-0.5 rounded-full text-xs font-medium`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
