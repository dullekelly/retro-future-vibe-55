-- Adicionar todos os conteúdos que faltam do site

-- Seção Hero - adicionar mais campos
INSERT INTO landing_content (section, content_key, content_value, content_type) VALUES
('hero', 'ticker_text_1', 'TRANSFORMAÇÃO DIGITAL', 'text'),
('hero', 'ticker_text_2', 'RESULTADOS COMPROVADOS', 'text'),
('hero', 'ticker_text_3', 'SUPORTE ESPECIALIZADO', 'text'),
('hero', 'ticker_text_4', 'INOVAÇÃO CONSTANTE', 'text');

-- Seção Problem - adicionar problemas específicos
INSERT INTO landing_content (section, content_key, content_value, content_type) VALUES
('problem', 'problem_1', 'O mesmo conteúdo', 'text'),
('problem', 'problem_2', 'O mesmo look', 'text'),
('problem', 'problem_3', 'O mesmo resultado', 'text'),
('problem', 'problem_4', 'A mesma frustração', 'text'),
('problem', 'solution_subtitle', 'A mudança que você precisa', 'text'),
('problem', 'solution_full_description', 'Nossa metodologia exclusiva combina tecnologia de ponta com estratégias comprovadas para entregar resultados que realmente fazem a diferença no seu negócio.', 'text');

-- Seção Benefits - adicionar todos os benefícios
INSERT INTO landing_content (section, content_key, content_value, content_type) VALUES
('benefits', 'benefit_1', 'Resultados em 30 dias', 'text'),
('benefits', 'benefit_2', 'Suporte 24/7', 'text'),
('benefits', 'benefit_3', 'Garantia de satisfação', 'text'),
('benefits', 'benefit_4', 'Metodologia exclusiva', 'text'),
('benefits', 'benefit_5', 'Acompanhamento personalizado', 'text'),
('benefits', 'benefit_6', 'Comunidade ativa', 'text');

-- Seção Testimonials - adicionar depoimentos completos
INSERT INTO landing_content (section, content_key, content_value, content_type) VALUES
('testimonials', 'testimonial_1_name', 'Maria Silva', 'text'),
('testimonials', 'testimonial_1_role', 'CEO, TechStart', 'text'),
('testimonials', 'testimonial_1_text', 'Incrível como conseguiram transformar nosso negócio em apenas algumas semanas. Os resultados superaram todas as expectativas!', 'text'),
('testimonials', 'testimonial_2_name', 'João Santos', 'text'),
('testimonials', 'testimonial_2_role', 'Diretor de Marketing', 'text'),
('testimonials', 'testimonial_2_text', 'O suporte é excepcional e a metodologia realmente funciona. Recomendo para qualquer empresa que quer crescer.', 'text'),
('testimonials', 'testimonial_3_name', 'Ana Costa', 'text'),
('testimonials', 'testimonial_3_role', 'Empreendedora', 'text'),
('testimonials', 'testimonial_3_text', 'Depois de implementar a solução, meu faturamento triplicou. Não imaginava que seria possível!', 'text');

-- Seção Timer (se existir)
INSERT INTO landing_content (section, content_key, content_value, content_type) VALUES
('timer', 'title', 'Oferta por tempo limitado!', 'text'),
('timer', 'subtitle', 'Não perca esta oportunidade única', 'text'),
('timer', 'end_date', '2025-12-31T23:59:59', 'text');

-- Configurações gerais do site
INSERT INTO landing_content (section, content_key, content_value, content_type) VALUES
('general', 'site_title', 'Landing Page Revolucionária', 'text'),
('general', 'site_description', 'Transforme seu negócio com nossa solução inovadora', 'text'),
('general', 'primary_color', '213 94% 68%', 'color'),
('general', 'secondary_color', '217 91% 60%', 'color'),
('general', 'accent_color', '142 86% 28%', 'color');

-- Imagens adicionais
INSERT INTO landing_content (section, content_key, content_value, content_type) VALUES
('hero', 'background_image', '/src/assets/vintage-texture.jpg', 'image'),
('problem', 'background_image', '/src/assets/vintage-texture.jpg', 'image'),
('benefits', 'background_image', '', 'image'),
('testimonials', 'background_image', '', 'image');