// Helper para crear tablas a partir de arrays de objetos
function buildTable(containerId, data, editable = false) {
  const tbl = document.getElementById(containerId);
  tbl.innerHTML = '';
  if (!data.length) { tbl.innerHTML = '<p>No hay datos.</p>'; return; }
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  Object.keys(data[0]).forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  tbl.appendChild(thead);

  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      if (editable) td.contentEditable = true;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
}

let padronData = [];
let subtelData = [];
let matches = [];

document.getElementById('loadBtn').addEventListener('click', async () => {
  const [padBin, subBin] = await Promise.all([
    fetch('public/archi-media/audio/Padron Electoral Archi 2026 RG.xlsx').then(r=>r.arrayBuffer()),
    fetch('public/archi-media/audio/Listado Radios 2025 Subtel Version RG.xlsx').then(r=>r.arrayBuffer())
  ]);
  const padWb = XLSX.read(padBin, {type:'array'});
  const subWb = XLSX.read(subBin, {type:'array'});
  const toJson = ws => XLSX.utils.sheet_to_json(ws, {defval:''});
  padronData = toJson(padWb.Sheets[padWb.SheetNames[0]]);
  subtelData = toJson(subWb.Sheets[subWb.SheetNames[0]]);
  buildTable('padronTable', padronData);
  buildTable('subtelTable', subtelData);
  document.getElementById('reconcileBtn').disabled = false;
});

function reconcile() {
  const options = { keys:['Nombre','RazonSocial','RUT'], threshold:0.3, includeScore:true };
  const fuse = new Fuse(subtelData, options);
  matches = padronData.map(p => {
    const result = fuse.search(p['Nombre'] || p['RazonSocial'] || p['RUT']);
    if (result.length) {
      const best = result[0];
      return {padron:p, subtel:best.item, score:best.score};
    }
    return {padron:p, subtel:null, score:null};
  });
  const rows = matches.map(m => ({
    Padron_Nombre: m.padron['Nombre']||'',
    Padron_RUT: m.padron['RUT']||'',
    Subtel_Nombre: m.subtel ? (m.subtel['Nombre']||'') : '—',
    Subtel_RUT: m.subtel ? (m.subtel['RUT']||'') : '—',
    Estado: m.subtel ? (m.score < 0.2 ? 'Coincidencia alta' : 'Coincidencia media') : 'Sin coincidencia'
  }));
  buildTable('reconcileTable', rows, true);
  document.getElementById('reconcileSection').hidden = false;
  document.getElementById('exportBtn').disabled = false;
}

document.getElementById('reconcileBtn').addEventListener('click', reconcile);

function exportCSV() {
  const header = ['Padron_Nombre','Padron_RUT','Subtel_Nombre','Subtel_RUT','Estado'];
  const rows = matches.map(m => [
    m.padron['Nombre']||'',
    m.padron['RUT']||'',
    m.subtel ? (m.subtel['Nombre']||'') : '',
    m.subtel ? (m.subtel['RUT']||'') : '',
    m.subtel ? (m.score < 0.2 ? 'Coincidencia alta' : 'Coincidencia media') : 'Sin coincidencia'
  ]);
  const csv = [header, ...rows]
    .map(r => r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'reconciliacion_archi.csv'; a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('exportBtn').addEventListener('click', exportCSV);
