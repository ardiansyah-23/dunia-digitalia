import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
  serverTimestamp,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// ============================================
// Generic Helpers
// ============================================

export async function getDocById<T>(collectionName: string, id: string): Promise<T | null> {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

export async function getCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const ref = collection(db, collectionName);
  const q = query(ref, ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as T[];
}

export async function createDoc<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
  const ref = collection(db, collectionName);
  const docRef = await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateDocById<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const ref = doc(db, collectionName, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteDocById(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

export async function setDocById<T>(
  collectionName: string,
  id: string,
  data: Omit<T, 'id'>
): Promise<void> {
  await setDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ============================================
// Articles
// ============================================

export async function getPublishedArticles(limitCount = 10) {
  return getCollection('articles', [
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ]);
}

export async function getArticleBySlug(slug: string) {
  const articles = await getCollection('articles', [
    where('slug', '==', slug),
    where('published', '==', true),
    limit(1),
  ]);
  return articles[0] || null;
}

export async function getFeaturedArticles(limitCount = 3) {
  return getCollection('articles', [
    where('published', '==', true),
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ]);
}

export async function incrementArticleViews(id: string) {
  const ref = doc(db, 'articles', id);
  await updateDoc(ref, { views: increment(1) });
}

// ============================================
// Projects
// ============================================

export async function getProjects(category?: string, limitCount = 12) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc'), limit(limitCount)];
  if (category) constraints.unshift(where('category', '==', category));
  return getCollection('projects', constraints);
}

export async function getFeaturedProjects(limitCount = 6) {
  return getCollection('projects', [
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ]);
}

// ============================================
// Services
// ============================================

export async function getActiveServices() {
  return getCollection('services', [
    where('active', '==', true),
    orderBy('order', 'asc'),
  ]);
}

// ============================================
// Testimonials
// ============================================

export async function getFeaturedTestimonials(limitCount = 8) {
  return getCollection('testimonials', [
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  ]);
}

// ============================================
// Messages / Contact
// ============================================

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return createDoc('messages', { ...data, read: false, replied: false });
}

// ============================================
// Gallery
// ============================================

export async function getGalleryItems(category?: string) {
  const constraints: QueryConstraint[] = [orderBy('order', 'asc')];
  if (category) constraints.unshift(where('category', '==', category));
  return getCollection('gallery', constraints);
}

// ============================================
// Site Settings
// ============================================

export async function getSiteSettings() {
  return getDocById('settings', 'main');
}

// ============================================
// Categories
// ============================================

export async function getCategories(type?: string) {
  const constraints: QueryConstraint[] = [orderBy('order', 'asc')];
  if (type) constraints.unshift(where('type', '==', type));
  return getCollection('categories', constraints);
}

// ============================================
// Helpers
// ============================================

export function toDate(value: Timestamp | Date | string | undefined): Date {
  if (!value) return new Date();
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  return new Date(value);
}

export { where, orderBy, limit, startAfter };
