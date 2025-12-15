import { useState, useEffect } from "react";

export function useImageLoader(imageUrl: string) {
    const [aspectRatio, setAspectRatio] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setAspectRatio(img.width / img.height);
            setIsLoaded(true);
        };
    }, [imageUrl]);

    return { isLoaded, aspectRatio };
}