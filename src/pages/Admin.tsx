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

    // Use Textarea for descriptions, full descriptions and long text content
    if (item.content_type === 'text' && 
        (item.content_key.includes('description') || 
         item.content_key.includes('text') ||
         item.content_key.includes('full'))) {
      return (
        <Textarea
          value={item.content_value || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="min-h-[100px] resize-none"
          placeholder="Digite o conteúdo..."
        />
      );
    }

    // Color picker style for color fields
    if (item.content_type === 'color') {
      return (
        <div className="space-y-2">
          <Input
            type="text"
            value={item.content_value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Ex: 240 10% 3.9%"
            className="font-mono"
          />
          <div className="text-xs text-muted-foreground">
            Formato HSL: matiz saturação luminosidade
          </div>
        </div>
      );
    }

    // URL input for URLs and images
    if (item.content_type === 'url' || item.content_type === 'image') {
      return (
        <Input
          type="url"
          value={item.content_value || ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={item.content_type === 'image' ? '/src/assets/image.jpg' : 'https://exemplo.com'}
        />
      );
    }

    // Default text input
    return (
      <Input
        type="text"
        value={item.content_value || ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Digite o texto..."
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="problem">Problemas</TabsTrigger>
            <TabsTrigger value="benefits">Benefícios</TabsTrigger>
            <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
            <TabsTrigger value="timer">Timer</TabsTrigger>
            <TabsTrigger value="general">Geral</TabsTrigger>
          </TabsList>

          {Object.entries(groupedContent).map(([section, items]) => (
            <TabsContent key={section} value={section}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    {section === 'hero' && '🏠'} 
                    {section === 'problem' && '❗'} 
                    {section === 'benefits' && '✅'} 
                    {section === 'testimonials' && '💬'} 
                    {section === 'timer' && '⏰'} 
                    {section === 'general' && '⚙️'} 
                    {section}
                  </CardTitle>
                  <CardDescription>
                    {section === 'hero' && 'Configure a seção principal da página'}
                    {section === 'problem' && 'Defina os problemas e soluções apresentados'}
                    {section === 'benefits' && 'Gerencie os benefícios e call-to-actions'}
                    {section === 'testimonials' && 'Edite os depoimentos dos clientes'}
                    {section === 'timer' && 'Configure o contador regressivo'}
                    {section === 'general' && 'Configurações gerais do site'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {items.map((item) => (
                      <div key={item.id} className="space-y-3 p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={item.id} className="text-sm font-medium capitalize">
                            {item.content_key.replace(/_/g, ' ')}
                          </Label>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {item.content_type === 'color' && '🎨 Cor'}
                            {item.content_type === 'url' && '🔗 URL'}
                            {item.content_type === 'image' && '🖼️ Imagem'}
                            {item.content_type === 'text' && '📝 Texto'}
                          </span>
                        </div>
                        {renderContentField(item)}
                        {saving && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            Salvando...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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