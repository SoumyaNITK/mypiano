const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy CSS and JS assets
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  // Date filter
  eleventyConfig.addFilter("date", (value, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(value).toFormat(format);
  });

  // Posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a,b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    passthroughFileCopy: true
  };
};
