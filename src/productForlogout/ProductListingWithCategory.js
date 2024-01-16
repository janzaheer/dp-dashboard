import axios from "axios";
import { BASE_URL, API_VERSION, END_POINT, CATEGORY_ITEMS_LIST_ENDPOINT  } from "../utlis/apiUrls";
import { ProductCategory } from "../utlis/services/product_category_services";

const ProductListingWithCategory = async (headers) => {
    let res = await ProductCategory(headers);
    let categories = res.results;
    let categoriesData = categories.map(async (category) => {
      let items_endpoint = BASE_URL + API_VERSION() + END_POINT() + CATEGORY_ITEMS_LIST_ENDPOINT() + category.name;
      let response = await axios.get(items_endpoint, { headers });
      return {
        name: category.name,
        items: response.data.results,
      };
    });
  
    return Promise.all(categoriesData).then((results) => {
      let data = {};
      results.forEach((resultA) => {
        data[resultA.name] = resultA.items;
      });
      return data;
    });
  };
  
  export default ProductListingWithCategory;
  