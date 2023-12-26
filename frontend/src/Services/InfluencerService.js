import axios from 'axios';

const PROPOSED_INGREDIENT_API_BASE_URL = "http://localhost:8080/api/proposedIngredients";
const ALTERNATIVE_PRODUCT_API_BASE_URL = "http://localhost:8080/api/alternativeProducts";

class InfluencerService {

    getProposedIngredients() {
        return axios.get(PROPOSED_INGREDIENT_API_BASE_URL + "/all");
    }

    saveProposedIngredient(proposedIngredient) {
        return axios.post(PROPOSED_INGREDIENT_API_BASE_URL + "/save", proposedIngredient);
    }

    deleteProposedIngredient(id) {
        return axios.delete(PROPOSED_INGREDIENT_API_BASE_URL + "/delete/" + id);
    }

    getProposedIngredientById(id) {
        return axios.get(PROPOSED_INGREDIENT_API_BASE_URL + "/propIngredient/" + id)
    }

    checkProposedIngredientWatchlist(name) {
        return axios.get("/api/ingredients/findByName/" + name);
    }

    updateProposedIngredient(proposedIngredient, id) {
        return axios.put(PROPOSED_INGREDIENT_API_BASE_URL + "/propIngredient/" + id, proposedIngredient);
    }
    /*
    getAlternativeProducts() {
        return axios.get(ALTERNATIVE_PRODUCT_API_BASE_URL + "/all");
    }
    */
    saveAlternativeProduct(alternativeProduct) {
        return axios.post(ALTERNATIVE_PRODUCT_API_BASE_URL + "/save", alternativeProduct);
    }

    deleteAlternativeProduct(id) {
        return axios.delete(ALTERNATIVE_PRODUCT_API_BASE_URL + "/delete/" + id);
    }

    getAlternativeProductById(id) {
        return axios.get(ALTERNATIVE_PRODUCT_API_BASE_URL + "/altProduct/" + id);
    }

    updateAlternativeProduct(alternativeProduct, id) {
        return axios.put(ALTERNATIVE_PRODUCT_API_BASE_URL + "/altProduct/" + id, alternativeProduct);
    }

}

export default new InfluencerService();