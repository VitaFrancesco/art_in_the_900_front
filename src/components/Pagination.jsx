import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Pagination({ currentPage, lastPage, setCurrentPage }) {
    if (lastPage < 2) return;

    let arrayPage = new Array(lastPage).fill('');


    return (
        <div className="pagination">
            {arrayPage.length < 7 ?
                <>
                    {currentPage > 1 ? <button className="toSlow prev" onClick={() => setCurrentPage(currentPage - 1)}>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button> : <button className="disabled toSlow prev">
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button>}
                    {arrayPage.map((page, index) => {
                        return (
                            <button key={index} className={currentPage == index + 1 ? 'activePage numberPage' : ' numberPage'} onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        )
                    })}
                    {currentPage < lastPage ? <button className="toSlow" onClick={() => setCurrentPage(currentPage + 1)}>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button> : <button className="disabled toSlow">
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button>}
                </>
                :
                <>
                    {currentPage > 1 ? <button className="toSlow prev" onClick={() => setCurrentPage(currentPage - 1)}>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button> : <button className="disabled toSlow prev">
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button>}
                    {arrayPage.map((page, index) => {
                        const thisPage = index + 1;
                        if (thisPage < currentPage + 2 && thisPage > currentPage - 2) {
                            return (
                                <button key={index} className={currentPage == thisPage ? 'activePage numberPage' : ' numberPage'} onClick={() => setCurrentPage(thisPage)} >{thisPage}</button>
                            )
                        } else if (thisPage == 1 || thisPage == lastPage) {
                            return (
                                <button key={index} className={currentPage == thisPage ? 'activePage numberPage' : ' numberPage'} onClick={() => setCurrentPage(thisPage)} >{thisPage}</button>
                            )
                        } else if ((thisPage == 2 && currentPage > 3) || (thisPage == lastPage - 1 && currentPage < lastPage - 2)) {
                            return (
                                <div key={index} className="other">...</div>
                            )
                        }
                    })}
                    {currentPage < lastPage ? <button className="toSlow" onClick={() => setCurrentPage(currentPage + 1)}>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button> : <button className="disabled toSlow">
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button>}
                </>
            }
        </div>
    )
}