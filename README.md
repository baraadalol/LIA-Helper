# LIA-Helper
Personal CRM-style web app for managing LIA (internship) applications.
 
Problem:

Applying for LIA often becomes messy:

Multiple companies

Different application statuses

Missed follow-ups

Scattered notes and emails

Students often manage this manually in spreadsheets or notes, which increases stress and reduces clarity.

Solution:

LIA Helper works as a lightweight personal CRM for LIA applications.

The application allows you to:

Add and manage companies

Track application status

Set follow-up dates

View reminders (Overdue / Today / Upcoming)

Generate simple email templates

The goal is to move from chaos to clarity.

Tech Stack

Next.js

SQLite

better-sqlite3

Raw SQL (no ORM)

TypeScript

This project intentionally avoids ORMs in order to strengthen understanding of relational databases and SQL.

Features (v1)

Create companies

Track application status

Update follow-up dates

Dashboard overview

Email template generation

Database reset with seed data

Database Structure
companies

id (primary key)

name

website

location

notes

created_at

applications

id (primary key)

company_id (foreign key)

status

last_contact_at

next_followup_at

priority

match_score

contact_channel

contact_person

Getting Started

1. Clone the repository

git clone https://github.com/yourusername/lia-helper.git
cd lia-helper

2. Install dependencies

npm install

3. Create database

sqlite3 lia.db < db/schema.sql
sqlite3 lia.db < db/seed.sql

Week 1 (Databasgrunden)

Status-lista (valideras i `db/schema.sql`):

- `not_contacted`
- `contacted`
- `replied`
- `interview`
- `offer`
- `accepted`
- `rejected`
- `ghosted`

Manuell test i `sqlite3`

```bash
sqlite3 lia.db
```

```sql
PRAGMA foreign_keys = ON;
.read db/schema.sql
.read db/seed.sql

-- SELECT
SELECT id, name, location FROM companies ORDER BY name;

-- INSERT
INSERT INTO companies (id, name, website, location, tags, notes)
VALUES ('c_demo', 'Demo AB', 'https://example.com', 'Stockholm', 'demo', 'Testbolag');

INSERT INTO applications (
  id, company_id, status, priority, match_score, next_followup_at, contact_channel
) VALUES (
  'a_demo', 'c_demo', 'not_contacted', 3, 70, date('now','+3 day'), 'email'
);

-- UPDATE
UPDATE applications
SET status = 'contacted',
    last_contact_at = date('now')
WHERE id = 'a_demo';

-- JOIN (companies ↔ applications)
SELECT
  c.name AS company,
  a.status,
  a.priority,
  a.next_followup_at
FROM applications a
JOIN companies c ON c.id = a.company_id
ORDER BY a.priority DESC, c.name;

-- DELETE
DELETE FROM applications WHERE id = 'a_demo';
DELETE FROM companies WHERE id = 'c_demo';
```

4. Start development server

npm run dev

Open:

http://localhost:3000
Project Structure
/db
  schema.sql
  seed.sql

/lib
  db.ts
  queries.ts

/app
  /api
  /companies
  /dashboard
Learning Goals

Strengthen SQL knowledge

Understand relational database design

Build a fullstack application without an ORM

Improve backend architecture skills

Roadmap

 Database schema

 API endpoints

 Companies UI

 Dashboard

 Email templates

 Next-step logic

 Deployment

Author

Built independently as a devops student. 
