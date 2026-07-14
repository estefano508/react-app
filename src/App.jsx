import { useEffect, useMemo, useRef, useState } from 'react';
import { mockData } from './data.js';
import Dashboard from './pages/Dashboard.jsx';
import Digitalizacion from './pages/Digitalizacion.jsx';
import Expedientes from './pages/Expedientes.jsx';
import Busqueda from './pages/Busqueda.jsx';
import Validacion from './pages/Validacion.jsx';
import Reportes from './pages/Reportes.jsx';
import Notificaciones from './pages/Notificaciones.jsx';
import Admin from './components/Admin/Admin.jsx';
import Perfil from './pages/Perfil.jsx';

const routeLabels = {
  dashboard: 'Dashboard',
  digitalizacion: 'Digitalización de Documentos',
  expedientes: 'Expedientes',
  busqueda: 'Búsqueda Inteligente',
  validacion: 'Validación de Documentos',
  reportes: 'Reportes y Estadísticas',
  notificaciones: 'Notificaciones',
  admin: 'Administración del Sistema',
  perfil: 'Perfil de Usuario'
};

const menuRoutes = [
  { key: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
  { key: 'digitalizacion', icon: 'fa-camera', label: 'Digitalización' },
  { key: 'expedientes', icon: 'fa-folder-open', label: 'Expedientes' },
  { key: 'busqueda', icon: 'fa-search', label: 'Búsqueda Inteligente' },
  { key: 'validacion', icon: 'fa-check-double', label: 'Validación' },
  { key: 'reportes', icon: 'fa-chart-bar', label: 'Reportes' },
  { key: 'notificaciones', icon: 'fa-bell', label: 'Notificaciones' },
  { key: 'admin', icon: 'fa-users-cog', label: 'Administración' },
  { key: 'perfil', icon: 'fa-user-circle', label: 'Perfil' }
];

const toastStyles = {
  exito: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  advertencia: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  alerta: 'bg-orange-50 border-orange-200 text-orange-800'
};

const toastIcons = {
  exito: 'fa-check-circle',
  error: 'fa-times-circle',
  advertencia: 'fa-exclamation-triangle',
  info: 'fa-info-circle',
  alerta: 'fa-bell'
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [route, setRoute] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [toasts, setToasts] = useState([]);
  const [modalState, setModalState] = useState({ open: false, title: '', content: null, confirm: null });
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrStatus, setOcrStatus] = useState('idle');
  const [searchValue, setSearchValue] = useState('');
  const [selectedValidationIndex, setSelectedValidationIndex] = useState(0);
  const [selectedExpediente, setSelectedExpediente] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const fileInputRef = useRef(null);

  const selectedValidation = mockData.validaciones[selectedValidationIndex] || mockData.validaciones[0];
  const isSaveEnabled = selectedExpediente !== '' && selectedDocType !== '' && ocrProgress >= 100;

  useEffect(() => {
    const sizes = ['text-base', 'text-lg', 'text-xl'];
    document.body.classList.remove('text-base', 'text-lg', 'text-xl');
    document.body.classList.add(sizes[fontSizeLevel]);
  }, [fontSizeLevel]);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (route !== 'digitalizacion') {
      setOcrProgress(0);
      setOcrStatus('idle');
      return;
    }

    setOcrProgress(0);
    setOcrStatus('running');
    const interval = setInterval(() => {
      setOcrProgress((prev) => {
        const next = Math.min(100, prev + Math.random() * 15);
        if (next >= 100) {
          clearInterval(interval);
          setOcrStatus('done');
          addToast('OCR completado. Revise la información extraída.', 'exito');
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [route]);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (route !== 'busqueda') {
          navigate('busqueda');
        }
        document.getElementById('searchInput')?.focus();
      }
      if (e.altKey && !Number.isNaN(Number.parseInt(e.key, 10))) {
        const keyIndex = Number.parseInt(e.key, 10) - 1;
        if (menuRoutes[keyIndex]) {
          navigate(menuRoutes[keyIndex].key);
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [route]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const navigate = (nextRoute) => {
    setRoute(nextRoute);
    setSidebarOpen(false);
  };

  const login = (event) => {
    event.preventDefault();
    if (!loginUser.trim() || !loginPass.trim()) {
      addToast('Complete todos los campos', 'error');
      return;
    }

    setLoginLoading(true);
    window.setTimeout(() => {
      setIsLoggedIn(true);
      setLoginLoading(false);
      setRoute('dashboard');
      addToast('Bienvenido al Sistema de Archivo Digital', 'exito');
    }, 1200);
  };

  const logout = () => {
    if (window.confirm('¿Está seguro de cerrar su sesión?')) {
      setIsLoggedIn(false);
      setRoute('dashboard');
      setLoginUser('');
      setLoginPass('');
      setSidebarOpen(false);
      addToast('Sesión cerrada correctamente', 'info');
    }
  };

  const openModal = (title, content, confirmCallback = null) => {
    setModalState({ open: true, title, content, confirm: confirmCallback });
  };

  const closeModal = () => {
    setModalState({ ...modalState, open: false });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    addToast('Archivo cargado correctamente', 'exito');
  };

  const menuButtonClass = (itemKey) =>
    `nav-item w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors focus-ring text-left ${route === itemKey ? 'bg-white/20 border-l-4 border-acento-400' : ''}`;

  const currentBreadcrumb = routeLabels[route] || route;
  const mainMenuRoutes = menuRoutes.filter((item) => item.key !== 'admin' && item.key !== 'perfil');
  const systemMenuRoutes = menuRoutes.filter((item) => item.key === 'admin' || item.key === 'perfil');

  const filteredSearchSuggestions = useMemo(() => {
    if (!searchValue.trim()) return [];
    return mockData.documentosRecientes.filter((doc) =>
      doc.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
      doc.expediente.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  // Legacy inline route renderers removed; page components are used instead.

  const renderNewExpediente = () => (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); addToast('Expediente creado exitosamente', 'exito'); }}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del expediente *</label>
        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" placeholder="Ej. Expediente Catastral 2024" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo *</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" required>
            <option>Catastro</option>
            <option>Registro Civil</option>
            <option>Jurídico</option>
            <option>Obras Públicas</option>
            <option>Medio Ambiente</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Año *</label>
          <input type="number" defaultValue="2024" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Ciudadano / Institución *</label>
        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" placeholder="Nombre completo o razón social" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
        <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" rows="3" />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors focus-ring">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-institucional-700 hover:bg-institucional-800 text-white rounded-lg font-medium shadow-md transition-colors focus-ring">Crear Expediente</button>
      </div>
    </form>
  );

  const renderNewUser = () => (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); addToast('Usuario creado y correo enviado', 'exito'); }}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre *</label>
          <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Apellidos *</label>
          <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Correo institucional *</label>
        <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" placeholder="usuario@gobierno.gob.mx" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Rol *</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" required>
            <option>Digitalizador</option>
            <option>Validador</option>
            <option>Archivista</option>
            <option>Administrador</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Área *</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 text-sm focus-ring" required>
            <option>Archivo Central</option>
            <option>Catastro</option>
            <option>Registro Civil</option>
            <option>Jurídico</option>
            <option>TI</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors focus-ring">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-institucional-700 hover:bg-institucional-800 text-white rounded-lg font-medium shadow-md transition-colors focus-ring">Crear Usuario</button>
      </div>
    </form>
  );

  const renderDeleteUserContent = (name) => (
    <div>
      <p className="text-slate-600 mb-4">¿Está seguro de eliminar al usuario <strong>{name}</strong>? Esta acción no se puede deshacer.</p>
    </div>
  );

  const renderContent = () => {
    switch (route) {
      case 'digitalizacion':
        return (
          <Digitalizacion
            navigate={navigate}
            addToast={addToast}
            ocrStatus={ocrStatus}
            ocrProgress={ocrProgress}
            handleUploadClick={handleUploadClick}
            selectedExpediente={selectedExpediente}
            selectedDocType={selectedDocType}
            setSelectedExpediente={setSelectedExpediente}
            setSelectedDocType={setSelectedDocType}
            isSaveEnabled={isSaveEnabled}
            handleFileChange={handleFileChange}
          />
        );
      case 'expedientes':
        return <Expedientes openModal={openModal} renderNewExpediente={renderNewExpediente} addToast={addToast} />;
      case 'busqueda':
        return <Busqueda searchValue={searchValue} setSearchValue={setSearchValue} filteredSearchSuggestions={filteredSearchSuggestions} />;
      case 'validacion':
        return <Validacion selectedValidationIndex={selectedValidationIndex} setSelectedValidationIndex={setSelectedValidationIndex} addToast={addToast} />;
      case 'reportes':
        return <Reportes addToast={addToast} />;
      case 'notificaciones':
        return <Notificaciones addToast={addToast} />;
      case 'admin':
        return <Admin openModal={openModal} addToast={addToast} renderDeleteUserContent={renderDeleteUserContent} />;
      case 'perfil':
        return <Perfil addToast={addToast} />;
      default:
        return <Dashboard navigate={navigate} addToast={addToast} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-institucional-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] px-4 py-10">
        <div className="w-full max-w-md p-8 mx-auto bg-white rounded-2xl shadow-2xl fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-institucional-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-landmark text-3xl text-institucional-800"></i>
            </div>
            <h1 className="text-2xl font-bold text-institucional-900">Archivo Digital Institucional</h1>
            <p className="text-sm text-slate-500 mt-1">Sistema de Gestión Documental Gubernamental</p>
          </div>
          <form className="space-y-5" onSubmit={login}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Usuario institucional</label>
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-3 text-slate-400"></i>
                <input value={loginUser} onChange={(e) => setLoginUser(e.target.value)} type="text" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 focus:border-institucional-500 focus-ring transition-colors" placeholder="ej. jramirez" required autoComplete="username" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-3 text-slate-400"></i>
                <input value={loginPass} onChange={(e) => setLoginPass(e.target.value)} type="password" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-institucional-500 focus:border-institucional-500 focus-ring transition-colors" placeholder="••••••••" required autoComplete="current-password" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="rounded text-institucional-600 focus:ring-institucional-500" />
                <span className="ml-2 text-slate-600">Recordar sesión</span>
              </label>
              <a href="#" className="text-institucional-600 hover:text-institucional-800 font-medium">¿Olvidó su contraseña?</a>
            </div>
            <button type="submit" disabled={loginLoading} className="w-full py-2.5 bg-institucional-800 hover:bg-institucional-900 text-white font-semibold rounded-lg shadow-lg shadow-institucional-500/30 transition-all transform hover:scale-[1.02] focus-ring disabled:opacity-60 disabled:cursor-not-allowed">
              {loginLoading ? (<><i className="fas fa-circle-notch fa-spin mr-2" /> Verificando...</>) : 'Ingresar al Sistema'}
            </button>
          </form>
          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <i className="fas fa-shield-halved text-amber-600 mt-0.5"></i>
            <p className="text-xs text-amber-800">Este sistema está protegido. El acceso no autorizado está penado conforme a la Ley de Archivos.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <header className="lg:hidden bg-institucional-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <button onClick={() => setSidebarOpen((value) => !value)} className="p-2 hover:bg-white/10 rounded-lg focus-ring" aria-label="Abrir menú">
          <i className="fas fa-bars text-xl"></i>
        </button>
        <div className="flex items-center gap-2">
          <i className="fas fa-landmark text-xl"></i>
          <span className="font-semibold">Archivo Digital</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => { setDarkMode((prev) => !prev); addToast(darkMode ? 'Modo claro activado' : 'Modo oscuro activado', 'info'); }} className="p-2 hover:bg-white/10 rounded-lg focus-ring" title="Modo oscuro">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
          </button>
          <button onClick={() => navigate('notificaciones')} className="p-2 hover:bg-white/10 rounded-lg relative focus-ring" aria-label="Notificaciones">
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-institucional-900" />
          </button>
        </div>
      </header>

      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-institucional-900 text-white transform transition-transform duration-300 shadow-xl flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <i className="fas fa-landmark text-xl text-acento-400"></i>
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Archivo Digital</h2>
              <p className="text-xs text-slate-300">Institución Gubernamental</p>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-1" role="navigation" aria-label="Menú principal">
            {mainMenuRoutes.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key)} className={menuButtonClass(item.key)}>
                <i className={`fas ${item.icon} w-5 text-center`} />
                <span>{item.label}</span>
                {(item.key === 'validacion' && <span className="ml-auto bg-red-500 text-xs font-bold px-2 py-0.5 rounded-full">3</span>) || (item.key === 'notificaciones' && <span className="ml-auto bg-acento-500 text-institucional-900 text-xs font-bold px-2 py-0.5 rounded-full">5</span>)}
              </button>
            ))}

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300 font-semibold mb-3">Sistema</p>
              <div className="space-y-1">
                {systemMenuRoutes.map((item) => (
                  <button key={item.key} onClick={() => navigate(item.key)} className={menuButtonClass(item.key)}>
                    <i className={`fas ${item.icon} w-5 text-center`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
          <div className="mt-auto p-4 border-t border-white/10">
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors focus-ring">
              <i className="fas fa-sign-out-alt w-5 text-center"></i>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {sidebarOpen ? <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm" /> : null}

        <main className="flex-1 flex flex-col min-w-0 lg:ml-64">
          <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="flex items-center gap-4 text-sm text-slate-500" id="breadcrumbs">
              <span className="font-medium text-slate-800">Inicio</span>
              <i className="fas fa-chevron-right text-xs"></i>
              <span className="font-medium text-slate-800">{currentBreadcrumb}</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => { setFontSizeLevel((prev) => (prev + 1) % 3); addToast(`Tamaño de texto: ${['Normal', 'Grande', 'Extra Grande'][ (fontSizeLevel + 1) % 3 ]}`, 'info'); }} className="p-2 text-slate-500 hover:text-institucional-700 hover:bg-slate-100 rounded-lg focus-ring" title="Ajustar tamaño de texto">
                <i className="fas fa-font"></i>
              </button>
              <button onClick={() => { setHighContrast((prev) => !prev); addToast(highContrast ? 'Alto contraste desactivado' : 'Alto contraste activado', 'info'); }} className="p-2 text-slate-500 hover:text-institucional-700 hover:bg-slate-100 rounded-lg focus-ring" title="Alto contraste">
                <i className="fas fa-adjust"></i>
              </button>
              <button onClick={() => { setDarkMode((prev) => !prev); addToast(darkMode ? 'Modo claro activado' : 'Modo oscuro activado', 'info'); }} className="p-2 text-slate-500 hover:text-institucional-700 hover:bg-slate-100 rounded-lg focus-ring" title="Modo oscuro">
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
              <div className="h-6 w-px bg-slate-200" />
              <button onClick={() => navigate('notificaciones')} className="relative p-2 text-slate-500 hover:text-institucional-700 hover:bg-slate-100 rounded-lg focus-ring">
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <button onClick={() => navigate('perfil')} className="flex items-center gap-3 pl-3 border-l border-slate-200 hover:bg-slate-50 rounded-lg p-1 pr-3 transition-colors focus-ring">
                <div className="w-8 h-8 bg-institucional-100 rounded-full flex items-center justify-center text-institucional-700 font-bold text-sm">JR</div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700 leading-tight">Juan Ramírez</p>
                  <p className="text-xs text-slate-500">Archivista Senior</p>
                </div>
              </button>
            </div>
          </header>
          <div className="flex-1 p-4 lg:p-8 overflow-y-auto">{renderContent()}</div>
        </main>
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transform transition-all duration-300 translate-y-0 opacity-100 ${toastStyles[toast.type] || toastStyles.info}`}>
            <i className={`fas ${toastIcons[toast.type] || toastIcons.info} text-lg`} />
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>

      {modalState.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-xl z-10">
              <h3 className="text-lg font-bold text-slate-800">{modalState.title}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 focus-ring">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">{modalState.content}</div>
            {modalState.confirm ? (
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-xl">
                <button onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg font-medium transition-colors focus-ring">Cancelar</button>
                <button onClick={() => { modalState.confirm(); closeModal(); }} className="px-4 py-2 bg-institucional-700 hover:bg-institucional-800 text-white rounded-lg font-medium shadow-md transition-colors focus-ring">Confirmar</button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
