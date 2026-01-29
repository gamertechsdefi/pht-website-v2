import { db, storage } from "@/lib/firebase/client";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  imageUrl?: string;
  category?: string; // New field
  slug: string; // URL friendly identifier
  tags: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  author: {
    email: string;
    name?: string;
    photoURL?: string;
  };
  isPublished: boolean;
  publishedAt: number; // Milliseconds
  createdAt: number;
}

// Cloudinary Config (Pending Keys from User)
// const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export class NewsService {
  private static collectionName = "news";

  // Calculate read time
  static calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  // Get all articles (ordered by date) - Admin use mostly
  static async getAll(): Promise<NewsArticle[]> {
    try {
      const q = query(
        collection(db, NewsService.collectionName),
        orderBy("publishedAt", "desc")
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsArticle));
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  }

  // Get only published articles - Public use
  static async getPublished(): Promise<NewsArticle[]> {
    try {
      const q = query(
        collection(db, NewsService.collectionName),
        where("isPublished", "==", true),
        orderBy("publishedAt", "desc")
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsArticle));
    } catch (error) {
      console.error("Error fetching published news:", error);
      throw error;
    }
  }

  // Get single article by ID
  static async getById(id: string): Promise<NewsArticle | null> {
    try {
      const docRef = doc(db, NewsService.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as NewsArticle;
        // Backfill slug if missing (using ID as fallback slug)
        if (!data.slug) {
          data.slug = data.id;
        }
        return { ...data, id: docSnap.id };
      }
      return null;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }

  // Get single article by Slug
  static async getBySlug(slug: string): Promise<NewsArticle | null> {
    try {
      // First try to find by slug field
      const q = query(
        collection(db, NewsService.collectionName),
        where("slug", "==", slug),
        where("isPublished", "==", true)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as NewsArticle;
      }

      // Fallback: Check if it's an ID (legacy support)
      // This is optional but good if migration isn't perfect
      return await NewsService.getById(slug);

    } catch (error) {
      console.error("Error fetching article by slug:", error);
      throw error;
    }
  }

  // Create article
  static async create(article: Omit<NewsArticle, "id" | "createdAt" | "publishedAt">) {
    try {
      const now = Date.now();
      const docRef = await addDoc(collection(db, NewsService.collectionName), {
        ...article,
        category: article.category || "General",
        slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        tags: article.tags || [],
        seo: article.seo || {},
        createdAt: now,
        publishedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  }

  // Update article
  static async update(id: string, data: Partial<NewsArticle>) {
    try {
      const docRef = doc(db, NewsService.collectionName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  }

  // Delete article
  static async delete(id: string) {
    try {
      const docRef = doc(db, NewsService.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  }

  // CHANGED: Transitioning to Cloudinary
  static async uploadImage(file: File): Promise<string> {
    // Cloudinary Logic
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      throw new Error("Missing Cloudinary Configuration");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Failed:", error);
      throw error;
    }
  }
}
