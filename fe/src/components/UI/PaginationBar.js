import {useEffect, useState} from "react";

function PaginationBar({ lastPageNumber, currentPageNumber, goToPage}){

    const [pages, setPages] = useState([])

    const calculatePages = () => {
        const pagesLength = lastPageNumber>5 ? 5 : lastPageNumber
        setPages(Array.from({length: pagesLength}, (value, index)=>{
            if (currentPageNumber > pagesLength/2){
                if (currentPageNumber < lastPageNumber-pagesLength/2){
                    return (currentPageNumber - Math.round(pagesLength/2)) + index + 1
                } else {
                    return (lastPageNumber - pagesLength) + index + 1
                }
            } else {
                return index + 1
            }
        }))
    }
    // useWatch
    useEffect(()=>{
        calculatePages()
    }, [currentPageNumber, lastPageNumber])

    return(
        <nav aria-label="Page navigation example w-100 overflow-hidden overflow-scroll-x">
            <ul className="pagination">
                <li className="page-item">
                    <a onClick={()=>goToPage(1)} className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pages.map(pageNumber=>
                    <li
                        onClick={()=>goToPage(pageNumber)}
                        key={pageNumber}
                        className={`page-item ${pageNumber===currentPageNumber?'active':''}`}
                    >
                        <a className="page-link"  href="#">{pageNumber}</a>
                    </li>
                )}
                <li className="page-item">
                    <a onClick={()=>goToPage(lastPageNumber)} className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
export default PaginationBar