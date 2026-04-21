const productSlug = (title) => {
    const clearTitle = title.toLowerCase().trim().replace(/\s/g, "-");
    return clearTitle;
}

module.exports = { productSlug };