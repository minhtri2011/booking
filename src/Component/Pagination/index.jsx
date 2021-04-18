import React, { Children, useState } from 'react';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import './style.scss';
export const Pagination = (props) => {
    let { itemPerPage } = props;
    let [currentPage, setcurrentPage] = useState(1);
    // React.children.toArray dùng để chuyển props.Children thành mảng mới tiến hành duyệt được
    let total = Children.toArray(props.children);
    let pages = Math.ceil(total.length / itemPerPage);
    let firstItem = (currentPage - 1) * itemPerPage
    let lastItem = currentPage * itemPerPage > total.length ? total.length : currentPage * itemPerPage;

    const renderChildren = () => {
        let childrenArray = [];
        for (let i = firstItem; i < lastItem; i++) {
            childrenArray.push(total[i]);
        }
        return <>{childrenArray}</>
    }
    // render nút 
    const renderPaginationButton = () => {
        let btnArray = [];
        if (pages > 1) {
            // btnArray.push(<button className={`btn_pagination ${currentPage === 1 ? 'active' : ''}`} key={1} onClick={() => setcurrentPage(1)}>{1}</button>);
            if (pages > 5) {
                // if (currentPage - 2 > 1 && currentPage + 1 <= pages) {
                if (currentPage - 2 > 1 && currentPage <= pages) {
                    for (let i = (currentPage + 2 >= pages ? pages - 4 : currentPage - 2); i <= (currentPage + 2 >= pages ? pages : currentPage + 2); i++) {
                        btnArray.push(<button className={`btn_pagination ${currentPage === i ? 'active' : ''}`} onClick={() => setcurrentPage(i)} key={i}>{i}</button>);
                    }
                } else {
                    for (let i = 1; i <= 5; i++) {
                        btnArray.push(<button className={`btn_pagination ${currentPage === i ? 'active' : ''}`} onClick={() => setcurrentPage(i)} key={i}>{i}</button>);
                    }
                }
            }
            else {
                for (let i = 1; i <= pages; i++) {
                    btnArray.push(<button className={`btn_pagination ${currentPage === i ? 'active' : ''}`} onClick={() => setcurrentPage(i)} key={i}>{i}</button>);
                }
            }
            // btnArray.push(<button className={`btn_pagination ${currentPage === pages ? 'active' : ''}`} key={pages} onClick={() => setcurrentPage(pages)}>{pages}</button>);

        }
        return btnArray;
    }

    return (
        <div className='pagination'>
            {renderChildren()}
            <div className="paginationButton">
                <button className={`btn_pagination`} onClick={() => setcurrentPage(1)}><FirstPageIcon /></button>
                {/* <FirstPageIcon className={`btn_pagination`} onClick={() => setcurrentPage(1)} /> */}
                {renderPaginationButton()}
                <button className={`btn_pagination`} onClick={() => setcurrentPage(pages)}><LastPageIcon /></button>
            </div>
        </div>
    )
}
