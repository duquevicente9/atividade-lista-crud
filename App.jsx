
import { useEffect, useRef, useState } from "react";

// QUESTAO 1 
function ListaUsuarios() {
  const usuarios = [
    { id: 1, nome: "Ana", email: "ana@email.com" },
    { id: 2, nome: "Bruno", email: "bruno@email.com" },
    { id: 3, nome: "Carlos", email: "carlos@email.com" }
  ];

  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>
          {usuario.nome} — {usuario.email}
        </li>
      ))}
    </ul>
  );
}

// QUESTAO 2
function ExemploEstado() {
  // useState permite que o React perceba quando os dados mudam
  // e atualize a interface automaticamente.
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Ana" }
  ]);

  return (
    <div>
      <p>Total de usuarios: {usuarios.length}</p>
    </div>
  );
}

// QUESTAO 3 
function ListaNomes() {
  const [texto, mudarTexto] = useState("");
  const [registros, definirRegistros] = useState(["Ana", "Bruno"]);

  const incluirNome = () => {
    if (texto.trim() === "") return;

    definirRegistros(registros.concat(texto.trim()));
    mudarTexto("");
  };

  return (
    <section>
      <input
        value={texto}
        onChange={evento => mudarTexto(evento.target.value)}
        placeholder="Digite um nome"
      />

      <button onClick={incluirNome}>Adicionar</button>

      <ul>
        {registros.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

// QUESTAO 4 
function ListaTarefasObjetos() {
  const [descricao, setDescricao] = useState("");
  const [itens, atualizarItens] = useState([]);

  const criarTarefa = () => {
    if (descricao.trim() === "") return;

    const tarefa = {
      id: Date.now(),
      texto: descricao
    };

    atualizarItens(itens.concat(tarefa));
    setDescricao("");
  };

  return (
    <main>
      <input
        value={descricao}
        onChange={evento => setDescricao(evento.target.value)}
        placeholder="Digite uma tarefa"
      />

      <button onClick={criarTarefa}>Adicionar</button>

      <ul>
        {itens.map(item => (
          <li key={item.id}>{item.texto}</li>
        ))}
      </ul>
    </main>
  );
}

// QUESTAO 5 
function CadastroDeNomes() {
  const [valor, alterarValor] = useState("");
  const [lista, atualizarLista] = useState([]);

  const salvar = () => {
    const nomeLimpo = valor.trim();

    if (nomeLimpo === "") {
      return;
    }

    atualizarLista(lista.concat(nomeLimpo));
    alterarValor("");
  };

  return (
    <section>
      <input
        value={valor}
        onChange={evento => alterarValor(evento.target.value)}
        placeholder="Digite um nome"
      />

      <button onClick={salvar}>Adicionar</button>

      <ul>
        {lista.map((nome, i) => (
          <li key={i}>{nome}</li>
        ))}
      </ul>
    </section>
  );
}

// QUESTAO 6 
function NomesRemoviveis() {
  const [pessoas, atualizarPessoas] = useState(["Ana", "Bruno"]);

  const excluirNome = posicao => {
    const resultado = pessoas.filter((_, i) => i !== posicao);
    atualizarPessoas(resultado);
  };

  return (
    <div>
      {pessoas.map((pessoa, i) => (
        <p key={i}>
          {pessoa}
          <button onClick={() => excluirNome(i)}>
            Remover
          </button>
        </p>
      ))}
    </div>
  );
}

// QUESTAO 7 
function CrudDeTarefas() {
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);

  const incluir = () => {
    if (texto.trim() === "") return;

    const novo = {
      id: Date.now(),
      texto: texto.trim()
    };

    setLista(lista.concat(novo));
    setTexto("");
  };

  const excluir = codigo => {
    setLista(lista.filter(item => item.id !== codigo));
  };

  return (
    <main>
      <input
        value={texto}
        onChange={evento => setTexto(evento.target.value)}
        placeholder="Nova tarefa"
      />

      <button onClick={incluir}>Adicionar</button>

      <p>Quantidade: {lista.length}</p>

      {lista.map(item => (
        <div key={item.id}>
          {item.texto}
          <button onClick={() => excluir(item.id)}>
            Remover
          </button>
        </div>
      ))}
    </main>
  );
}

// QUESTAO 8 
function ReflexaoFilterSplice() {
  // Usamos filter() porque ele devolve uma nova lista sem o elemento escolhido.
  // Isso mantém a lista anterior intacta e permite que o React perceba a mudança.
  // splice(), por outro lado, modifica o array original.
  // Por isso, filter() é mais adequado para atualizar listas no estado do React.

  return (
    <p>
      O método filter() cria uma nova lista, enquanto splice() modifica
      diretamente o array original. No React, é recomendado utilizar
      filter() para atualizar o estado sem modificar a lista anterior.
    </p>
  );
}

// QUESTAO 9 
function ListaEditavel() {
  const [itens, mudarItens] = useState([
    { id: 1, texto: "Estudar React" }
  ]);

  const alterarTarefa = codigo => {
    const resposta = prompt("Digite a nova descricao:");

    if (resposta && resposta.trim() !== "") {
      mudarItens(
        itens.map(item =>
          item.id === codigo
            ? { ...item, texto: resposta.trim() }
            : item
        )
      );
    }
  };

  return (
    <div>
      {itens.map(item => (
        <p key={item.id}>
          {item.texto}
          <button onClick={() => alterarTarefa(item.id)}>
            Editar
          </button>
        </p>
      ))}
    </div>
  );
}

// QUESTAO 10 
function TarefaInline() {
  const [lista, setLista] = useState([
    { id: 1, texto: "Estudar React" }
  ]);

  const [idAtivo, definirIdAtivo] = useState(null);
  const [novoTexto, definirNovoTexto] = useState("");

  const editar = registro => {
    definirIdAtivo(registro.id);
    definirNovoTexto(registro.texto);
  };

  const confirmar = id => {
    setLista(
      lista.map(registro =>
        registro.id === id
          ? { ...registro, texto: novoTexto }
          : registro
      )
    );

    definirIdAtivo(null);
  };

  return (
    <section>
      {lista.map(registro => (
        <div key={registro.id}>
          {idAtivo === registro.id ? (
            <>
              <input
                value={novoTexto}
                onChange={evento =>
                  definirNovoTexto(evento.target.value)
                }
              />

              <button onClick={() => confirmar(registro.id)}>
                Salvar
              </button>

              <button onClick={() => definirIdAtivo(null)}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              {registro.texto}
              <button onClick={() => editar(registro)}>
                Editar
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
}

// QUESTAO 11 
function ListaDeTarefas() {
  const [registros, atualizarRegistros] = useState([
    { id: 1, texto: "Estudar", concluida: false }
  ]);

  const mudarStatus = codigo => {
    atualizarRegistros(
      registros.map(item => {
        if (item.id !== codigo) return item;

        return {
          ...item,
          concluida: !item.concluida
        };
      })
    );
  };

  return (
    <div>
      {registros.map(item => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.concluida}
            onChange={() => mudarStatus(item.id)}
          />

          {item.texto}
        </div>
      ))}
    </div>
  );
}

// QUESTAO 12 
function Agenda() {
  const [lista, atualizarLista] = useState([]);
  const [form, mudarForm] = useState({
    nome: "",
    telefone: ""
  });
  const [codigoEdicao, setCodigoEdicao] = useState(null);

  const alterarCampo = evento => {
    mudarForm({
      ...form,
      [evento.target.name]: evento.target.value
    });
  };

  const enviar = evento => {
    evento.preventDefault();

    if (!form.nome.trim() || !form.telefone.trim()) return;

    if (codigoEdicao) {
      atualizarLista(
        lista.map(p =>
          p.id === codigoEdicao ? { ...p, ...form } : p
        )
      );

      setCodigoEdicao(null);
    } else {
      atualizarLista(
        lista.concat({
          id: Date.now(),
          ...form
        })
      );
    }

    mudarForm({ nome: "", telefone: "" });
  };

  const carregarEdicao = pessoa => {
    mudarForm({
      nome: pessoa.nome,
      telefone: pessoa.telefone
    });

    setCodigoEdicao(pessoa.id);
  };

  const apagar = id => {
    atualizarLista(lista.filter(p => p.id !== id));
  };

  return (
    <main>
      <h2>Minha agenda</h2>

      <form onSubmit={enviar}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={alterarCampo}
        />

        <input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={alterarCampo}
        />

        <button type="submit">
          {codigoEdicao ? "Atualizar" : "Adicionar contato"}
        </button>
      </form>

      <ul>
        {lista.map(p => (
          <li key={p.id}>
            {p.nome} — {p.telefone}

            <button onClick={() => carregarEdicao(p)}>
              Editar
            </button>

            <button onClick={() => apagar(p.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

// QUESTAO 13 
function ControleEstoque() {
  const [itens, definirItens] = useState([]);
  const [dados, definirDados] = useState({
    nome: "",
    preco: "",
    estoque: ""
  });

  const [alvo, definirAlvo] = useState(0);

  const campo = evento => {
    definirDados({
      ...dados,
      [evento.target.name]: evento.target.value
    });
  };

  const gravar = evento => {
    evento.preventDefault();

    if (
      !dados.nome.trim() ||
      dados.preco === "" ||
      dados.estoque === ""
    ) {
      return;
    }

    const produto = {
      nome: dados.nome.trim(),
      preco: Number(dados.preco),
      estoque: Number(dados.estoque)
    };

    if (alvo) {
      definirItens(
        itens.map(x =>
          x.id === alvo ? { ...x, ...produto } : x
        )
      );

      definirAlvo(0);
    } else {
      definirItens(
        itens.concat({
          id: Date.now(),
          ...produto
        })
      );
    }

    definirDados({ nome: "", preco: "", estoque: "" });
  };

  const abrirEdicao = p => {
    definirAlvo(p.id);

    definirDados({
      nome: p.nome,
      preco: String(p.preco),
      estoque: String(p.estoque)
    });
  };

  const mudarQuantidade = (id, passo) => {
    definirItens(
      itens.map(p =>
        p.id === id
          ? {
              ...p,
              estoque: Math.max(0, p.estoque + passo)
            }
          : p
      )
    );
  };

  const dinheiro = n =>
    n.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  return (
    <section>
      <h2>Estoque de produtos</h2>

      <form onSubmit={gravar}>
        <input
          name="nome"
          placeholder="Produto"
          value={dados.nome}
          onChange={campo}
        />

        <input
          name="preco"
          type="number"
          step="0.01"
          placeholder="Preço"
          value={dados.preco}
          onChange={campo}
        />

        <input
          name="estoque"
          type="number"
          min="0"
          placeholder="Quantidade"
          value={dados.estoque}
          onChange={campo}
        />

        <button type="submit">
          {alvo ? "Atualizar produto" : "Cadastrar produto"}
        </button>
      </form>

      <ul>
        {itens.map(p => (
          <li key={p.id}>
            {p.nome} — {dinheiro(p.preco)} — Unidades: {p.estoque}

            <button onClick={() => mudarQuantidade(p.id, 1)}>
              +
            </button>

            <button onClick={() => mudarQuantidade(p.id, -1)}>
              -
            </button>

            <button onClick={() => abrirEdicao(p)}>
              Editar
            </button>

            <button
              onClick={() =>
                definirItens(itens.filter(x => x.id !== p.id))
              }
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// QUESTAO 14 
function AgendaPesquisavel() {
  const [registros, atualizarRegistros] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    telefone: ""
  });
  const [termo, setTermo] = useState("");

  const salvarContato = evento => {
    evento.preventDefault();

    if (!form.nome.trim() || !form.telefone.trim()) return;

    atualizarRegistros(
      registros.concat({
        id: Date.now(),
        ...form
      })
    );

    setForm({ nome: "", telefone: "" });
  };

  const resultado = registros.filter(p =>
    p.nome.toLowerCase().includes(termo.toLowerCase())
  );

  return (
    <main>
      <form onSubmit={salvarContato}>
        <input
          value={form.nome}
          placeholder="Nome"
          onChange={evento =>
            setForm({ ...form, nome: evento.target.value })
          }
        />

        <input
          value={form.telefone}
          placeholder="Telefone"
          onChange={evento =>
            setForm({ ...form, telefone: evento.target.value })
          }
        />

        <button>Cadastrar</button>
      </form>

      <input
        value={termo}
        placeholder="Digite para pesquisar"
        onChange={evento => setTermo(evento.target.value)}
      />

      <ul>
        {resultado.map(p => (
          <li key={p.id}>
            {p.nome} — {p.telefone}
          </li>
        ))}
      </ul>
    </main>
  );
}

// QUESTAO 15 
function ContatoForm({ valores, atualizar, enviar, emEdicao }) {
  return (
    <form onSubmit={enviar}>
      <input
        value={valores.nome}
        placeholder="Nome"
        onChange={evento =>
          atualizar({ ...valores, nome: evento.target.value })
        }
      />

      <input
        value={valores.telefone}
        placeholder="Telefone"
        onChange={evento =>
          atualizar({ ...valores, telefone: evento.target.value })
        }
      />

      <button>
        {emEdicao ? "Salvar alteracoes" : "Novo contato"}
      </button>
    </form>
  );
}

function ContatoItem({ dado, selecionar, remover }) {
  return (
    <li>
      <span>
        {dado.nome} — {dado.telefone}
      </span>

      <button onClick={() => selecionar(dado)}>
        Editar
      </button>

      <button onClick={() => remover(dado.id)}>
        Excluir
      </button>
    </li>
  );
}

function ContatoLista({ dados, selecionar, remover }) {
  return (
    <ul>
      {dados.map(dado => (
        <ContatoItem
          key={dado.id}
          dado={dado}
          selecionar={selecionar}
          remover={remover}
        />
      ))}
    </ul>
  );
}

function AppContatosSeparados() {
  const [dados, setDados] = useState([]);
  const [valores, atualizar] = useState({
    nome: "",
    telefone: ""
  });
  const [idAtual, setIdAtual] = useState(null);

  const enviar = evento => {
    evento.preventDefault();

    if (!valores.nome.trim() || !valores.telefone.trim()) return;

    if (idAtual !== null) {
      setDados(
        dados.map(d =>
          d.id === idAtual ? { ...d, ...valores } : d
        )
      );

      setIdAtual(null);
    } else {
      setDados(
        dados.concat({
          id: Date.now(),
          ...valores
        })
      );
    }

    atualizar({ nome: "", telefone: "" });
  };

  const selecionar = contato => {
    atualizar({
      nome: contato.nome,
      telefone: contato.telefone
    });

    setIdAtual(contato.id);
  };

  const remover = id => {
    setDados(dados.filter(d => d.id !== id));
  };

  return (
    <main>
      <ContatoForm
        valores={valores}
        atualizar={atualizar}
        enviar={enviar}
        emEdicao={idAtual !== null}
      />

      <ContatoLista
        dados={dados}
        selecionar={selecionar}
        remover={remover}
      />
    </main>
  );
}

// QUESTAO 16 
function AgendaComRegras() {
  const [lista, mudarLista] = useState([]);
  const [dados, mudarDados] = useState({
    nome: "",
    telefone: ""
  });
  const [mensagens, definirMensagens] = useState({});

  const atualizarCampo = evento => {
    mudarDados({
      ...dados,
      [evento.target.name]: evento.target.value
    });
  };

  const enviar = evento => {
    evento.preventDefault();

    const apenasNumeros = dados.telefone.replace(/\D/g, "");
    const avisos = {};

    if (dados.nome.trim().length === 0) {
      avisos.nome = "Preencha o nome.";
    }

    if (apenasNumeros.length < 8) {
      avisos.telefone = "O telefone precisa ter 8 digitos ou mais.";
    }

    if (
      lista.some(
        item =>
          item.telefone.replace(/\D/g, "") === apenasNumeros
      )
    ) {
      avisos.telefone = "Ja existe um contato com esse telefone.";
    }

    definirMensagens(avisos);

    if (Object.keys(avisos).length !== 0) return;

    mudarLista(
      lista.concat({
        id: Date.now(),
        nome: dados.nome.trim(),
        telefone: dados.telefone
      })
    );

    mudarDados({ nome: "", telefone: "" });
  };

  return (
    <section>
      <form onSubmit={enviar}>
        <input
          name="nome"
          value={dados.nome}
          placeholder="Nome"
          onChange={atualizarCampo}
        />

        {mensagens.nome && <small>{mensagens.nome}</small>}

        <input
          name="telefone"
          value={dados.telefone}
          placeholder="Telefone"
          onChange={atualizarCampo}
        />

        {mensagens.telefone && (
          <small>{mensagens.telefone}</small>
        )}

        <button type="submit">Salvar contato</button>
      </form>

      <ul>
        {lista.map(p => (
          <li key={p.id}>
            {p.nome} — {p.telefone}
          </li>
        ))}
      </ul>
    </section>
  );
}

// QUESTAO 17 
function ListaSalva() {
  const [itens, definirItens] = useState(() => {
    const conteudo = localStorage.getItem("tarefas");

    return conteudo ? JSON.parse(conteudo) : [];
  });

  const [descricao, definirDescricao] = useState("");

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(itens));
  }, [itens]);

  const incluir = () => {
    if (descricao.trim() === "") return;

    definirItens(
      itens.concat({
        id: Date.now(),
        texto: descricao.trim()
      })
    );

    definirDescricao("");
  };

  return (
    <main>
      <input
        value={descricao}
        onChange={evento => definirDescricao(evento.target.value)}
        placeholder="Nova tarefa"
      />

      <button onClick={incluir}>Adicionar</button>

      <ul>
        {itens.map(t => (
          <li key={t.id}>
            {t.texto}

            <button
              onClick={() =>
                definirItens(itens.filter(x => x.id !== t.id))
              }
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

// QUESTAO 18 
function TarefasComConfirmacao() {
  const [lista, atualizarLista] = useState([
    { id: 1, texto: "Estudar React" },
    { id: 2, texto: "Fazer exercicio" }
  ]);

  const excluir = codigo => {
    if (!window.confirm("Confirma a exclusao?")) return;

    atualizarLista(
      lista.filter(item => item.id !== codigo)
    );
  };

  return (
    <div>
      {lista.map(item => (
        <p key={item.id}>
          {item.texto}

          <button onClick={() => excluir(item.id)}>
            Excluir
          </button>
        </p>
      ))}
    </div>
  );
}

// QUESTAO 19 
function ListaComDesfazer() {
  const [dados, setDados] = useState([
    { id: 1, texto: "Estudar React" },
    { id: 2, texto: "Fazer exercicio" }
  ]);

  const [ultimoExcluido, setUltimoExcluido] = useState(null);
  const relogio = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(relogio.current);
  }, []);

  const excluir = id => {
    const encontrado = dados.find(x => x.id === id);

    if (!encontrado) return;

    window.clearTimeout(relogio.current);

    setDados(dados.filter(x => x.id !== id));
    setUltimoExcluido(encontrado);

    relogio.current = window.setTimeout(() => {
      setUltimoExcluido(null);
    }, 5000);
  };

  const restaurar = () => {
    if (ultimoExcluido === null) return;

    window.clearTimeout(relogio.current);

    setDados(dados.concat(ultimoExcluido));
    setUltimoExcluido(null);
  };

  return (
    <section>
      <ul>
        {dados.map(x => (
          <li key={x.id}>
            {x.texto}

            <button onClick={() => excluir(x.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      {ultimoExcluido && (
        <button onClick={restaurar}>
          Desfazer
        </button>
      )}
    </section>
  );
}

// QUESTAO 20 
function GerenciadorDeCategorias() {
  const [grupos, setGrupos] = useState([
    {
      id: 1,
      nome: "Eletronicos",
      produtos: [
        { id: 101, nome: "Notebook" },
        { id: 102, nome: "Mouse" }
      ]
    }
  ]);

  const [categoriaTexto, setCategoriaTexto] = useState("");
  const [produtoTexto, setProdutoTexto] = useState({});
  const [alteracao, setAlteracao] = useState(null);

  const criarCategoria = () => {
    if (categoriaTexto.trim() === "") return;

    setGrupos(
      grupos.concat({
        id: Date.now(),
        nome: categoriaTexto.trim(),
        produtos: []
      })
    );

    setCategoriaTexto("");
  };

  const removerCategoria = id => {
    setGrupos(grupos.filter(g => g.id !== id));
  };

  const gravarNomeCategoria = id => {
    if (!alteracao?.texto.trim()) return;

    setGrupos(
      grupos.map(g =>
        g.id === id
          ? { ...g, nome: alteracao.texto }
          : g
      )
    );

    setAlteracao(null);
  };

  const incluirProduto = idCategoria => {
    const nome = (produtoTexto[idCategoria] || "").trim();

    if (!nome) return;

    setGrupos(
      grupos.map(g =>
        g.id === idCategoria
          ? {
              ...g,
              produtos: g.produtos.concat({
                id: Date.now(),
                nome
              })
            }
          : g
      )
    );

    setProdutoTexto({
      ...produtoTexto,
      [idCategoria]: ""
    });
  };

  const retirarProduto = (idCategoria, idProduto) => {
    setGrupos(
      grupos.map(g =>
        g.id === idCategoria
          ? {
              ...g,
              produtos: g.produtos.filter(p => p.id !== idProduto)
            }
          : g
      )
    );
  };

  const gravarNomeProduto = (idCategoria, idProduto) => {
    if (!alteracao?.texto.trim()) return;

    setGrupos(
      grupos.map(g =>
        g.id === idCategoria
          ? {
              ...g,
              produtos: g.produtos.map(p =>
                p.id === idProduto
                  ? { ...p, nome: alteracao.texto }
                  : p
              )
            }
          : g
      )
    );

    setAlteracao(null);
  };

  return (
    <div>
      <h2>Cadastro de categorias</h2>

      <input
        value={categoriaTexto}
        onChange={evento => setCategoriaTexto(evento.target.value)}
        placeholder="Nome da categoria"
      />

      <button onClick={criarCategoria}>Criar</button>

      {grupos.map(grupo => (
        <article key={grupo.id}>
          {alteracao?.tipo === "categoria" &&
          alteracao.id === grupo.id ? (
            <>
              <input
                value={alteracao.texto}
                onChange={evento =>
                  setAlteracao({
                    ...alteracao,
                    texto: evento.target.value
                  })
                }
              />

              <button
                onClick={() => gravarNomeCategoria(grupo.id)}
              >
                Salvar
              </button>
            </>
          ) : (
            <>
              <h3>{grupo.nome}</h3>

              <button
                onClick={() =>
                  setAlteracao({
                    tipo: "categoria",
                    id: grupo.id,
                    texto: grupo.nome
                  })
                }
              >
                Editar
              </button>
            </>
          )}

          <button onClick={() => removerCategoria(grupo.id)}>
            Excluir categoria
          </button>

          <div>
            <input
              value={produtoTexto[grupo.id] || ""}
              placeholder="Nome do produto"
              onChange={evento =>
                setProdutoTexto({
                  ...produtoTexto,
                  [grupo.id]: evento.target.value
                })
              }
            />

            <button onClick={() => incluirProduto(grupo.id)}>
              Adicionar produto
            </button>
          </div>

          <ul>
            {grupo.produtos.map(produto => (
              <li key={produto.id}>
                {alteracao?.tipo === "produto" &&
                alteracao.id === produto.id &&
                alteracao.categoria === grupo.id ? (
                  <>
                    <input
                      value={alteracao.texto}
                      onChange={evento =>
                        setAlteracao({
                          ...alteracao,
                          texto: evento.target.value
                        })
                      }
                    />

                    <button
                      onClick={() =>
                        gravarNomeProduto(grupo.id, produto.id)
                      }
                    >
                      Salvar
                    </button>
                  </>
                ) : (
                  <>
                    {produto.nome}

                    <button
                      onClick={() =>
                        setAlteracao({
                          tipo: "produto",
                          id: produto.id,
                          categoria: grupo.id,
                          texto: produto.nome
                        })
                      }
                    >
                      Editar
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    retirarProduto(grupo.id, produto.id)
                  }
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}