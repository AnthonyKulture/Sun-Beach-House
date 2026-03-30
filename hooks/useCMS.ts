import { useState, useEffect } from 'react';
import { Villa } from '../types';
import { CmsService } from '../services/cms';

/**
 * Hook pour récupérer la liste complète des villas
 */
export const useVillas = () => {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await CmsService.getAllVillas();
        setVillas(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { villas, loading, error };
};

/**
 * Hook pour récupérer une villa unique
 */
export const useVilla = (id: string | null) => {
  const [villa, setVilla] = useState<Villa | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setVilla(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await CmsService.getVillaById(id);
        setVilla(data || null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { villa, loading, error };
};

/**
 * Lean hook to fetch similar villa cards — only fetches fields needed for cards.
 * Use this in VillaDetails instead of useVillas() to avoid the full over-fetch.
 */
export const useSimilarVillas = (
  excludeId: string | null,
  listingType: string | null,
  locationName: string | null
) => {
  const [similarVillas, setSimilarVillas] = useState<Villa[]>([]);

  useEffect(() => {
    if (!excludeId || !listingType) {
      setSimilarVillas([]);
      return;
    }

    // locationName can be null (though less ideal for sorting)
    CmsService.getSimilarVillas(excludeId, listingType, locationName || '')
      .then(setSimilarVillas)
      .catch((err) => {
        console.error('[useSimilarVillas] Fetch error:', err);
        setSimilarVillas([]);
      });
  }, [excludeId, listingType, locationName]);

  return { similarVillas };
};

