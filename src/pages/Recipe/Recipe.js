import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { GetARecipe } from '../../actions/recipeAction';
import { orangeColorPalette } from "../../styles/colors";
import Button from "../../components/Button/Button";
import Steps from '../../components/Steps/Steps';
import { giveToShopList } from '../../firebase/firebase';

const Recipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { actualRecipe } = useSelector(state => state.recipe);
  const [dose, setDose] = useState(4);

  const incrementDose = () => {
    setDose(dose => dose+1);
  }

  const decrementDose = () => {
    if (dose > 4) {
      setDose(dose => dose - 1);
    }
  }

  useEffect(() => {
    dispatch(GetARecipe(id));
  }, [dispatch]);

  const giveToShopListAll = (e) => {
    e.preventDefault();
    giveToShopList(actualRecipe.data.pieces, actualRecipe.id, actualRecipe.data.name, dose);
  }

  return (
    <StyledRecipe>
      {actualRecipe !== null && (
        <div className="recipe">
          <h3>{actualRecipe.data.name}</h3>
          <div className="dose">
            <button className="modify-dose minus" onClick={() => decrementDose()}>-</button>
            <div className="dose-number">{`${dose} adag`}</div>
            <button className="modify-dose plus" onClick={() => incrementDose()}>+</button>
          </div>
          <div className="content">
            <div className="pieces">
              <h4>Hozzávalók</h4>
              <ul>
                {actualRecipe.data.pieces.map((element, i) => (
                  <li key={i}>{`${element.quantity * (dose / 4)} ${element.unit} ${element.name}`}</li>
                ))}
              </ul>
            </div>
          </div>
          <Steps steps={actualRecipe.data.steps} />
          <div className="buttons">
            <Button onClick={giveToShopListAll}>Hozzáadás a bevásárlólistához</Button>
          </div>
        </div>
        )}
    </StyledRecipe>
  )
}

const StyledRecipe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  .recipe {
    width: 80vw;
    min-width: 300px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .dose {
      margin-left: 2rem;
      width: 10rem;
      align-items: center;
      font-size: 1.5rem;
      display: flex;

      .modify-dose {
        width: 2rem;
        height: 2rem;
        border:none;
        outline:none;
        transition: all .25s;
        border: 1px solid ${orangeColorPalette.lightOrange};
        cursor: pointer;
        background-color: ${orangeColorPalette.mango};

        &:hover {
          background-color: ${orangeColorPalette.coral};
          background-color: ${orangeColorPalette.mahogany};
          color: white;
        }

        &.minus {
          border-radius: 30% 0 0 30%;
        }
        &.plus {
          border-radius: 0 30% 30% 0;
        }
      }

      .dose-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        height: 2rem;
        background-color: ${orangeColorPalette.lightOrange};
      }
    }
    
    h3 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 4rem;
      font-size: 1.7rem;
      text-transform: uppercase;
      background-color: ${orangeColorPalette.lightOrange};
    }

    .content {
      padding: 0 2rem;
      h4 {
        font-size: 1.3rem;
      }

      ul {
        li {
          list-style: none;
          padding-left: .5rem;
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
    }
  }
`;

export default Recipe;
