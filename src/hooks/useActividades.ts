import {useState, useCallback, useMemo, useEffect} from "react"
import Actividad from "../interfaces/actividad.interface"
const useActividades = (
    url: string
) => {
    const [actividadesData, setActividadesData] = useState<Actividad[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error|null>(null);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url);

            if (!response.ok) {
                // aca incluso podrias en caso de enviar un mensaje
                // desde el servidor pasarlo en el throw
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json()
            setActividadesData(data);
        }
        catch(error:  Error | any) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [url]);

    const actividadesMemo = useMemo(() => actividadesData, [actividadesData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {actividades: actividadesMemo, isLoading, error, getActividades: fetchData};
}

export default useActividades;
