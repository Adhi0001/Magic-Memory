import { useEffect,useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

const cardImages =[
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false}
]

function App() {
    const [cards,setCards]=useState([])
    const [turns,setTurns]=useState(0)
    const [ChoiceOne,setChoiceOne] = useState(null)
    const [ChoiceTwo,setChoiceTwo]=useState(null)
    const [disabled,setDiasabled] = useState(false)

  //shuffle cards
  const shuffleCards =()=>{
  const shuffledCards=[...cardImages,...cardImages]
       .sort(()=>Math.random() -0.5)
       .map((card)=>({...card, id:Math.random() }))

       setChoiceOne(null)
       setChoiceTwo(null)
       setCards(shuffledCards)
       setTurns(0)
  }
  // console.log(cards, turns);

  //handle a choice 
  const handleChoice = (card)=>{
       ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }

  //compare 2 selected card
  useEffect(()=>{
  
if(ChoiceOne && ChoiceTwo){
  setDiasabled(true)
  if(ChoiceOne.src === ChoiceTwo.src){
    setCards(prevCards =>{
      return  prevCards.map(card =>{
        if(card.src === ChoiceOne.src){
          return {...card,matched:true}
        }else{
          return card
        }
      })
    })
   resetTurn()    
  }else{
    // console.log('those cards do not match');
   setTimeout(() =>  resetTurn(),1000)
  }
}
  },[ChoiceOne,ChoiceTwo]) 

  console.log(cards)

  //rest choice and increase turn
  const resetTurn =()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns =>prevTurns+1)
    setDiasabled(false)
  }

  //start the game automatically
  useEffect(()=>{
    shuffleCards()
  },[])
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game </button>
      <div className="card-grid">
        {cards.map(card =>(
      <SingleCard 
       key={card.id} 
       card={card}
       handleChoice={handleChoice}
       flipped = {card === ChoiceOne || card === ChoiceTwo || card.matched}
       disabled={disabled}
        />
      ))}
      
      </div> 
     
    </div>
    
  );
}

export default App;
