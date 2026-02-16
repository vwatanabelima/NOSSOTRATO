-- Promote User to ADMIN by Email
-- Run this in Supabase SQL Editor AFTER signing up with the email

UPDATE public.profiles
SET role = 'ADMIN'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'watanabetrader@gmail.com'
);

-- Optional: Verify the update
SELECT email, role 
FROM public.profiles 
JOIN auth.users ON profiles.id = auth.users.id
WHERE email = 'watanabetrader@gmail.com';
