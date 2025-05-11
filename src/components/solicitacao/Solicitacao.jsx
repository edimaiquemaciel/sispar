import { useState, useContext } from "react";
import { Trash2, Save, Delete, SquareCheckBig, X, StickyNote } from "lucide-react";
import styles from "./Solicitacao.module.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import LimparCamposModal from "../modals/LimparCamposModal/LimparCamposModal.jsx";
import ExcluirDadosModal from "../modals/ExcluirDadosModal/ExcluirDadosModal.jsx";
import CancelarSolicitacaoModal from "../modals/CancelarSolicitacaoModal/CancelarSolicitacaoModal.jsx";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { reembolsoSchema } from "../../schemas/reembolsoSchema.js";
import Api from "../../Services/Api.jsx";
import "../../global.scss"
import OverlayDom from "../modals/Overlay/OverlayDom.jsx";
import { AuthContext } from "../../authcontext/AuthContext.jsx";

function Solicitacao() {
  const {user, isSmartPhoneScreen} = useContext(AuthContext)
  const toast = useRef(null);
  const [modaLimparCampos, setModalLimparCampos] = useState(false);
  const [modalExcluirDados, setModalExluirDados] = useState(false);
  const [modalCancelarSolicitacao, setModalCancelarSolicitacao] = useState(false);
  const [getIndex, setGetIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(null);
  const [dadosReembolso, setDadosReembolso] = useState([]);
  const {register, handleSubmit, reset, formState: {dirtyFields, errors, isValid}} = useForm({
    resolver: zodResolver(reembolsoSchema)
  });
  const  id_colaborador = user?.id_colaborador;
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

  const onError = (isValid) => {
    if(!isValid){
      toast.current.show({ 
        severity: 'error', 
        detail: "Por favor, preencha os campos obrigatórios",
        life: 5000,
        style: {
          width: isSmartPhoneScreen ? "22rem" : "29rem", 
          fontSize: isSmartPhoneScreen ? "11px" : "",
          margin: isSmartPhoneScreen ? "0 auto" : "",
          marginTop: isSmartPhoneScreen ? "40px" : ""
        }
        });
    }
  }

  const onSubmit = (data) => {
    const sanitData = {...data, id_colaborador}
    if(campoVazio){
      setDadosReembolso([...dadosReembolso, sanitData])
      reset();
    }
  }
 
  const enviarParaAnalise = async () => {
      console.log("dentro de analise:" + dadosReembolso);
      if(dadosReembolso.length > 0){
        try {
        
          const res = await Api.post("/reembolso/solicitar-reembolso", dadosReembolso);
          const data = await res.data;
          console.log(data);
          if(res.status === 201 && data.mensagem === "Solicitação de reembolso cadastrada com sucesso"){
            toast.current.show({ 
              severity: 'success', 
              detail: data.mensagem,
              life: 5000,
              });
            setDadosReembolso([])
          }
          
        } catch (error) {
          const msg =
          error.response?.data?.erro ||
          error.response?.data?.mensagem ||
          error.message ||
          "Erro inesperado ao solicitar reembolso";
          toast.current.show({ 
            severity: 'error', 
            detail: msg,
            life: 5000,
            });
          console.error("Erro ao solicitar reembolso:", error);
        }
      }

    }

  const handleDelete = (index) => {
    setDadosReembolso(prev => prev.filter((item, i) => i !== index));
  };


  const cancelarSolicitacao = () => {
    setDadosReembolso([]); 
    reset();
  };
  
  return (
    <div className={styles.layoutSolicitacao}>
      <Toast ref={toast} position="top-center"/>
      {modaLimparCampos || modalExcluirDados || modalCancelarSolicitacao ? (
        <OverlayDom opacity={1} visibility={"visible"} zindex={1500} />
      ) : (
        <OverlayDom opacity={0} visibility={"hidden"} zindex={1500} />
      )}
      <LimparCamposModal show={modaLimparCampos} reset={reset} setModalLimparCampos={setModalLimparCampos} />
      <ExcluirDadosModal show={modalExcluirDados} handleDelete={handleDelete} getIndex={getIndex} setModalExluirDados={setModalExluirDados} />
      <CancelarSolicitacaoModal show={modalCancelarSolicitacao} cancelarSolicitacao={cancelarSolicitacao} setModalCancelarSolicitacao={setModalCancelarSolicitacao} />
      <div className={styles.containerPrincipalSolicitacao}>
        <header className={styles.headerSolicitacao}>
          <HomeOutlinedIcon sx={{color: "#282c2c", marginBottom: "-7px"}} />
          <KeyboardArrowRightOutlinedIcon className={styles.icon} />
          <p> Reembolsos</p>
          <KeyboardArrowRightOutlinedIcon className={styles.icon} />
          <p>Solicitação de Reembolsos</p>
        </header>

        <main className={styles.mainSolicitacao}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formMain}
          >
            <div className={styles.formGrupo1}>
              <div className={styles.inputNome}>
                <label htmlFor="colaborador"> Nome Completo*</label>
                <input
                  name="colaborador"
                  id="colaborador"
                  type="text"
                  {...register("colaborador")}
                  className={errors.colaborador ? "p-invalid" : ""}
                />
                {errors.colaborador && (
                  <small className={styles.error}>{errors.colaborador.message}</small>
                )}
              </div>

              <div className={styles.inputEmpresa}>
                <label htmlFor="empresa">Empresa*</label>
                <input
                  name="empresa"
                  id="empresa"
                  type="text"
                  {...register("empresa")}
                  className={errors.empresa ? "p-invalid" : ""}
                />
                {errors.empresa && (
                  <small className={styles.error}>{errors.empresa.message}</small>
                )}
              </div>

              <div className={styles.inputPrestacao}>
                <label htmlFor="num_prestacao"> Nº Prest. Contas*</label>
                <input
                  type="number"
                  id="num_prestacao"
                  name="num_prestacao"
                  {...register("num_prestacao")}
                  className={errors.num_prestacao ? "p-invalid" : ""}
                />
                {errors.num_prestacao && (
                  <small className={styles.error}>{errors.num_prestacao.message}</small>
                )}
              </div>

              <div className={styles.inputMotivo}>
                <label htmlFor="descricao">
                  Descrição / Motivo do Reembolso
                </label>

                <textarea
                  id="descricao"
                  name="descricao"
                  {...register("descricao")}
                />
              </div>
            </div>

            <div className={styles.barraVertical}></div>

            <div className={styles.formGrupo2}>
              {isSmartPhoneScreen ? (
                <div className={styles.formGrupo2G1}>
                                
                  <div className={styles.selectDespesas}>
                    <label htmlFor="tipo_reembolso"> Tipo de Despesa* </label>

                    <div>
                      <div className={styles.select_wrapper}>
                        <select
                          name="tipo_reembolso"
                          id="tipo_reembolso"
                          {...register("tipo_reembolso")}
                          onFocus={() => handleFocus("tipo_reembolso")}
                          onBlur={() => handleBlur()}
                          onInput={()=> handleSelected("tipo_reembolso")}
                          className={errors.tipo_reembolso ? "p-invalid" : ""}
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
                          <KeyboardArrowDownIcon className={isClicked === "tipo_reembolso" ? styles.down : ''} />
                        </div>
                      </div>
                      {errors.tipo_reembolso && (
                          <small className={styles.error_select}>{errors.tipo_reembolso.message}</small>
                        )}
                    </div>
                  </div>

                  <div className={styles.moeda}>
                    <label htmlFor="moeda">Moeda*</label>
                    <div>
                      <div className={styles.select_wrapper}>
                        <select
                          name="moeda"
                          id="moeda"
                          {...register("moeda")}
                          onFocus={() => handleFocus("moeda")}
                          onBlur={() => handleBlur()}
                          onInput={()=> handleSelected("moeda")}
                          className={errors.moeda ? "p-invalid" : ""}
                        >
                          <option value="">Selecionar</option>
                          <option value="BRL">BRL</option>
                          <option value="ARS">ARS</option>
                          <option value="USD">USD</option>
                        </select>
                        <div className={styles.select_icon}>
                          <KeyboardArrowDownIcon className={isClicked === "moeda" ? styles.down : ''} />
                        </div>
                      </div>
                      {errors.moeda && (
                          <small className={styles.error_select}>{errors.moeda.message}</small>
                      )}
                    </div>
                  </div>


                </div>
              ) : (
                <div className={styles.formGrupo2G1}>
                                
                <div className={styles.selectDespesas}>
                  <label htmlFor="tipo_reembolso"> Tipo de Despesa* </label>

                  <div>
                    <div className={styles.select_wrapper}>
                      <select
                        name="tipo_reembolso"
                        id="tipo_reembolso"
                        {...register("tipo_reembolso")}
                        onFocus={() => handleFocus("tipo_reembolso")}
                        onBlur={() => handleBlur()}
                        onInput={()=> handleSelected("tipo_reembolso")}
                        className={errors.tipo_reembolso ? "p-invalid" : ""}
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
                        <KeyboardArrowDownIcon className={isClicked === "tipo_reembolso" ? styles.down : ''} />
                      </div>
                    </div>
                     {errors.tipo_reembolso && (
                        <small className={styles.error_select}>{errors.tipo_reembolso.message}</small>
                      )}
                  </div>
                </div>

                <div className={styles.centroDeCusto}>
                  <label htmlFor="centro_custo">Centro de Custo*</label>
                  <div>
                    <div className={styles.select_wrapper}>
                      <select
                        name="centro_custo"
                        id="centro_custo"
                        {...register("centro_custo")}
                        onFocus={() => handleFocus("centro_custo")}
                        onBlur={() => handleBlur()}
                        onInput={()=> handleSelected("centro_custo")}
                        className={errors.centro_custo ? "p-invalid" : ""}
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
                        <KeyboardArrowDownIcon className={isClicked === "centro_custo" ? styles.down : ''} />
                      </div>
                    </div>
                    {errors.centro_custo && (
                      <small className={styles.error_select}>{errors.centro_custo.message}</small>
                    )}
                  </div>
                </div>
              </div>
              )}

              {isSmartPhoneScreen ? (
                <div className={styles.formGrupo2G2}>

                  <div className={styles.centroDeCusto}>
                    <label htmlFor="centro_custo">Centro de Custo*</label>
                    <div>
                      <div className={styles.select_wrapper}>
                        <select
                          name="centro_custo"
                          id="centro_custo"
                          {...register("centro_custo")}
                          onFocus={() => handleFocus("centro_custo")}
                          onBlur={() => handleBlur()}
                          onInput={()=> handleSelected("centro_custo")}
                          className={errors.centro_custo ? "p-invalid" : ""}
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
                          <KeyboardArrowDownIcon className={isClicked === "centro_custo" ? styles.down : ''} />
                        </div>
                      </div>
                      {errors.centro_custo && (
                        <small className={styles.error_select}>{errors.centro_custo.message}</small>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className={styles.formGrupo2G2}>

                  <div className={styles.moeda}>
                    <label htmlFor="moeda">Moeda*</label>
                    <div>
                      <div className={styles.select_wrapper}>
                        <select
                          name="moeda"
                          id="moeda"
                          {...register("moeda")}
                          onFocus={() => handleFocus("moeda")}
                          onBlur={() => handleBlur()}
                          onInput={()=> handleSelected("moeda")}
                          className={errors.moeda ? "p-invalid" : ""}
                        >
                          <option value="">Selecionar</option>
                          <option value="BRL">BRL</option>
                          <option value="ARS">ARS</option>
                          <option value="USD">USD</option>
                        </select>
                        <div className={styles.select_icon}>
                          <KeyboardArrowDownIcon className={isClicked === "moeda" ? styles.down : ''} />
                        </div>
                      </div>
                      {errors.moeda && (
                          <small className={styles.error_select}>{errors.moeda.message}</small>
                      )}
                    </div>
                  </div>
                  <div className={styles.despesa}>
                    <label htmlFor="despesa"> Despesa* </label>
                    <input
                      type="number"
                      id="despesa"
                      name="despesa"
                      {...register("despesa")}
                      className={errors.despesa ? "p-invalid" : ""}
                    />
                    {errors.despesa && (
                      <small className={styles.error}>{errors.despesa.message}</small>
                    )}
                  </div>             

                  <div className={styles.valorFaturado}>
                    <label htmlFor="valor_faturado"> Val. Faturado* </label>
                    <input
                      type="number"
                      name="valor_faturado"
                      id="valor_faturado"
                      {...register("valor_faturado")}
                      className={errors.valor_faturado ? "p-invalid" : ""}
                    />
                    {errors.valor_faturado && (
                      <small className={styles.error}>{errors.valor_faturado.message}</small>
                    )}
                  </div>

              </div>
              )}
              {isSmartPhoneScreen ? (
                <div className={styles.formGrupo2G3}>

                  <div className={styles.despesa}>
                    <label htmlFor="despesa"> Despesa* </label>
                    <input
                      type="number"
                      id="despesa"
                      name="despesa"
                      {...register("despesa")}
                      className={errors.despesa ? "p-invalid" : ""}
                    />
                    {errors.despesa && (
                      <small className={styles.error}>{errors.despesa.message}</small>
                    )}
                  </div>             

                  <div className={styles.valorFaturado}>
                    <label htmlFor="valor_faturado"> Val. Faturado* </label>
                    <input
                      type="number"
                      name="valor_faturado"
                      id="valor_faturado"
                      {...register("valor_faturado")}
                      className={errors.valor_faturado ? "p-invalid" : ""}
                    />
                    {errors.valor_faturado && (
                      <small className={styles.error}>{errors.valor_faturado.message}</small>
                    )}
                  </div>


                  <div className={styles.ordem}>
                    <label htmlFor="ordem_interna">Ord. Int.</label>
                    <input
                      name="ordem_interna"
                      id="ordem_interna"
                      type="number"
                      {...register("ordem_interna")}
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
                      id="pep"
                      type="number"
                      {...register("pep")}
                    />
                  </div>
                  <div className={styles.inputData}>
                    <label htmlFor="data"> Data</label>
                    <div className={styles.input_wrapper}>
                      <input
                        type="date"
                        name="data"
                        id="data"
                        {...register("data")}
                        onFocus={(e) => e.target.showPicker?.()}
                      />
                      <div className={styles.input_icon}> 
                        <DateRangeIcon />
                      </div>
                    </div>
                  </div>
              </div>
              
                
              ) : (
                <div className={styles.formGrupo2G3}>
                  <div className={styles.ordem}>
                    <label htmlFor="ordem_interna">Ord. Int.</label>
                    <input
                      name="ordem_interna"
                      id="ordem_interna"
                      type="number"
                      {...register("ordem_interna")}
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
                      id="pep"
                      type="number"
                      {...register("pep")}
                    />
                  </div>
                </div>
              )}
              {isSmartPhoneScreen ? (
                <div className={styles.formGrupo2G4}>

                  <div className={styles.distancia}>
                    <label htmlFor="distancia_km">Dist. / Km</label>
                    <input
                      name="distancia_km"
                      id="distancia_km"
                      type="text"
                      {...register("distancia_km")}
                    />
                  </div>

                  <div className={styles.valorKm}>
                    <label htmlFor="valor_km">Valor / Km</label>
                    <input
                      name="valor_km"
                      id="valor_km"
                      type="number"
                      {...register("valor_km")}
                    />
                  </div>

                  <div className={styles.botoes}>
                    <button className={styles.salvar} type="submit" onClick={()=> onError(isValid)}>
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
              ) : (
                <div className={styles.formGrupo2G4}>

                  <div className={styles.inputData}>
                    <label htmlFor="data"> Data</label>
                    <div className={styles.input_wrapper}>
                      <input
                        type="date"
                        name="data"
                        id="data"
                        {...register("data")}
                        onFocus={(e) => e.target.showPicker?.()}
                      />
                      <div className={styles.input_icon}> 
                        <DateRangeIcon />
                      </div>
                    </div>
                  </div>

                  <div className={styles.distancia}>
                    <label htmlFor="distancia_km">Dist. / Km</label>
                    <input
                      name="distancia_km"
                      id="distancia_km"
                      type="text"
                      {...register("distancia_km")}
                    />
                  </div>

                  <div className={styles.valorKm}>
                    <label htmlFor="valor_km">Valor / Km</label>
                    <input
                      name="valor_km"
                      id="valor_km"
                      type="number"
                      {...register("valor_km")}
                    />
                  </div>

                  <div className={styles.botoes}>
                    <button className={styles.salvar} type="submit" onClick={()=> onError(isValid)}>
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
              )}
              
            </div>
          </form>
            <div className={styles.container_tabela}>
              {dadosReembolso.length > 0 ? (
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
                        <td>{item.num_prestacao}</td>
                        <td>{item.data}</td>

                        <td>
                            {item.descricao ? <StickyNote style={{marginTop: "2px"}}  size="22px" /> : "Sem Motivo"}
                        </td>

                        {/* <td>{item.descricao}</td> */}
                        <td>{item.tipo_reembolso}</td>
                        <td>{item.centro_custo}</td>
                        <td>{item.ordem_interna}</td>
                        <td>{item.divisao}</td>
                        <td>{item.pep}</td>
                        <td>{item.moeda}</td>
                        <td>{item.distancia_km}</td>
                        <td>{item.valor_km}</td>
                        <td>{item.valor_faturado}</td>
                        <td>{item.despesa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table> ) : (
                  <table>
                  <tbody>
                    <tr>
                      <td className={styles.hover_none}  style={{ textAlign: 'center', padding: '2rem'}}>
                        Nenhum registro encontrado.
                      </td>
                    </tr>
                  </tbody>
                </table>
                )}
            </div>
        </main>
        <footer className={styles.footerSolicitacao}>
          <section>
            <div className={styles.total}>
              <div className={styles.inputFooter}>
                <label> Total Faturado </label>
                <input
                  type="text"
                  readOnly
                  value={dadosReembolso
                    .reduce(
                      (total, item) => total + Number(item.valor_faturado || 0),
                      0
                    )
                    .toFixed(2)}
                />
              </div>
              <div className={styles.inputFooter}>
                <label> Total Despesa </label>
                <input
                  type="text"
                  readOnly
                  value={dadosReembolso
                    .reduce((total, item) => total + Number(item.despesa || 0), 0)
                    .toFixed(2)}
                />
              </div>
            </div>

            <div className={styles.boxButtonFooter}>
              {dadosReembolso.length > 0 ? (
                <button className={styles.buttonAnalise} onClick={enviarParaAnalise} >
                  <SquareCheckBig /> Enviar para Análise
                </button>
              ) : (
                <button className={styles.buttonAnalise} onClick={enviarParaAnalise} disabled>
                  <SquareCheckBig /> Enviar para Análise
                </button>
              )}

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
