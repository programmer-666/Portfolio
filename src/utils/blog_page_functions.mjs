export const paginator = (allBlogPosts) => {
    const pages = [];

    let n = 0;
    while (allBlogPosts.slice(n).length > 0) {
        pages.push(allBlogPosts.slice(n));
        n += 5;
    }

    return pages;
};
