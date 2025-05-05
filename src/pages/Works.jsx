import axios from "axios";
import GlobalContext from "../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Link, useLocation } from "react-router-dom";

export default function Works() {
    const { api_url } = useContext(GlobalContext);
    const [works, setWorks] = useState([]);
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
            axios.get(`${api_url}/works`, {
                params: {
                    page: currentPage
                }
            })
                .then(res => {
                    setWorks(res.data.data.data);
                    setLastPage(res.data.data.last_page);
                }).catch(err => {
                    console.error(err);
                })
        } else {
            axios.get(`${api_url}/works`, {
                params: {
                    search: search,
                    page: currentPage
                }
            }).then(res => {
                setWorks(res.data.data.data);
                setLastPage(res.data.data.last_page);
            }).catch(err => {
                console.error(err);
            })
        }

    }, [search, currentPage])

    return (
        <>
            <SearchBar setSearch={setSearch} linkSearch={linkSearch} />
            <section>
                <div className="container">
                    <div className="row">
                        {works &&
                            works.map((work, index) => {
                                return (
                                    <div key={index} className="col">
                                        <Link to={`/works/${work.slug}`}>
                                            <div className="card">
                                                <img src={work.image_url} alt={`immagine di ${work.title}`} />
                                                <div>
                                                    <h4>{work.title.length > 25 ? work.title.slice(0, 25).replace(/[.,\s]$/, '') + "..." : work.title}</h4>
                                                    <h5>{work.artist.name}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} lastPage={lastPage} />
                </div>
            </section>
        </>
    )
}