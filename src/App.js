import { useEffect, useState } from 'react';
import './App.css';
import Panel from './components/panel'; 
import Menu from './components/menu'; 
import List from './components/list'; 
import Item from './components/item'; 
import Editor from './components/editor'; 
import Preview from './components/preview'; 
import uuid from 'react-uuid';

function App() {

  const [items, setItems] = useState([]);
  const [copyItems, setCopyItems] = useState([]); 
  const [actualIndex, setActualIndex] = useState(-1);  

useEffect( () => {
  //document.title = copyItems[actualIndex]?.title ?? 'Notes';
  (actualIndex >= 0)? document.title = copyItems[actualIndex]?.title : document.title = 'Notes';
  
});

  function handleNew(){
    const note = {
      id: uuid(),
      title: '.',
      text: '',
      pinned: false,
      created: Date.now()
    };

    let notes = [...items];
    notes.unshift(note);
    let res = getOrderNotes(notes);

    setItems(res);
    setCopyItems(res);
  }

  function handlePinned(item, index){
    setActualIndex(index);
    let id = item.id;
    let notes = [...items];
    notes[index].pinned = !notes[index].pinned;

    let res = getOrderNotes(notes);

    setItems(res);
    setCopyItems(res);

    let nuevoIndex = res.findIndex(x => x.id === id);
    setActualIndex(nuevoIndex);

  }

  function getOrderNotes(arr){
    let items = [...arr];
    let pinned = items.filter(x => x.pinned === true);
    let rest = items.filter(x => x.pinned === false);

    pinned = sortByDate(pinned, true);
    rest = sortByDate(rest, true);

    return [...pinned, ...rest];
  }

  function sortByDate(arr, asc = false){
    //ASC
    if(asc) return arr.sort( (a,b) => new Date(b.created) - new Date(a.created));
    //DESC
    return arr.sort( (a,b) => new Date(a.created) - new Date(b.created));
  }

  function changeTitle(e){
    const title = e.target.value;
    
    let notes = [...items];
    notes[actualIndex].title = title;

    setItems(notes);
    setCopyItems(notes);

  }

  function changeText(e){
    const text = e.target.value;

    let notes = [...items];
    notes[actualIndex].text = text;

    setItems(notes);
    setCopyItems(notes);
  }

  function handleSelectNote(item, e){

    if(!e.target.classList.contains('note')) return;
   
    //const index = items.findIndex(x => x === item);
    const index = copyItems.findIndex(x => x === item);
    setActualIndex(index);

  }

  function renderEditorAndPreviwUI(){
    return(
      <>
        <Editor item={copyItems[actualIndex]} onChangeTitle={changeTitle} onChangeText={changeText}/>
        <Preview text={copyItems[actualIndex].text} />
      </>
    );
  }
  
  function handleSearch(e){
    const q = e.target.value;
    
    if(q === ''){
      setCopyItems([...items]);
    }else{
      let res = items.filter(x => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0);
      
      if(res.length === 0){
        setCopyItems([...res]); 
        setActualIndex(-1);
      }else{
        setCopyItems([...res]); 
        setActualIndex(0);
      
      }
    }
  }
  return (
    <div className="App container">
      <Panel>
        <Menu onNew={handleNew} onSearch={handleSearch}/>
        <List>
            {
              copyItems.map( (item, i) => {
                return <Item key={item.id} item={item} index={i} onHandlePinned={handlePinned} onHandleSelectNote={handleSelectNote} actualIndex={actualIndex} />
              })
            }
          </List>
      </Panel>
    
    { (actualIndex >= 0)? renderEditorAndPreviwUI() : ''}
    
    </div>
  );
}

export default App;
