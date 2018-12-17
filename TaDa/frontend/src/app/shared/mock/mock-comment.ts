import { Comment } from '../../core/models/comment';

export const mock_comments: Comment[] = [
    {
        id: 1,
        post_id: 13, 
        refer_comment_id: -1,
        author_id: 3,
        star: 2.5,
        content: '진짜 개힘듦....하지마셈',
        register_date: new Date(),
        last_modify_date: new Date()
    },
    {
        id: 2,
        post_id: 4, 
        refer_comment_id: -1,
        author_id: 3,
        star: 4.0,
        content: '시발 학점이었으면',
        register_date: new Date(),
        last_modify_date: new Date()
    },    
]