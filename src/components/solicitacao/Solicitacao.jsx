import { useState, useEffect } from "react"; // Importa o React e o hook useState
import { Trash2, Save, Delete, SquareCheckBig, X } from "lucide-react";

import NavBar from "../navbar/NavBar.jsx";
import styles from "./Solicitacao.module.scss";
import Home from "../../assets/Dashboard/home header.png";
import Seta from "../../assets/Dashboard/Vector.png";
import Motivo from "../../assets/Solicitacao/motivo.png";
import Cancelar from "../../assets/Solicitacao/x.png";

import { useForm } from "react-hook-form";

import Api from "../../Services/Api.jsx"; //importando a conexão

function Solicitacao() {
  

  const [dadosReembolso, setDadosReembolso] = useState([]);
  const {register, handleSubmit, reset} = useForm();
 
  const [enviado, setEnviado] = useState(false);

  const onSubmit = (data) => {
    setDadosReembolso([...dadosReembolso, data])
    reset();
  }

  useEffect(() => {
    if (enviado) {
      setDadosReembolso([]); // Limpa os dados após o envio
      setEnviado(false); // Reseta o estado de controle
    }
  }, [enviado]);

  //--------------------FUNÇÃO PARA ENVIAR OS DADOS PARA O BD -----------
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDM5ODU5NiwianRpIjoiOTdkNWI0YmUtOTU3My00ZmEzLTlkY2ItMjE2MGY3MmRiZmUzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDQzOTg1OTYsImNzcmYiOiIwNGViOTcwNy05NDFjLTQwYWItOTJiZS04ZjU0MTliNGFmOTQiLCJleHAiOjE3NDQzOTk0OTZ9.R87xKzHSVishWF8ZNjWnRnhfoEmS0GXx4sN2y6TUR70";

  //// Função que será chamada quando quisermos enviar os dados do reembolso
  const enviarParaAnalise = async () => {
    try {
      const response = await Api.post("/refunds/new", dadosReembolso, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      
  
      setEnviado(true); // Aciona o useEffect
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  ///----------------FUNÇÃO DE DELETAR ----------------------
  // Essa função serve para remover um item da lista de reembolsos, com base no número da posição dele (índice). Ela cria uma nova lista sem aquele item e atualiza o estado com essa nova lista.

  const handleDelete = (index) => {
    setDadosReembolso(dadosReembolso.filter((item, i) => i !== index));
  };

  
  //---------------FUNÇÃO PARA LIMPAR TODA A LISTA, AO CLICAR NO BOTÃO CANCELAR REEMBOLSO ----

  // const cancelarSolicitacao = () => {
  //   setDadosReembolso([]); // limpa todos os dados salvos
  //   limparCampos(); // limpa os inputs também (se quiser)
  // };

  //-------------------

  console.log(dadosReembolso);
  

  return (
    <div className={styles.layoutSolicitacao}>
      <NavBar />

      <div className={styles.containerPrincipalSolicitacao}>
        <header className={styles.headerSolicitacao}>
          <img src={Home} alt="Vetor da casinha" />
          <img src={Seta} alt="Vetor da setinha" />
          <p> Reembolsos</p>
          <img src={Seta} alt="Vetor da setinha" />
          <p>Solicitação de Reembolsos</p>
        </header>

        <main className={styles.mainSolicitacao}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formMain}
          >
            <div className={styles.formGrupo1}>
              <div className={styles.inputNome}>
                <label htmlFor="nome"> Nome Completo</label>
                <input
                  name="colaborador"
                  type="text"
                  {...register("colaborador")}
                />
              </div>

              <div className={styles.inputEmpresa}>
                <label htmlFor="empresa">Empresa</label>
                <input
                  name="empresa"
                  type="text"
                  {...register("empresa")}
                />
              </div>

              <div className={styles.inputPrestacao}>
                <label htmlFor="prestacao"> Nº Prest. Contas</label>
                <input
                  type="number"
                  name="nPrestacao"
                  {...register("nPrestacao")}
                />
              </div>

              <div className={styles.inputMotivo}>
                <label htmlFor="descricao">
                  Descrição / Motivo do Reembolso
                </label>

                <textarea
                  name="descricao"
                  {...register("descricao")}
                />
              </div>
            </div>

            <div className={styles.barraVertical}></div>

            <div className={styles.formGrupo2}>
              <div className={styles.inputData}>
                <label htmlFor="date"> Data</label>
                <input
                  type="date"
                  name="data"
                  {...register("data")}
                />
              </div>

              <div className={styles.selectDespesas}>
                <label htmlFor="tipoReembolso"> Tipo de Despesa </label>

                <select
                  name="tipoReembolso"
                  id="tipoReembolso"
                  {...register("tipoReembolso")}
                >
                  <option value="">Selecionar</option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="combustivel">Combustível</option>
                  <option value="conducao">Condução</option>
                  <option value="estacionamento">Estacionamento</option>
                  <option value="viagem adm">Viagem admin.</option>
                  <option value="viagem oper"> Viagem operacional</option>
                  <option value="eventos">Eventos de representação</option>
                </select>
              </div>

              <div className={styles.centroDeCusto}>
                <label htmlFor="custo">Centro de Custo</label>
                <select
                  name="centroCusto"
                  id="centroCusto"
                  {...register("centroCusto")}
                >
                  <option value="">Selecionar</option>

                  <option value="FIN CONTROLES INTERNOS MTZ">
                    1100109002 - FIN CONTROLES INTERNOS MTZ
                  </option>
                  <option value="FIN VICE-PRESIDENCIA FINANCAS MTZ">
                    1100110002 - FIN VICE-PRESIDENCIA FINANCAS MTZ
                  </option>
                  <option value="FIN CONTABILIDADE MTZ">
                    1100110101 - FIN CONTABILIDADE MTZ
                  </option>
                </select>
              </div>

              <div className={styles.ordem}>
                <label htmlFor="ordemInterna">Ord. Int.</label>
                <input
                  name="ordemInterna"
                  id="ordemInterna"
                  type="text"
                  {...register("ordemInterna")}
                />
              </div>

              <div className={styles.divisoes}>
                <label htmlFor="divisao">Div.</label>
                <input
                  type="text"
                  id="divisao"
                  name="divisao"
                  {...register("divisao")}
                />
              </div>

              <div className={styles.pep}>
                <label htmlFor="pep">PEP</label>
                <input
                  name="pep"
                  id="PEP"
                  type="text"
                  {...register("pep")}
                />
              </div>

              <div className={styles.moeda}>
                <label htmlFor="moeda">Moeda</label>
                <select
                  name="moeda"
                  id="coents"
                  {...register("moeda")}
                >
                  <option value=""></option>
                  <option value="brl">BRL</option>
                  <option value="ars">ARS</option>
                  <option value="usd">USD</option>
                </select>
              </div>

              <div className={styles.distancia}>
                <label htmlFor="distancia">Dist. / Km</label>
                <input
                  name="distanciaKm"
                  id="distance-input"
                  type="text"
                  {...register("distanciaKm")}
                />
              </div>

              <div className={styles.valorKm}>
                <label htmlFor="valor">Valor / Km</label>
                <input
                  name="valorKm"
                  type="text"
                  {...register("valorKm")}
                />
              </div>

              <div className={styles.valorFaturado}>
                <label htmlFor="faturado"> Val. Faturado </label>
                <input
                  type="text"
                  name="valorFaturado"
                  {...register("valorFaturado")}
                />
              </div>

              <div className={styles.despesa}>
                <label htmlFor="taxa"> Despesa </label>
                <input
                  type="text"
                  id="despesa"
                  name="despesa"
                  {...register("despesa")}
                />
              </div>

              <div className={styles.botoes}>
                <button
                  className={styles.salvar}
                  type="submit"
                >
                  <Save /> Salvar
                </button>

                <button
                  className={styles.deletar}
                  type="button"
                  onClick={() => reset()}
                >
                  <Delete />
                </button>
              </div>
            </div>
          </form>

          {/* table é a tag principal que vai definir a tabela */}
          {/* thead é a tag que agrupa o cabeçalho */}
          {/* tr é a linha da tabela */}
          {/* th título da tabela, um para cada título, ex: nome - idade - estado */}
          {/* tbody agrupa o corpo da tabela (os dados que será recebido) */}

          <table>
            <thead>
              <tr>
                <th>Excluir</th>
                <th>Colaborador(a)</th>
                <th>Empresa</th>
                <th>Nº Prest.</th>
                <th>Data</th>
                <th>Motivo</th>
                <th>Tipo de despesa</th>
                <th>Ctr. Custo</th>
                <th>Ord. Int.</th>
                <th>Div.</th>
                <th>PEP</th>
                <th>Moeda</th>
                <th>Dist. Km</th>
                <th>Val. Km</th>
                <th>Val. Faturado</th>
                <th>Despesa</th>
              </tr>
            </thead>

            <tbody>
              {dadosReembolso.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button
                      onClick={() => handleDelete(index)}
                      className={styles.btnLixeira}
                    >
                      <Trash2 />
                    </button>
                  </td>
                  <td>{item.colaborador}</td>
                  <td>{item.empresa}</td>
                  <td>{item.nPrestacao}</td>
                  <td>{item.data}</td>

                  <td>
                    <button>
                      <img src={Motivo} alt="Motivo" />
                    </button>
                  </td>

                  {/* <td>{item.descricao}</td> */}
                  <td>{item.tipoReembolso}</td>
                  <td>{item.centroCusto}</td>
                  <td>{item.ordemInterna}</td>
                  <td>{item.divisao}</td>
                  <td>{item.pep}</td>
                  <td>{item.moeda}</td>
                  <td>{item.distanciaKm}</td>
                  <td>{item.valorKm}</td>
                  <td>{item.valorFaturado}</td>
                  <td>{item.despesa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <footer className={styles.footerSolicitacao}>
          <section>
            <div className={styles.inputFooter}>
              <label> Total Faturado </label>

              <input
                type="text"
                readOnly
                value={dadosReembolso
                  .reduce(
                    (total, item) => total + Number(item.valorFaturado || 0),
                    0
                  )
                  .toFixed(2)}
              />
            </div>
            <div>
              <label> Total Despesa </label>
              <input
                type="text"
                readOnly
                value={dadosReembolso
                  .reduce((total, item) => total + Number(item.despesa || 0), 0)
                  .toFixed(2)}
              />
            </div>

            <div className={styles.boxButtonFooter}>
              <button
                className={styles.buttonAnalise}
                onClick={enviarParaAnalise}
              >
                <SquareCheckBig /> Enviar para Análise
              </button>

              <button
                className={styles.buttonCancelar}
              >
                <X /> Cancelar Solicitação
              </button>
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
}
export default Solicitacao;
