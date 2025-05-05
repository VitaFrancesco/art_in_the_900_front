import axios from "axios";
import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import GlobalContext from "../context/GlobalContext";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ArtistShow() {
    const { api_url } = useContext(GlobalContext);
    const { slug } = useParams();
    const [artist, setArtist] = useState({});
    const [movement, setMovement] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${api_url}/artists/${slug}`)
            .then(res => {
                setArtist(res.data.data);
            }).catch(err => {
                console.error(err);
            })
    }, []);

    const handleNavigateToWorks = () => {
        setTimeout(() => {
            navigate("/works", { state: { searchFromLink: artist.name } });
        }, 0);
    };

    return (
        <>
            <div className="container pTop">
                <button onClick={() => navigate(-1)} className="linkButton">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    <p>indietro</p>
                </button>
                <div className="row showInfo">
                    <div className="imageShow">
                        <img src={artist.image_url} alt={`immagine di ${artist.name}`} />
                    </div>
                    <div className="mainInfo">
                        <h2>{artist.name}</h2>
                        {artist.movement &&
                            <Link to={`/movements/${artist.movement.slug}`}>
                                <p>Movimento&#58; {artist.movement.name}</p>
                            </Link>
                        }
                        {artist.birth_date && <p>Nato il&#58;{artist.birth_date}</p>}
                        {artist.death_date && <p>Morto il&#58;{artist.death_date}</p>}
                        {artist.nationality && <p>Nazionalità il&#58;{artist.nationality}</p>}
                    </div>
                </div>
                <div className="moreInfo">
                    <p>{artist.biography}</p>
                </div>
            </div>
            <section>
                {artist.works && artist.works.length >= 4 ?
                    <div className="paddingDiv">
                        <h4>Opere</h4>
                        <div onClick={handleNavigateToWorks} className="wrapper_carousel">
                            {artist.works.map((work, index) => {
                                return (
                                    <div key={index} className={`carousel_left element${index + 1}`}>
                                        <img src={work.image_url} alt={`immagine di ${work.title}`} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : movement.works && movement.works.length == 1 &&
                    <div className="paddingDiv">
                        <h4 onClick={handleNavigateToWorks} >Le opere</h4>
                    </div>
                }
            </section >
        </>
    )

}