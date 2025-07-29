import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
}

const Admin = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadContent();
    }
  }, [isAdmin]);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('landing_content')
        .select('*')
        .order('section', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      toast({
        title: "Erro ao carregar conteúdo",
        description: "Não foi possível carregar o conteúdo da página",
        variant: "destructive"
      });
    }
  };

  const updateContent = async (id: string, value: string) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('landing_content')
        .update({ content_value: value })
        .eq('id', id);

      if (error) throw error;

      setContent(prev => 
        prev.map(item => 
          item.id === id ? { ...item, content_value: value } : item
        )
      );

      toast({
        title: "Conteúdo atualizado",
        description: "Alteração salva com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a alteração",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const renderContentField = (item: ContentItem) => {
    const handleChange = (value: string) => {
      updateContent(item.id, value);
    };

    if (item.content_type === 'text' && item.content_key.includes('description')) {
      return (
        <Textarea
          value={item.content_value || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="min-h-[100px]"
        />
      );
    }

    return (
      <Input
        type={item.content_type === 'color' ? 'text' : 'text'}
        value={item.content_value || ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={item.content_type === 'color' ? 'Ex: 240 10% 3.9%' : ''}
      />
    );
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie o conteúdo da sua landing page</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Ver Site
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="problem">Problemas</TabsTrigger>
            <TabsTrigger value="benefits">Benefícios</TabsTrigger>
            <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
          </TabsList>

          {Object.entries(groupedContent).map(([section, items]) => (
            <TabsContent key={section} value={section}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{section}</CardTitle>
                  <CardDescription>
                    Edite o conteúdo da seção {section}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <Label htmlFor={item.id} className="text-sm font-medium capitalize">
                        {item.content_key.replace(/_/g, ' ')}
                        {item.content_type === 'color' && ' (HSL)'}
                        {item.content_type === 'url' && ' (URL)'}
                        {item.content_type === 'image' && ' (Caminho da imagem)'}
                      </Label>
                      {renderContentField(item)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;