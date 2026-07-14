import { mockData } from '../data.js';

export default function Expedientes({ openModal, renderNewExpediente, addToast }) {
  return (
    <div className="fade-in space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de Expedientes</h2>
          <p className="text-slate-500 text-sm mt-1">Organización jerárquica de documentos institucionales</p>
        </div>
        <button onClick={() => openModal('Nuevo Expediente', renderNewExpediente(), () => addToast('Expediente creado exitosamente', 'exito'))} className="px-4 py-2.5 bg-institucional-700 hover:bg-institucional-800 text-white rounded-lg font-medium shadow-md transition-all flex items-center gap-2 focus-ring">
          <i className="fas fa-folder-plus"></i>
          Nuevo Expediente
        </button>
      </div>

      <nav className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 w-fit">
        <button className="hover:text-institucional-700 font-medium"><i className="fas fa-home mr-1"></i>Archivo Central</button>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-slate-800 font-medium">Todos los Expedientes</span>
      </nav>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <i className="fas fa-search absolute left-3 top-2.5 text-slate-400"></i>
          <input type="text" placeholder="Buscar expediente..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" />
        </div>
        <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 focus-ring">
          <option>Todas las áreas</option>
          <option>Catastro</option>
          <option>Registro Civil</option>
          <option>Jurídico</option>
          <option>Obras Públicas</option>
        </select>
        <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 focus-ring">
          <option>Todos los estados</option>
          <option>Completo</option>
          <option>Pendiente</option>
          <option>En validación</option>
        </select>
        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors focus-ring">
          <i className="fas fa-filter mr-1"></i> Más filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockData.expedientes.map((exp) => (
          <div key={exp.id} className={`group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-institucional-300 transition-all cursor-pointer focus-ring`} tabIndex="0">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg ${exp.estado === 'completo' ? 'bg-emerald-50 text-emerald-600' : exp.estado === 'validando' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'} flex items-center justify-center text-xl`}>
                <i className="fas fa-folder"></i>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600" title="Opciones">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            <h4 className="font-bold text-slate-800 mb-1 line-clamp-2" title={exp.nombre}>{exp.nombre}</h4>
            <p className="text-xs text-slate-500 mb-3">{exp.ciudadano}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500"><i className="fas fa-file-alt mr-1"></i>{exp.docs} docs</span>
              <span className={`${exp.estado === 'completo' ? 'text-emerald-600 bg-emerald-50' : exp.estado === 'validando' ? 'text-blue-600 bg-blue-50' : 'text-amber-600 bg-amber-50'} px-2 py-0.5 rounded-full font-medium capitalize`}>
                {exp.estado === 'completo' ? '✓ Completo' : exp.estado === 'validando' ? '⟳ Validando' : '⌛ Pendiente'}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>{exp.tipo}</span>
              <span>{exp.fecha}</span>
            </div>
          </div>
        ))}

        <button onClick={() => openModal('Nuevo Expediente', renderNewExpediente(), () => addToast('Expediente creado exitosamente', 'exito'))} className="border-2 border-dashed border-slate-300 rounded-xl p-5 hover:border-institucional-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-slate-400 hover:text-institucional-600 gap-2 min-h-[180px] focus-ring">
          <i className="fas fa-plus text-3xl"></i>
          <span className="text-sm font-medium">Crear nuevo expediente</span>
        </button>
      </div>
    </div>
  );
}
