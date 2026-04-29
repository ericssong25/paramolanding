import { useState, useEffect, useCallback } from 'react';
import { WorkItem } from '../data/work';

interface AssetLoaderState {
  isLoading: boolean;
  progress: number;
  totalAssets: number;
  loadedAssets: number;
}

export const useAssetLoader = (work: WorkItem | undefined) => {
  const [state, setState] = useState<AssetLoaderState>({
    isLoading: false,
    progress: 0,
    totalAssets: 0,
    loadedAssets: 0,
  });

  const extractAssets = useCallback((work: WorkItem): string[] => {
    const assets: string[] = [];
    
    // Agregar cover image
    assets.push(work.coverImage);
    
    // Extraer assets de las secciones
    work.sections.forEach(section => {
      if (section.type === 'gallery') {
        section.items.forEach(item => {
          if (item.type === 'image') {
            assets.push(item.src);
          } else if (item.type === 'carousel') {
            assets.push(item.coverSrc);
            item.slides.forEach(slide => {
              assets.push(slide.src);
            });
          }
        });
      } else if (section.type === 'videoGrid') {
        section.items.forEach(item => {
          assets.push(item.src);
          if (item.poster) {
            assets.push(item.poster);
          }
        });
      }
    });
    
    return assets;
  }, []);

  const loadAsset = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (url.includes('.mp4') || url.includes('.webm') || url.includes('.mov')) {
        // Para videos, solo verificamos que se pueda cargar el metadata
        const video = document.createElement('video');
        video.src = url;
        video.preload = 'metadata';
        
        const timeout = setTimeout(() => {
          resolve(); // Si no carga en tiempo, continuamos
        }, 3000);
        
        video.onloadeddata = () => {
          clearTimeout(timeout);
          resolve();
        };
        
        video.onerror = () => {
          clearTimeout(timeout);
          resolve(); // No fallamos por errores de carga
        };
      } else {
        // Para imágenes
        const img = new Image();
        
        const timeout = setTimeout(() => {
          resolve(); // Si no carga en tiempo, continuamos
        }, 2000);
        
        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        
        img.onerror = () => {
          clearTimeout(timeout);
          resolve(); // No fallamos por errores de carga
        };
        
        img.src = url;
      }
    });
  }, []);

  const startLoading = useCallback(async () => {
    if (!work) return;
    
    setState({
      isLoading: true,
      progress: 0,
      totalAssets: 0,
      loadedAssets: 0,
    });

    const assets = extractAssets(work);
    const totalAssets = assets.length;
    
    setState(prev => ({ ...prev, totalAssets }));
    
    let loadedAssets = 0;
    
    try {
      // Cargar assets en paralelo pero con control de progreso
      const loadPromises = assets.map(async (assetUrl) => {
        await loadAsset(assetUrl);
        loadedAssets++;
        const progress = (loadedAssets / totalAssets) * 100;
        
        setState(prev => ({
          ...prev,
          loadedAssets,
          progress,
        }));
        
        return assetUrl;
      });
      
      await Promise.all(loadPromises);
      
      // Pequeña pausa para mostrar 100%
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setState({
        isLoading: false,
        progress: 100,
        totalAssets,
        loadedAssets,
      });
      
    } catch (error) {
      console.error('Error loading assets:', error);
      // En caso de error, completamos la carga
      setState({
        isLoading: false,
        progress: 100,
        totalAssets,
        loadedAssets,
      });
    }
  }, [work, extractAssets, loadAsset]);

  return {
    ...state,
    startLoading,
  };
};
