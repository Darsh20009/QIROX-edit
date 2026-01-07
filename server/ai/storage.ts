/**
 * Local Storage Service for AI Models
 * Ensures trained models and data remain within the project infrastructure.
 */
import fs from 'fs/promises';
import path from 'path';

const MODELS_DIR = path.join(process.cwd(), 'server', 'ai', 'models');

export async function ensureModelsDirectory() {
  try {
    await fs.mkdir(MODELS_DIR, { recursive: true });
    console.log(`[AI Storage] Models directory verified: ${MODELS_DIR}`);
  } catch (error) {
    console.error(`[AI Storage] Error creating models directory:`, error);
  }
}

export async function saveModel(name: string, data: any) {
  const filePath = path.join(MODELS_DIR, `${name}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`[AI Storage] Model saved: ${name}`);
}

export async function loadModel(name: string) {
  const filePath = path.join(MODELS_DIR, `${name}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn(`[AI Storage] Model not found: ${name}`);
    return null;
  }
}
