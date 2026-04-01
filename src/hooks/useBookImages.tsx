"use client";

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useBookImages = () => {
  return useQuery({
    queryKey: ['book-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_images')
        .select('key, url')
        .eq('category', 'book-cover');
      
      if (error) throw error;
      
      // Convertir array a objeto para búsqueda rápida
      const imageMap: Record<string, string> = {};
      data?.forEach(img => {
        imageMap[img.key] = img.url;
      });
      
      return imageMap;
    },
    staleTime: 0, // Sin cache para ver cambios inmediatamente
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
