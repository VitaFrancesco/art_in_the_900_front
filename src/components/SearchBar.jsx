import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./SearchBar.module.css"
import { useLocation } from "react-router-dom";

export default function SearchBar({ setSearch, linkSearch }) {

    const [writingSearch, setWrittingSearch] = useState('');

    useEffect(() => {
        if (linkSearch) {
            setWrittingSearch(linkSearch);
        }
    })


    return (
        <section>
            <div className="container">
                <form className={style.form} onSubmit={(e) => {
                    e.preventDefault();
                    setSearch(writingSearch);
                }}>
                    <input type="text" value={writingSearch} onChange={(e) => { setWrittingSearch(e.target.value) }} placeholder="cerca..." />
                    <button type="submit" >
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </form>
            </div>
        </section>
    )
}