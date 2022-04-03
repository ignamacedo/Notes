
export default function Menu({onNew, onSearch}){

    function handleClick(){
     onNew();   
    }

    function handleChange(e){
        onSearch(e);   
       }

    return(
        <div className="menu">
            <input className="search" placeholder="search..." onChange={handleChange} />
            <button className="btn" onClick={ (e) => handleClick()}>+ Nueva Nota</button>
        </div>
    );
}
