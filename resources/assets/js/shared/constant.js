// Key flags
export const IS_ON_DEVELOPMENTS = true;

export const DefaultCorsSetting = Object.freeze({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
    },
    credentials: "include",
});

// Enumerations
export const CommentType = Object.freeze({
    BLOG_POST: "BLOG_POST" // Comment type for blog post
});

export const ApiUrl = IS_ON_DEVELOPMENTS ? `http://localhost:8000` : ``;
export const RootPath = IS_ON_DEVELOPMENTS ? `` : ``;