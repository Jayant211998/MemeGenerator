import './header.css'
export default function Header(){
    return(
        <header className="page-header">
            <div className="app-info">
                <img src="https://platinmods.com/attachments/svmjk-png.179332/" alt="logo" className="header-img"/>
                <h1 className="page-heading">Meme Generator</h1>
            </div>
            <button className="login-button"><img src="https://previews.123rf.com/images/vitechek/vitechek1907/vitechek190700199/126786791-connexion-de-l-utilisateur-ou-ic%C3%B4ne-d-authentification-symbole-de-la-personne-humaine-vecteur.jpg?fj=1" alt="user" className="header-img"></img></button>
        </header>
    );
}