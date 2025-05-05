import axios from "axios";
import GlobalContext from "../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function Movements() {
    const { api_url } = useContext(GlobalContext);
    const [movements, setMovements] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        if (!search) {
            axios.get(`${api_url}/movements`, {
                params: {
                    page: currentPage
                }
            })
                .then(res => {
                    setMovements(res.data.data.data);
                    setLastPage(res.data.data.last_page);
                }).catch(err => {
                    console.error(err);
                })
        } else {
            axios.get(`${api_url}/movements`, {
                params: {
                    search: search,
                    page: currentPage
                }
            }).then(res => {
                setMovements(res.data.data.data);
                setLastPage(res.data.data.last_page);
            }).catch(err => {
                console.error(err);
            })
        }

    }, [search, currentPage])

    useEffect(() => {
        return () => {
            setSearch('');
        };
    }, [])

    return (
        <>
            <SearchBar setSearch={setSearch} />
            <section>
                <div className="container">
                    <div className="row">
                        {movements &&
                            movements.map((movement, index) => {
                                return (
                                    <div key={index} className="col">
                                        <Link to={`/movements/${movement.slug}`}>
                                            <div className="card">
                                                <img src={movement.image_url} alt={`immagine di ${movement.name}`} />
                                                <div>
                                                    <h4>{movement.name}</h4>
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