const API = 'http://localhost:3000';

const formPet = document.getElementById('formPet');
const tbody = document.getElementById('tbody');

// Função para formatar data
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('pt-BR');
}

// Renderiza lista de pets na tabela
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

// Exemplo no loadPets
async function loadPets() {
  try {
    const resp = await axios.get(`${API}/pets`);
    render(resp.data);
  } catch (err) {
    console.error('Erro ao buscar pets:', err); // <-- log detalhado
    alert('Erro ao consultar pets');
  }
}

// Exemplo no submit do form
formPet.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pet = {
    nome: document.getElementById('nome').value,
    especie: document.getElementById('especie').value,
    raca: document.getElementById('raca').value,
    peso: parseFloat(document.getElementById('peso').value),
    datanasc: document.getElementById('datanasc').value
  };

  try {
    const resp = await axios.post(`${API}/pets`, pet);
    console.log('Pet cadastrado com sucesso:', resp.data); // <-- log do cadastro
    loadPets();
    formPet.reset();
  } catch (err) {
    console.error('Erro ao cadastrar pet:', err); // <-- log detalhado
    alert('Erro ao cadastrar pet');
  }
});
