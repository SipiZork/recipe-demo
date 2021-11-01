import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { orangeColorPalette } from '../../styles/colors';
import { getShoplist } from '../../actions/shoplistAction';
import Button from '../Button/Button';
import { db } from '../../firebase/firebase';
import { onSnapshot, doc } from '@firebase/firestore';

const Navbar = () => {
  const dispatch = useDispatch();
  const [piecesNumber, setPiecesNumber] = useState(0);
  const { shoplist } = useSelector(state => state.shoplist);

  const giveNumber = () => {
    setPiecesNumber(piecesNumber + 1);
  }
  
  console.log(shoplist);
  useEffect(() => {
    onSnapshot(doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp'), (snapshot) => {
      dispatch(getShoplist('a'));
    });
  }, [dispatch]);
  return (
    <StyledNavbar>
      <Link to="/" className="logo">
        <p>Logo</p>
      </Link>
      <Button onClick={giveNumber}>
        <Link to='/shoplist' className='shoplist'>
          <i class="fas fa-shopping-basket"></i>
          <p>Hiányos receptek: {shoplist !== null ? shoplist.filter(recipe => recipe.pieces.some(piece => !piece.done)).length : 0}</p>
        </Link>
      </Button>
    </StyledNavbar>
  )
}

const StyledNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  background-color: ${orangeColorPalette.apricot};

  .logo {
    height: 100%;
    width: 10rem;
    font-size: 2.5rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shoplist {
    i {
      font-size: 1.8rem;
    }
    text-decoration: none;
    color: black;
    font-size: 1.1rem;

  }
`;

export default Navbar;