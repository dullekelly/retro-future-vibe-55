-- Remove the recursive RLS policy
DROP POLICY IF EXISTS "Only admins can manage admin users" ON public.admin_users;

-- Create a simple policy that allows admins to read admin_users
-- First, we need a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = $1 
    AND admin_users.is_active = true
  );
$$;

-- Create non-recursive policies for admin_users table
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Also fix the landing_content policy to use the same function
DROP POLICY IF EXISTS "Only admins can access landing content" ON public.landing_content;

CREATE POLICY "Only admins can access landing content" 
ON public.landing_content 
FOR ALL 
USING (public.is_admin(auth.uid()));