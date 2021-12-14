import './styles/style.scss';

const elvenShieldRecipe = {
	leatherStrips: 2,
	ironIngot: 1,
	refinedMoonstone: 4,
};

const eleveauntletRecipe = {
	...elvenShieldRecipe,
	leather: 1,
	refinedMoonstone: 5,
};
console.log(elvenShieldRecipe);
console.log(eleveauntletRecipe);
