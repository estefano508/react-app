export const mockData = {
  expedientes: [
    { id: 1, nombre: 'Expediente Catastral 2019', tipo: 'Catastro', fecha: '2024-01-15', docs: 12, estado: 'completo', ciudadano: 'María González' },
    { id: 2, nombre: 'Licencia de Construcción #4421', tipo: 'Obras Públicas', fecha: '2024-02-20', docs: 8, estado: 'pendiente', ciudadano: 'Constructora del Sur S.A.' },
    { id: 3, nombre: 'Registro Civil - Acta 1923', tipo: 'Registro Civil', fecha: '2024-03-10', docs: 3, estado: 'completo', ciudadano: 'José Martínez' },
    { id: 4, nombre: 'Contrato de Arrendamiento 2018', tipo: 'Jurídico', fecha: '2024-03-15', docs: 5, estado: 'validando', ciudadano: 'Gobierno Municipal' },
    { id: 5, nombre: 'Expediente Ambiental Río Norte', tipo: 'Medio Ambiente', fecha: '2024-04-01', docs: 15, estado: 'completo', ciudadano: 'EcoProyectos S.A.' },
    { id: 6, nombre: 'Pensión Alimenticia - Caso 334', tipo: 'Jurídico', fecha: '2024-04-12', docs: 7, estado: 'pendiente', ciudadano: 'Laura Pérez' }
  ],
  documentosRecientes: [
    { id: 101, nombre: 'Acta de Nacimiento - Escaneo', expediente: 'Registro Civil - Acta 1923', fecha: 'Hace 2 horas', tipo: 'PDF', tamano: '2.4 MB', estado: 'validado' },
    { id: 102, nombre: 'Plano Arquitectónico', expediente: 'Licencia #4421', fecha: 'Hace 5 horas', tipo: 'PDF', tamano: '14.1 MB', estado: 'pendiente' },
    { id: 103, nombre: 'Escritura Pública #8812', expediente: 'Expediente Catastral 2019', fecha: 'Ayer', tipo: 'PDF', tamano: '4.8 MB', estado: 'validado' },
    { id: 104, nombre: 'Informe Ambiental 2023', expediente: 'Río Norte', fecha: 'Ayer', tipo: 'PDF', tamano: '8.2 MB', estado: 'validado' }
  ],
  validaciones: [
    { id: 201, documento: 'INE - Credencial Escaneada', expediente: 'Licencia #4421', problema: 'Texto borroso en dirección', tipo: 'advertencia', fecha: '2024-04-15' },
    { id: 202, documento: 'Comprobante de Domicilio', expediente: 'Caso 334', problema: 'Fecha fuera de rango válido', tipo: 'error', fecha: '2024-04-14' },
    { id: 203, documento: 'Acta Constitutiva', expediente: 'Contrato 2018', problema: 'Campos incompletos detectados', tipo: 'advertencia', fecha: '2024-04-13' }
  ],
  notificaciones: [
    { id: 301, titulo: 'Documento requiere validación', mensaje: 'El INE escaneado necesita revisión manual', tiempo: 'Hace 10 min', tipo: 'alerta', leida: false },
    { id: 302, titulo: 'Respaldo completado', mensaje: 'La copia de seguridad automática finalizó exitosamente', tiempo: 'Hace 2 horas', tipo: 'exito', leida: false },
    { id: 303, titulo: 'Nuevo expediente asignado', mensaje: 'Se te asignó el Expediente Ambiental Río Norte', tiempo: 'Hace 5 horas', tipo: 'info', leida: true },
    { id: 304, titulo: 'OCR completado', mensaje: 'Procesamiento de 12 documentos finalizado', tiempo: 'Ayer', tipo: 'exito', leida: true },
    { id: 305, titulo: 'Error de escáner', mensaje: 'El escáner 3 reporta atasco de papel', tiempo: 'Ayer', tipo: 'alerta', leida: false }
  ],
  usuarios: [
    { id: 1, nombre: 'Ana López', rol: 'Administrador', area: 'TI', activo: true, ultimo: 'Hace 5 min' },
    { id: 2, nombre: 'Carlos Ruiz', rol: 'Archivista', area: 'Catastro', activo: true, ultimo: 'Hace 1 hora' },
    { id: 3, nombre: 'Diana Flores', rol: 'Validador', area: 'Jurídico', activo: false, ultimo: 'Hace 2 días' },
    { id: 4, nombre: 'Ernesto Vega', rol: 'Digitalizador', area: 'Registro Civil', activo: true, ultimo: 'Hace 30 min' }
  ]
};
