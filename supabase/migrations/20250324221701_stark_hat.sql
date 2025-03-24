/*
  # Add initial gym data

  1. Changes
    - Insert gym data with proper time format casting
    - Add opening hours with explicit time type casting
    - Add amenities for each gym
    - Add classes for each gym

  2. Data Structure
    - Main gym information in gyms table
    - Operating hours with proper time format in gym_hours table
    - Amenities in gym_amenities table
    - Classes in gym_classes table
*/

-- Insert gyms
INSERT INTO gyms (name, description, address, neighborhood, rating, price_range, website, phone, email, multisport, facility_type)
VALUES
  ('Form Factory Smíchov', 'Modern fitness center with state-of-the-art equipment', 'Karla Engliše 3221/2, Prague 5', 'Smíchov', 4.8, '1200-2000 Kč', 'https://www.formfactoryfitness.cz', '+420 222 232 034', 'smichov@formfactory.cz', true, 'gym'),
  ('WorldClass Wenceslas Square', 'Premium fitness club in city center', 'Václavské nám. 846/1, Prague 1', 'Prague 1', 4.9, 'Over 2000 Kč', 'https://www.worldclass.cz', '+420 234 699 680', 'info@worldclass.cz', true, 'gym'),
  ('Yoga Karlin', 'Peaceful yoga studio with experienced instructors', 'Křižíkova 67, Prague 8', 'Karlín', 4.7, '700-1200 Kč', 'https://www.yogakarlin.cz', '+420 777 555 333', 'info@yogakarlin.cz', false, 'yoga'),
  ('CrossFit Committed', 'High-intensity functional fitness gym', 'Dělnická 54, Prague 7', 'Holešovice', 4.8, '1200-2000 Kč', 'https://www.crossfitcommitted.cz', '+420 777 888 999', 'info@crossfitcommitted.cz', false, 'crossfit'),
  ('Pure Jatomi Fitness Harfa', 'Full-service fitness center', 'Českomoravská 2420/15a, Prague 9', 'Vysočany', 4.5, '1200-2000 Kč', 'https://www.puregyms.cz', '+420 226 555 333', 'harfa@purejatomi.cz', true, 'gym');

-- Insert gym hours with proper time casting
INSERT INTO gym_hours (gym_id, day, open_time, close_time)
SELECT id, 'Monday', '06:00'::time, '22:00'::time FROM gyms WHERE name = 'Form Factory Smíchov'
UNION ALL
SELECT id, 'Tuesday', '06:00'::time, '22:00'::time FROM gyms WHERE name = 'Form Factory Smíchov'
UNION ALL
SELECT id, 'Wednesday', '06:00'::time, '22:00'::time FROM gyms WHERE name = 'Form Factory Smíchov'
UNION ALL
SELECT id, 'Monday', '06:00'::time, '23:00'::time FROM gyms WHERE name = 'WorldClass Wenceslas Square'
UNION ALL
SELECT id, 'Tuesday', '06:00'::time, '23:00'::time FROM gyms WHERE name = 'WorldClass Wenceslas Square'
UNION ALL
SELECT id, 'Wednesday', '06:00'::time, '23:00'::time FROM gyms WHERE name = 'WorldClass Wenceslas Square'
UNION ALL
SELECT id, 'Monday', '07:00'::time, '21:00'::time FROM gyms WHERE name = 'Yoga Karlin'
UNION ALL
SELECT id, 'Tuesday', '07:00'::time, '21:00'::time FROM gyms WHERE name = 'Yoga Karlin'
UNION ALL
SELECT id, 'Wednesday', '07:00'::time, '21:00'::time FROM gyms WHERE name = 'Yoga Karlin'
UNION ALL
SELECT id, 'Monday', '06:30'::time, '21:30'::time FROM gyms WHERE name = 'CrossFit Committed'
UNION ALL
SELECT id, 'Tuesday', '06:30'::time, '21:30'::time FROM gyms WHERE name = 'CrossFit Committed'
UNION ALL
SELECT id, 'Wednesday', '06:30'::time, '21:30'::time FROM gyms WHERE name = 'CrossFit Committed'
UNION ALL
SELECT id, 'Monday', '06:00'::time, '22:00'::time FROM gyms WHERE name = 'Pure Jatomi Fitness Harfa'
UNION ALL
SELECT id, 'Tuesday', '06:00'::time, '22:00'::time FROM gyms WHERE name = 'Pure Jatomi Fitness Harfa'
UNION ALL
SELECT id, 'Wednesday', '06:00'::time, '22:00'::time FROM gyms WHERE name = 'Pure Jatomi Fitness Harfa';

-- Insert gym amenities
INSERT INTO gym_amenities (gym_id, amenity)
SELECT id, 'Sauna' FROM gyms WHERE name IN ('Form Factory Smíchov', 'WorldClass Wenceslas Square', 'Pure Jatomi Fitness Harfa')
UNION ALL
SELECT id, 'Pool' FROM gyms WHERE name IN ('WorldClass Wenceslas Square')
UNION ALL
SELECT id, 'Parking' FROM gyms WHERE name IN ('Form Factory Smíchov', 'Pure Jatomi Fitness Harfa')
UNION ALL
SELECT id, 'Towels' FROM gyms WHERE name IN ('WorldClass Wenceslas Square', 'Pure Jatomi Fitness Harfa')
UNION ALL
SELECT id, 'Jacuzzi' FROM gyms WHERE name IN ('WorldClass Wenceslas Square');

-- Insert gym classes
INSERT INTO gym_classes (gym_id, class_name)
SELECT id, 'HIIT' FROM gyms WHERE name IN ('Form Factory Smíchov', 'WorldClass Wenceslas Square', 'Pure Jatomi Fitness Harfa')
UNION ALL
SELECT id, 'Yoga' FROM gyms WHERE name IN ('Form Factory Smíchov', 'WorldClass Wenceslas Square', 'Yoga Karlin', 'Pure Jatomi Fitness Harfa')
UNION ALL
SELECT id, 'Spin' FROM gyms WHERE name IN ('Form Factory Smíchov', 'WorldClass Wenceslas Square', 'Pure Jatomi Fitness Harfa')
UNION ALL
SELECT id, 'CrossFit' FROM gyms WHERE name IN ('CrossFit Committed')
UNION ALL
SELECT id, 'Boxing' FROM gyms WHERE name IN ('Form Factory Smíchov', 'WorldClass Wenceslas Square')
UNION ALL
SELECT id, 'Pilates' FROM gyms WHERE name IN ('Form Factory Smíchov', 'WorldClass Wenceslas Square', 'Yoga Karlin', 'Pure Jatomi Fitness Harfa')
UNION ALL
SELECT id, 'Zumba' FROM gyms WHERE name IN ('Form Factory Smíchov', 'Pure Jatomi Fitness Harfa');