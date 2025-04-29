import { useState, useEffect } from "react";
import { Trash2, Save, Delete, SquareCheckBig, X, StickyNote } from "lucide-react";

import styles from "./Solicitacao.module.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DateRangeIcon from '@mui/icons-material/DateRange';
import toast from "react-hot-toast";

import LimparCamposModal from "../modals/LimparCamposModal/LimparCamposModal.jsx";
import ExcluirDadosModal from "../modals/ExcluirDadosModal/ExcluirDadosModal.jsx";
import CancelarSolicitacaoModal from "../modals/CancelarSolicitacaoModal/CancelarSolicitacaoModal.jsx";


import { useForm } from "react-hook-form";

import Api from "../../Services/Api.jsx";

import "../../global.scss"
import OverlayDom from "../modals/Overlay/OverlayDom.jsx";

function Solicitacao() {

  const [modaLimparCampos, setModalLimparCampos] = useState(false);
  const [modalExcluirDados, setModalExluirDados] = useState(false);
  const [modalCancelarSolicitacao, setModalCancelarSolicitacao] = useState(false);
  const [getIndex, setGetIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(null);
  const [dadosReembolso, setDadosReembolso] = useState([]);
  const {register, handleSubmit, reset, formState: {dirtyFields}} = useForm();
  const [enviado, setEnviado] = useState(false);
  const campoVazio = Object.keys(dirtyFields).length > 0;

  const handleFocus = (id) => {
    setIsClicked(id);
  }
  const handleBlur = () => {
    setIsClicked(null);
  }
  const handleSelected = (id) => {
    setIsClicked((prev)=> (prev === id ? null : id))
  }

  const onSubmit = (data) => {

    if(campoVazio){
      setDadosReembolso([...dadosReembolso, data])
      reset();
    }else {
      toast.error("Por favor, preencha algum campo")
    }
  }
 
  useEffect(() => {
    if (enviado) {
      setDadosReembolso([]); 
      setEnviado(false);
    }
  }, [enviado]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDM5ODU5NiwianRpIjoiOTdkNWI0YmUtOTU3My00ZmEzLTlkY2ItMjE2MGY3MmRiZmUzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDQzOTg1OTYsImNzcmYiOiIwNGViOTcwNy05NDFjLTQwYWItOTJiZS04ZjU0MTliNGFmOTQiLCJleHAiOjE3NDQzOTk0OTZ9.R87xKzHSVishWF8ZNjWnRnhfoEmS0GXx4sN2y6TUR70";

  const enviarParaAnalise = async () => {
    try {
      const response = await Api.post("/refunds/new", dadosReembolso, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      
      setEnviado(true); 
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };


  const handleDelete = (index) => {
    setDadosReembolso(prev => prev.filter((item, i) => i !== index));
  };


  const cancelarSolicitacao = () => {
    setDadosReembolso([]); 
    reset();
  };

  
  return (
    <div className={styles.layoutSolicitacao}>
      {modaLimparCampos || modalExcluirDados || modalCancelarSolicitacao ? (
        <OverlayDom opacity={1} visibility={"visible"} zindex={1500} />
      ) : (
        <OverlayDom opacity={0} visibility={"hidden"} zindex={1500} />
      )}
      <LimparCamposModal show={modaLimparCampos} reset={reset} setModalLimparCampos={setModalLimparCampos} />
      <ExcluirDadosModal show={modalExcluirDados} handleDelete={handleDelete} getIndex={getIndex} setModalExluirDados={setModalExluirDados} />
      <CancelarSolicitacaoModal show={modalCancelarSolicitacao} cancelarSolicitacao={cancelarSolicitacao} setModalCancelarSolicitacao={setModalCancelarSolicitacao} />
      {/* <NavBar /> */}
      <div className={styles.containerPrincipalSolicitacao}>
        <header className={styles.headerSolicitacao}>
          <HomeOutlinedIcon sx={{color: "#282c2c"}} />
          <KeyboardArrowRightOutlinedIcon sx={{color: "#d0d4e4"}} />
          <p> Reembolsos</p>
          <KeyboardArrowRightOutlinedIcon sx={{color: "#d0d4e4"}} />
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
              <div className={styles.formGrupo2G1}>
                <div className={styles.inputData}>
                  <label htmlFor="date"> Data</label>
                  <div className={styles.input_wrapper}>
                    <input
                      type="date"
                      name="data"
                      {...register("data")}
                    />
                    <div className={styles.input_icon}> 
                      <DateRangeIcon />
                    </div>
                  </div>
                </div>

                <div className={styles.selectDespesas}>
                  <label htmlFor="tipoReembolso"> Tipo de Despesa </label>

                  <div className={styles.select_wrapper}>
                    <select
                      name="tipoReembolso"
                      id="tipoReembolso"
                      {...register("tipoReembolso")}
                      onFocus={() => handleFocus("tipoReembolso")}
                      onBlur={() => handleBlur()}
                      onInput={()=> handleSelected("tipoReembolso")}
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
                    <div className={styles.select_icon}>
                      <KeyboardArrowDownIcon className={isClicked === "tipoReembolso" ? styles.down : ''} />
                    </div>
                  </div>
                </div>

                <div className={styles.centroDeCusto}>
                  <label htmlFor="custo">Centro de Custo</label>
                  <div className={styles.select_wrapper}>
                    <select
                      name="centroCusto"
                      id="centroCusto"
                      {...register("centroCusto")}
                      onFocus={() => handleFocus("centroCusto")}
                      onBlur={() => handleBlur()}
                      onInput={()=> handleSelected("centroCusto")}
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
                    <div className={styles.select_icon}>
                      <KeyboardArrowDownIcon className={isClicked === "centroCusto" ? styles.down : ''} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formGrupo2G2}>
                <div className={styles.ordem}>
                  <label htmlFor="ordemInterna">Ord. Int.</label>
                  <input
                    name="ordemInterna"
                    id="ordemInterna"
                    type="number"
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
                    type="number"
                    {...register("pep")}
                  />
                </div>

                <div className={styles.moeda}>
                  <label htmlFor="moeda">Moeda</label>
                  <div className={styles.select_wrapper}>
                    <select
                      name="moeda"
                      id="coents"
                      {...register("moeda")}
                      onFocus={() => handleFocus("moeda")}
                      onBlur={() => handleBlur()}
                      onInput={()=> handleSelected("moeda")}
                    >
                      <option value="">Selecionar</option>
                      <option value="brl">BRL</option>
                      <option value="ars">ARS</option>
                      <option value="usd">USD</option>
                    </select>
                    <div className={styles.select_icon}>
                      <KeyboardArrowDownIcon className={isClicked === "moeda" ? styles.down : ''} />
                    </div>
                  </div>
                </div>

                <div className={styles.distancia}>
                  <label htmlFor="distancia">Dist. / Km</label>
                  <input
                    name="distanciaKm"
                    id="distance-input"
                    type="number"
                    {...register("distanciaKm")}
                  />
                </div>

                <div className={styles.valorKm}>
                  <label htmlFor="valor">Valor / Km</label>
                  <input
                    name="valorKm"
                    type="number"
                    {...register("valorKm")}
                  />
                </div>

                <div className={styles.valorFaturado}>
                  <label htmlFor="faturado"> Val. Faturado </label>
                  <input
                    type="number"
                    name="valorFaturado"
                    {...register("valorFaturado")}
                  />
                </div>

                <div className={styles.despesa}>
                  <label htmlFor="taxa"> Despesa </label>
                  <input
                    type="number"
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

                  {campoVazio ? <button
                    className={styles.deletar}
                    type="button"
                    onClick={() => setModalLimparCampos(true)}
                  >
                    <Delete />
                  </button> : <button
                    className={styles.deletar}
                    type="button"
                    onClick={() => setModalLimparCampos(true)}
                    disabled
                  >
                    <Delete />
                  </button>}
                </div>
              </div>
            </div>
          </form>
          {dadosReembolso.length > 0 ? (
            <div className={styles.container_tabela}>
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
                          onClick={() => {
                            setGetIndex(index)
                            setModalExluirDados(true)
                          }}
                          className={styles.btnLixeira}
                        >
                          <Trash2 size="20px" />
                        </button>
                      </td>
                      <td>{item.colaborador}</td>
                      <td>{item.empresa}</td>
                      <td>{item.nPrestacao}</td>
                      <td>{item.data}</td>

                      <td>
                          {item.descricao ? <StickyNote style={{marginTop: "2px"}}  size="22px" /> : "Sem Motivo"}
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
            </div>
          ) : (
            <table>
              <tbody>
              <tr>
                <td className={styles.hover_none}  style={{ textAlign: 'center', padding: '2rem' }}>
                  Nenhum registro encontrado.
                </td>
              </tr>
              </tbody>
            </table>
          )}
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

              {dadosReembolso.length > 0 ? (<button
                className={styles.buttonCancelar}
                onClick={() => setModalCancelarSolicitacao(true)}
              >
                <X /> Cancelar Solicitação
              </button>) : (<button
                className={styles.buttonCancelar}
                onClick={() => setModalCancelarSolicitacao(true)}
                disabled
              >
                <X /> Cancelar Solicitação
              </button>)}
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
}
export default Solicitacao;
