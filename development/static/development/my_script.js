const app = document.getElementById('app');


function Header(props) {
    return (<h1>{props.title ? props.title : 'Default Title'}</h1>);
}

function HomePage() {

    const names = ['Ada', 'Grace', 'Hamilton'];

    const [likes, setLikes] = React.useState(0);

    function handleClick() {
        setLikes(likes + 1);
    }

    return (
        <div>
            {/* Nesting the Header component */}
            <Header title="React foundations"/>
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
            <button onClick={handleClick}>Like({likes})</button>
        </div>
    );
}

ReactDOM.render(<HomePage />, app);