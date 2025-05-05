import axios from "axios";
import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import GlobalContext from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovementShow() {
    const { api_url } = useContext(GlobalContext);
    const { slug } = useParams();
    const [movement, setMovement] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${api_url}/movements/${slug}`)
            .then(res => {
                setMovement(res.data.data);
            }).catch(err => {
                console.error(err);
            })
    }, []);

    const handleNavigateToArtists = () => {
        setTimeout(() => {
            navigate("/artists", { state: { searchFromLink: movement.name } });
        }, 0);
    };

    const handleNavigateToWorks = () => {
        setTimeout(() => {
            navigate("/works", { state: { searchFromLink: movement.name } });
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
                        <img src={movement.image_url} alt={`immagine di ${movement.name}`} />
                    </div>
                    <div className="mainInfo">
                        <h2>{movement.name}</h2>
                        <h4>{`${movement.start_year} - ${movement.end_year}`}</h4>
                    </div>
                </div>
                <div className="moreInfo">
                    <p>{movement.description}</p>
                </div>
            </div>
            <section className="linkSection">
                {movement.artists && movement.artists.length >= 4 ?
                    <div className="paddingDiv">
                        <h4>Artisti</h4>
                        <div onClick={handleNavigateToArtists} className="wrapper_carousel">
                            {movement.artists.map((artist, index) => {
                                return (
                                    <div key={index} className={`carousel_left element${index + 1}`}>
                                        <img src={artist.image_url} alt={`immagine di ${artist.name}`} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : movement.artists && movement.artists.length == 1 &&
                    <div className="paddingDiv">
                        <h4 onClick={handleNavigateToArtists} >Gli Artisti</h4>
                    </div>
                }
                {movement.works && movement.works.length >= 4 ?
                    <div className="paddingDiv">
                        <h4>Opere</h4>
                        <div onClick={handleNavigateToWorks} className="wrapper_carousel">
                            {movement.works.map((work, index) => {
                                return (
                                    <div key={index} className={`carousel_right element${index + 1}`}>
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
            </section>
        </>
    )
}