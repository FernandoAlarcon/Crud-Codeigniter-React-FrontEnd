import React, { Component, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Navbar from './navbar.jsx';
import axios from 'axios';

import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'; 
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';

///// NOTIFICACIONES /////
import toastr from 'toastr'; 
import swal from 'sweetalert';
//////////////////
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';


const baseUrl = "http://localhost/codeigniter/cantantes-test/backend/cantantes/";

 
const useStylesModal = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '35ch',
      },
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    button_submit: {
        margin: theme.spacing(1)
    },
}));

function ModalCantantes() {

    const classes          = useStylesModal();
    const [open, setOpen]  = React.useState(false);
    const [NombreArtistico, setNombreArtistico]       = React.useState('');
    const [Nombre, setNombre]                         = React.useState('');
    const [Apellido, setApellido]                     = React.useState('');
    const [genero_musical, setGenero_musical]         = React.useState('');
    const [fecha_nacimiento, setFecha_nacimiento]     = React.useState('');
    const theme      = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const Gestion    = new Cantantes();

  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const ChangueCantante = (event) => { 
        setNombreArtistico(event.target.value);
    };
    const ChangueNombre = (event) => { 
        setNombre(event.target.value);
    };
    const ChangueApellido = (event) => { 
        setApellido(event.target.value);
    };

    const ChangueGenero_musical = (event) => { 
        setGenero_musical(event.target.value);
    };
    
    const ChangueFecha_nacimiento = (event) => { 
        setFecha_nacimiento(event.target.value);
    };


    const NuevoCantante = async evt => {
        evt.preventDefault();   

        let URLApunte = baseUrl + 'save'; 
        let PostData = {
            nombre_artistico : NombreArtistico,
            nombre    : Nombre,          
            apellido  : Apellido,          
            genero_musical    : genero_musical             
        }
        console.log({PostData});
        await axios.post( URLApunte, PostData,
            {headers: {
                'Access-control-allow-headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',            
                'Access-control-allow-methods': 'POST',            
                'Access-control-allow-origin' : '*',            
                'Connection' : 'Keep-Alive', 
                'Content-Type': 'application/json',
                'Accept':       'application/json',
                'keep-alive' :'timeout=5, max=99',
                'x-powered-by' :'PHP/7.4.29'
                             
            }}
        )
        .then((response) => { 
 

            Gestion.SearchRealTime(); 
            setNombreArtistico('');
            setNombre('');  
            setApellido('');
            setGenero_musical('');
            setFecha_nacimiento('');
            
            setOpen(false); 
            swal("Agregaste nueva informacion a la base de datos", {
                icon: "success",
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
    return (
         <div> 
            <Fab onClick={handleClickOpen} color="primary" aria-label="add">
               <AddIcon />
            </Fab>

            <Dialog
             fullScreen={fullScreen}
             open={open}
             onClose={handleClose}
             aria-labelledby="responsive-dialog-title"
           >
             <DialogTitle id="responsive-dialog-title">
                 Nuevas Cantantes
             </DialogTitle>
           <DialogContent>
             <form onSubmit={NuevoCantante}>
                 <DialogContentText>
                     Aqui puedes agregar tus nuevas Cantantes
                 </DialogContentText>

                 <FormControl className={classes.margin}> 
                     <TextField  required
                                 name="NombreArtistico"
                                 defaultValue={NombreArtistico}
                                 onKeyPress={ChangueCantante}
                                 id="standard-required" 
                                 label="Nombre Artistico Cantante"  />
                 </FormControl>
                 <FormControl className={classes.margin}> 
                     <TextField  required
                                 name="Nombre"
                                 defaultValue={Nombre}
                                 onKeyPress={ChangueNombre}
                                 id="standard-required" 
                                 label="Nombre Real Cantante"  />
                 </FormControl>
                 <FormControl className={classes.margin}> 
                     <TextField  required
                                 name="Apellido"
                                 defaultValue={Apellido}
                                 onKeyPress={ChangueApellido}
                                 id="standard-required" 
                                 label="Apellido Real Cantante"  />
                 </FormControl> 
                 
                 <FormControl className={classes.formControl}>
                     <InputLabel id="demo-simple-select-label">Genero Musical</InputLabel>
                     <Select
                     name="Genero"
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={genero_musical}
                     onChange={ChangueGenero_musical}
                     >
                     <MenuItem value={'pop'}>Pop</MenuItem>
                     <MenuItem value={'Rock'}>Rock</MenuItem>
                     <MenuItem value={'Reggaeton'}>Reggaeton</MenuItem>
                     <MenuItem value={'Salsa'}>Salsa</MenuItem>
                     <MenuItem value={'Vallenato'}>Vallenato</MenuItem>
                     <MenuItem value={'Regae'}>Regae</MenuItem>
                    
                     </Select>
                 </FormControl> 



               <Button
                       type="submit"
                       variant="contained"
                       color="primary"
                       className={classes.button_submit}
                   >
                       Enviar Info <SendIcon className={classes.rightIcon} />
               </Button>
             </form>  
           </DialogContent>
           <DialogActions>
             <Button autoFocus onClick={handleClose} color="primary">
               Cerrar Ventana 
             </Button>
             <Button onClick={handleClose} color="primary" autoFocus>
               Agree
             </Button> 
           </DialogActions>
            </Dialog>
         </div> 
    );
}

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
            },
        },
        margin_fab: {
            margin: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 220,
        },
        button_submit: {
            margin: theme.spacing(1)
        },
    }));

function EditModalCantantes(props) {
 
    const classes = useStyles();
    const Data    = props.InfoData;
    const [open, setOpen]     = useState(false);
    const [Id, setId]         = useState(Data.id); 
    const [NombreArtistico, setNombreArtistico]       = useState(Data.nombre_artistico);
    const [Nombre, setNombre]                         = useState(Data.nombre);
    const [Apellido, setApellido]                     = useState(Data.apellido);
    const [genero_musical, setGenero_musical]         = useState(Data.genero_musical);
    const [fecha_nacimiento, setFecha_nacimiento]     = useState(Data.fecha_nacimiento);

    const theme      = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const Gestion    = new Cantantes();

    
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const ChangueCantante = (event) => { 
        setNombreArtistico(event.target.value);
    };
    const ChangueNombre = (event) => { 
        setNombre(event.target.value);
    };
    const ChangueApellido = (event) => { 
        setApellido(event.target.value);
    };

    const ChangueGenero_musical = (event) => { 
        setGenero_musical(event.target.value);
    };
    
    const ChangueFecha_nacimiento = (event) => { 
        setFecha_nacimiento(event.target.value);
    };

    const EditarCantante = async evt => {

            evt.preventDefault();   
            let URLApunte  = baseUrl + 'update/'+Id; 
            let DataUpdate = {
                nombre_artistico : NombreArtistico,
                nombre    : Nombre,
                apellido  : Apellido,
                genero_musical, 
            };

            await axios.post(URLApunte, DataUpdate,
                {headers: {
                    'Access-control-allow-headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',            
                    'Access-control-allow-methods': 'POST',            
                    'Access-control-allow-origin' : '*',            
                    'Connection' : 'Keep-Alive', 
                    'Content-Type': 'application/json',
                    'Accept':       'application/json',
                    'keep-alive' :'timeout=5, max=99',
                    'x-powered-by' :'PHP/7.4.29'
                                 
                }}
            )
            .then((response) => { 

                Gestion.componentDidMount(); 
                setOpen(false); 
                swal("Editaste un archivo de la base de datos", {
                    icon: "success",
                });

            })
            .catch((error) => {
                console.log(error);
            });

        
    };

  return (
      <div> 
        <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Editar"
            className={classes.margin_fab}
            onClick={handleClickOpen}
            >
                <EditIcon/> Editar
        </Fab>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
              Editar Cantantes
          </DialogTitle>
          <DialogContent>
          <form onSubmit={EditarCantante}>
            <DialogContentText>
                Aqui puedes editar a tus Cantantes
            </DialogContentText>
            
            <FormControl className={classes.formControl}> 
                <TextField  required
                            name="Nombre Artistico"
                            defaultValue={NombreArtistico}
                            onKeyPress={ChangueCantante}
                            id="standard-required" 
                            label="Nombre Artistico Cantante"  />
            </FormControl>
            <FormControl className={classes.formControl}> 
                <TextField  required
                            name="Nombre"
                            defaultValue={Nombre}
                            onKeyPress={ChangueNombre}
                            id="standard-required" 
                            label="Nombre Real Cantante"  />
            </FormControl>
            <FormControl className={classes.formControl}> 
                <TextField  required
                            name="Nombre"
                            defaultValue={Apellido}
                            onKeyPress={ChangueApellido}
                            id="standard-required" 
                            label="Apellido Real Cantante"  />
            </FormControl>
            
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Genero Musical</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genero_musical}
                onChange={ChangueGenero_musical}
                >
                <MenuItem value={'pop'}>Pop</MenuItem>
                <MenuItem value={'Rock'}>Rock</MenuItem>
                <MenuItem value={'Reggaeton'}>Reggaeton</MenuItem>
                <MenuItem value={'Salsa'}>Salsa</MenuItem>
                <MenuItem value={'Vallenato'}>Vallenato</MenuItem>
                <MenuItem value={'Regae'}>Regae</MenuItem>
                
                </Select>
            </FormControl>  

          </form>  
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cerrar Ventana 
            </Button> 
            <Button autoFocus onClick={EditarCantante} color="warning">
              Guardar Cambios
            </Button>
          </DialogActions>
      </Dialog>
      </div>
   
  );
}

export default  class Cantantes extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            Fecha: new Date(),
            Cantantes: [],
            CantantesBackup: [],
            BusquedadApuntes: '',
            columns : [
                { id: 'nombre_artistico', label: 'Nombre Artstico',     minWidth: 170, align: 'center' },
                { id: 'nombre',           label: 'Nombre',              minWidth: 100, align: 'center' },
                { id: 'apellido',         label: 'Apellido',            minWidth: 100, align: 'center' },
                { id: 'fecha_nacimiento', label: 'Fecha de Nacimiento', minWidth: 100, align: 'center' },
                { id: 'genero_musical',   label: 'Genero Musical',      minWidth: 100, align: 'center' }
            ],
            page: 0,
            rowsPerPage: 10,
        };
        this.SearchRealTime     = this.SearchRealTime.bind(this);
        this.ReloadData         = this.componentDidMount.bind(this);
        this.getDataCantantes   = this.getDataCantantes.bind(this);
        
        this.useStyles = makeStyles(theme => ({ 

            table: {
                minWidth: 650,
            }
        }));
    
    } ///FINAL CONSTRUCTOR

    async componentDidMount(){
        await this.getDataCantantes();
    };

    async getDataCantantes(){

        await axios.get(baseUrl,{params:{
          DataSend: this.state.BusquedadApuntes
        }}).then(response=>{
            let Cantantes = response.data.data
            this.setState({Cantantes: Cantantes});
             
        }).catch(error=>{
            alert("Error "+error)
        })
    };

    async SearchRealTime(event){
        let InfoSend = '';
        if(event){
            InfoSend = event.target.value;
        }
        this.setState({BusquedadApuntes: InfoSend});
        await this.getDataCantantes();
    };

    Eliminar(Info){

         swal({
             title: "Estas seguro ?",
             text: "Vas a eliminar a " + Info.nombre_artistico + " perderas este registro",
             icon: "warning",
             buttons: true,
             dangerMode: true,
         }).then((willDelete) => {
             if (willDelete) {
                 let IdData = Info.id;
                     axios.delete(baseUrl + 'delete/' + IdData).then(response=>{
                     this.getDataCantantes();
                     swal("Eliminaste "+ Info.nombre_artistico + " de la base de datos", {
                         icon: "success",
                     });
                     toastr.success('Dato Eliminado');
                 }).catch(error=>{
                     alert("Error "+error)
                 })
              
             } else {
               swal("Your imaginary file is safe!");
             }
           });           

     };

    async handleChangePage(event, newPage){ 
         let finalRow = (this.state.page) + 1;
        this.setState({page:finalRow});
    };

    handleChangeRowsPerPage(event){
        let rowsPerPage_D = event.target.value;
            rowsPerPage_D = rowsPerPage_D+1;
        this.setState({rowsPerPage : rowsPerPage_D});
        this.setState({page:0});
    };

    render(){
 

    const classes  = this.useStyles; 
    return (
              <div>
                    <div> 
                        <Navbar/>
                    </div>
                    <div className="container" >
                        <div className="row" >
                            <div className="col-md-12" ><br/>
                                <div className="card">
                                   <center><br/>
                                        <h3>
                                            Cantantes Crud
                                        </h3>
                                   </center>
                                
                                   <div className="card-body" > 
                                        <div className="row" >
                                            {/* <div className={'col-md-6'}  >
                                                <TextField  id="Search"
                                                            onChange={this.SearchRealTime } 
                                                            value={this.state.BusquedadApuntes}
                                                            className={classes.root_field} 
                                                            label="Mejora tu Busqueda" variant="outlined" />
                                            </div> */}
                                            <div className="col-md-6" style={{textAlign:"right"}} >
                                                <ModalCantantes />
                                            </div>    
                                            <div className="col-md-12" ><br/>
                                                <Paper className={classes.root}>                                    
                                                    <TableContainer className={classes.container}>
                                                    <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                        {this.state.columns.map((column) => (
                                                            <TableCell
                                                            key={column.id}
                                                            align={'center'}
                                                            style={{ minWidth: 100 }}
                                                            >
                                                            {column.label}
                                                            </TableCell>
                                                        ))}
                                                            <TableCell  align={'center'} >
                                                                Acciones
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    
                                                        <If condition={!this.state.Cantantes.length} >
                                                            <TableBody>
                                                                    <TableCell></TableCell>
                                                                    <TableCell></TableCell>
                                                                    <TableCell></TableCell>
                                                                    <TableCell>
                                                                        <center>
                                                                            <CircularProgress />
                                                                        </center>
                                                                    </TableCell>
                                                                    <TableCell></TableCell>
                                                                    <TableCell></TableCell>
                                                                    <TableCell></TableCell>
                                                            </TableBody>
                                                        
                                                        <Else>
                                                                <If condition={this.state.Cantantes.length == 0} >
                                                                    <p>
                                                                        No hay datos ...
                                                                    </p>
                                                                <Else>
                                                                    <TableBody>
                                                                        {                      
                                                                            this.state.Cantantes.slice(
                                                                                this.state.page * this.state.Cantantes.length, this.state.page * this.state.Cantantes.length + this.state.Cantantes.length 
                                                                                ).map((row) => {
                                                                            return (
                                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                                    {this.state.columns.map((column) => {
                                                                                        let value = row[column.id];
                                                                                        return (
                                                                                            <TableCell key={column.id} align={column.align}>
                                                                                            {value} 
                                                                                            </TableCell>
                                                                                        );
                                                                                    })}
                                                                                        <TableCell align={'center'} > 
                                                                                            <div>        
                                                                                            <Fab
                                                                                                variant="extended"
                                                                                                size="medium"
                                                                                                color="secondary"
                                                                                                aria-label="add"
                                                                                                className={classes.margin_fab}
                                                                                                onClick={this.Eliminar.bind(this, row)}
                                                                                            >
                                                                                                <DeleteIcon /> Borrar 
                                                                                            </Fab>
                                                                                            <EditModalCantantes InfoData={row} />
                                                                                            </div>
                                                                                        </TableCell> 
                                                                                    </TableRow>
                                                                            );                                        
                                                                        })}
                                                                    </TableBody>
                                                                    
                                                                </Else>
                                                                </If>
                                                        </Else>
                                                    </If>
                                                    
                                                    </Table>
                                                    </TableContainer>  
                                                    {/* <TablePagination
                                                        rowsPerPageOptions={[10, 25, 100]}
                                                        component="div"
                                                        count={this.state.Cantantes.length}
                                                        rowsPerPage={this.state.rowsPerPage}
                                                        page={this.state.page}
                                                        onChangePage={this.handleChangePage}
                                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    />                                     */}
                                                </Paper>
                                            </div>
                                        </div>
                                    </div>       
                                                                                    
                                </div>   
                                                
                            </div>
                        </div>
                    </div>                                                                  
              </div>
      );
  }

 
}