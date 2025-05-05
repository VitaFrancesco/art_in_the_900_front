import style from "./Footer.module.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Footer() {
    return (
        <>
            <footer>
                <div className={style.row}>
                    <div className={`${style.col} ${style.about}`}>
                        <img src="logo_art.png" alt="" />
                        <p>Nel corso del Novecento, l'arte ha smesso di limitarsi a rappresentare il mondo per iniziare a interrogarlo. Dai manifesti delle avanguardie alla rottura con la forma e la materia, ogni opera è diventata uno specchio del pensiero e del caos di un secolo complesso. Ancora oggi, quelle espressioni continuano a parlarci, ricordandoci che l'arte non è mai solo estetica: è memoria, è lotta, è visione.</p>
                    </div>
                    <div className={`${style.col} ${style.contact}`}>
                        <h4>Contatti</h4>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon="fa-solid fa-envelope" />
                                <Link to="mailto:info@info.com"><p>info@info.com</p></Link>
                            </li>
                            <li>
                                <FontAwesomeIcon icon="fa-solid fa-phone" />
                                <Link to="tel:+39 000 0000000"><p>+ 39 000 0000000</p></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={style.copyright}>
                    <p>&#169; Copyright: art studio</p>
                </div>
            </footer>
        </>
    )
}