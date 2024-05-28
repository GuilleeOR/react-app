import { FC, memo, useCallback } from "react";
import useActividades from "../../hooks/useActividades";


const API_URL = 'http://localhost:3001/api/v1/actividades'

const ActividadesComponent: FC = memo(() => {

    const {actividades, isLoading, error, getActividades} = useActividades(API_URL)

    const checkActividades = Array.isArray(actividades) && actividades.length > 0;

    const handleClick = useCallback(() => {
        getActividades();
    }, [])

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Error al cargar datos</p>

    return (
        <>
            {
                checkActividades && !isLoading && !error
                ? (
                    <ul>
                        {actividades.map((actividad) => (
                            <li key={actividad.id}>
                                <Actividad id={actividad.id} descripcion={actividad.descripcion}/>
                            </li>
                        ))}
                    </ul>
                )
                : (
                    <div>
                        <p>Sin Actividades</p>
                    </div>
                ) 
            }
            <button type="button" onClick={handleClick}>actualizar datos</button>
        </>
    )
    
})

export default ActividadesComponent;


interface Actividad {
    id: number;
    descripcion: string;
}

const Actividad: FC<Actividad> = ({id, descripcion}) => {
    if (!id || descripcion) return null;

    return (
        <div>
            <p>Id: {id}</p>
            <p>Descripcion: {descripcion}</p>
        </div>
    )
}