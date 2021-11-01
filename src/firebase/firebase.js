import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';

const { RECT_APP_FIREBASE_API_KEY } = process.env;

const firebaseApp = initializeApp({
  apiKey: RECT_APP_FIREBASE_API_KEY,
  authDomain: "recipe-book-da4b8.firebaseapp.com",
  projectId: "recipe-book-da4b8",
  storageBucket: "recipe-book-da4b8.appspot.com",
  messagingSenderId: "759631470408",
  appId: "1:759631470408:web:c125ca0472a3b186655d7d",
  measurementId: "G-RZM8NYX8MG"
});

export const getAllRecipesFromDb = async () => {
  const recipes = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    querySnapshot.forEach((doc) => {
      recipes.push({ data: doc.data(), id: doc.id });
    });
  } catch (e) {
    console.error(e);
  }

  return recipes;
}

export const getARecipeFromDb = async (id) => {
  let recipe = null;
  try {
    console.log(id);
    const querySnapshot = await getDoc(doc(db, 'recipes', id));
    recipe = { data: querySnapshot.data(), id: id };
  } catch (e) {
    console.error(e);
  }
  return recipe;
}

export const addRecipeToDb = async (name, pieces) => {
  const newRecipeRef = doc(collection(db, 'recipes'));
  await setDoc(newRecipeRef, { name, pieces });
}

export const getShopListFromUser = async (id) => {
  let shoplist = null;
  try {
    const querySnapshot = await getDoc(doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp'));
    shoplist = querySnapshot.data().shoplist;
  } catch (e) {
    console.error(e);
  }
  if (shoplist.length > 0 && shoplist[0] !== "") {
    return shoplist;
  } else {
    return null;
  }
}

export const changeDone = async (i, name) => {
  const querySnapshot = await getDoc(doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp'));
  const shoplistRef = doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp');
  let { shoplist } = querySnapshot.data();
  shoplist[i].pieces.map(piece => {
    console.log('pname',piece.name);
    console.log('name', name);
    if (piece.name === name) {
      piece.done = !piece.done;
    }
  });
  /*shoplist[i].pieces[x].done = !shoplist[i].pieces[x].done;*/
  updateDoc(shoplistRef, {shoplist});
}

export const deleteRecipeFromShoplist = async (id) => {
  console.log(id);
  const querySnapshot = await getDoc(doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp'));
  const shoplistRef = doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp');
  let { shoplist } = querySnapshot.data();
  updateDoc(shoplistRef, { shoplist: shoplist.filter(recipe => recipe.recipeId !== id) });
}

export const giveToShopList = async (pieces, recipeId, recipeName, dose) => {
  const querySnapshot = await getDoc(doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp'));
  const shoplistRef = doc(db, 'users', 'PGbNg4hlrnNRBvvAOdMp');
  let { shoplist } = querySnapshot.data();
  let newPieces = [];
  pieces.map(element => {
    newPieces.push({
      name: ` ${element.quantity * dose} ${element.unit} ${element.name}`,
      done: false
    })
  })
  if (shoplist.some(e => e.recipeId === recipeId)) {
    for (let i = 0; i < shoplist.length; i++) {
      if (shoplist[i].recipeId === recipeId) {
        shoplist[i].pieces = newPieces;
      } 
    } 
  } else {
    shoplist.push({ recipeId, recipeName, dose, pieces: newPieces})
  }
  updateDoc(shoplistRef, {shoplist});
}

export const db = getFirestore();

export default firebaseApp;