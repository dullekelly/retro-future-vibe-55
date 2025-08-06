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
            <TabsTrigger value="problem">Você sente que precisa aparecer, mas trava?</TabsTrigger>
            <TabsTrigger value="benefits">Itens Exclusivos</TabsTrigger>
            <TabsTrigger value="testimonials">O que nossos clientes dizem</TabsTrigger>
            <TabsTrigger value="timer">Timer</TabsTrigger>
            <TabsTrigger value="general">Geral</TabsTrigger>
          </TabsList>

          {Object.entries(groupedContent).map(([section, items]) => (
            <TabsContent key={section} value={section}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    {section === 'hero' && '🏠 Hero'}
                    {section === 'problem' && '❗ Você sente que precisa aparecer, mas trava?'}
                    {section === 'benefits' && '🎁 Itens Exclusivos'}
                    {section === 'testimonials' && '💬 O que nossos clientes dizem'}
                    {section === 'timer' && '⏰ Timer'}
                    {section === 'general' && '⚙️ Geral'}
                  </CardTitle>
                  <CardDescription>
                    {section === 'hero' && 'Configure a seção principal da página'}
                    {section === 'problem' && (
                      <>
                        <div>Não sabe o que falar nos stories?</div>
                        <div>Acha que sua voz ou imagem "não são boas o suficiente"?</div>
                        <div>Tem vergonha de parecer forçado ou de ser julgado?</div>
                        <div>É empreendedor local e sabe que precisa se comunicar melhor, mas não sabe por onde começar?</div>
                      </>
                    )}
                    {section === 'benefits' && (
                      <>
                        <div>Aula bônus com uma terapeuta para trabalhar o medo de aparecer</div>
                        <div>Cronograma completo de stories prontos para usar</div>
                        <div>Desconto exclusivo por ser da primeira turma</div>
                      </>
                    )}
                    {section === 'testimonials' && (
                      <>
                        <div>"Dulle você sabe que admiro seu trabalho e sua inteligência, né? Sou grata pela oportunidade de ter sua parceria, por ter me encorajado a deixar os medos e as inseguranças de lado e me atirar no meu sonho, hoje tenho dominio da comunicação em frente as câmeras. Oportunidade ímpar que tive e tenho em ter você com suas ideias e propostas brilhantes…Hoje temos várias ideias de Reels para a divulgação nos nossos produtos…Obrigada pela sua competência!"<br/>- Tatiane Milhomem</div>
                        <div>"Nós tínhamos (e ainda temos) muita timidez pra gravar vídeos. Mas graças a Deus encontramos você, Dulle, que nos ensinou como os Reels são importantes, aqui nas redes sociais, e que podemos trazer conteúdos de valor e de qualidade para o público através deles. Prova disso tem sido o crescimento da nossa página. Hoje nosso trabalho está sendo visto em outros estados e estamos ganhando autoridade com nossos serviços. E o que mais tem tido engajamento em nosso perfil, são os conteúdos trazidos através dos Reels."<br/>- Ludmilla Goiz, Enfermeira especialista em feridas, proprietária da Curare</div>
                        <div>"A Dulle é simplesmente incrível quando o assunto é criatividade, e digo isso porque eu era péssimo nessa questão, tanto na criação quanto na edição de conteúdos, não entendia nada... Me ensinou simplesmente tudo, e de forma independente, ou seja, ela sempre quer que você aprenda a fazer sozinho e não ficar dependente de ninguém, e é exatamente isso que eu procurava. E me ajudou muito na organização de absolutamente tudo no meu Instagram. Recomendo a Dulle de olhos fechados, com certeza ela vai ser um divisor de águas na sua rede social."<br/>- Dr. Iago Mussi, Cirurgião-dentista Harmonizador Facial, com foco na naturalidade</div>
                      </>
                    )}
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