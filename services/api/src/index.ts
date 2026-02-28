import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { config } from './config.js';
import { connectMongo, checkMongo } from './db/mongo.js';
import {
  checkPostgres,
  createProject,
  createReminder,
  deleteReminder,
  deleteProject,
  ensurePostgresSchema,
  listReminders,
  listProjects,
  pgPool,
  updateReminder,
  updateProject,
} from './db/postgres.js';
import { checkRedis, redis } from './db/redis.js';

const app = express();

app.use(express.json());

const createProjectSchema = z.object({
  title: z.string().trim().min(1, 'title is required').max(120),
  status: z.string().trim().min(1).max(40).optional(),
});

const updateProjectSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    status: z.string().trim().min(1).max(40).optional(),
  })
  .refine((value) => value.title !== undefined || value.status !== undefined, {
    message: 'at least one field is required',
  });

const projectIdSchema = z.coerce.number().int().positive();
const reminderIdSchema = z.coerce.number().int().positive();

const reminderCreateSchema = z.object({
  title: z.string().trim().min(1, 'title is required').max(120),
  notes: z.string().trim().max(500).optional().nullable(),
  scheduledAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'scheduledAt must be a valid ISO date string',
  }),
  repeatType: z.enum(['once', 'daily']).default('once'),
  status: z.enum(['pending', 'done', 'missed', 'cancelled']).default('pending'),
  notificationId: z.string().trim().min(1).optional().nullable(),
});

const reminderUpdateSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    notes: z.string().trim().max(500).optional().nullable(),
    scheduledAt: z
      .string()
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: 'scheduledAt must be a valid ISO date string',
      })
      .optional(),
    repeatType: z.enum(['once', 'daily']).optional(),
    status: z.enum(['pending', 'done', 'missed', 'cancelled']).optional(),
    notificationId: z.string().trim().min(1).optional().nullable(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'at least one field is required',
  });

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    service: 'sparknexajx-api',
    environment: config.nodeEnv,
    time: new Date().toISOString(),
  });
});

app.get('/health/deps', async (_req: Request, res: Response) => {
  try {
    const [postgres, mongo, redisOk] = await Promise.all([checkPostgres(), checkMongo(), checkRedis()]);

    const statusCode = postgres && mongo && redisOk ? 200 : 503;
    res.status(statusCode).json({
      ok: statusCode === 200,
      deps: {
        postgres,
        mongo,
        redis: redisOk,
      },
    });
  } catch (error) {
    res.status(503).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown dependency check error',
    });
  }
});

app.get('/api/projects', async (_req: Request, res: Response) => {
  try {
    const projects = await listProjects();
    res.status(200).json({ ok: true, data: projects });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to fetch projects',
    });
  }
});

app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const payload = createProjectSchema.parse(req.body);
    const project = await createProject(payload);
    res.status(201).json({ ok: true, data: project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        ok: false,
        error: error.issues.map((issue) => issue.message).join(', '),
      });
      return;
    }
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to create project',
    });
  }
});

app.put('/api/projects/:id', async (req: Request, res: Response) => {
  try {
    const id = projectIdSchema.parse(req.params.id);
    const payload = updateProjectSchema.parse(req.body);
    const project = await updateProject(id, payload);

    if (!project) {
      res.status(404).json({ ok: false, error: 'project not found' });
      return;
    }

    res.status(200).json({ ok: true, data: project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        ok: false,
        error: error.issues.map((issue) => issue.message).join(', '),
      });
      return;
    }
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to update project',
    });
  }
});

app.delete('/api/projects/:id', async (req: Request, res: Response) => {
  try {
    const id = projectIdSchema.parse(req.params.id);
    const deleted = await deleteProject(id);
    if (!deleted) {
      res.status(404).json({ ok: false, error: 'project not found' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        ok: false,
        error: error.issues.map((issue) => issue.message).join(', '),
      });
      return;
    }
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to delete project',
    });
  }
});

app.get('/api/reminders', async (_req: Request, res: Response) => {
  try {
    const reminders = await listReminders();
    res.status(200).json({ ok: true, data: reminders });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to fetch reminders',
    });
  }
});

app.post('/api/reminders', async (req: Request, res: Response) => {
  try {
    const payload = reminderCreateSchema.parse(req.body);
    const reminder = await createReminder(payload);
    res.status(201).json({ ok: true, data: reminder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        ok: false,
        error: error.issues.map((issue) => issue.message).join(', '),
      });
      return;
    }

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to create reminder',
    });
  }
});

app.put('/api/reminders/:id', async (req: Request, res: Response) => {
  try {
    const id = reminderIdSchema.parse(req.params.id);
    const payload = reminderUpdateSchema.parse(req.body);
    const reminder = await updateReminder(id, payload);

    if (!reminder) {
      res.status(404).json({ ok: false, error: 'reminder not found' });
      return;
    }

    res.status(200).json({ ok: true, data: reminder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        ok: false,
        error: error.issues.map((issue) => issue.message).join(', '),
      });
      return;
    }

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to update reminder',
    });
  }
});

app.delete('/api/reminders/:id', async (req: Request, res: Response) => {
  try {
    const id = reminderIdSchema.parse(req.params.id);
    const deleted = await deleteReminder(id);

    if (!deleted) {
      res.status(404).json({ ok: false, error: 'reminder not found' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        ok: false,
        error: error.issues.map((issue) => issue.message).join(', '),
      });
      return;
    }

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to delete reminder',
    });
  }
});

async function bootstrap() {
  await connectMongo();
  await ensurePostgresSchema();

  const server = app.listen(config.apiPort, () => {
    console.log(`[api] running on http://localhost:${config.apiPort}`);
  });

  const shutdown = async () => {
    console.log('[api] shutting down...');
    server.close();
    await Promise.allSettled([
      pgPool.end(),
      redis.quit(),
      mongoose.disconnect(),
    ]);
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  console.error('[api] failed to start:', error);
  process.exit(1);
});
