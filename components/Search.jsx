// <hr className="filter_sep" />
'use client';

import { useState } from "react";
import FilterItem from "./FilterItem";
import Image from 'next/image';
import styles from "./Search.module.css";
const SearchBar = (props) => {
    const [sText, setSText] = useState('');
    const [pDate, setPDate] = useState(new Array(5).fill(false));
    const [Type, setType] = useState(new Array(6).fill(false));
    const [Dept, setDept] = useState(new Array(5).fill(false));
    const handleChange = (e) => { setSText(e.target.value); }
    return (

            <div className={styles.filters+" flex_column"} >
                <div className={styles.searchBar}>
                    <div className={styles.searchButton}>
                        <button onClick={() => { props.handleSearch(sText, pDate, Type, Dept) }}>
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
                    value={sText} 
                    onChange={handleChange} 
                    className={props.isdel && styles.search_inp} />
                </div>
                <div className="filter_head">Publishing Date</div>
                <ul className="filter_item">
                    <FilterItem state={pDate} setState={setPDate} title="All Date" ind={0} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 30 Days" ind={1} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 60 Days" ind={2} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 6 Months" ind={3} />
                    <FilterItem state={pDate} setState={setPDate} title="Last 12 Months" ind={4} />
                </ul>
                <div className="filter_head">Category</div>

                <ul className="filter_item">
                    <FilterItem type={true} state={Type} setState={setType} title="Academic" ind={0} />
                    <FilterItem type={true} state={Type} setState={setType} title="Clubs" ind={1} />
                    <FilterItem type={true} state={Type} setState={setType} title="Sports" ind={2} />
                    <FilterItem type={true} state={Type} setState={setType} title="Research" ind={3} />
                    <FilterItem type={true} state={Type} setState={setType} title="Employment" ind={4} />
                    <FilterItem type={true} state={Type} setState={setType} title="Tenders" ind={5} />
                </ul>
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