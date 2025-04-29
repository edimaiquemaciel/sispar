import ReactDOM  from "react-dom"

function OverlayDom({onClick, opacity, visibility, zindex}) {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: zindex,
        transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
        opacity: opacity,
        visibility: visibility,
        pointerEvents: open ? 'auto' : 'none', // para não capturar cliques quando invisível
      }}
    />,
     document.body
  )
}

export default OverlayDom