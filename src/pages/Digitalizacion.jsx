import { mockData } from '../data.js';

export default function Digitalizacion({ navigate, addToast, ocrStatus, ocrProgress, handleUploadClick, selectedExpediente, selectedDocType, setSelectedExpediente, setSelectedDocType, isSaveEnabled, handleFileChange }) {
  return (
    <div className="fade-in max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Digitalización de Documentos</h2>
          <p className="text-slate-500 text-sm mt-1">Capture, procese y archive documentos físicos</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 focus-ring">
            <i className="fas fa-question-circle mr-2"></i>Ayuda
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-institucional-700 bg-institucional-50 px-3 py-1.5 rounded-full border border-institucional-200">
          <span className="w-5 h-5 rounded-full bg-institucional-700 text-white flex items-center justify-center text-xs">1</span>
          Capturar
        </div>
        <i className="fas fa-chevron-right text-xs text-slate-300"></i>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white">
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">2</span>
          Revisar OCR
        </div>
        <i className="fas fa-chevron-right text-xs text-slate-300"></i>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white">
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">3</span>
          Guardar
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-camera text-institucional-600"></i>
              Fuente de Captura
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button type="button" onClick={() => addToast('Conectando con escáner institucional...', 'info')} className="p-4 border-2 border-slate-200 hover:border-institucional-500 rounded-xl text-center transition-all group focus-ring bg-slate-50 hover:bg-blue-50">
                <i className="fas fa-scanner text-2xl text-slate-400 group-hover:text-institucional-600 mb-2 block"></i>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-institucional-700">Escáner</span>
              </button>
              <button type="button" onClick={() => addToast('Accediendo a cámara del dispositivo...', 'info')} className="p-4 border-2 border-slate-200 hover:border-institucional-500 rounded-xl text-center transition-all group focus-ring bg-slate-50 hover:bg-blue-50">
                <i className="fas fa-mobile-alt text-2xl text-slate-400 group-hover:text-institucional-600 mb-2 block"></i>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-institucional-700">Cámara</span>
              </button>
              <button type="button" onClick={handleUploadClick} className="p-4 border-2 border-slate-200 hover:border-institucional-500 rounded-xl text-center transition-all group focus-ring bg-slate-50 hover:bg-blue-50">
                <i className="fas fa-cloud-upload-alt text-2xl text-slate-400 group-hover:text-institucional-600 mb-2 block"></i>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-institucional-700">Subir</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-institucional-400 hover:bg-blue-50/30 transition-all cursor-pointer relative overflow-hidden" onClick={handleUploadClick}>
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <i className="fas fa-file-import text-9xl text-institucional-900"></i>
              </div>
              <i className="fas fa-cloud-upload-alt text-4xl text-slate-300 mb-3"></i>
              <p className="text-sm font-medium text-slate-600">Arrastre archivos aquí o haga clic para seleccionar</p>
              <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG hasta 50MB</p>
            </div>

            <div className="mt-4 relative bg-slate-100 rounded-lg overflow-hidden border border-slate-200" style={{ height: 200 }}>
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <i className="fas fa-id-card text-4xl mb-2 opacity-50"></i>
                  <p className="text-xs">Vista previa del documento</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur">
                <i className="fas fa-image mr-1"></i> 1200 x 800 px
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-brain text-institucional-600"></i>
              Procesamiento Inteligente (OCR)
            </h3>
            <div className={`${ocrStatus === 'running' ? '' : 'hidden'} mb-4`}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Analizando documento...</span>
                <span className="text-institucional-600 font-bold">{Math.round(ocrProgress)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-institucional-600 h-full rounded-full transition-all duration-300" style={{ width: `${ocrProgress}%` }} />
              </div>
            </div>
            <div className="mb-4">
              {ocrStatus === 'done' ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Confianza: 94%</span>
                    <span className="text-emerald-600 font-medium"><i className="fas fa-check-circle mr-1"></i>OCR Exitoso</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-700">
                    <p><strong>Nombre:</strong> María González Hernández</p>
                    <p><strong>CURP:</strong> GOHM851201MDFRNR09</p>
                    <p><strong>Dirección:</strong> Av. Revolución 123, Col. Centro</p>
                    <p><strong>Fecha:</strong> 15 de marzo de 2024</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>Se detectó posible inconsistencia en el código postal. Verifique manualmente.</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                  <i className="fas fa-robot text-3xl mb-2"></i>
                  <p className="text-sm">El texto extraído aparecerá aquí después de la digitalización</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-folder text-institucional-600"></i>
              Asignación a Expediente
            </h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (isSaveEnabled) addToast('Documento guardado correctamente', 'exito'); }}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expediente destino *</label>
                <select value={selectedExpediente} onChange={(e) => setSelectedExpediente(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 focus:border-institucional-500 text-sm focus-ring" required>
                  <option value="">Seleccione un expediente...</option>
                  {mockData.expedientes.map((exp) => (
                    <option key={exp.id} value={exp.id}>{exp.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de documento *</label>
                <select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 focus:border-institucional-500 text-sm focus-ring" required>
                  <option value="">Seleccione...</option>
                  <option>Identificación oficial</option>
                  <option>Comprobante de domicilio</option>
                  <option>Acta constitutiva</option>
                  <option>Escritura pública</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Observaciones</label>
                <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 focus:border-institucional-500 text-sm focus-ring" rows="2" placeholder="Notas adicionales..." />
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <i className="fas fa-info-circle text-blue-500"></i>
                <span>Los campos marcados con * son obligatorios para habilitar el guardado.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => navigate('expedientes')} className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors focus-ring">
                  Cancelar
                </button>
                <button type="submit" disabled={!isSaveEnabled} className={`flex-1 px-4 py-2.5 bg-institucional-700 text-white rounded-lg font-medium transition-all focus-ring flex items-center justify-center gap-2 ${!isSaveEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-institucional-800 shadow-lg'}`}>
                  <i className="fas fa-save"></i>
                  Guardar Documento
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
