export interface Course {
    id: number;
    title: string;
    description: string;
    tag1: string;
    tag2: string;
    auteur: string;
    date: string;
    imageUrl: string;
    videoUrl?: string;
    audioUrl?: string;
    pdfUrl?: string;
}