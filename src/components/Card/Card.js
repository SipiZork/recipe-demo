import { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { orangeColorPalette } from '../../styles/colors';

const Card = ({ recipe, id }) => {
  return (
    <StyledCard to={`recipe/${id}`} className="name">
      <div className="name">{recipe.name}</div>
      <div className="pieces">
        <h4>Hozzávalók</h4>
        <ul>
          {recipe.pieces.map((element, i) => 
            <li key={i}>
              {`${element.quantity} ${element.unit} ${element.name}`}
            </li>
          )}
        </ul>
      </div>
    </StyledCard>
  )
}

const StyledCard = styled(Link)`
  width: 250px;
  min-height: 350px;
  border: 1px solid ${orangeColorPalette.pastelOrange};
  transition: all .25s;
  cursor: pointer;
  text-decoration: none;
  color: black;

  &:hover {
    box-shadow: 3px 3px 10px ${orangeColorPalette.pastelOrange};
    border: 1px solid ${orangeColorPalette.pastelOrange};
    background-color: ${orangeColorPalette.peach};
    .name {
      background-color: ${orangeColorPalette.coral};
      color: white;
    }
  }

  .name {
    min-height: 3rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${orangeColorPalette.mango};
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.4rem;
    transition: all .25s;
  }

  .pieces {
    padding: 1rem;
    h4{
      text-decoration: underline;
      font-size: 1.2rem;
    }

    ul {
      li {
        list-style: none;
        font-size: 1rem;
        padding-left: .5rem;
      }
    }
  }

`;

export default Card;
