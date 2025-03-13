'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const MobileSearch = (props) => {
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value)
    return (
        <div className={"border border-[var(--search-border)] rounded-[5px] flex p-2 w-[100%]"}>
            <div className="inline min-w-[30px] margin-auto">
                <button
                    onClick={() => { props.handleSearch(text, pDate, type, dept) }}
                    className="w-[20px] h-[20px]"
                >
                    <Image
                        src="\assets\icons\search.svg"
                        alt="search button"
                        className="filter_grey"
                        width={16}
                        height={16}
                    />
                </button>
            </div>
            <div className="grow">
                <input
                    type="text"
                    placeholder="Search"
                    value={text}
                    onChange={handleChange}
                    className="w-[100%]"
                />
            </div>
        </div>
    );
};

export default MobileSearch;