PRAGMA foreign_keys = ON;

INSERT INTO companies (id, name, website, location, tags, notes) VALUES
('c_spotify', 'Spotify', 'https://spotify.com', 'Stockholm', 'international,music', ''),
('c_klarna', 'Klarna', 'https://klarna.com', 'Stockholm', 'international,fintech', ''),
('c_volvo', 'Volvo Cars', 'https://www.volvocars.com', 'Gothenburg', 'enterprise', ''),
('c_menti', 'Mentimeter', 'https://mentimeter.com', 'Stockholm', 'saas', ''),
('c_anyfin', 'Anyfin', 'https://anyfin.com', 'Stockholm', 'fintech', ''),
('c_icarus', 'Icarus Tech', 'https://example.com/icarus', 'Malmo', 'startup,web', 'Cold lead from meetup'),
('c_greenbyte', 'Greenbyte', 'https://example.com/greenbyte', 'Gothenburg', 'iot,energy', 'Sent portfolio'),
('c_norrdata', 'Norrdata', 'https://example.com/norrdata', 'Umea', 'consulting,data', 'Asked for spring LIA slots');

INSERT INTO applications (id, company_id, status, priority, match_score, last_contact_at, next_followup_at, contact_channel, contact_person)
VALUES
('a_spotify', 'c_spotify', 'contacted', 4, 80, date('now','-8 day'), date('now','-1 day'), 'email', 'Recruiter'),
('a_klarna', 'c_klarna', 'not_contacted', 5, 75, NULL, date('now'), 'email', NULL),
('a_volvo', 'c_volvo', 'replied', 3, 55, date('now','-3 day'), date('now','+2 day'), 'linkedin', 'Hiring manager'),
('a_menti', 'c_menti', 'interview', 3, 60, date('now','-1 day'), date('now','+5 day'), 'email', 'HR'),
('a_anyfin', 'c_anyfin', 'ghosted', 2, 40, date('now','-14 day'), date('now','-2 day'), 'email', NULL),
('a_icarus', 'c_icarus', 'rejected', 2, 50, date('now','-10 day'), NULL, 'email', 'CTO'),
('a_greenbyte', 'c_greenbyte', 'offer', 5, 88, date('now','-1 day'), date('now','+1 day'), 'phone', 'Team Lead'),
('a_norrdata', 'c_norrdata', 'accepted', 4, 78, date('now','-2 day'), NULL, 'email', 'Anna Lund');
