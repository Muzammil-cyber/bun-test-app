import { NotFoundError } from "elysia";
import prisma from "../db";

export async function getPosts() {
    try {
        return await prisma.post.findMany({ orderBy: { createdAt: 'asc' } });
    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

export async function getPost(id: number) {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            throw new NotFoundError('Post not found.');
        }

        return post;
    } catch (e: unknown) {
        console.error(`Error finding post: ${e}`);
    }
}

export async function createPost(options: { title: string, content: string }) {
    try {
        const { title, content } = options;

        return await prisma.post.create({ data: { title, content } });
    } catch (e: unknown) {
        console.error(`Error creating post: ${e}`);
    }
}

export async function updatePost(id: number, options: { title?: string, content?: string }) {
    try {
        const { title, content } = options;

        return await prisma.post.update({
            where: { id },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
            },
        });
    } catch (e: unknown) {
        console.error(`Error updating post: ${e}`);
    }
}

export async function deletePost(options: { id: number }) {
    try {
        const { id } = options;

        return await prisma.post.delete({
            where: { id },
        });
    } catch (e: unknown) {
        console.error(`Error deleting post: ${e}`);
    }
}