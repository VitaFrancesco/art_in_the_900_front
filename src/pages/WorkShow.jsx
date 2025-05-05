import axios from "axios";
import { useEffect, useContext, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import GlobalContext from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WorkShow() {
    const { api_url } = useContext(GlobalContext);
    const { slug } = useParams();
    const [work, setWork] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${api_url}/works/${slug}`)
            .then(res => {
                setWork(res.data.data);
            }).catch(err => {
                console.error(err);
            })
    }, []);

    return (
        <section>
            {work &&
                <div className="container pTop">
                    <button onClick={() => navigate(-1)} className="linkButton">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                        <p>indietro</p>
                    </button>
                    <div className="row showInfo">
                        <div className="imageShow">
                            <img src={work.image_url} alt={`immagine di ${work.title}`} />
                        </div>
                        <div className="mainInfo">
                            <h2>{work.title}</h2>
                            {work.artist &&
                                <Link to={`/artists/${work.artist.slug}`}>
                                    <h4>{work.artist.name} {work.artist.birth_date && work.artist.death_date ? `(${work.artist.birth_date}/${work.artist.death_date})` : ''}</h4>
                                </Link>
                            }
                            {work.movement &&
                                <Link to={`/movements/${work.movement.slug}`}>
                                    <p>Movimento&#58; {work.movement.name}</p>
                                </Link>
                            }
                            {work.museum && <p>Museo&#58; {work.museum}</p>}
                            {work.creation_year && <p>Anno di creazione&#58; {work.creation_year}</p>}
                            {work.width && work.height && <p>Dimensioni&#58; {work.width}cm &#xd7; {work.height}cm</p>}
                        </div>
                    </div>
                    <div className="moreInfo">
                        <p>{work.description}</p>
                    </div>
                </div>}
        </section>
    )

}