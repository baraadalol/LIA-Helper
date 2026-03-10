PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  location TEXT,
  tags TEXT,
  notes TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE applications (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN (
      'not_contacted',
      'contacted',
      'replied',
      'interview',
      'offer',
      'accepted',
      'rejected',
      'ghosted'
    )
  ),
  priority INTEGER NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  match_score INTEGER NOT NULL DEFAULT 0 CHECK (match_score BETWEEN 0 AND 100),
  last_contact_at TEXT,
  next_followup_at TEXT,
  contact_channel TEXT CHECK (contact_channel IN ('email', 'linkedin', 'phone', 'other')),
  contact_person TEXT,
  created_at TEXT NOT NULL DEFAULT (date('now')),
  updated_at TEXT NOT NULL DEFAULT (date('now')),
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE INDEX idx_applications_company_id ON applications(company_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_followup ON applications(next_followup_at);
