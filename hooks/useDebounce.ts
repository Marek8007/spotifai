import { useEffect, useState } from "react";

/**
 * Hook personalizado que retrasa la actualización de un valor.
 * Usado en la pantalla de Búsqueda para no disparar la API en cada pulsación.
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
