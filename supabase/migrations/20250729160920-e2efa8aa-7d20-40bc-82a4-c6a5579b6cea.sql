-- Create table to store landing page content
CREATE TABLE public.landing_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- hero, problem, benefits, testimonials
  content_key TEXT NOT NULL,
  content_value TEXT,
  content_type TEXT NOT NULL DEFAULT 'text', -- text, image, color, url
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, content_key)
);

-- Enable RLS
ALTER TABLE public.landing_content ENABLE ROW LEVEL SECURITY;

-- Create admin table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access only
CREATE POLICY "Only admins can access landing content" 
ON public.landing_content 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Only admins can manage admin users" 
ON public.admin_users 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Insert default content
INSERT INTO public.landing_content (section, content_key, content_value, content_type) VALUES
('hero', 'title', 'REVOLUCIONE', 'text'),
('hero', 'subtitle', 'SEU NEGÓCIO', 'text'),
('hero', 'description', 'Transforme sua empresa com nossa solução inovadora que já ajudou centenas de empreendedores a alcançarem seus objetivos.', 'text'),
('hero', 'button_text', 'COMEÇAR AGORA', 'text'),
('hero', 'button_url', '#inscricoes', 'url'),
('hero', 'image_url', '/src/assets/hero-retro.jpg', 'image'),
('hero', 'background_color', '240 10% 3.9%', 'color'),
('problem', 'title', 'Problemas Comuns', 'text'),
('problem', 'solution_title', 'Nossa Solução', 'text'),
('problem', 'solution_description', 'Oferecemos uma abordagem revolucionária que elimina esses problemas de uma vez por todas.', 'text'),
('benefits', 'title', 'Benefícios Exclusivos', 'text'),
('benefits', 'product_name', 'Produto Revolucionário', 'text'),
('benefits', 'product_tagline', 'A solução que você estava esperando', 'text'),
('benefits', 'product_description', 'Descubra como nosso produto pode transformar sua realidade e levar seus resultados para o próximo nível.', 'text'),
('benefits', 'button_text', 'GARANTIR MINHA VAGA', 'text'),
('benefits', 'button_url', '#inscricoes', 'url'),
('testimonials', 'title', 'O que nossos clientes dizem', 'text'),
('testimonials', 'subtitle', 'Histórias reais de transformação', 'text');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_landing_content_updated_at
BEFORE UPDATE ON public.landing_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('landing-images', 'landing-images', true);

-- Create policies for image uploads
CREATE POLICY "Admins can view all images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'landing-images' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'landing-images' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can update images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'landing-images' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can delete images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'landing-images' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);