import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { byID, favorite} from "../../redux/operations/recipiesOperations.js";
import { selectByID } from "../../redux/selectors/recipieSelectors.js";
import MainTitle from "../../components/MainTitle/MainTitle.jsx";
import RecipePageHero from "./RecipePageHero/RecipePageHero";
import RecipeIngredientsList from "./RecipeIngredientsList/RecipeIngredientsList";
import RecipePreparation from "./RecipePreparation/RecipePreparation";
import { selectIsLoggedIn } from "../../redux/selectors/authSelectors.js";

const RecipePage = () => {
	const dispatch = useDispatch();
	const { recipeId } = useParams();
	const recipe = useSelector(selectByID);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	useEffect(() => {
		// if (isLoggedIn) {
			async function fetchRecipe() {
			const res = await dispatch(byID(recipeId));
			return res;
		}
		async function fetchFavorite() {
      const res = await dispatch(favorite());
      return res;
    }
		fetchRecipe();
		fetchFavorite();}
		
	// }
	, [dispatch, recipeId, isLoggedIn]);

	return (
		recipe.glass && (
			<MainTitle title={recipe.drink}>
				<RecipePageHero
					glass={recipe.glass}
					about={recipe.about || null}
					image={recipe.drinkThumb || null}
				></RecipePageHero>
				<RecipeIngredientsList ingredients={recipe.ingredients}></RecipeIngredientsList>
				<RecipePreparation instructions={recipe.instructions}></RecipePreparation>
			</MainTitle>
		)
	);
};

export default RecipePage;
