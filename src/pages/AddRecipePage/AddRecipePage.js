import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import Steps from '../../components/Steps/Steps';
import { addRecipeToDb } from '../../firebase/firebase';
import { getAllRecipes } from '../../actions/recipeAction';
import { orangeColorPalette } from '../../styles/colors';

const AddRecipePage = () => {

  const dispatch = useDispatch();

  const ElementUseRef = useRef();
  const [recipeElements, setRecipeElements] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [addElement, setAddElement] = useState({
    name: '',
    unit: '',
    quantity: ''
  });
  const [steps, setSteps] = useState([]);
  const [addStep, setAddStep] = useState('');

  const changeElementSettings = (e) => {
    setAddElement({
      ...addElement,
      [e.target.name]: e.target.value
    });
  };

  const addElementToRecipe = (e) => {
    e.preventDefault();
    const { name, unit, quantity } = addElement;
    if (name !== '' && unit !== '' && quantity !== '') {
      setRecipeElements([...recipeElements, { name, unit, quantity }]);
      setAddElementSettingsToZero();
      ElementUseRef.current.focus();
    }
  };

  const setAddElementSettingsToZero = () => {
    setAddElement({
      name: '',
      unit: '',
      quantity: ''
    });
  };

  const changeRecipeName = (e) => {
    setRecipeName(e.target.value);
  };

  const addRecipe = () => {
    /*if (recipeName !== '' && recipeElements.length > 0 && steps.length > 0) {
      addRecipeToDb(recipeName, recipeElements, steps);
      dispatch(getAllRecipes());
    }*/
  };

  const addToStep = (e) => {
    setSteps(
      [...steps, addStep]
    );
    setAddStep('');
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      addElementToRecipe(e);
    }
  };

  const onKeyDownOnSteps = (e) => {
    if (e.keyCode === 13) {
      addToStep(e);
    }
  };

  const removeFromSteps = (step) => {
    setSteps(
      steps.filter(s => s !== step)
    );
  }

  const removeFromElements = (name) => {
    setRecipeElements(
      recipeElements.filter(element => element.name !== name)
    );
  }

  return (
    <StyledAddRecipe>
      <div className="input-group">
        <input type="text" name="recipeName" value={recipeName} onChange={(e) => changeRecipeName(e)} required autoComplete="off" />
        <p>Étel neve</p>
      </div>
      <ul className="element-list">
        <p>Hozzávalók:</p>
        {recipeElements.map((element, i) => (
          <li key={i}>
            <p>{`${element.quantity} ${element.unit}`}</p>
            <p>{element.name}</p>
            <div className="close" onClick={() => removeFromElements(element.name)}>X</div>
          </li>
        ))}
      </ul>
      <form className="form-group">
        <div className="input-group">
          <input type="text" name="quantity" ref={ElementUseRef} onChange={(e) => changeElementSettings(e)} value={addElement.quantity} required autoComplete="off" />
          <p>Alapanyag egység</p>
        </div>
        <div className="input-group">
          <input type="text" name="unit" onChange={(e) => changeElementSettings(e)} value={addElement.unit} required autoComplete="off" />
          <p>Alapanyag Mértékegység</p>
        </div>      
        <div className="input-group">
          <input type="text" name="name" onChange={(e) => changeElementSettings(e)} value={addElement.name} required autoComplete="off" onKeyDown={(e) => onKeyDown(e)} />
          <p>Alapanyag neve</p>
        </div>
      </form>
      <Button type="submit" onClick={(e) => addElementToRecipe(e)}>Hozzávaló hozzáadása</Button>
      <p>Elkészítés</p>
      {steps.length > 0 &&
        <Steps steps={steps} removeFromSteps={removeFromSteps} editable />
      }
      <div className="input-group">
        <input type="text" className="addStep" value={addStep} onChange={(e) => setAddStep(e.target.value)} onKeyDown={(e) => onKeyDownOnSteps(e)} />
        </div>
        <Button onClick={(e) => addToStep(e)}>Lépés hozzáadása</Button>
      <Button onClick={() => addRecipe()}>Recept hozzáadása</Button>
    </StyledAddRecipe>
  )
}

const StyledAddRecipe = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .element-list {
    width: 100%;
    li {
      display: flex;
      gap: .25rem;
      padding: 1rem;
      font-size: 1.1rem;
      list-style: none;
      user-select: none;
      transition: .25s all;
      position: relative;
      &:nth-child(even) {
        background-color: ${orangeColorPalette.pastelOrange};
      }
      &:nth-child(odd) {
        background-color: ${orangeColorPalette.brightOramge};
      }
      .close {
      width: 4rem;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

        &:hover {
          color: red;
        }
      }
    }
  }

  .steps {
    li {
      padding: 1rem;
      font-size: 1.1rem;
      list-style: none;
      &:nth-child(even) {
        background-color: ${orangeColorPalette.pastelOrange};
      }
      &:nth-child(odd) {
        background-color: ${orangeColorPalette.brightOramge};
      }
    }
  }

  .input-group {
    position: relative;
    height: 2rem;
    width: 100%;
    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      border: 1px solid ${orangeColorPalette.brightOramge};
      padding: 0 1rem;

      &:hover,
      &:focus,
      &:valid {
        border: 2px solid ${orangeColorPalette.brightOramge};

        +p {
          top: -.65rem;
          font-size: 1.1rem;
          left: .5rem;
          background-color: white;
        }
      }
    }
    p {
      position: absolute;
      top: .25rem;
      display: flex;
      padding: 0 .25rem;
      left: 1rem;
      font-size: 1.4rem;
      transition: .25s all;
      user-select: none;
      pointer-events: none;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }
`;

export default AddRecipePage;
