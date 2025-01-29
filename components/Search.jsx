// <hr className="filter_sep" />
'use client';

import { useState } from "react";
import FilterItem from "./FilterItem";
import Image from 'next/image';
import styles from "./Search.module.css";
const SearchBar = (props) => {
    const [text, setText] = useState('');
    const [pDate, setPDate] = useState(new Array(5).fill(false));
    const [type, setType] = useState(new Array(6).fill(false));
    const [dept, setDept] = useState(new Array(5).fill(false));
    const handleChange = (e) => setText(e.target.value)
    return (

        <div className={styles.filters+" flex_column"} >
            {/* Search Bar */}
            <div className={styles.searchBar}>
                <div className={styles.searchButton}>
                    <button onClick={() => { props.handleSearch(text, pDate, type, dept) }}>
                        <Image 
                        src="\assets\icons\search.svg"
                            alt="" 
                            className="filter_grey"
                        width={16}
                        height={16}
                        />
                    </button>
                </div>
                <input 
                type="text"
                placeholder="Search" 
                value={text} 
                onChange={handleChange} 
                className={props.isdel && styles.search_inp} />
            </div>
            {/* Options */}
            <div className="filter_head">Publishing Date</div>
            {/* Filter Component Needs To be Created */}
            <ul className="filter_item">
                <FilterItem 
                    state={pDate} 
                    setState={setPDate} 
                    title="All Date" 
                    ind={0} 
                />
                <FilterItem state={pDate} setState={setPDate} title="Last 30 Days" ind={1} />
                <FilterItem state={pDate} setState={setPDate} title="Last 60 Days" ind={2} />
                <FilterItem state={pDate} setState={setPDate} title="Last 6 Months" ind={3} />
                <FilterItem state={pDate} setState={setPDate} title="Last 12 Months" ind={4} />
            </ul>
            <div className="filter_head">Category</div>

            <ul className="filter_item">
                <FilterItem type={true} state={type} setState={setType} title="Academic" ind={0} />
                <FilterItem type={true} state={type} setState={setType} title="Clubs" ind={1} />
                <FilterItem type={true} state={type} setState={setType} title="Sports" ind={2} />
                <FilterItem type={true} state={type} setState={setType} title="Research" ind={3} />
                <FilterItem type={true} state={type} setState={setType} title="Employment" ind={4} />
                <FilterItem type={true} state={type} setState={setType} title="Tenders" ind={5} />
            </ul>
            <div className="filter_head">Department</div>
            <ul className="filter_item">
                <FilterItem type={true} state={dept} setState={setDept} title="CSE" ind={0} />
                <FilterItem type={true} state={dept} setState={setDept} title="ECE" ind={1} />
                <FilterItem type={true} state={dept} setState={setDept} title="EEE" ind={2} />
                <FilterItem type={true} state={dept} setState={setDept} title="MCE" ind={3} />
                <FilterItem type={true} state={dept} setState={setDept} title="CVE" ind={4} />
            </ul>
        </div>
    )
}

export default SearchBar