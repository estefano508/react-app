import { mockData } from '../data.js';

export default function Notificaciones({ addToast }) {
  return (
    <div className="fade-in max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Notificaciones</h2>
          <p className="text-slate-500 text-sm mt-1">Alertas y mensajes del sistema</p>
        </div>
        <button onClick={() => addToast('Todas las notificaciones marcadas como leídas', 'exito')} className="text-sm text-institucional-600 hover:text-institucional-800 font-medium focus-ring rounded px-2 py-1">
          Marcar todas como leídas
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button className="flex-1 py-3 text-sm font-medium text-institucional-700 border-b-2 border-institucional-600 bg-blue-50/50">Todas</button>
          <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">No leídas</button>
          <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">Alertas</button>
        </div>
        <div className="divide-y divide-slate-100">
          {mockData.notificaciones.map((item) => (
            <div key={item.id} className={`p-4 hover:bg-slate-50 transition-colors flex items-start gap-4 ${!item.leida ? 'bg-blue-50/30' : ''}`}>
              <div className="mt-1">
                {item.tipo === 'exito' ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><i className="fas fa-check"></i></div>
                ) : item.tipo === 'alerta' ? (
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="fas fa-exclamation"></i></div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><i className="fas fa-info"></i></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className={`font-semibold text-slate-800 text-sm ${!item.leida ? 'text-institucional-800' : ''}`}>{item.titulo}</h4>
                  {!item.leida ? <span className="w-2 h-2 bg-institucional-500 rounded-full" /> : null}
                </div>
                <p className="text-sm text-slate-600 mb-1">{item.mensaje}</p>
                <p className="text-xs text-slate-400">{item.tiempo}</p>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-500 focus-ring rounded" title="Marcar como leída">
                <i className={`fas ${item.leida ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
