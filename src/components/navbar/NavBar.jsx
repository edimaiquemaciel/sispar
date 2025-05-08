import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../authcontext/AuthContext";
import { useContext } from "react";

import { 
  Box, 
  Drawer, 
  IconButton, 
  List, 
  ListItem,
  Typography
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import OverlayDom from '../modals/Overlay/OverlayDom';
import { LogOutIcon } from 'lucide-react';

const routes = {
  inicio: "/reembolsos",
  reembolsos: "/solicitacao",
  analise: "/reembolsos",
  historico: "/solicitacao",
  login: "/login"
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const {logout, user, isTabletScreen} = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerWidth = open ? 240 : 60;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      {open && !isTabletScreen ? (
        <OverlayDom onClick={toggleDrawer} opacity={1} visibility={"visible"} zindex={100} />
      ) : (
        <OverlayDom onClick={toggleDrawer} opacity={0} visibility={"hidden"} zindex={100} />
      )}
      {open ? (
        <IconButton 
            onClick={toggleDrawer} 
            sx={{ 
            position: 'fixed', 
            top: 5, 
            left: 12, 
            zIndex: 1300,
            backgroundColor: '#0844C4',
            color: 'white',
            borderRadius: "5px",
            '&:hover': {
                backgroundColor: "#073DB0"
            }
            }}
        >
        <MenuOpenIcon />
      </IconButton>
      ) : (
        <IconButton 
            onClick={toggleDrawer} 
            sx={{ 
            position: 'fixed', 
            top: 5, 
            left: 12, 
            zIndex: 1300,
            backgroundColor: '#0844C4',
            color: 'white',
            borderRadius: "5px",
            '&:hover': {
                backgroundColor: "#073DB0"
            }
            }}
        >
        <MenuIcon />
      </IconButton>
      ) }
        <Drawer
            variant={isTabletScreen ? "temporary" : "permanent"}
            open={open}
            onClose={() => setOpen(false)}
            transitionDuration={800}
            sx={{
              '&.MuiDrawer-root': {
                transition: 'all 800ms ease-in-out !important',
              },
              '& .MuiDrawer-paper': {
                width: isTabletScreen ? "240px" : drawerWidth,
                height: '100dvh',
                ...(!isTabletScreen && {
                  transition: 'all 800ms ease-in-out !important',
                }),
                position: 'fixed',
                top: 0,
                left: 0,
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF',
                color: 'white',
                overflowX: 'hidden',
                justifyContent: "center",
                border: "none",
                boxShadow: open
                ? "inset rgba(0, 0, 0, 0.5) -2px 0px 10px -3px"
                : "none",
              },
            }}
          >
            {/* Área do perfil */}
            <Box sx={{ 
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: open ? 'center' : 'flex-start',
              justifyContent: 'center',
              pt: 2,
              pb: 10,
            }}>
              <Box sx={{ 
                width: '100%',
                display: 'flex',
                flexDirection:'column',
              }}>
                <AccountCircleIcon 
                  sx={{
                    width: 49, 
                    height: 49,
                    transform:open ? "translateX(100px)" : "translateX(7px)",
                    transition: 'transform 0.8s ease-in-out',
                    mb: "10px",
                    color: "#0844C4"
                    
                  }} 
                />
                
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  width: open ? '100%' : 0,
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.8s ease-in-out',
                  alignItems: 'center'
                }}>
                  <Typography sx={{ 
                    color: 'black', 
                    whiteSpace: 'nowrap',
                    fontSize: '14px',
                    fontWeight: 'medium'
                  }}>
                    {user?.nome}
                  </Typography>
                  <Typography sx={{ 
                    color: 'blue', 
                    whiteSpace: 'nowrap',
                    fontSize: '12px',
                    opacity: 0.8
                  }}>
                    {user?.cargo}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <List sx={{
              display: "flex",
              flexDirection: "column",
              gap:"5px"
            }}>
              {/* Item inicio */}
              <ListItem 
                onClick={() => {
                  navigate(routes.inicio);
                  setOpen(false);
                }}
                button = "true" 
                sx={{ 
                    height: '48px', 
                    paddingLeft: "12px", 
                    paddingY: "0px",
                    transition: 'background-color 0.4s ease-in-out',
                    color: "black",
                    cursor: "pointer",
                    '&:hover': open && {
                        backgroundColor: '#1976d2',
                        color: "white",
                    },
                }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                }}>
                  <Box sx={{ 
                    width: 60, 
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    zIndex: "1000",
                  }}>
                    <HomeIcon 
                      sx={{ 
                          color: 'white', 
                          zIndex: "1000", 
                          backgroundColor: "#0844C4", 
                          padding: "5px", 
                          fontSize: "40px", 
                          borderRadius: "6px",
                          '&:hover': !open && {
                              backgroundColor: "#073DB0"
                          }
                      }}
                    />
                  </Box>
                  <Box sx={{ 
                    overflow: 'hidden',
                    width: open ? '200px' : 0,
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateX(0)' : 'translateX(-60px)',
                    transition: 'transform 0.8s ease-in-out, width 0.8s ease-in-out, opacity 0.8s ease-in-out',
                  }}>
                    <Typography
                      variant='inherit' 
                      sx={{ 
                          color: 'inherit',
                          whiteSpace: 'nowrap',
                          transition: "color 0.3s ease-in-out",
                          fontWeight: "500"
                      }}
                    >
                    Início
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              
              {/* Item Reembolsos */}
              <ListItem 
                onClick={() => {
                  navigate(routes.reembolsos);
                  setOpen(false);
                }}
                button = "true"
                sx={{ 
                    height: '48px', 
                    paddingLeft: "12px", 
                    paddingY: "0px",
                    transition: 'background-color 0.4s ease-in-out',
                    color: "black",
                    cursor: "pointer",
                    '&:hover': open && {
                        backgroundColor: '#1976d2',
                        color: "white",
                    },
                }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%'
                }}>
                  <Box sx={{ 
                    width: 60, 
                    display: 'flex', 
                    justifyContent: 'flex-start' 
                  }}>
                    <RequestQuoteIcon 
                      
                      sx={{ 
                          color: 'white', 
                          zIndex: "1000", 
                          backgroundColor: "#0844C4", 
                          padding: "5px", 
                          fontSize: "40px", 
                          borderRadius: "6px",
                          '&:hover': !open && {
                              backgroundColor: "#073DB0"
                          }
                      }} 
                    />
                  </Box>
                  <Box sx={{ 
                    overflow: 'hidden',
                    width: open ? '200px' : 0,
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateX(0)' : 'translateX(-60px)',
                    transition: 'transform 0.8s ease-in-out, width 0.8s ease-in-out, opacity 0.8s ease-in-out',
                  }}>
                    <Typography
                        variant='inherit'
                        sx={{ 
                            color: 'inherit',
                            whiteSpace: 'nowrap',
                            transition: "color 0.3s ease-in-out",
                            fontWeight: "500" 
                        }}>
                    Reembolsos
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              
              {/* Item Análise */}
              <ListItem 
                onClick={() => {
                  navigate(routes.analise);
                  setOpen(false);
                }}
                button = "true" 
                sx={{ 
                    height: '48px', 
                    paddingLeft: "12px", 
                    paddingY: "0px",
                    transition: 'background-color 0.4s ease-in-out',
                    color: "black",
                    cursor: "pointer",
                    '&:hover': open && {
                        backgroundColor: '#1976d2',
                        color: "white",
                    },
                }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%'
                }}>
                  <Box sx={{ 
                    width: 60, 
                    display: 'flex', 
                    justifyContent: 'flex-start' 
                  }}>
                    <ContentPasteSearchIcon 
                      sx={{ 
                          color: 'white', 
                          zIndex: "1000", 
                          backgroundColor: "#0844C4", 
                          padding: "5px", 
                          fontSize: "40px", 
                          borderRadius: "6px",
                          '&:hover': !open && {
                              backgroundColor: "#073DB0"
                          }
                      }} 
                    />
                  </Box>
                  <Box sx={{ 
                    overflow: 'hidden',
                    width: open ? '200px' : 0,
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateX(0)' : 'translateX(-60px)',
                    transition: 'transform 0.8s ease-in-out, width 0.8s ease-in-out, opacity 0.8s ease-in-out',
                  }}>
                    <Typography
                        variant='inherit'
                        sx={{ 
                            color: 'inherit',
                            whiteSpace: 'nowrap',
                            transition: "color 0.3s ease-in-out",
                            fontWeight: "500" 
                        }}>
                      Análise
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              
              {/* Item Histórico */}
              <ListItem 
                onClick={() => {
                  navigate(routes.historico);
                  setOpen(false);
                }}
                button = "true" 
                sx={{ 
                    height: '48px', 
                    paddingLeft: "12px", 
                    paddingY: "0px",
                    transition: 'background-color 0.4s ease-in-out',
                    color: "black",
                    cursor: "pointer",
                    '&:hover': open && {
                        backgroundColor: '#1976d2',
                        color: "white",
                    },
                }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%'
                }}>
                  <Box sx={{ 
                    width: 60, 
                    display: 'flex', 
                    justifyContent: 'flex-start' 
                  }}>
                    <HistoryIcon 
                      sx={{ 
                          color: 'white', 
                          zIndex: "1000", 
                          backgroundColor: "#0844C4", 
                          padding: "5px", 
                          fontSize: "40px", 
                          borderRadius: "6px",
                          '&:hover': !open && {
                              backgroundColor: "#073DB0"
                          }
                      }} 
                    />
                  </Box>
                  <Box sx={{ 
                    overflow: 'hidden',
                    width: open ? '200px' : 0,
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateX(0)' : 'translateX(-60px)',
                    transition: 'transform 0.8s ease-in-out, width 0.8s ease-in-out, opacity 0.8s ease-in-out',
                  }}>
                    <Typography 
                        variant='inherit'
                        sx={{ 
                            color: 'inherit',
                            whiteSpace: 'nowrap',
                            transition: "color 0.3s ease-in-out",
                            fontWeight: "500" 
                        }}>
                      Histórico
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            </List>
            <IconButton 
                onClick={()=> {
                  navigate(routes.login);
                  logout();
                }} 
                sx={{ 
                position: 'absolute', 
                bottom: isTabletScreen ? 20 : 5, 
                left: 12, 
                zIndex: 1300,
                backgroundColor: '#63758d',
                color: 'white',
                borderRadius: "5px",
                '&:hover': {
                    backgroundColor: "#7A8DA7"
                }
                }}
            >
            <LogOutIcon />
          </IconButton>
        </Drawer>  
    </>
  );
}