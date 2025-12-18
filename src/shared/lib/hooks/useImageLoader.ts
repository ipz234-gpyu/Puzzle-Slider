import { useState, useEffect } from "react";

export function useImageLoader(imageUrl: string) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!imageUrl) return;

        let isActive = true;
        setIsLoaded(false);

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            if (isActive) {
                setWidth(img.width);
                setHeight(img.height);
                setIsLoaded(true);
            }
        };

        img.onerror = () => {
            if (isActive) {
                console.error(`Failed to load image: ${imageUrl}`);
                setIsLoaded(false);
            }
        }

        return () => {
            isActive = false;
        };
    }, [imageUrl]);

    return { isLoaded, width, height, aspectRatio: width / height };
}