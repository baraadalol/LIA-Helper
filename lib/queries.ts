import { db } from "./db";

export function getAllCompanies() {
  return db
    .prepare(`
      SELECT
        c.id,
        c.name,
        c.website,
        c.location,
        c.tags,
        c.notes,
        c.created_at,
        a.id AS application_id,
        a.status,
        a.priority,
        a.match_score,
        a.last_contact_at,
        a.next_followup_at,
        a.contact_channel,
        a.contact_person,
        a.updated_at
      FROM companies c
      LEFT JOIN applications a ON a.company_id = c.id
      ORDER BY c.name ASC
    `)
    .all();
}
export function updateApplicationStatus(id: string, status: string) {
  return db
    .prepare(`
      UPDATE applications
      SET status = ?, updated_at = date('now')
      WHERE id = ?
    `)
    .run(status, id);
}

export function createCompany(data: {
  id: string;
  name: string;
  website?: string;
  location?: string;
  tags?: string;
  notes?: string;
}) {
  return db
    .prepare(`
      INSERT INTO companies (id, name, website, location, tags, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      data.id,
      data.name,
      data.website ?? "",
      data.location ?? "",
      data.tags ?? "",
      data.notes ?? ""
    );
}

export function createApplication(data: {
  id: string;
  company_id: string;
  status?: string;
}) {
  return db
    .prepare(`
      INSERT INTO applications (id, company_id, status)
      VALUES (?, ?, ?)
    `)
    .run(data.id, data.company_id, data.status ?? "not_contacted");
}

export function updateFollowUpDate(id: string, date: string) {
  return db
    .prepare(`
      UPDATE applications
      SET next_followup_at = ?, updated_at = date('now')
      WHERE id = ?
    `)
    .run(date, id);
}

export function deleteCompany(id: string) {
  return db
    .prepare(`
      DELETE FROM companies
      WHERE id = ?
    `)
    .run(id);
}

export function updateApplicationPriority(id: string, priority: number) {
  return db
    .prepare(`
      UPDATE applications
      SET priority = ?, updated_at = date('now')
      WHERE id = ?
    `)
    .run(priority, id);
}
