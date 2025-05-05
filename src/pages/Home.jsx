import style from "./Home.module.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import GlobalContext from "../context/GlobalContext"

export default function Home() {
    const [movements, setMovements] = useState([]);
    const { api_url } = useContext(GlobalContext);
    useEffect(() => {
        axios.get(`${api_url}/movements`)
            .then(res => {
                setMovements(res.data.data.data);
                console.log(res.data.data.data);
            }).catch(err => {
                console.error(err);
            })
    }, [])

    return (
        <>
            <section className={style.containerHero}>
                <div className={style.hero}>
                    <h1>La Miglior Raccolta d'Arte del '900</h1>
                    <h2>Scopri i movimenti che hano rivoluzionato la cultura.</h2>
                    <div className={style.attractiveInfo}>
                        <div className={style.profiles}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <p>&#43;70 artisti con le loro opere</p>
                    </div>
                </div>
                <img src="hero_image.jpg" alt="hero image" />
            </section>
            <div className={style.heroShower}></div>
            <section>
                <div className={style.linkContainer}>
                    <Link to="/artists">
                        <div className={style.cardLink}>
                            <h2>Artisti</h2>
                            <img src="artists.png" alt="artisti del '900" />
                        </div>
                    </Link>
                    <Link to="works">
                        <div className={style.cardLink}>
                            <h2>Opere</h2>
                            <img src="works.png" alt="opere del '900" />
                        </div>
                    </Link>
                    <Link to="movements">
                        <div className={style.cardLink}>
                            <h2>Movimenti</h2>
                            <img src="movements.png" alt="movimenti del '900" />
                        </div>
                    </Link>
                </div>
            </section>
            <section className={style.sectionMovementsCta}>
                <div className={style.movementsCta}>
                    <h2>L'Esplosione dell'Avanguardia: L'Arte del Novecento</h2>
                    <p>Il Novecento è stato un secolo di rottura e rivoluzione per l'arte. Dall'esplosione delle avanguardie storiche &#8212; come il Cubismo, il Futurismo e il Surrealismo &#8212; fino all'espressione astratta e concettuale della seconda metà del secolo, gli artisti hanno sfidato ogni convenzione, riscrivendo il ruolo dell'arte nella società.</p>
                    <p>Non più solo bellezza e rappresentazione, ma critica, pensiero e provocazione: il secolo breve ha trasformato la tela in un campo di battaglia culturale.</p>
                    <Link to="/movements">
                        {movements &&
                            <div className="wrapper_carousel">
                                {movements.map((movement, index) => {
                                    if (index > 3) {
                                        return;
                                    }
                                    return (
                                        <div key={index} className={`carousel_left element${index + 1}`}>
                                            <img src={movement.image_url} alt={movement.name} />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </Link>
                </div>
            </section>
        </>
    )
}