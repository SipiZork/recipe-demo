import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import styled from 'styled-components';

function Recipes({ searchfield }) {
  const { allRecipes } = useSelector(state => state.recipe);
  return (
    <StyledRecipes>
      <div className="recipes">
        {allRecipes !== undefined &&
          allRecipes.filter(r => r.data.name.toUpperCase().includes(searchfield.toUpperCase())).map((recipe, i) => {
           return(<Card recipe={recipe.data} id={recipe.id} key={i} />)
          }
        )}
      </div>
    </StyledRecipes>
  )
  }

const StyledRecipes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .recipes {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export default Recipes;
