![CI](https://github.com/baraadalol/lia-helper/actions/workflows/ci.yml/badge.svg)

# LIA Helper

A personal CRM-style web application for managing LIA (internship) applications.

Built as a fullstack project using Next.js and SQLite, with a focus on understanding relational databases and backend logic without using an ORM.

---

## Features

- Track companies and LIA applications
- Update application status
- Set follow-up dates
- Dashboard with:
  - Overdue follow-ups
  - Today’s tasks
  - Upcoming tasks (next 7 days)
- Add new companies
- Real-time updates via API

---

## Problem

Applying for LIA often becomes messy:

- Multiple companies
- Different application statuses
- Missed follow-ups
- Scattered notes and emails

This is often handled manually in spreadsheets or notes, which reduces clarity and increases stress.

---

## Solution

LIA Helper acts as a lightweight personal CRM system that helps you:

- Stay organized
- Track your progress
- Know exactly what to do next

---

##  Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database:** SQLite
- **Driver:** better-sqlite3
- **Language:** TypeScript
- **Querying:** Raw SQL (no ORM)


##  Project Structure

/app
/api
/companies
/dashboard

/lib
db.ts
queries.ts

/db
schema.sql
seed.sql

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/lia-helper.git
cd lia-helper
´´´
### 2. Install dependencies

```bash
npm install
```
### 3. Create the database

```bash
sqlite3 data/lia.db < db/schema.sql
sqlite3 data/lia.db < db/seed.sql
```

### 4. Start development server

```bash
npm run dev
```
open:
http://localhost:3000

# Database Overview

## companies

- id
- name
- website
- location
- tags
- notes
- created_at

## applications

- id
- company_id (foreign key)
- status
- priority
- match_score
- last_contact_at
- next_followup_at
- contact_channel
- contact_person
- created_at
- updated_at

## Learning Goals

- Strengthen SQL and database design skills
- Understand relational data modeling
- Build a fullstack app without an ORM
- Work with API routes and server components
- Practice real-world CRUD operations

## Roadmap

- [x] Database schema
- [x] API endpoints
- [x] Companies page
- [x] Dashboard
- [x] Update status
- [x] Follow-up date editing
- [x] Add company
- [x] Delete company
- [x] Priority editing
- [ ] UI improvements
- [ ] Company detail page

# Author
Built independently as a DevOps student that needed a tool in the LIA (internship) searching process.

## Kubernetes

The app can be deployed locally to Kubernetes using Minikube.

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get services
minikube service lia-helper-service
```
