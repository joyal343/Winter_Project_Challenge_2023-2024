"use client";
import Image from 'next/image';

const FilterItem = (props) => {
    const handleClick = () => {
        props.setState(prevState => {
            return prevState.map((elt, index) => {
                if (index === props.ind) {
                    if (elt === true) {
                        return false
                    }
                    return true;
                }
                else
                    return props.type ?  prevState[index] : false;
            });
        });
    }
    return (
        <li className='filter_box' style={{gap:"18px"}}>
            <button onClick={handleClick} className='flex_center'>
                <Image
                    src={props.state[props.ind] ? "assets\\icons\\check2-circle.svg" : "assets\\icons\\circle.svg"}
                    alt=""
                    width={props.state[props.ind] ? 17 : 15 }
                    height={props.state[props.ind] ? 17 : 15}
                />
            </button>
            <div className="filter_text">
                {props.title}
            </div>
        </li>

    )
}

export default FilterItem