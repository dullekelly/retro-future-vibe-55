import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContentData {
  [section: string]: {
    [key: string]: string;
  };
}

export const useContent = () => {
  const [content, setContent] = useState<ContentData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('landing_content')
        .select('section, content_key, content_value');

      if (error) {
        console.error('Error loading content:', error);
        return;
      }

      const contentMap: ContentData = {};
      data?.forEach((item) => {
        if (!contentMap[item.section]) {
          contentMap[item.section] = {};
        }
        contentMap[item.section][item.content_key] = item.content_value || '';
      });

      setContent(contentMap);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (section: string, key: string, fallback: string = '') => {
    return content[section]?.[key] || fallback;
  };

  return { content, loading, getContent, refreshContent: loadContent };
};