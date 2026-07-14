import { mockData } from '../data.js';

export default function Validacion({ selectedValidationIndex, setSelectedValidationIndex, addToast }) {
  const selectedValidation = mockData.validaciones[selectedValidationIndex] || mockData.validaciones[0];

  return (
    <div className="fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Validación de Documentos</h2>
          <p className="text-slate-500 text-sm mt-1">Verificación e integración con bases de datos gubernamentales</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-200">
            <i className="fas fa-exclamation-circle mr-1"></i> 3 pendientes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-700 text-sm">Documentos por revisar</h3>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {mockData.validaciones.map((item, index) => (
                <button key={item.id} onClick={() => { setSelectedValidationIndex(index); addToast(`Mostrando validación #${index + 1}`, 'info'); }} className={`w-full text-left p-4 hover:bg-blue-50 transition-colors flex items-start gap-3 focus-ring ${index === selectedValidationIndex ? 'bg-blue-50/50 border-l-4 border-institucional-500' : ''}`}>
                  <div className="mt-0.5">
                    <i className={`fas ${item.tipo === 'error' ? 'fa-times-circle text-red-500' : 'fa-exclamation-triangle text-amber-500'} text-lg`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{item.documento}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.expediente}</p>
                    <p className={`text-xs mt-1 font-medium ${item.tipo === 'error' ? 'text-red-600' : 'text-amber-600'}`}>
                      {item.problema}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800">Detalle de Validación</h3>
              <div className="flex gap-2">
                <button onClick={() => addToast('Solicitud de revisión enviada al digitalizador', 'info')} className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors focus-ring">
                  <i className="fas fa-undo mr-1"></i> Rechazar
                </button>
                <button onClick={() => addToast('Documento validado y archivado correctamente', 'exito')} className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm focus-ring">
                  <i className="fas fa-check mr-1"></i> Validar
                </button>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Documento Original</p>
                <div className="bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-slate-400">
                    <i className="fas fa-id-card text-5xl mb-2 opacity-30"></i>
                    <p className="text-sm">Vista previa del documento</p>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur">
                    <i className="fas fa-expand mr-1"></i> Ampliar
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 focus-ring">
                    <i className="fas fa-download mr-1"></i> Descargar
                  </button>
                  <button className="flex-1 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 focus-ring">
                    <i className="fas fa-print mr-1"></i> Imprimir
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Datos Extraídos vs. Base de Datos</p>
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-emerald-800">Nombre completo</span>
                      <i className="fas fa-check-circle text-emerald-600"></i>
                    </div>
                    <p className="text-sm font-semibold text-emerald-900">María González Hernández</p>
                    <p className="text-[10px] text-emerald-600 mt-0.5">Coincide con RENAPO</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-red-800">Código Postal</span>
                      <i className="fas fa-times-circle text-red-600"></i>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-red-900 line-through">01000</p>
                      <i className="fas fa-arrow-right text-xs text-slate-400"></i>
                      <p className="text-sm font-semibold text-emerald-700">01030</p>
                    </div>
                    <p className="text-[10px] text-red-600 mt-0.5">No coincide con CURP. Sugerencia: 01030</p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-amber-800">Fecha de emisión</span>
                      <i className="fas fa-exclamation-triangle text-amber-600"></i>
                    </div>
                    <p className="text-sm font-semibold text-amber-900">15/03/2024</p>
                    <p className="text-[10px] text-amber-700 mt-0.5">Fecha futura detectada. Verificar validez.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600">CURP</span>
                      <i className="fas fa-check-circle text-emerald-600"></i>
                    </div>
                    <p className="text-sm font-mono font-semibold text-slate-800">GOHM851201MDFRNR09</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
