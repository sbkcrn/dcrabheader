
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  const Category = require("discourse/models/category").default;

  api.registerConnectorClass("above-main-container", "featured-categories", {
    setupComponent(args, component) {
      api.onPageChange((url, title) => {
        if (url === "/" || url === "/latest") {
          document.documentElement.classList.add("custom-featured-categories");

          const definedFeaturedCategories = ["from the team", "all things rabbit", "lam, teach mode & agents"];
          const featuredCategories = [];

          const categories = Category.list();
          for (let cat of categories) {
            if (definedFeaturedCategories.includes(cat.name.toLowerCase())) {
              featuredCategories.push(cat);
            }
          }

          component.set("featuredCategories", featuredCategories);
        } else {
          document.documentElement.classList.remove("custom-featured-categories");
          component.set("featuredCategories", []);
        }
      });
    },
  });
});
