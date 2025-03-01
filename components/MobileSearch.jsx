import {useState,useEffect} from 'react';
import styles from './Search.module.css';
import Image from 'next/image';
const MobileSearch = (props) => {
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value)
    return (
        <div className={styles.searchBar+" flex min-w-[80%] my-8"}>
            <div className={styles.searchButton}>
                <button onClick={() => { props.handleSearch(text, pDate, type, dept) }}>
                    <Image 
                    src="\assets\icons\search.svg"
                    alt="search button" 
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
    );
};

export default MobileSearch;