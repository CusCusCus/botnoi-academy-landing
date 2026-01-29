-- Create internship_positions table
CREATE TABLE public.internship_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create internship_applications table
CREATE TABLE public.internship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  position TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.internship_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for internship_positions (public read)
CREATE POLICY "Anyone can view positions"
ON public.internship_positions
FOR SELECT
USING (true);

-- RLS policies for internship_applications (public insert for applications)
CREATE POLICY "Anyone can submit applications"
ON public.internship_applications
FOR INSERT
WITH CHECK (true);

-- Insert default positions data
INSERT INTO public.internship_positions (title, items) VALUES
  ('Agentic Builder', ARRAY['Internship Program', 'Part-time', 'Full-time']),
  ('Backend', ARRAY['Python Developer', 'Node.js Developer', 'Go Developer']),
  ('Content / Marketing', ARRAY['Content Creator', 'Digital Marketing', 'Social Media Manager']),
  ('Data Science', ARRAY['Data Analyst', 'Data Engineer', 'Machine Learning Engineer']),
  ('Graphic', ARRAY['Graphic Designer', 'Motion Graphics', 'Art Director']),
  ('Meta', ARRAY['Metaverse Developer', '3D Modeler', 'Unity Developer']),
  ('NLP', ARRAY['NLP Engineer', 'Linguist', 'AI Researcher']),
  ('Sales', ARRAY['Sales Executive', 'Account Manager', 'Business Development']),
  ('Software Development', ARRAY['Full Stack Developer', 'Frontend Developer', 'Software Engineer']),
  ('TTS/ASR', ARRAY['Speech Engineer', 'Audio Engineer', 'Signal Processing']),
  ('UX/UI', ARRAY['UX Researcher', 'UI Designer', 'Product Designer']),
  ('Web App', ARRAY['React Developer', 'Vue Developer', 'Angular Developer']);