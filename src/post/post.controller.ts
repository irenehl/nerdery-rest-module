import { PostService } from './post.service';
import { Request, Response } from 'express';

export class PostController {
    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    async create(req: any, res: Response) {
        return res
            .status(200)
            .json(await this.postService.createPost(+req.user.id!, req.body));
    }

    async getPost(req: Request, res: Response) {
        return res
            .status(200)
            .json(await this.postService.getPost({ id: +req.params.id }));
    }

    async getAll(req: Request, res: Response) {
        return res.status(200).json(
            await this.postService.getAll({
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            })
        );
    }

    async updatePost(req: Request, res: Response) {
        return res
            .status(200)
            .json(
                await this.postService.updatePost(
                    +req.user!.id,
                    +req.params.id,
                    req.body
                )
            );
    }

    async reactionOnPost(req: Request, res: Response) {
        return res
            .status(200)
            .json(
                await this.postService.reactionOnPost(
                    Number(req.user?.id),
                    Number(req.params.id),
                    req.body.reaction
                )
            );
    }

    async getReaction(req: Request, res: Response) {
        return res
            .status(200)
            .json(await this.postService.getReactions(Number(req.params.id)));
    }

    async createReport(req: Request, res: Response) {
        return res
            .status(200)
            .json(
                await this.postService.createReport(
                    Number(req.user?.id),
                    Number(req.params.id),
                    req.body
                )
            );
    }

    async deletePost(req: Request, res: Response) {
        return res
            .status(200)
            .json(
                await this.postService.deletePost(+req.user!.id, +req.params.id)
            );
    }
}
