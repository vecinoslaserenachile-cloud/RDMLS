import React, { useState } from 'react';

// Simulación de la tabla 'coqui_users' y 'crm_pipeline', actualizada con los nuevos personajes territoriales
const initialData = {
  columns: [
    { id: 'prospecto', title: 'Prospecto' },
    { id: 'en_contacto', title: 'En Contacto' },
    { id: 'proyecto_activo', title: 'Proyecto Activo' },
    { id: 'cerrado', title: 'Cerrado' }
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Restauración Fachada Barrio Inglés',
      columnId: 'prospecto',
      node: 'El Centro',
      assignee: 'CMR',
      avatar: 'https://i.pravatar.cc/150?u=cmr'
    },
    {
      id: 'task-2',
      title: 'Festival de Jazz Puerto Coquimbo',
      columnId: 'en_contacto',
      node: 'El Trompetista',
      assignee: 'JRG',
      avatar: 'https://i.pravatar.cc/150?u=jrg'
    },
    {
      id: 'task-3',
      title: 'Torneo Escolar Cruz del Tercer Milenio',
      columnId: 'proyecto_activo',
      node: 'Don Cruz',
      assignee: 'SLT',
      avatar: 'https://i.pravatar.cc/150?u=slt'
    },
    {
      id: 'task-4',
      title: 'Archivo Sonoro Hernán Gallardo',
      columnId: 'cerrado',
      node: 'Parte Alta',
      assignee: 'HGP',
      avatar: 'https://i.pravatar.cc/150?u=hgp'
    },
    {
      id: 'task-5',
      title: 'Mejoramiento Colectora de Aguas Servidas',
      columnId: 'prospecto',
      node: 'Tierras Blancas',
      assignee: 'MJA',
      avatar: 'https://i.pravatar.cc/150?u=mja'
    }
  ]
};

const CoquiSmartKanban = () => {
  const [tasks, setTasks] = useState(initialData.tasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // --- Lógica Drag and Drop ---
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Estética del elemento al arrastrar
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    // Actualizamos el estado para mover la tarjeta a la nueva columna
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggedTaskId ? { ...task, columnId: columnId } : task
      )
    );
    setDraggedTaskId(null);
  };

  return (
    <div className="bg-[#0a0a0a] text-white p-8 font-sans rounded-3xl border border-yellow-500/10 shadow-2xl">
      
      {/* Header del CRM */}
      <div className="mb-10 border-b border-yellow-500/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Pipeline <span className="text-yellow-400">Comunitario Coquimbo</span>
          </h1>
          <p className="text-gray-400">Gestión de iniciativas ciudadanas del ecosistema CoquiSmart Stories.</p>
        </div>
        <button className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-300 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] whitespace-nowrap">
          + Nueva Iniciativa
        </button>
      </div>

      {/* Tablero Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialData.columns.map(column => (
          <div
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
            className="bg-[#111111] border border-gray-800 rounded-xl flex flex-col min-h-[400px] max-h-[75vh]"
          >
            {/* Cabecera de la Columna */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#161616] rounded-t-xl">
              <h2 className="font-bold text-gray-200 uppercase tracking-wider text-sm">
                {column.title}
              </h2>
              <span className="bg-yellow-400/10 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                {tasks.filter(taskItem => taskItem.columnId === column.id).length}
              </span>
            </div>

            {/* Zona de Tarjetas */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
              {tasks
                .filter(task => task.columnId === column.id)
                .map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                    className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 hover:border-yellow-400/50 cursor-grab active:cursor-grabbing transition-colors group relative"
                  >
                    {/* Badge del Nodo Cultural */}
                    <div className="mb-3">
                      <span className="inline-block bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-[10px] uppercase font-bold px-2 py-1 rounded">
                        Nodo: {task.node}
                      </span>
                    </div>
                    
                    {/* Título de la Iniciativa */}
                    <h3 className="text-gray-100 font-semibold text-sm mb-4 leading-snug group-hover:text-yellow-400 transition-colors">
                      {task.title}
                    </h3>
                    
                    {/* Footer de la Tarjeta: Asignado */}
                    <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-800/50">
                      <div className="flex -space-x-2">
                        <img 
                          src={task.avatar} 
                          alt={task.assignee} 
                          className="w-7 h-7 rounded-full border-2 border-[#1a1a1a]"
                          title={`Asignado a: ${task.assignee}`}
                        />
                      </div>
                      <span className="text-gray-500 text-xs">ID: {task.id.split('-')[1]}</span>
                    </div>
                  </div>
                ))}
              
              {/* Dropzone visual (vacía) */}
              {tasks.filter(taskItem => taskItem.columnId === column.id).length === 0 && (
                <div className="border-2 border-dashed border-gray-800 rounded-lg p-8 text-center text-gray-600 text-sm">
                  Arrastra una tarjeta aquí
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoquiSmartKanban;
