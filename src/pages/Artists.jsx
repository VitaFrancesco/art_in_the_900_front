import axios from "axios";
import GlobalContext from "../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Link, useLocation } from "react-router-dom";


export default function Artists() {
    const { api_url } = useContext(GlobalContext);
    const [artists, setArtists] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const location = useLocation();
    const [linkSearch, setLinkSearch] = useState('');

    useEffect(() => {
        if (location.state?.searchFromLink && !linkSearch) {
            setSearch(location.state.searchFromLink);
            setLinkSearch(location.state.searchFromLink);
            return
        }
        if (!search) {
            axios.get(`${api_url}/artists`, {
                params: {
                    page: currentPage
                }
            })
                .then(res => {
                    setArtists(res.data.data.data);
                    setLastPage(res.data.data.last_page);
                }).catch(err => {
                    console.error(err);
                })
        } else {
            axios.get(`${api_url}/artists`, {
                params: {
                    search: search,
                    page: currentPage
                }
            }).then(res => {
                setArtists(res.data.data.data);
                setLastPage(res.data.data.last_page);
            }).catch(err => {
                console.error(err);
            })
        }
        setLinkSearch('')
    }, [search, currentPage])

    return (
        <>
            <SearchBar setSearch={setSearch} linkSearch={linkSearch} />
            <section>
                <div className="container">
                    <div className="row">
                        {artists &&
                            artists.map((artist, index) => {
                                return (
                                    <div key={index} className="col">
                                        <Link to={`/artists/${artist.slug}`}>
                                            <div className="card">
                                                <img src={artist.image_url} alt={`immagine di ${artist.name}`} />
                                                <div>
                                                    <h4>{artist.name}</h4>
                                                    <h5>{artist.movements[0].name}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
            </section>
        </>
    )
}