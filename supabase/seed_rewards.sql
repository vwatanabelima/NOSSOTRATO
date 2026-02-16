-- Seed Rewards for Shop
-- Run this in Supabase SQL Editor to populate the store

DO $$
DECLARE
  v_family_id uuid;
BEGIN
  -- Attempt to get the first available family ID
  SELECT id INTO v_family_id FROM public.families LIMIT 1;
  
  IF v_family_id IS NOT NULL THEN
    -- Insert default items if they don't exist
    INSERT INTO public.rewards (family_id, title, cost, image_url, stock)
    VALUES 
    (v_family_id, 'Vale 1 Hora de TV', 100, '📺', -1),
    (v_family_id, 'Sorvete Extra', 50, '🍦', -1),
    (v_family_id, 'Dormir Tarde', 200, '🌙', -1)
    ON CONFLICT DO NOTHING; -- Assuming logic doesn't conflict on ID, but good practice
    
    RAISE NOTICE 'Rewards seeded successfully for family %', v_family_id;
  ELSE
    RAISE NOTICE 'No family found. Please create a family first.';
  END IF;
END $$;
