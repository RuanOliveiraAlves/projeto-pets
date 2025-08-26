const API = 'http://localhost:3000';

let dados = [];

const tbody = document.getElementById('tbody');
const btn = document.getElementById('btnConsultar');
const filtro = document.getElementById('filtro');

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('pt-BR');
}

function render(lista) {
  tbody.innerHTML = '';
  lista.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.codpet}</td>
      <td>${p.nome ?? ''}</td>
      <td>${p.especie ?? ''}</td>
      <td>${p.raca ?? ''}</td>
      <td>${p.peso ?? ''}</td>
      <td>${formatDate(p.datanasc)}</td>
    `;
    tbody.appendChild(tr);
  });
}

btn.addEventListener('click', async () => {
  console.log("Consulta Realizada Com SUCESSO!"); 
  try {
    const resp = await axios.get(`${API}/pets`);
    dados = resp.data;
    render(dados);
  } catch (e) {
    console.error(e);
    alert('Erro ao consultar: ' + (e.response?.data?.error || e.message));
  }
});

const filtroCod = document.getElementById('filtroCod');

// Filtro específico por código
filtroCod.addEventListener('input', () => {
  const q = filtroCod.value.trim();
  if (!q) return render(dados);

  const filtrados = dados.filter(p => p.codpet === parseInt(q));
  render(filtrados);
});


// Filtro apenas por  nome, raca e especie
filtro.addEventListener('input', () => {
  const q = filtro.value.trim().toLowerCase();
  if (!q) return render(dados);

  const filtrados = dados.filter(p => {
    return [p.nome, p.raca, p.especie]
      .some(v => (v ?? '').toString().toLowerCase().includes(q));
  });

  render(filtrados);
});
