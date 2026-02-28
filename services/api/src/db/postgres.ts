import { Pool } from 'pg';
import { config } from '../config.js';

export const pgPool = new Pool({
  connectionString: config.databaseUrl,
});

export type ProjectRow = {
  id: number;
  title: string;
  status: string;
  created_at: string;
};

export type ReminderRow = {
  id: number;
  title: string;
  notes: string | null;
  scheduled_at: string;
  repeat_type: 'once' | 'daily';
  status: 'pending' | 'done' | 'missed' | 'cancelled';
  notification_id: string | null;
  created_at: string;
  updated_at: string;
};

export async function checkPostgres() {
  const client = await pgPool.connect();
  try {
    const result = await client.query('SELECT 1 as ok');
    return result.rows[0]?.ok === 1;
  } finally {
    client.release();
  }
}

export async function ensurePostgresSchema() {
  await pgPool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pgPool.query(`
    CREATE TABLE IF NOT EXISTS reminders (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      notes TEXT,
      scheduled_at TIMESTAMPTZ NOT NULL,
      repeat_type TEXT NOT NULL DEFAULT 'once',
      status TEXT NOT NULL DEFAULT 'pending',
      notification_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function listProjects(): Promise<ProjectRow[]> {
  const result = await pgPool.query<ProjectRow>(
    'SELECT id, title, status, created_at FROM projects ORDER BY created_at DESC'
  );
  return result.rows;
}

export async function createProject(input: { title: string; status?: string }): Promise<ProjectRow> {
  const status = input.status?.trim() ? input.status.trim() : 'active';
  const result = await pgPool.query<ProjectRow>(
    `
      INSERT INTO projects (title, status)
      VALUES ($1, $2)
      RETURNING id, title, status, created_at
    `,
    [input.title.trim(), status]
  );
  return result.rows[0];
}

export async function updateProject(
  id: number,
  input: { title?: string; status?: string }
): Promise<ProjectRow | null> {
  const fields: string[] = [];
  const values: string[] = [];

  if (typeof input.title === 'string') {
    fields.push(`title = $${fields.length + 1}`);
    values.push(input.title.trim());
  }

  if (typeof input.status === 'string') {
    fields.push(`status = $${fields.length + 1}`);
    values.push(input.status.trim());
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(String(id));
  const result = await pgPool.query<ProjectRow>(
    `
      UPDATE projects
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING id, title, status, created_at
    `,
    values
  );

  return result.rows[0] ?? null;
}

export async function deleteProject(id: number): Promise<boolean> {
  const result = await pgPool.query('DELETE FROM projects WHERE id = $1', [id]);
  return result.rowCount === 1;
}

export async function listReminders(): Promise<ReminderRow[]> {
  const result = await pgPool.query<ReminderRow>(
    `
      SELECT id, title, notes, scheduled_at, repeat_type, status, notification_id, created_at, updated_at
      FROM reminders
      ORDER BY scheduled_at ASC
    `
  );
  return result.rows;
}

export async function createReminder(input: {
  title: string;
  notes?: string | null;
  scheduledAt: string;
  repeatType?: 'once' | 'daily';
  status?: 'pending' | 'done' | 'missed' | 'cancelled';
  notificationId?: string | null;
}): Promise<ReminderRow> {
  const result = await pgPool.query<ReminderRow>(
    `
      INSERT INTO reminders (title, notes, scheduled_at, repeat_type, status, notification_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, title, notes, scheduled_at, repeat_type, status, notification_id, created_at, updated_at
    `,
    [
      input.title.trim(),
      input.notes?.trim() || null,
      input.scheduledAt,
      input.repeatType ?? 'once',
      input.status ?? 'pending',
      input.notificationId ?? null,
    ]
  );
  return result.rows[0];
}

export async function updateReminder(
  id: number,
  input: {
    title?: string;
    notes?: string | null;
    scheduledAt?: string;
    repeatType?: 'once' | 'daily';
    status?: 'pending' | 'done' | 'missed' | 'cancelled';
    notificationId?: string | null;
  }
): Promise<ReminderRow | null> {
  const fields: string[] = [];
  const values: Array<string | null> = [];

  if (typeof input.title === 'string') {
    fields.push(`title = $${fields.length + 1}`);
    values.push(input.title.trim());
  }

  if (input.notes !== undefined) {
    fields.push(`notes = $${fields.length + 1}`);
    values.push(input.notes?.trim() || null);
  }

  if (typeof input.scheduledAt === 'string') {
    fields.push(`scheduled_at = $${fields.length + 1}`);
    values.push(input.scheduledAt);
  }

  if (typeof input.repeatType === 'string') {
    fields.push(`repeat_type = $${fields.length + 1}`);
    values.push(input.repeatType);
  }

  if (typeof input.status === 'string') {
    fields.push(`status = $${fields.length + 1}`);
    values.push(input.status);
  }

  if (input.notificationId !== undefined) {
    fields.push(`notification_id = $${fields.length + 1}`);
    values.push(input.notificationId);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push('updated_at = NOW()');
  values.push(String(id));
  const result = await pgPool.query<ReminderRow>(
    `
      UPDATE reminders
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING id, title, notes, scheduled_at, repeat_type, status, notification_id, created_at, updated_at
    `,
    values
  );

  return result.rows[0] ?? null;
}

export async function deleteReminder(id: number): Promise<boolean> {
  const result = await pgPool.query('DELETE FROM reminders WHERE id = $1', [id]);
  return result.rowCount === 1;
}
