import { useState } from 'react';
import { mockData } from '../../data.js';
import NewUserModal from '../NewUser/NewUserModal';

export default function Admin({ openModal, addToast, renderDeleteUserContent }) {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleSaveNewUser = (formData) => {
    console.log('Nuevo usuario creado:', formData);
    setShowNewUserModal(false);
    addToast('Usuario creado y correo enviado', 'exito');
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      addToast(`Usuario ${userToDelete.nombre} eliminado`, 'exito');
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="fade-in space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Administración del Sistema</h2>
          <p className="text-slate-500 text-sm mt-1">Gestión de usuarios, respaldos y configuración</p>
        </div>
        <button onClick={() => setShowNewUserModal(true)} className="px-4 py-2.5 bg-institucional-700 hover:bg-institucional-800 text-white rounded-lg font-medium shadow-md transition-all flex items-center gap-2 focus-ring">
          <i className="fas fa-user-plus"></i>
          Agregar Usuario
        </button>
      </div>

      {showNewUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-xl z-10">
              <h3 className="text-lg font-bold text-slate-800">Crear nuevo usuario</h3>
              <button onClick={() => setShowNewUserModal(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 focus-ring">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <NewUserModal
                onClose={() => setShowNewUserModal(false)}
                onSave={handleSaveNewUser}
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-institucional-800 to-institucional-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-acento-400 text-2xl">
              <i className="fas fa-cloud"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg">Respaldo Automático</h3>
              <p className="text-blue-100 text-sm">Último respaldo: Hace 2 horas • Próximo: 02:00 AM</p>
            </div>
          </div>
          <button onClick={() => { addToast('Iniciando respaldo manual...', 'info'); window.setTimeout(() => addToast('Respaldo completado exitosamente', 'exito'), 2000); }} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-colors focus-ring backdrop-blur">
            <i className="fas fa-play mr-2"></i>Respaldar Ahora
          </button>
        </div>
        <div className="mt-4 bg-black/20 rounded-lg p-3 flex items-center gap-3">
          <i className="fas fa-shield-halved text-emerald-400"></i>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-blue-100">Almacenamiento utilizado</span>
              <span className="font-bold">78%</span>
            </div>
            <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-acento-400 rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Usuarios del Sistema</h3>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-2 text-slate-400 text-xs"></i>
            <input type="text" placeholder="Buscar usuario..." className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-institucional-500 focus-ring" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-5 py-3">Usuario</th>
                <th className="px-5 py-3">Rol</th>
                <th className="px-5 py-3">Área</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Último acceso</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockData.usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-institucional-100 rounded-full flex items-center justify-center text-institucional-700 font-bold text-xs">
                        {user.nombre.split(' ').map((part) => part[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-700">{user.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{user.rol}</td>
                  <td className="px-5 py-3 text-slate-600">{user.area}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => addToast('Estado de usuario actualizado', 'exito')} className="focus-ring rounded-full">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${user.activo ? 'text-emerald-700 bg-emerald-100' : 'text-slate-500 bg-slate-100'} px-2.5 py-1 rounded-full transition-colors`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.activo ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {user.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </button>
                  </td>
                  <td className="px-5 py-3 text-slate-500 text-xs">{user.ultimo}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-institucional-600 hover:bg-institucional-50 rounded transition-colors focus-ring" title="Editar">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button onClick={() => handleDeleteClick(user)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors focus-ring ml-1" title="Eliminar">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all scale-100 opacity-100">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-xl z-10">
              <h3 className="text-lg font-bold text-slate-800">Confirmar Eliminación</h3>
              <button onClick={() => { setShowDeleteModal(false); setUserToDelete(null); }} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 focus-ring">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-6">
                ¿Está seguro de eliminar al usuario <strong>{userToDelete.nombre}</strong>? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3">
                <button onClick={() => { setShowDeleteModal(false); setUserToDelete(null); }} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors focus-ring">
                  Cancelar
                </button>
                <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-md transition-colors focus-ring">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
