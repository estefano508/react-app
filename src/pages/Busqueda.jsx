import { mockData } from '../data.js';

export default function Busqueda({ searchValue, setSearchValue, filteredSearchSuggestions }) {
  return (
    <div className="fade-in max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Búsqueda Inteligente</h2>
        <p className="text-slate-500">Encuentre expedientes históricos en segundos</p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className="fas fa-search text-slate-400 text-lg"></i>
        </div>
        <input id="searchInput" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-institucional-100 focus:border-institucional-500 shadow-lg transition-all focus-ring" placeholder="Busque por nombre, CURP, folio, fecha o contenido del documento..." autoComplete="off" />
      </div>

      {searchValue.trim() && (
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Resultados sugeridos
          </div>
          <div className="divide-y divide-slate-100">
            {filteredSearchSuggestions.length ? filteredSearchSuggestions.map((doc) => (
              <button key={doc.id} className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 text-sm text-slate-700 transition-colors focus-ring">
                <i className="fas fa-file-pdf text-slate-400"></i>
                <span>{doc.nombre}</span>
              </button>
            )) : (
              <div className="px-4 py-4 text-sm text-slate-500">No se encontraron resultados.</div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-institucional-300 hover:text-institucional-700 transition-colors focus-ring">
          <i className="fas fa-calendar mr-1"></i> Últimos 30 días
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-institucional-300 hover:text-institucional-700 transition-colors focus-ring">
          <i className="fas fa-file-pdf mr-1"></i> Solo PDFs
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-institucional-300 hover:text-institucional-700 transition-colors focus-ring">
          <i className="fas fa-check-circle mr-1"></i> Validados
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-institucional-300 hover:text-institucional-700 transition-colors focus-ring">
          <i className="fas fa-folder mr-1"></i> Con expediente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Resultados de búsqueda</h3>
          <span className="text-xs text-slate-500">Mostrando {filteredSearchSuggestions.length || mockData.documentosRecientes.length} resultados</span>
        </div>
        <div className="divide-y divide-slate-100">
          {(filteredSearchSuggestions.length ? filteredSearchSuggestions : mockData.documentosRecientes).map((doc) => (
            <div key={doc.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                <i className="fas fa-file-pdf"></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-800 text-sm">{doc.nombre}</h4>
                  {doc.estado === 'validado' ? (
                    <i className="fas fa-check-circle text-emerald-500 text-xs" title="Validado"></i>
                  ) : (
                    <i className="fas fa-clock text-amber-500 text-xs" title="Pendiente"></i>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-1">Expediente: <span className="text-institucional-600 font-medium">{doc.expediente}</span></p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span><i className="fas fa-hdd mr-1"></i>{doc.tamano}</span>
                  <span><i className="fas fa-clock mr-1"></i>{doc.fecha}</span>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-institucional-600 hover:bg-institucional-50 rounded-lg transition-colors focus-ring">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
