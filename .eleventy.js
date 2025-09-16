const { DateTime } = require("luxon"); // for date formatting

module.exports = function(eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collection of posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // Add date filter for Nunjucks
  eleventyConfig.addNunjucksFilter("date", function(dateObj, format = "dd LLL yyyy") {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    pathPrefix: "/mypiano/"   // <<< this is the magic line
  };
};
