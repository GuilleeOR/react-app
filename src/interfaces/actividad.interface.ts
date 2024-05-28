import Usuario from "./usuario.interface";
interface Actividad {
    id: number;
    descripcion: string;
    idUsuarioAsignado: number;
    prioridad: string;
    estado: string;
    idUsuarioCreacion: number;
    fechaCreacion: string;
    usuarioCreacion: Usuario;
    usuarioAsignado: Usuario;
}

export default Actividad