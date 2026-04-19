import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { schemes as localSchemes } from '@/data/schemes';
import type { Scheme } from '@/data/schemes';

/**
 * Loads schemes from the Supabase database, with the local hardcoded list
 * as an immediate fallback so UI never blocks on the network.
 */
export function useSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>(localSchemes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase.from('schemes').select('*').then(({ data, error }) => {
      if (cancelled) return;
      if (!error && data && data.length > 0) {
        const mapped: Scheme[] = data.map((row: any) => ({
          id: row.id,
          category: row.category,
          name: row.name,
          description: row.description,
          benefits: row.benefits,
          eligibility: row.eligibility,
          documents: row.documents,
          process: row.process,
          criteria: row.criteria || {},
        }));
        setSchemes(mapped);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { schemes, loading };
}

export function useSavedSchemes(userId: string | null | undefined) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const refresh = async () => {
    if (!userId) { setSavedIds(new Set()); return; }
    const { data } = await supabase
      .from('saved_schemes')
      .select('scheme_id')
      .eq('user_id', userId);
    setSavedIds(new Set((data || []).map((r: any) => r.scheme_id)));
  };

  useEffect(() => { refresh(); }, [userId]);

  const toggle = async (schemeId: string) => {
    if (!userId) return false;
    if (savedIds.has(schemeId)) {
      await supabase.from('saved_schemes').delete().eq('user_id', userId).eq('scheme_id', schemeId);
      setSavedIds(prev => { const n = new Set(prev); n.delete(schemeId); return n; });
      return false;
    } else {
      await supabase.from('saved_schemes').insert({ user_id: userId, scheme_id: schemeId });
      setSavedIds(prev => new Set(prev).add(schemeId));
      return true;
    }
  };

  return { savedIds, toggle, refresh };
}
