
export default function Item({item, index, onHandlePinned, onHandleSelectNote, actualIndex}){

function handlePinned(item, index){
    onHandlePinned(item, index);
}

function handleClick(item, e){
    onHandleSelectNote(item, e);
}

    return(
        <div key={item.id} className={ (index === actualIndex)? 'note activeNote':'note'} onClick={(e) => handleClick(item,e)}>
            <div>
                { item.title === ''? '[Sin Titulo]' : item.title.substring(0,20) }
            </div>

            <div>
              <button className="pinButton" onClick={() => handlePinned(item, index)}>{ item.pinned? 'Pinned' : 'Pin' }</button>
            </div>
         </div>
    );
}