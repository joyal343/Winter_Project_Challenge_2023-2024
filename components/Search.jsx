'use client';

import { useState } from "react";
import FilterItem from "./FilterItem";

const SearchBar = (props) => {
    const [sText, setSText] = useState('');
    const [pDate, setPDate] = useState(new Array(5).fill(false));
    const [Type, setType] = useState(new Array(6).fill(false));
    const [Dept, setDept] = useState(new Array(5).fill(false));
    const handleChange = (e) => { setSText(e.target.value); }
    return (

            <div className="filters flex_column">
                <div className="searchBar">
                    <input type="text" placeholder="Search" value={sText} onChange={handleChange} />
                    <div className="searchButton">
                        <button onClick={() => { props.handleSearch(sText, pDate, Type, Dept) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="filter_head">Publishing Date</div>
                <ul className="filter_item">
                    <FilterItem state={pDate} setState={setPDate} title="All Date" ind={0} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 30 Days" ind={1} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 60 Days" ind={2} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 6 Months" ind={3} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 12 Months" ind={4} />
                </ul>
                <hr className="filter_sep" />
                <div className="filter_head">Category</div>

                <ul className="filter_item">
                    <FilterItem type={true} state={Type} setState={setType} title="Academic" ind={0} />
                    <FilterItem type={true} state={Type} setState={setType} title="Clubs" ind={1} />
                    <FilterItem type={true} state={Type} setState={setType} title="Sports" ind={2} />
                    <FilterItem type={true} state={Type} setState={setType} title="Research" ind={3} />
                    <FilterItem type={true} state={Type} setState={setType} title="Employment" ind={4} />
                    <FilterItem type={true} state={Type} setState={setType} title="Tenders" ind={5} />
                </ul>
                <hr className="filter_sep" />
                <div className="filter_head">Department</div>
                <ul className="filter_item">
                    <FilterItem type={true} state={Dept} setState={setDept} title="CSE" ind={0} />
                    <FilterItem type={true} state={Dept} setState={setDept} title="ECE" ind={1} />
                    <FilterItem type={true} state={Dept} setState={setDept} title="EEE" ind={2} />
                    <FilterItem type={true} state={Dept} setState={setDept} title="MCE" ind={3} />
                    <FilterItem type={true} state={Dept} setState={setDept} title="CVE" ind={4} />
                </ul>
            </div>
    )
}

export default SearchBar